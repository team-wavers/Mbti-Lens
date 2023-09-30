<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
import React from "react";
>>>>>>> 2ef73cbce338313458c21e3731d322802d133df5
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

<<<<<<< HEAD
const RatingBox = ({ mbti }: Props) => {
    const [like, setLike] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        console.log(like);
    }, [like]);
=======
const RatingBox = (props: Props) => {
>>>>>>> 2ef73cbce338313458c21e3731d322802d133df5
    return (
        <Container $mbti={props.mbti}>
            <ButtonContainer onClick={(e) => props.onClick(e)}>
                {props.like ? (
                    <RatingUpSelectedIcon width={30} />
                ) : (
                    <RatingUpOutlineIcon width={30} />
                )}
            </ButtonContainer>
<<<<<<< HEAD
            <ButtonContainer onClick={() => setLike(false)}>
                {like === undefined ? (
                    <RatingDownOutlineIcon width={30} />
                ) : !like ? (
=======
            <ButtonContainer onClick={(e) => props.onClick(e)}>
                {!props.like ? (
>>>>>>> 2ef73cbce338313458c21e3731d322802d133df5
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
<<<<<<< HEAD

=======
>>>>>>> 2ef73cbce338313458c21e3731d322802d133df5
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
