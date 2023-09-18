import React from "react";
import styled from "styled-components";
import flexBox from "@/styles/utils/flexbox";
import { Thumbsdown, Thumbsup } from "@/assets/icons";
import { APIResponseType } from "@/types/response";

type Props = {
    data: APIResponseType["SearchResponse"]["data"];
    mbti: Array<string>;
    length: number;
};
const ResultBox = ({ data, mbti, length }: Props) => {
    const counter = data.ei_like + data.ns_like + data.tf_like + data.pj_like;
    const thumbsUpStats = [
        data.ei_like,
        data.ns_like,
        data.tf_like,
        data.pj_like,
    ];
    const thumbsDownStats = [thumbsUpStats.map((e) => Math.abs(length - e))];
    //like와 comment의 총 개수로만 계산해서..
    return (
        <ResultContainer>
            <ImageContainer>
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
            </ImageContainer>
        </ResultContainer>
    );
};

export default ResultBox;
const ResultContainer = styled.div`
    ${flexBox("column", "center", "center")}
    width: 350px;
    height: 230px;
    outline: none;
    border: none;
    border-radius: 24px;
    background: #dfb8b2;
    box-shadow: 0px 3px 0px 0px #a06868;
`;
const ImageContainer = styled.div`
    ${flexBox("column", "center", "center")}
    width: 340px;
    height: 95%;
    border-radius: 2px;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='white' stroke-width='2' stroke-dasharray='3%2c 7' stroke-dashoffset='42' stroke-linecap='square'/%3e%3c/svg%3e");
    font-size: ${({ theme }) => theme.typography.m};
    color: ${({ theme }) => theme.colors.white};
`;
const Count = styled.div`
    color: #a06868;
    font-family: "HSYuji", sans-serif;
    font-size: ${({ theme }) => theme.typography.m};
    font-weight: 900;
    margin: 10px;
    margin-top: 15px;
    width: 90%;
    height: 2vh;
`;
const StatsContainer = styled.div`
    ${flexBox("column", "center", "center")}
    margin: 2%;
    width: 90%;
    height: 90%;
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
    letter-spacing: 57px;
    margin-left: 20px;
    width: 100%;
    height: 22%;
`;
const Text = styled.div`
    width: 100%;
    margin-left: 10px;
    font-size: ${({ theme }) => theme.typography.m};
    font-family: "RixInooAriDuri", sans-serif;
`;
