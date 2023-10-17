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
            <DashedBorder>
                {like ? <ThumbsUpIcon /> : <ThumbsDownIcon />}
                {children}
            </DashedBorder>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    min-height: 70px;
    background-color: ${({ theme }) => theme.colors.primary2};
    border-radius: 20px;
    gap: 20px;
    padding: 10px;
    box-shadow: 0px 4px 0px 0px ${({ theme }) => theme.colors.primary};
`;

const DashedBorder = styled.div`
    ${flexBox("row", "center", "flex-start")}
    width: 100%;
    min-height: 70px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 16px;
    padding: 0 20px;
    gap: 20px;
    font-size: ${({ theme }) => theme.typography.m};
    color: ${({ theme }) => theme.colors.primary};
`;

export default Comment;
