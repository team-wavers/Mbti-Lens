import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import RatingForm from "@/components/rating/RatingForm";
import flexBox from "@/styles/utils/flexbox";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import searchMbti from "@/apis/create/searchMbti";
import { SearchResponse } from "@/types/response";
import { CommentForm } from "@/components/rating";
import { CommonButton } from "@/components/common/Button";
import { mbtiArray } from "@/constants/mbti";
import useComment from "@/hooks/useComment";

type MbtiType<T> = Map<string, T> | undefined;

type Props = {
    res: SearchResponse;
};

const id = ({ res }: Props) => {
    const router = useRouter();
    const { id, public_key } = router.query;
    const {
        current,
        setCurrent,
        likes,
        comments,
        mbtiData,
        currentHandler,
        likeHandler,
        commentHandler,
        fetch,
    } = useComment(res, Number(id || -1), String(public_key));

    const prevHandler = () => {
        setCurrent(mbtiArray[mbtiArray.indexOf(current) - 1]);
    };

    const nextHandler = () => {
        setCurrent(mbtiArray[mbtiArray.indexOf(current) + 1]);
    };

    const submitHandler = () => {
        const res = fetch();
        console.log(res);
    };

    return (
        <Container>
            <Title>
                김철수 님의
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
                            content="이전"
                            onClick={prevHandler}
                            disabled={false}
                        />
                    )}
                </ButtonDivider>
                <ButtonDivider>
                    {current !== "mbti_p_j" ? (
                        <CommonButton
                            content="다음"
                            onClick={nextHandler}
                            disabled={likes?.get(current) === undefined}
                        />
                    ) : (
                        <CommonButton
                            content="제출"
                            onClick={submitHandler}
                            disabled={Array.from(likes || []).length !== 4}
                        />
                    )}
                </ButtonDivider>
            </ButtonContainer>
        </Container>
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
    line-height: ${({ theme }) => theme.typography.x2l};
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
