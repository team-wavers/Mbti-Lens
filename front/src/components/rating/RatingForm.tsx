import React, { forwardRef, useRef, useState } from "react";
import RatingBox from "./RatingBox";
import CommentBox from "./CommentBox";
import styled from "styled-components";
import flexBox from "@/styles/utils/flexbox";
import { CommonButton } from "../common/Button";
import CommentType from "@/types/comment";

type Props = {
    mbti: number;
    onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
    setRequest: React.Dispatch<React.SetStateAction<CommentType[] | undefined>>;
};
//[ { like : true , comment " hi " } ] 이걸 4번?
//제출하기 눌렀을 때 4번 post보내야하나
const RatingForm = (props: Props, ref: React.ForwardedRef<HTMLFormElement>) => {
    const current = props.mbti;
    //ref는 comment창, rating 타겟팅
    const commentRefs = useRef<Array<any>>([""]);
    //state에 코멘트, like 저장
    const [like, setLike] = useState<Array<boolean>>([true, true, true, true]);
    const [comment, setComment] = useState<Array<string>>(["", "", "", ""]);

    //like, comment 모아서 객체화
    const submitHandler = (like: Array<boolean>, comment: Array<string>) => {
        const copyLike = { ...like };
        const copyComment = { ...comment };
        const commentArray = {} as Array<CommentType>;
        for (const a in like) {
            if (copyComment[a] === "") {
                commentArray[a] = { like: copyLike[a], comment: null };
            } else {
                commentArray[a] = {
                    like: copyLike[a],
                    comment: copyComment[a],
                };
            }
        }
        props.setRequest(commentArray);
    };

    const ratingHandler = (
        e: React.MouseEvent<HTMLButtonElement>,
        current: number,
    ) => {
        e.preventDefault();
        const copyRating = { ...like };
        copyRating[current] = !like[current];
        setLike(copyRating);
    };
    const commentHanler = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        current: number,
    ) => {
        e.preventDefault();
        commentRefs.current[current].value = e.target.value;

        const copyComment = { ...comment };
        copyComment[current] = e.target.value;
        setComment(copyComment);
    };

    return (
        <Container>
            <FormContainer method="post" onSubmit={props.onSubmit} ref={ref}>
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
                {props.mbti === 3 && (
                    <CommonButton
                        content={"제출하기"}
                        disabled={false}
                        onClick={() => submitHandler(like, comment)}
                    />
                )}
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
