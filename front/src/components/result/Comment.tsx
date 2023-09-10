import React from "react";
import styled from "styled-components";

type Props = {
    comment: React.ReactNode;
};
const Comment = ({ comment }: Props) => {
    return <CommentContainer>{comment}</CommentContainer>;
};

export default Comment;

const CommentContainer = styled.div`
    margin: 20px;
    width: 50vw;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    border: solid 1px;
`;
