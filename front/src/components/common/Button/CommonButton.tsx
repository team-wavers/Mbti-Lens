import flexBox from "@/styles/utils/flexbox";
import React from "react";
import { styled } from "styled-components";

type Props = {
    disabled: boolean;
    children: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const CommonButton = ({ disabled, children, onClick }: Props) => {
    return (
        <ButtonContainer onClick={onClick} disabled={disabled}>
            {children}
        </ButtonContainer>
    );
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
    color: ${({ theme }) => theme.colors.white};
    &[disabled] {
        border-radius: 30px;
        background: #eae5e0;
        box-shadow: 0px 2px 0px 0px #c9c4c0;
    }
    &:hover {
        transform: scale(1.1);
    }
    &:active {
        transform: scale(0.9);
    }
    transition: all 0.1s ease-in;
`;

export default CommonButton;
