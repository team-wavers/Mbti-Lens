import React, { useState } from "react";
import styled from "styled-components";
import flexBox from "@/styles/utils/flexbox";
import CommentBox from "@/components/result/CommentBox";
import ResultBox from "@/components/result/ResultBox";
import MbtiButton from "@/components/common/Button/MbtiButton";
import { CommonButton } from "@/components/common/Button";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getResponse } from "@/apis/getResponse";
import useCookie from "@/hooks/useCookie";
import { CommentSearchResponse, MbtiSearchResponse } from "@/types/response";
import axios from "axios";
import { commentResponse } from "@/utils/mokup";

//SSR로 MBTI데이터, comment데이터 조회
export const getStaticPaths = async () => {
    const { cookie } = useCookie();
    const userid = cookie.userid.toString();
    const paths = [{ params: { id: userid } }];

    return { paths, fallback: "blocking" };
};
export const getStaticProps: GetStaticProps = async () => {
    const { cookie } = useCookie();
    const userId = cookie.userid;
    const mbtiResponse = await getResponse(userId)
        .then((res) => res.data)
        .catch((error) => console.log(error));
    const mbtiData = mbtiResponse;
    const commentResponse = await axios
        .all([
            getResponse(userId, mbtiData.ei),
            getResponse(userId, mbtiData.ns),
            getResponse(userId, mbtiData.tf),
            getResponse(userId, mbtiData.pj),
        ])
        .then(
            axios.spread((ei, ns, tf, pj) => {
                const resArray = ei.data.concat(ns.data, tf.data, pj.data);
                return resArray;
            }),
        )
        .catch((error) => console.log(error));
    return {
        props: { mbtiResponse, commentResponse },
        revalidate: 1,
    };
};

const Index = ({
    mbtiResponse,
    commentResponse,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const [mbtiState, setMbtiState] = useState<number>(5);
    const comments: CommentSearchResponse = commentResponse;
    //mbti구하기
    const mbtiData: MbtiSearchResponse = mbtiResponse;
    const mbtiLetter = [mbtiData.ei, mbtiData.ns, mbtiData.tf, mbtiData.pj].map(
        (e) => e.toUpperCase(),
    );

    return (
        <Container>
            {mbtiState === 5 ? (
                <Title>남이 보는 김철수님의 MBTI는?</Title>
            ) : null}
            <MbtiButton
                mbtiLetter={mbtiLetter}
                setState={setMbtiState}
                state={mbtiState}
            />
            {mbtiState === 5 ? (
                <ResultBox
                    mbti={mbtiLetter}
                    data={mbtiData}
                    comment={comments}
                />
            ) : (
                <CommentSection>
                    <CommentBox
                        data={comments}
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
    width: 350px;
    color: ${({ theme }) => theme.colors.primary_4};
    text-align: center;
    margin: 0px;
`;
const CommentSection = styled.div`
    ${flexBox("column", "center", "center;")}
    width: 100%;
    margin-bottom: 20px;
`;
