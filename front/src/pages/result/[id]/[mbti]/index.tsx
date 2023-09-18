import React, { useEffect, useState } from "react";
import styled from "styled-components";
import flexBox from "@/styles/utils/flexbox";
import CommentBox from "@/components/result/CommentBox";
import ResultBox from "@/components/result/ResultBox";
import MbtiButton from "@/components/result/MbtiButton";
import { CommonButton } from "@/components/common/Button";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { mbtiResponse, commentResponse } from "@/utils/mokup";
import { useRouter } from "next/router";
import { getResponse } from "@/apis/comment";

export async function getStaticPaths() {
    return {
        //kakao로그인 data에접근하면 가져올 수 있을듯?
        paths: [{ params: { id: "1", mbti: "entp" } }],
        fallback: true,
    };
}
export const getStaticProps: GetStaticProps = async (context) => {
    const data = context.params;
    const userId = context.params?.id;
    const mbti = context.params?.mbti;
    const mbtiData = await getResponse(userId, mbti);
    return {
        props: { mbtiData, data },
        revalidate: 1,
    };
};
//page 진입 시 getStaticProps로 미리 다 fetching하고 그리기
const id = ({
    mbtiData,
    data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    console.log(data);
    console.log(mbtiData);

    const mbtiLetter = [
        mbtiResponse.data.ei.toUpperCase(),
        mbtiResponse.data.ns.toUpperCase(),
        mbtiResponse.data.tf.toUpperCase(),
        mbtiResponse.data.pj.toUpperCase(),
    ];
    const [mbtiState, setMbtiState] = useState<string | null>(null);
    //https://api.mbti-lens.youthwelfare.kr/;

    return (
        <Container>
            {mbtiState === null ? (
                <Title>남이 보는 김철수님의 MBTI는?</Title>
            ) : null}
            <MbtiContainer>
                <MbtiButton
                    mbti={mbtiLetter}
                    setState={setMbtiState}
                    state={mbtiState}
                />
            </MbtiContainer>
            {mbtiState === null ? (
                <ResultBox
                    data={mbtiResponse.data}
                    mbti={mbtiLetter}
                    length={commentResponse.data.length}
                />
            ) : (
                <CommentSection>
                    <CommentBox
                        data={commentResponse.data}
                        mbtistate={mbtiState}
                    />
                    <CommonButton
                        disabled={false}
                        content={"결과보기"}
                        onClick={() => setMbtiState(null)}
                    />
                </CommentSection>
            )}
        </Container>
    );
};

export default id;
const Container = styled.div`
    ${flexBox("column", "center", "center;")}
    width: 100%;
    min-height: 100vh;
    height: auto;
    background: #f0e4d8;
`;
const Title = styled.h1`
    font-size: ${({ theme }) => theme.typography.xl};
    font-family: "HSYuji", sans-serif;
    font-weight: 1000;
    width: 350px;
    color: #a06868;
    text-align: center;
    margin: 0px;
`;
const MbtiContainer = styled.div`
    ${flexBox("row", "center", "center;")}
    margin-top: 10px;
    gap: 10px;
    margin-top: 80px;
    margin-bottom: 50px;
`;
const CommentSection = styled.div`
    ${flexBox("column", "center", "center;")}
    width: 100%;
    margin-bottom: 20px;
`;
