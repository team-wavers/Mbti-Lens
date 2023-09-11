import React from "react";
import styled from "styled-components";
type SearchResponseType = {
    _id: number;
    user_id: number;
    ei: string;
    ns: string;
    tf: string;
    pj: string;
    ei_like: number;
    ns_like: number;
    tf_like: number;
    pj_like: number;
};
type Props = {
    data: SearchResponseType;
    mbti: Array<string>;
};
const ResultBox = ({ data, mbti }: Props) => {
    const counter = data.ei_like + data.ns_like + data.tf_like + data.pj_like;
    return (
        <ResultContainer>
            <Count>{counter}명이 눌러주셨어용</Count>
            <MbtiContainer>{mbti.map((e) => e)}</MbtiContainer>
            <LikeContainer>goat</LikeContainer>
        </ResultContainer>
    );
};

export default ResultBox;
const ResultContainer = styled.div`
    width: 80%;
    height: 30vh;
    border: 1px dashed ${({ theme }) => theme.colors.gray};
    border-radius: 10px;
`;
const Count = styled.div`
    width: 100%;
    height: 5vh;
`;
const MbtiContainer = styled.div`
    width: 100%;
    height: auto;
    outline: none;
    color: ${({ theme }) => theme.colors.primary_1};
    border: 1px solid ${({ theme }) => theme.colors.gray};
    border-radius: 10px;
    font-size: ${({ theme }) => theme.typography.x3l};
    font-family: "LINE Seed Sans", sans-serif;
    font-weight: 900;
    text-align: center;
    letter-spacing: 30px;
    padding-left: 20px;
`;
const LikeContainer = styled.div`
    width: 100%;
    height: auto;
`;
