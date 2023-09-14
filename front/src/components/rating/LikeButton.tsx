import React, { useState } from "react";
import styled from "styled-components";
import RatingUpOutlineIcon from "../../assets/icons/thumbs-up.svg";
import RatingUpSelectedIcon from "../../assets/icons/thumbs-up-selected.svg";
import RatingDownOutlineIcon from "../../assets/icons/thumbs-down.svg";
import RatingDownSelectedIcon from "../../assets/icons/thumbs-down-selected.svg";
import flexBox from "@/styles/utils/flexbox";

const LikeButton = () => {
    const [like, setLike] = useState<boolean | undefined>(undefined);
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
                {!like ? (
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
    background-color: transparent;
`;

// const RadioButton = styled.input`
//     display: none;
//     width: 0px;
//     height: 0px;
//     outline: none;
// `;

const ButtonContainer = styled.button`
    ${flexBox("column", "center", "center")}
    width: 30px;
    height: 50px;
    outline: none;
    border: none;
    background: transparent;
    padding: 0;
`;

export default LikeButton;
