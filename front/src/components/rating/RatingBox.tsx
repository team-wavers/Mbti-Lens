import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RatingUpOutlineIcon from "../../assets/icons/thumbs-up.svg";
import RatingUpSelectedIcon from "../../assets/icons/thumbs-up-selected.svg";
import RatingDownOutlineIcon from "../../assets/icons/thumbs-down.svg";
import RatingDownSelectedIcon from "../../assets/icons/thumbs-down-selected.svg";
import flexBox from "@/styles/utils/flexbox";

type Props = {
    mbti?: "E" | "I" | "N" | "S" | "F" | "T" | "P" | "J";
};

const RatingBox = ({ mbti }: Props) => {
    const [like, setLike] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        console.log(like);
    }, [like]);
    return (
        <Container>
            <ButtonContainer onClick={() => setLike(true)}>
                {like ? (
                    <RatingUpSelectedIcon width={30} />
                ) : (
                    <RatingUpOutlineIcon width={30} />
                )}
            </ButtonContainer>
            <ButtonContainer onClick={() => setLike(false)}>
                {like === undefined ? (
                    <RatingDownOutlineIcon width={30} />
                ) : !like ? (
                    <RatingDownSelectedIcon width={30} />
                ) : (
                    <RatingDownOutlineIcon width={30} />
                )}
            </ButtonContainer>
        </Container>
    );
};

const Container = styled.div`
    ${flexBox("row", "center", "center")}
    width: auto;
    height: auto;
    background-color: white;
`;

const ButtonContainer = styled.button`
    ${flexBox("column", "center", "center")}
    width: 30px;
    height: 50px;
    outline: none;
    border: none;
    background: transparent;
    padding: 0;
`;

export default RatingBox;
