import flexBox from "@/styles/utils/flexbox";
import React from "react";
import { styled } from "styled-components";

type Props = {
    disabled: boolean;
};

const NextButton = ({ disabled }: Props) => {
    return <ButtonContainer disabled={disabled}></ButtonContainer>;
};

const ButtonContainer = styled.button`
    width: 135px;
    height: 43px;
    outline: none;
    border: none;
    border-radius: 30px;
    background: #c69c9c;
    box-shadow: 0px 3px 0px 0px #a06868;
    font-family: "HSYuji", sans-serif;
    &:before {
        ${flexBox("row", "center", "center")}
        position: relative;
        top: 0px;
        left: -3px;
        content: "다음";
        width: 129px;
        height: 37px;
        border-radius: 24px;
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='white' stroke-width='2' stroke-dasharray='3%2c 7' stroke-dashoffset='42' stroke-linecap='square'/%3e%3c/svg%3e");
        font-size: ${({ theme }) => theme.typography.m};
        color: ${({ theme }) => theme.colors.white};
    }
    &[disabled] {
        border-radius: 30px;
        background: #eae5e0;
        box-shadow: 0px 2px 0px 0px #c9c4c0;
        &:before {
            color: ${({ theme }) => theme.colors.disabled_1};
            border-radius: 24px;
            background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23CDC5BD' stroke-width='2' stroke-dasharray='3%2c 7' stroke-dashoffset='42' stroke-linecap='square'/%3e%3c/svg%3e");
        }
    }
`;

export default NextButton;
