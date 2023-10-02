import React from "react";
import styled from "styled-components";
// rating domain에서 mbtiinput 별도로 구현해야함

type Props = {
    id: string;
    value?: string;
    selected?: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const MbtiInput = ({ id, value, selected, onClick }: Props) => {
    return (
        <InputContainer
            type="button"
            id={id}
            placeholder=""
            selected={selected ? selected : false}
            onClick={onClick}
        >
            {value?.toUpperCase()}
        </InputContainer>
    );
};

const InputContainer = styled.button<{ selected: boolean }>`
    width: 80px;
    height: 100px;
    outline: none;
    background: transparent;
    border-radius: 20px;
    border: 1px dashed rgba(0, 0, 0, 0.3);
    font-size: ${({ theme }) => theme.typography.x3l};
    font-family: "RixInooAriDuri", sans-serif;
    text-align: center;
    color: rgba(0, 0, 0, 0.09);
    ${({ theme, selected }) =>
        selected &&
        `
        border-radius: 20px;
        border: 2px solid #fff;
        background: rgba(207, 144, 144, 0.53);
        box-shadow: 0px 4px 0px 0px rgba(160, 104, 104, 0.25);
        color: ${theme.colors.primary};
    `}
`;

export default MbtiInput;
