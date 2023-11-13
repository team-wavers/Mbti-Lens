import flexBox from "@/styles/utils/flexbox";
import React from "react";
import styled from "styled-components";

type Props = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    id: string;
};

const CommentForm = ({ value, onChange, id }: Props) => {
    return (
        <Container>
            <Title>왜 그렇게 생각하시나요? (선택, 최대 40자)</Title>
            <CommentInput
                maxLength={40}
                id={id}
                onChange={onChange}
                value={value}
            />
        </Container>
    );
};

const Container = styled.div`
    ${flexBox("column", "center", "center")}
    width: 360px;
    height: 230px;
    background-color: ${({ theme }) => theme.colors.primary2};
    border-radius: 15px;
    box-shadow: 0px 8px 0px -3px rgba(160, 104, 104, 0.63);
    padding: 30px;
    gap: 15px;
    &:before {
        content: "";
        width: 340px;
        height: 210px;
        position: absolute;
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='white' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
        border-radius: 10px;
    }
`;

const Title = styled.h1`
    width: 100%;
    text-align: left;
    font-size: ${({ theme }) => theme.typography.m};
    font-weight: 300;
    color: ${({ theme }) => theme.colors.primary};
`;

const CommentInput = styled.textarea`
    width: 300px;
    height: 130px;
    background-color: rgba(255, 255, 255, 0.3);
    border: none;
    border-radius: 10px;
    outline: none;
    font-family: "HSYuji", sans-serif;
    padding: 10px;
    z-index: 999;
    resize: none;
`;

export default CommentForm;
