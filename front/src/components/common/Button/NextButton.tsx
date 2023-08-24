import React from "react";
import { styled } from "styled-components";

type Props = {
    disabled: boolean;
};

const NextButton = ({ disabled }: Props) => {
    return <ButtonContainer disabled={disabled}>다음</ButtonContainer>;
};

const ButtonContainer = styled.button`
    width: 180px;
    height: 60px;
    outline: none;
    border-radius: 30px;
    font-size: ${({ theme }) => theme.typography.l};
    font-weight: 500;
    border: none;
    background-color: ${({ theme }) => theme.colors.primary_1};
    color: ${({ theme }) => theme.colors.white};
    &[disabled] {
        border: 1px solid ${({ theme }) => theme.colors.gray};
        background-color: ${({ theme }) => theme.colors.white};
        color: ${({ theme }) => theme.colors.gray};
    }
`;

export default NextButton;
