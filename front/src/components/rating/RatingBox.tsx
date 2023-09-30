import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RatingUpOutlineIcon from "../../assets/icons/thumbs-up.svg";
import RatingUpSelectedIcon from "../../assets/icons/thumbs-up-selected.svg";
import RatingDownOutlineIcon from "../../assets/icons/thumbs-down.svg";
import RatingDownSelectedIcon from "../../assets/icons/thumbs-down-selected.svg";
import flexBox from "@/styles/utils/flexbox";

type Props = {
    like: boolean | undefined;
    onDislike: () => void;
    onLike: () => void;
};

const RatingBox = ({ onDislike, onLike, like }: Props) => {
    return (
        <Container>
            <ButtonContainer type="button" onClick={onLike}>
                {like ? (
                    <RatingUpSelectedIcon width={30} />
                ) : (
                    <RatingUpOutlineIcon width={30} />
                )}
            </ButtonContainer>
            <ButtonContainer type="button" onClick={onDislike}>
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
