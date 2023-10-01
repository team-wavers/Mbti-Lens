import flexBox from "@/styles/utils/flexbox";
import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
type Props = {
    mbtiLetter: string[];
    setState: Dispatch<SetStateAction<number>>;
    state: number | null;
};
const MbtiButton = ({ mbtiLetter, setState, state }: Props) => {
    const handleClick = (i: number) => {
        setState(i);
    };

    return (
        <ButtonContainer>
            {mbtiLetter?.map((e, i) => (
                <Mbti
                    key={mbtiLetter[i]}
                    $selected={i === state || state === 5}
                    onMouseDown={() => handleClick(i)}
                >
                    {mbtiLetter[i]}
                </Mbti>
            ))}
            ;
        </ButtonContainer>
    );
};

export default MbtiButton;

const ButtonContainer = styled.div`
    ${flexBox("row", "center", "center")}
    gap: 10px;
    margin-top: 50px;
`;
const Mbti = styled.button<{ $selected?: boolean }>`
    width: 80px;
    height: 100px;
    outline: none;
    background-color: transparent;
    border-radius: 20px;
    border: 1px dashed rgba(0, 0, 0, 0.3);
    color: rgba(0, 0, 0, 0.09);
    font-size: ${({ theme }) => theme.typography.x3l};
    font-family: "RixInooAriDuri", sans-serif;
    text-align: center;
    transition: 0.2s ease transform, 0.2s ease box-shadow;
    &:focus {
        transform: scale(1.1);
    }

    ${({ theme, $selected }) =>
        $selected &&
        `
        border-radius: 20px;
        border: 2px solid #fff;
        background: rgba(207, 144, 144, 0.53);
        box-shadow: 0px 4px 0px 0px rgba(160, 104, 104, 0.25);
        color: ${theme.colors.primary};
        `}
`;
