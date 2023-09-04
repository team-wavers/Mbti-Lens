import React from "react";
import styled from "styled-components";
import CommentBox from "./CommentBox";

const CommentSection = () => {
    const comment = "hi";
    return (
        <Container>
            <CommentBox comment={comment} />
        </Container>
    );
};

export default CommentSection;
const Container = styled.div``;
