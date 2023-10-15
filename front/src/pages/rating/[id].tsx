import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RatingForm from "@/components/rating/RatingForm";
import flexBox from "@/styles/utils/flexbox";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import searchMbti from "@/apis/create/searchMbti";
import { GeneralResponse, SearchResponse } from "@/types/response";
import { CommentForm } from "@/components/rating";
import { CommonButton } from "@/components/common/Button";
import { mbtiArray } from "@/constants/mbti";
import useComment from "@/hooks/useComment";
import { AxiosResponse } from "axios";
import useCookie from "@/hooks/useCookie";
import * as Sentry from "@sentry/nextjs";

type Props = {
    res: SearchResponse;
};

const id = ({ res }: Props) => {
    const router = useRouter();
    const { cookie } = useCookie();
    const { id, public_key } = router.query;
    const { nickname } = res.data;
    const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
    const {
        current,
        setCurrent,
        likes,
        comments,
        mbtiData,
        currentHandler,
        likeHandler,
        commentHandler,
        postComment,
    } = useComment(res, Number(id || -1), String(public_key));
    const [mounted, setMounted] = useState<boolean>(false);

    const prevHandler = () => {
        setCurrent(mbtiArray[mbtiArray.indexOf(current) - 1]);
    };

    const nextHandler = () => {
        setCurrent(mbtiArray[mbtiArray.indexOf(current) + 1]);
    };

    const submitHandler = () => {
        setDisableSubmit(true);
        postComment()
            .then((res: AxiosResponse<GeneralResponse>) => {
                if (res.data.statusCode !== 201) {
                    alert("유효하지 않은 Request가 존재합니다.");
                    router.push("/");
                } else {
                    router.push("/finish");
                }
            })
            .catch((e) => {
                console.log(e);
                Sentry.captureException(e);
            });
    };

    useEffect(() => {
        Array.from(likes || []).length === 4 && setDisableSubmit(false);
    }, [likes]);

    useEffect(() => {
        if (cookie) {
            cookie.userid == id && router.push(`/result/${id}`);
        } else if (!public_key || !id) {
            router.push("/");
        }
        setMounted(true);
    }, []);

    return (
        mounted && (
            <Container>
                <Title>
                    {nickname} 님의
                    <br /> MBTI 평가하기
                </Title>
                <RatingForm
                    current={current}
                    like={likes?.get(current)}
                    currentHandler={currentHandler}
                    likeHandler={likeHandler}
                    mbtiData={mbtiData}
                />
                <CommentForm
                    id={current}
                    value={comments?.get(current) || ""}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        commentHandler(current, e.currentTarget.value)
                    }
                />
                <ButtonContainer>
                    <ButtonDivider>
                        {current !== "mbti_e_i" && (
                            <CommonButton
                                onClick={prevHandler}
                                disabled={false}
                            >
                                이전
                            </CommonButton>
                        )}
                    </ButtonDivider>
                    <ButtonDivider>
                        {current !== "mbti_p_j" ? (
                            <CommonButton
                                onClick={nextHandler}
                                disabled={likes?.get(current) === undefined}
                            >
                                다음
                            </CommonButton>
                        ) : (
                            <CommonButton
                                onClick={submitHandler}
                                disabled={disableSubmit}
                            >
                                제출
                            </CommonButton>
                        )}
                    </ButtonDivider>
                </ButtonContainer>
            </Container>
        )
    );
};

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    const req = await searchMbti({
        userId: Number((context.params && context.params.id) || -1),
    })
        .then((res) => {
            return res.data;
        })
        .catch((e) => console.log(e));
    if (!req) return { notFound: true };
    return { props: { res: req } };
};

const Container = styled.div`
    ${flexBox("column", "center", "center")}
    width: 100%;
    height: 100vh;
`;

const Title = styled.h1`
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.typography.xl};
    font-weight: 500;
    line-height: ${({ theme }) => theme.typography.x3l};
    text-align: center;
    margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
    ${flexBox("row", "center", " space-between")}
    width: 100%;
    height: auto;
    padding-top: 20px;
`;

const ButtonDivider = styled.div`
    ${flexBox("row", "center", "center")}
    width: 100%;
    height: 90px;
`;

export default id;
