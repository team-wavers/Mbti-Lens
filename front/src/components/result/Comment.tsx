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
                    <Text>{comment}</Text>
                </Content>
            </Dashed>
        </CommentContainer>
    );
};

export default Comment;

const CommentContainer = styled.div`
    font-size: ${({ theme }) => theme.typography.m};
    font-family: "RixInooAriDuri", sans-serif;
    color: rgba(0, 0, 0, 0.5);
    ${flexBox("row", "center", "center;")};
    border-radius: 20px;
    background-color: #dfb8b2;
    box-shadow: 0px 8px 0px -3px rgba(160, 104, 104, 0.63);
    margin: 20px;
    width: 350px;
    height: 70px;
`;
const Dashed = styled.div`
    ${flexBox("row", "center", "center;")};
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='white' stroke-width='2' stroke-dasharray='3%2c 7' stroke-dashoffset='42' stroke-linecap='square'/%3e%3c/svg%3e");
    width: 340%;
    height: 60px;
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
const Text = styled.div`
    margin-left: 20px;
    width: 100%;
`;
