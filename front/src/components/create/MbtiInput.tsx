import React, { forwardRef } from "react";
import styled from "styled-components";

type Props = {
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    id: string;
};

const MbtiInput = (props: Props, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
        <InputContainer
            {...props}
            placeholder=""
            maxLength={1}
            ref={ref}
            autoComplete="off"
            readOnly
        />
    );
};

const InputContainer = styled.input`
    width: 80px;
    height: 100px;
    outline: none;
    color: ${({ theme }) => theme.colors.primary_1};
    border: 1px solid ${({ theme }) => theme.colors.gray};
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.typography.x3l};
    font-family: "LINE Seed Sans", sans-serif;
    font-weight: 900;
    text-align: center;
    transition: 0.2s ease transform, 0.2s ease box-shadow;
    &:focus {
        transform: scale(1.1);
    }
    &:not(:placeholder-shown) {
        border-color: ${({ theme }) => theme.colors.primary_1};
        color: ${({ theme }) => theme.colors.primary_1};
        &:focus {
            box-shadow: 0px 1px 7px 3px rgba(86, 154, 255, 0.2);
        }
    }
`;

export default forwardRef(MbtiInput);
