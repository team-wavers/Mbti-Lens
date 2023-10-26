import React from "react";
import { keyframes, styled } from "styled-components";

type Props = {
    selected: boolean;
    value: string;
    onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
};

const MbtiInput = ({ selected, value, onClick }: Props) => {
    return (
        <InputContainer
            selected={selected ? selected : false}
            value={value.toUpperCase()}
            onClick={onClick}
            readOnly
        />
    );
};

const InputKeyframe = keyframes`
    0%{
        transform: translateZ(+5%);
    }
    100%{
        transform: translateZ(5%);
    }
`;

const InputContainer = styled.input<{ selected: boolean }>`
    width: 80px;
    height: 100px;
    outline: none;
    background: transparent;
    border-radius: 20px;
    border: 1px dashed rgba(0, 0, 0, 0.3);
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.typography.x3l};
    font-family: "RixInooAriDuri", sans-serif;
    text-align: center;
    padding: 0;
    animation: ${InputKeyframe} 1s linear 0.05s 2 alternative forwards;
    ${({ selected }) =>
        selected &&
        `
        border: 2px solid #fff;
        background: rgba(207, 144, 144, 0.53);
        box-shadow: 0px 4px 0px 0px rgba(160, 104, 104, 0.25);
        transform: scale(1.1);
    `}
`;

export default MbtiInput;
