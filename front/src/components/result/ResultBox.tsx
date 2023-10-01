import React from "react";
import styled from "styled-components";
import flexBox from "@/styles/utils/flexbox";
import { Thumbsdown, Thumbsup } from "@/assets/icons";
import { CommentSearchResponse, MbtiSearchResponse } from "@/types/response";

type Props = {
    data: MbtiSearchResponse;
    mbti: string[];
    comment: CommentSearchResponse;
};
const ResultBox = ({ data, mbti, comment }: Props) => {
    const counter = comment ? comment.length : 0;
    const thumbsUpStats = [
        data.ei_like,
        data.ns_like,
        data.tf_like,
        data.pj_like,
    ];

    const thumbsDownStats: Array<number> = [0, 0, 0, 0];

    if (comment || comment !== null) {
        for (const i in mbti) {
            thumbsDownStats[i] = comment.filter(
                (e) => e.like === false && e.mbti === mbti[i].toLowerCase(),
            ).length;
        }
    }

    //like와 comment의 총 개수로만 계산해서..
    return (
        <ResultContainer>
            <Count>{counter}명이 눌러주셨어용</Count>
            <StatsContainer>
                <MbtiContainer>{mbti.map((e) => e)} </MbtiContainer>
                <ThumbsContainer>
                    <Thumbsup />
                    <Text>{thumbsUpStats}</Text>
                </ThumbsContainer>
                <ThumbsContainer>
                    <Thumbsdown />
                    <Text>{thumbsDownStats}</Text>
                </ThumbsContainer>
            </StatsContainer>
        </ResultContainer>
    );
};

export default ResultBox;
const ResultContainer = styled.div`
    ${flexBox("column", "center", "center")}
    width: 360px;
    height: 230px;
    padding: 5px;
    border-radius: 24px;
    background: #dfb8b2;
    box-shadow: 0px 3px 0px 0px #a06868;
    margin-top: 50px;
    &:before {
        content: "";
        width: 340px;
        height: 210px;
        position: absolute;
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='white' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
        border-radius: 10px;
    }
`;

const Count = styled.div`
    color: #a06868;
    font-family: "HSYuji", sans-serif;
    font-size: ${({ theme }) => theme.typography.m};
    font-weight: 900;
    margin: 10px;
    width: 90%;
`;
const StatsContainer = styled.div`
    ${flexBox("column", "center", "center")}
    width: 90%;
    height: 160px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.3);
`;
const MbtiContainer = styled.div`
    ${flexBox("column", "center", "center")}
    width: 100%;
    height: 100%;
    outline: none;
    color: ${({ theme }) => theme.colors.primary_4};
    border-radius: 10px;
    font-size: ${({ theme }) => theme.typography.x3l};
    font-family: "RixInooAriDuri", sans-serif;
    outline: none;
    font-weight: 900;
    text-align: center;
    letter-spacing: 25px;
    padding-left: 30px;
    margin-top: 10px;
`;
const ThumbsContainer = styled.div`
    ${flexBox("row", "center", "left")}
    color: rgba(0, 0, 0, 0.5);
    margin-left: 15px;
    width: 100%;
    height: 100px;
`;
const Text = styled.div`
    width: auto;
    letter-spacing: 56px;
    padding-left: 20px;
    font-size: ${({ theme }) => theme.typography.m};
    font-family: "RixInooAriDuri", sans-serif;
`;
