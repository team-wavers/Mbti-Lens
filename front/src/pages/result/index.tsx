import React, { useState } from "react";
import styled from "styled-components";
import flexBox from "@/styles/utils/flexbox";
import CommentBox from "@/components/result/CommentBox";
import ResultBox from "@/components/result/ResultBox";
import MbtiButton from "@/components/result/MbtiButton";
import { CommonButton } from "@/components/common/Button";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getResponse } from "@/apis/getResponse";
import useCookie from "@/hooks/useCookie";
import useComment from "@/hooks/useComment";
import { MbtiSearchResponse } from "@/types/response";
import { mbtiResponse } from "@/utils/mokup";
import { useRouter } from "next/router";

export const getStaticProps: GetStaticProps = async () => {
    const { cookie } = useCookie();
    const userId = cookie.userid;
    //path에서 넘겨받은 id로 mbti데이터 SSR하기
    const mbtiData = await getResponse(userId);
    return {
        props: { mbtiData, userId },
        revalidate: 1,
    };
};
//https://api.mbti-lens.youthwelfare.kr/;

const Index = ({
    mbtiData,
    userId,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    if (userId !== router.query) {
        router.push(`${endpoint}/raiting/${router.query}`);
    }

    //mbti구하기
    const mbti = mbtiData.data as MbtiSearchResponse;
    const mbtiid = mbti.ei + mbti.ns + mbti.tf + mbti.pj;
    //id구하기
    const userid = userId;
    //mbti,id데이터로 comment fetching 하기
    const { data, error, isLoading } = useComment(userid, mbtiid);
    const commentData = data?.data;
    console.log(data, error, isLoading);
    const mbtiLetter = [mbtiData.ei, mbtiData.ns, mbtiData.tf, mbtiData.pj];

    const [mbtiState, setMbtiState] = useState<number>(0);

    //const mbtiLetter = ["E", "N", "F", "J"];
    //const data = commentResponse;
    return (
        <Container>
            {mbtiState === null ? (
                <Title>남이 보는 김철수님의 MBTI는?</Title>
            ) : null}
            <MbtiButton
                mbtiLetter={mbtiLetter}
                setState={setMbtiState}
                state={mbtiState}
            />
            {mbtiState === null ? (
                <ResultBox
                    mbti={mbtiLetter}
                    data={mbtiResponse.data}
                    length={commentData?.length}
                />
            ) : (
                <CommentSection>
                    <CommentBox
                        data={commentData}
                        mbtistate={mbtiLetter[mbtiState]}
                    />
                    <CommonButton
                        disabled={false}
                        content={"결과보기"}
                        onClick={() => setMbtiState(5)}
                    />
                </CommentSection>
            )}
        </Container>
    );
};

export default Index;
const Container = styled.div`
    ${flexBox("column", "center", "center;")}
    width: 100%;
    min-height: 100vh;
    height: auto;
    background: #f0e4d8;
`;
const Title = styled.h1`
    font-size: ${({ theme }) => theme.typography.xl};
    line-height: ${({ theme }) => theme.typography.x2l};
    font-family: "HSYuji", sans-serif;
    margin-bottom: 50px;
    font-weight: 500;
    width: 350px;
    color: #a06868;
    text-align: center;
    margin: 0px;
`;
const CommentSection = styled.div`
    ${flexBox("column", "center", "center;")}
    width: 100%;
    margin-bottom: 20px;
`;
