import React, { useEffect, useState } from "react";
import styled from "styled-components";
import flexBox from "@/styles/utils/flexbox";
import CommentBox from "@/components/result/CommentBox";
import ResultBox from "@/components/result/ResultBox";
import MbtiButton from "@/components/result/MbtiButton";
import { CommonButton } from "@/components/common/Button";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { mbtiResponse, commentResponse } from "@/utils/mokup";
import { getResponse } from "@/apis/comment";
import useCookie from "@/hooks/useCookie";
import useComment from "@/hooks/useComment";

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

//page 진입 시 getStaticProps로 미리 다 fetching하고 그리기
const id = ({ mbtiData }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const mbti = mbtiData.data;
    const mbtiid = mbti.ei + mbti.ns + mbti.tf + mbti.pj;
    const { cookie } = useCookie();
    const userid = cookie.userid;
    const [mbtiState, setMbtiState] = useState<string | null>(null);
    const mbtiLetter = [mbtiData.ei, mbtiData.ns, mbtiData.tf, mbtiData.pj];

    const { data, error, isLoading } = useComment(userid, mbtiid);
    console.log(data);

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
