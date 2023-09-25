import React from "react";
import styled from "styled-components";
import RatingUpOutlineIcon from "../../assets/icons/thumbs-up.svg";
import RatingUpSelectedIcon from "../../assets/icons/thumbs-up-selected.svg";
import RatingDownOutlineIcon from "../../assets/icons/thumbs-down.svg";
import RatingDownSelectedIcon from "../../assets/icons/thumbs-down-selected.svg";
import flexBox from "@/styles/utils/flexbox";
import theme from "@/styles/theme";

type Props = {
    mbti?: number;
    like: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const RatingBox = (props: Props) => {
    return (
        <Container $mbti={props.mbti}>
            <ButtonContainer onClick={(e) => props.onClick(e)}>
                {props.like ? (
                    <RatingUpSelectedIcon width={30} />
                ) : (
                    <RatingUpOutlineIcon width={30} />
                )}
            </ButtonContainer>
            <ButtonContainer onClick={(e) => props.onClick(e)}>
                {!props.like ? (
                    <RatingDownSelectedIcon width={30} />
                ) : (
                    <RatingDownOutlineIcon width={30} />
                )}
            </ButtonContainer>
        </Container>
    );
};

const Container = styled.div<{ $mbti?: number }>`
    ${flexBox("row", "center", "center")}
    width: auto;
    height: 40px;
    margin-top: 5px;
    margin-left: ${({ $mbti }) =>
        $mbti === 2 ? "80px" : $mbti === 3 ? "255px" : "0px"};
    margin-right: ${({ $mbti }) =>
        $mbti === 0 ? "280px" : $mbti === 1 ? "100px" : "0px"};
    background-color: ${({ theme }) => theme.colors.background};
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
