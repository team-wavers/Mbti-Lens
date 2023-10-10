import MbtiInput from "@/components/result/MbtiInput";
import StatBox from "@/components/result/StatBox";
import useCookie from "@/hooks/useCookie";
import flexBox from "@/styles/utils/flexbox";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import ThumbsUpIcon from "../../assets/icons/thumbs-up-selected.svg";
import ThumbsDownIcon from "../../assets/icons/thumbs-down-selected.svg";
import LinkIcon from "../../assets/icons/link.svg";
import { SearchResponse } from "@/types/response";
import Comment from "@/components/result/Comment";
import searchMbti from "@/apis/create/searchMbti";
import CommentType from "@/types/comment";
import { searchComment } from "@/apis/rating";
import { CommonButton } from "@/components/common/Button";
import { useRouter } from "next/router";
import Spinner from "@/components/common/Spinner/Spinner";

const ResultPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { cookie } = useCookie();
    const [current, setCurrent] = useState<string | null>(null);
    const [response, setResponse] = useState<SearchResponse["data"] | null>(
        null,
    );
    const [mounted, setMounted] = useState<boolean>(false);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [publicKey, setPublicKey] = useState<string>(
        cookie?.public_key || "",
    );
    const fe_endpoint = `${process.env.NEXT_PUBLIC_FRONTEND_ENDPOINT}`;

    const shareHandler = () => {
        if (cookie && cookie.public_key) {
            window.navigator.clipboard
                .writeText(
                    `${fe_endpoint}/rating/${cookie?.userid}?public_key=${
                        cookie?.public_key || ""
                    }`,
                )
                .then(() => {
                    alert("링크가 클립보드에 복사되었습니다!");
                });
        }
    };

    useEffect(() => {
        if (cookie) {
            if (cookie.userid !== id) router.push(`/result/${cookie.userid}`);
            searchMbti({ userId: Number(cookie.userid) || -1 })
                .then((res) => {
                    setResponse(res.data.data);
                    setMounted(true);
                })
                .catch((e) => console.log(e));
        } else {
            router.push("/");
        }
    }, []);

    useEffect(() => {
        if (!cookie) {
            router.push("/");
        }
    }, [cookie]);

    useEffect(() => {
        if (current !== null) {
            if (cookie && response) {
                const selectedMbti =
                    current === "mbti_e_i"
                        ? response.ei
                        : current === "mbti_n_s"
                        ? response.ns
                        : current === "mbti_t_f"
                        ? response.tf
                        : current === "mbti_p_j"
                        ? response.pj
                        : "";
                searchComment({
                    userId: Number(cookie.userid) || -1,
                    mbti: selectedMbti.toLowerCase(),
                    public_key: publicKey,
                }).then((res) => {
                    const array = res.data.data.filter(
                        (item: CommentType) => item.comment !== undefined,
                    );
                    setComments(array);
                });
            }
        }
    }, [current]);

    if (!mounted) return <Spinner />;
    return (
        mounted &&
        response && (
            <>
                <ShareButton onClick={shareHandler}>
                    <LinkIcon fill="#A06868" />
                    평가링크 복사하기
                </ShareButton>
                <Container>
                    <TopContainer>
                        <Title>
                            남이보는 {cookie?.username || undefined}님의 MBTI는?
                        </Title>
                        <MbtiInputContainer>
                            <MbtiInput
                                value={response.ei}
                                selected={
                                    current ? current === "mbti_e_i" : true
                                }
                                onClick={() => setCurrent("mbti_e_i")}
                            />
                            <MbtiInput
                                value={response.ns}
                                selected={
                                    current ? current === "mbti_n_s" : true
                                }
                                onClick={() => setCurrent("mbti_n_s")}
                            />
                            <MbtiInput
                                value={response.tf}
                                selected={
                                    current ? current === "mbti_t_f" : true
                                }
                                onClick={() => setCurrent("mbti_t_f")}
                            />
                            <MbtiInput
                                value={response.pj}
                                selected={
                                    current ? current === "mbti_p_j" : true
                                }
                                onClick={() => setCurrent("mbti_p_j")}
                            />
                        </MbtiInputContainer>
                    </TopContainer>
                    {current === null && (
                        <StatBox>
                            <CountInformation>
                                {response.ei_like +
                                    response.ns_like +
                                    response.tf_like +
                                    response.pj_like}
                                명이 눌러주셨어요!
                            </CountInformation>
                            <CountContainer>
                                <MbtiTextContainer>
                                    <MbtiText>
                                        {response.ei.toUpperCase()}
                                    </MbtiText>
                                    <MbtiText>
                                        {response.ns.toUpperCase()}
                                    </MbtiText>
                                    <MbtiText>
                                        {response.tf.toUpperCase()}
                                    </MbtiText>
                                    <MbtiText>
                                        {response.pj.toUpperCase()}
                                    </MbtiText>
                                </MbtiTextContainer>
                                <StatContainer>
                                    <ThumbsUpIcon />
                                    <StatTextContainer>
                                        <StatText>{response.ei_like}</StatText>
                                        <StatText>{response.ns_like}</StatText>
                                        <StatText>{response.tf_like}</StatText>
                                        <StatText>{response.pj_like}</StatText>
                                    </StatTextContainer>
                                </StatContainer>
                                <StatContainer>
                                    <ThumbsDownIcon />
                                    <StatTextContainer>
                                        <StatText>
                                            {response.ei_dislike}
                                        </StatText>
                                        <StatText>
                                            {response.ns_dislike}
                                        </StatText>
                                        <StatText>
                                            {response.tf_dislike}
                                        </StatText>
                                        <StatText>
                                            {response.pj_dislike}
                                        </StatText>
                                    </StatTextContainer>
                                </StatContainer>
                            </CountContainer>
                        </StatBox>
                    )}
                    {current !== null && (
                        <>
                            <CommentContainer>
                                {comments &&
                                    comments.map((e) => {
                                        if (e.comment) {
                                            return (
                                                <Comment
                                                    key={e._id}
                                                    like={e.like}
                                                >
                                                    {e.comment}
                                                </Comment>
                                            );
                                        }
                                    })}
                                {comments.length <= 0 && (
                                    <NoCommentText>
                                        등록된 코멘트가 없습니다.
                                    </NoCommentText>
                                )}
                            </CommentContainer>
                            <CommonButton
                                disabled={false}
                                onClick={() => setCurrent(null)}
                            >
                                뒤로가기
                            </CommonButton>
                        </>
                    )}
                </Container>
            </>
        )
    );
};

const Container = styled.div`
    position: relative;
    ${flexBox("column", "center", "flex-start")}
    width: 100%;
    min-height: 100vh;
    padding: 150px 0;
`;

const ShareButton = styled.button`
    ${flexBox("row", "center", "center")}
    position: absolute;
    width: auto;
    height: 50px;
    gap: 10px;
    border: none;
    outline: none;
    top: 10px;
    left: 10px;
    z-index: 999;
    background-color: transparent;
    font-family: HSYuji, sans-serif;
    color: ${({ theme }) => theme.colors.primary};
`;

const TopContainer = styled.div`
    width: 100%;
    height: auto;
`;

const Title = styled.h1`
    width: 300px;
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.typography.x2l};
    font-weight: 500;
    line-height: ${({ theme }) => theme.typography.x2l};
    text-align: center;
    margin: 0 auto;
    margin-bottom: 50px;
`;

const MbtiInputContainer = styled.div`
    ${flexBox("row", "center", "center")};
    width: 100%;
    height: auto;
    gap: 12px;
`;

const CountInformation = styled.h2`
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.typography.m};
    font-family: "HSYuji", sans-serif;
    font-weight: 600;
    padding-bottom: 14px;
`;

const CountContainer = styled.div`
    width: 100%;
    height: 180px;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.3);
    padding: 20px 0;
    padding-bottom: 0;
`;

const MbtiTextContainer = styled.div`
    ${flexBox("row", "center", "center")}
    width: 100%;
    height: auto;
    gap: 20px;
    margin-bottom: 10px;
`;

const MbtiText = styled.span`
    font-size: ${({ theme }) => theme.typography.x3l};
    font-family: "RixInooAriDuri", sans-serif;
    color: ${({ theme }) => theme.colors.primary2};
`;

const StatContainer = styled.div`
    ${flexBox("row", "center", "flex-start")}
    width: 100%;
    height: auto;
    padding: 0 5px;
`;

const StatTextContainer = styled.div`
    ${flexBox("row", "center", "flex-start")}
    width: 100%;
    height: auto;
    padding-left: 20px;
    gap: 45px;
`;

const StatText = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.typography.l};
    font-family: "RixInooAriDuri", sans-serif;
`;

const CommentContainer = styled.div`
    ${flexBox("column", "center", "center")}
    width: 100%;
    min-height: auto;
    padding: 30px 20px;
    gap: 20px;
`;

const NoCommentText = styled.h2`
    font-size: ${({ theme }) => theme.typography.l};
    font-weight: 500;
    color: rgba(0, 0, 0, 0.3);
    padding: 30px 0;
`;

export default ResultPage;
