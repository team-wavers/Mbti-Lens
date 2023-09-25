import React, { forwardRef, useEffect, useRef, useState } from "react";
import RatingBox from "./RatingBox";
import CommentBox from "./CommentBox";
import styled from "styled-components";
import flexBox from "@/styles/utils/flexbox";

type Props = {
    mbti: number;
};
//[ { like : true , comment " hi " } ] 이걸 4번?
//제출하기 눌렀을 때 4번 post보내야하나
const RatingForm = (props: Props, ref: React.ForwardedRef<HTMLFormElement>) => {
    const commentArray = new Array(4).fill({
        like: true,
        comment: "",
    });
    const current = props.mbti;
    //ref는 comment창, rating 타겟팅\
    const commentRefs = useRef<Array<any>>([""]);
    //state에 코멘트, like 저장
    const [like, setLike] = useState<Array<boolean>>(new Array(4).fill(true));
    const [comment, setComment] = useState<Array<string>>(
        new Array(4).fill(""),
    );
    const ratingHandler = (
        e: React.MouseEvent<HTMLButtonElement>,
        current: number,
    ) => {
        e.preventDefault();
        const copyRating = { ...like };
        copyRating[current] = !like[current];
        setLike(copyRating);
    };
    console.log(like);
    const commentHanler = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        current: number,
    ) => {
        e.preventDefault();
        commentRefs.current[current].value = e.target.value;

        const copyComment = { ...comment };
        copyComment[current] = e.target.value;
        setComment(copyComment);
        console.log(comment);
    };
    return (
        <Container>
            <FormContainer method="post" ref={ref}>
                <RatingBox
                    mbti={current}
                    like={like[current]}
                    onClick={(e) => ratingHandler(e, current)}
                />
                <CommentBox
                    value={comment[current]}
                    onChange={(e) => commentHanler(e, current)}
                    ref={(e) => e && (commentRefs.current[current] = e)}
                />
            </FormContainer>
        </Container>
    );
};

export default forwardRef(RatingForm);

const Container = styled.div`
    ${flexBox("column", "center", "center ")}
    width: 100%;
`;
const FormContainer = styled.form`
    ${flexBox("column", "center", "center")}
    width: 100%;
    height: auto;
`;
const ButtonContainer = styled.div`
    ${flexBox("row", "center", "center")}
    width: 100%;
`;
