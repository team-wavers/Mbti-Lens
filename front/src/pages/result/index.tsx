import React, { useState } from "react";
import styled from "styled-components";
import flexBox from "@/styles/utils/flexbox";
import CommentSection from "@/components/result/CommentSection";
import ResultBox from "@/components/result/ResultBox";

//코멘트 있는지 없는지 확인-> 있으면 띄우고 없으면 없다고 띄우기
//코멘트 수가 많을 때 어떤 식으로 스크롤?
//활용 자료 = mbti, 좋아요 수, 코멘트
const index = () => {
    const response = {
        Code: 200,
        message: "api.common.ok",
        data: {
            _id: 4,
            user_id: 1,
            ei: "e",
            ns: "n",
            tf: "t",
            pj: "p",
            ei_like: 4,
            ns_like: 0,
            tf_like: 0,
            pj_like: 0,
        },
    };
    const data = response.data;
    const [mbti, setMbti] = useState([
        data.ei.toUpperCase(),
        data.ns.toUpperCase(),
        data.tf.toUpperCase(),
        data.pj.toUpperCase(),
    ]);
    return (
        <Container>
            <Title>reuslt</Title>
            <MbtiContainer>
                <MbitButton>{mbti[0]}</MbitButton>
                <MbitButton>{mbti[0]}</MbitButton>
                <MbitButton>{mbti[0]}</MbitButton>
                <MbitButton>{mbti[0]}</MbitButton>
            </MbtiContainer>
            <ResultBox data={data} />
            <CommentSection />
        </Container>
    );
};

export default index;
const Container = styled.div`
    ${flexBox("column", "center", "center;")}
    width: 100%;
    height: 100vh;
`;

const Title = styled.h1`
    font-size: ${({ theme }) => theme.typography.xl};
    font-weight: 500;
    text-align: center;
    margin-bottom: 30px;
`;
const MbtiContainer = styled.div`
    ${flexBox("row", "center", "center;")}
    gap: 10px;
    margin-bottom: 50px;
`;
const MbitButton = styled.button`
    width: 80px;
    height: 100px;
    outline: none;
    color: ${({ theme }) => theme.colors.primary_1};
    border: 1px solid ${({ theme }) => theme.colors.gray};
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.typography.x3l};
    font-family: "LINE Seed Sans", sans-serif;
    font-weight: 900;
    text-align: center;
    transition: 0.2s ease transform, 0.2s ease box-shadow;
    &:focus {
        transform: scale(1.1);
    }
    &:not(:placeholder-shown) {
        border-color: ${({ theme }) => theme.colors.primary_1};
        color: ${({ theme }) => theme.colors.primary_1};
        &:focus {
            box-shadow: 0px 1px 7px 3px rgba(86, 154, 255, 0.2);
        }
    }
`;
