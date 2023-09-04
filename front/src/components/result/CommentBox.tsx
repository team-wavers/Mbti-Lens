import React from "react";
import styled from "styled-components";

type Props = {
    comment: React.ReactNode;
};
const CommentBox = ({ comment }: Props) => {
    return <CommentContainer>{comment}</CommentContainer>;
};

export default CommentBox;

const CommentContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
