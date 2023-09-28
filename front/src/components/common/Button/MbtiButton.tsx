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
                    $isfocus={i === state || state === 5}
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
const Mbti = styled.button<{ $isfocus?: boolean }>`
    width: 80px;
    height: 100px;
    outline: none;
    color: ${({ theme, $isfocus }) =>
        $isfocus ? theme.colors.primary_4 : "rgba(0, 0, 0, 0.09)"};
    border-radius: 20px;
    border: 2px solid #fff;
    background-color: rgba(207, 144, 144, 0.53);
    font-size: ${({ theme }) => theme.typography.x3l};
    font-family: "RixInooAriDuri", sans-serif;
    text-align: center;
    transition: 0.2s ease transform, 0.2s ease box-shadow;
    box-shadow: 0px 4px 0px 0px rgba(160, 104, 104, 0.25);
    &:focus {
        transform: scale(1.1);
    }
`;
