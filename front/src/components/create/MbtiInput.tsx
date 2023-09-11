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
    background: transparent;
    border-radius: 20px;
    border: 1px dashed rgba(0, 0, 0, 0.3);
    font-size: ${({ theme }) => theme.typography.x3l};
    font-family: "RixInooAriDuri", sans-serif;
    text-align: center;
    color: ${({ theme }) => theme.colors.primary};
    &:focus {
        transform: scale(1.1);
    }
    &:not(:placeholder-shown) {
        border-radius: 20px;
        border: 2px solid #fff;
        background: rgba(207, 144, 144, 0.53);
        box-shadow: 0px 4px 0px 0px rgba(160, 104, 104, 0.25);
    }
`;

export default forwardRef(MbtiInput);
