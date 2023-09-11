import React from "react";
import styled from "styled-components";
import flexBox from "@/styles/utils/flexbox";
import { Thumbsup, Thumbsdown } from "@/assets/icons/index";

type Props = {
    comment: React.ReactNode;
    like: boolean;
};
const Comment = ({ comment, like }: Props) => {
    return (
        <CommentContainer>
            <Dashed>
                <Content>
                    {like ? <Thumbsup /> : <Thumbsdown />}
                    {comment}
                </Content>
            </Dashed>
        </CommentContainer>
    );
};

export default Comment;

const CommentContainer = styled.div`
    font-size: ${({ theme }) => theme.typography.m};
    ${flexBox("row", "center", "center;")};
    border-radius: 15px;
    background-color: #dfb8b2;
    box-shadow: 0px 8px 0px -3px rgba(160, 104, 104, 0.63);
    margin: 20px;
    width: 70%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Dashed = styled.div`
    ${flexBox("row", "center", "center;")};
    border: 1px dashed #fff;
    border-width: 2px;
    border-radius: 10px;
    width: 100%;
    height: 85%;
    margin: 10px;
`;
const Content = styled.div`
    ${flexBox("row", "center", "center;")};
    width: 90%;
    height: 70%;
    color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    background-color: #dfb8b2;
    z-index: 10;
    background: rgba(255, 255, 255, 0.3);
`;
