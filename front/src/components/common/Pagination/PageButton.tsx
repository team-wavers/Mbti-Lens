import React from "react";
import styled from "styled-components";
import ArrowLeft from "../../../assets/icons/left-arrow.svg";
import ArrowRight from "../../../assets/icons/right-arrow.svg";
import flexBox from "@/styles/utils/flexbox";

type Props = {
    type: "prev" | "next" | "item";
    onClick: () => void;
    children?: React.ReactNode;
    selected?: boolean;
};

const PageButton = ({ type, onClick, children, selected }: Props) => {
    return (
        <ButtonContainer
            onClick={onClick}
            selected={selected ? selected : false}
        >
            {type === "prev" && <ArrowLeft fill="#A06868" />}
            {type === "next" && <ArrowRight fill="#A06868" />}
            {children}
        </ButtonContainer>
    );
};

const ButtonContainer = styled.li<{ selected: boolean }>`
    ${flexBox("row", "center", "center")}
    width: 30px;
    height: 30px;
    background-color: transparent;
    border: none;
    outline: none;
    color: ${({ theme }) => theme.colors.primary};
    list-style: none;
    font-size: ${({ theme }) => theme.typography.l};
    border-radius: 50px;
    cursor: pointer;
    ${({ selected, theme }) =>
        selected &&
        `
        background-color: ${theme.colors.primary2};
        transform: scale(1.1);
    `};
`;

export default PageButton;
