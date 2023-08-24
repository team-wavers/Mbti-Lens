import React from "react";
import { styled } from "styled-components";

type Props = {
    children: React.ReactNode;
    onClick?: () => void;
    type: "ok" | "cancel";
};

const ModalButton = ({ children, onClick, type }: Props) => {
    return (
        <ButtonContainer type={type} onClick={onClick}>
            {children}
        </ButtonContainer>
    );
};

const ButtonContainer = styled.button<{ type: string }>`
    width: auto;
    height: 40px;
    flex: auto;
    outline: none;
    border: none;
    background-color: ${({ theme }) => theme.colors.gray};
    color: ${({ theme }) => theme.colors.black};
    border-radius: 5px;
    ${({ theme, type }) =>
        type === "ok" &&
        `
        background-color: ${theme.colors.primary_1};
        color: ${theme.colors.white};
    `}
    font-weight: 700;
`;

export default ModalButton;
