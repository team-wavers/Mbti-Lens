import React from "react";
import styled from "styled-components";
import ThumbsUpIcon from "../../assets/icons/thumbs-up-selected.svg";
import ThumbsDownIcon from "../../assets/icons/thumbs-down-selected.svg";
import flexBox from "@/styles/utils/flexbox";

type Props = {
    like: boolean;
    children: React.ReactNode;
};

const Comment = ({ like, children }: Props) => {
    return (
        <Container>
            {like ? <ThumbsUpIcon /> : <ThumbsDownIcon />}
            {children}
        </Container>
    );
};

const Container = styled.div`
    ${flexBox("row", "center", "flex-start")}
    width: 100%;
    min-height: 70px;
    background-color: ${({ theme }) => theme.colors.primary2};
    color: rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    padding: 0 20px;
    gap: 20px;
    font-size: ${({ theme }) => theme.typography.m};
`;

export default Comment;
