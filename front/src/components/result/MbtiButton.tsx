import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
type Props = {
    mbti: string[];
    setState: Dispatch<SetStateAction<string | null>>;
    state: string | null;
};
const MbtiButton = ({ mbti, setState, state }: Props) => {
    const [index, setIndex] = useState<number>();
    const handleClick = (i: number) => {
        setState(mbti[i]);
        setIndex(i);
    };
    return mbti?.map((e, i) => (
        <Mbti
            key={i}
            $isfocus={index === i || typeof state !== "string"}
            onMouseDown={() => handleClick(i)}
        >
            {mbti[i]}
        </Mbti>
    ));
};

export default MbtiButton;

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
    &:focus {
        transform: scale(1.1);
        box-shadow: 0px 4px 0px 0px rgba(160, 104, 104, 0.25);
    }
`;
