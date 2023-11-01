import MbtiInput from "@/components/result/MbtiInput";
import StatBox from "@/components/result/StatBox";
import useCookie from "@/hooks/useCookie";
import flexBox from "@/styles/utils/flexbox";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import LinkIcon from "../../assets/icons/link.svg";
import { SearchResponse } from "@/types/response";
import Comment from "@/components/result/Comment";
import searchMbti from "@/apis/create/searchMbti";
import CommentType from "@/types/comment";
import { searchComment } from "@/apis/rating";
import { CommonButton } from "@/components/common/Button";
import { useRouter } from "next/router";
import { Spinner } from "@/components/common/Spinner";
import * as Sentry from "@sentry/nextjs";
import usePagination from "@/hooks/usePagination";
import { Pagination } from "@/components/common/Pagination";
import PageButton from "@/components/common/Pagination/PageButton";
        
const ResultPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { cookie } = useCookie();
    const [current, setCurrent] = useState<string | null>(null);
    const [response, setResponse] = useState<SearchResponse["data"] | null>(
        null,
    );
    const [mounted, setMounted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [count, setCount] = useState<number>(0);
    const {
        prevPage,
        nextPage,
        currentPage,
        pageRange,
        totalPages,
        setCurrentPage,
    } = usePagination(count, 5, 5);
    const publicKey = cookie?.public_key || "";
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
        setCurrentPage(1);
    }, [current]);

    useEffect(() => {
        if (current !== null) {
            if (cookie && response) {
                setLoading(true);
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
                    page: currentPage,
                    size: 5,
                })
                    .then((res) => {
                        if (res.data.data.comments.length > 0) {
                            const array = res.data.data.comments.filter(
                                (item: CommentType) =>
                                    item.comment !== undefined,
                            );
                            setComments(array);
                            setCount(res.data.data.comments.length);
                        } else {
                            setComments([]);
                            setCount(0);
                        }
                        setLoading(false);
                    })
                    .catch((e) => {
                        console.log(e);
                        Sentry.captureMessage(e, "error");
                    });
            }
        }
    }, [current, currentPage]);

    if (!mounted) return <Spinner type="full" />;
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
                    {current === null && <StatBox response={response} />}
                    {current !== null && (
                        <>
                            <CommentContainer>
                                {loading && <Spinner type="default" />}
                                {comments &&
                                    !loading &&
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
                                {!loading && comments.length <= 0 && (
                                    <NoCommentText>
                                        등록된 코멘트가 없습니다.
                                    </NoCommentText>
                                )}
                                {!loading && (
                                    <Pagination
                                        total={count}
                                        size={5}
                                        pagePerList={5}
                                    />
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
    line-height: ${({ theme }) => theme.typography.x3l};
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
