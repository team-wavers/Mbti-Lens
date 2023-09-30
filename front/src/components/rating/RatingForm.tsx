import React, { forwardRef, useRef, useState } from "react";
import styled from "styled-components";
import flexBox from "@/styles/utils/flexbox";
import MbtiInput from "./MbtiInput";
import RatingBox from "./RatingBox";
import CommentBox from "./CommentBox";
import { CommonButton } from "../common/Button";
import SearchResponse from "@/types/response";

type MbtiType<T> = Map<string, T> | undefined;
type Props = {
    res: SearchResponse;
};

const RatingForm = (
    { res }: Props,
    ref: React.ForwardedRef<HTMLFormElement>,
) => {
    const { data } = res;
    const [current, setCurrent] = useState<string>(`mbti_e_i`);
    const inputRefs = useRef<Array<any>>([]);
    // const formRef = useRef<HTMLFormElement | null>(null);
    const [likes, setLikes] = useState<MbtiType<boolean>>(undefined);
    const [comments, setComments] = useState<MbtiType<string>>(undefined);
    const mbtiArray = ["mbti_e_i", "mbti_n_s", "mbti_t_f", "mbti_p_j"];

    const likeHandler = (key: string, value: boolean) => {
        setLikes((prev) => new Map(prev).set(key, value));
    };

    const prevHandler = () => {
        setCurrent((prev) => mbtiArray[mbtiArray.indexOf(prev) - 1]);
    };

    const nextHandler = () => {
        setCurrent((prev) => mbtiArray[mbtiArray.indexOf(prev) + 1]);
    };

    const submitHandler = () => {
        console.log(data);
    };

    return (
        <Container onSubmit={(e: any) => e.preventDefault()} ref={ref}>
            <MbtiContainer>
                <RatingContainer>
                    <MbtiInput
                        id={`mbti_e_i`}
                        value={data.ei || undefined}
                        onClick={(e: any) => setCurrent(e.target.id)}
                        ref={(e) => e && (inputRefs.current[0] = e)}
                        selected={
                            inputRefs.current[0] &&
                            inputRefs.current[0].id === current
                        }
                    />
                    {current === `mbti_e_i` && (
                        <RatingBox
                            onLike={() => likeHandler(current, true)}
                            onDislike={() => likeHandler(current, false)}
                            like={likes?.get(`mbti_e_i`)}
                        />
                    )}
                </RatingContainer>
                <RatingContainer>
                    <MbtiInput
                        id={`mbti_n_s`}
                        value={data.ns || undefined}
                        onClick={(e: any) => setCurrent(e.target.id)}
                        ref={(e) => e && (inputRefs.current[1] = e)}
                        selected={
                            inputRefs.current[1] &&
                            inputRefs.current[1].id === current
                        }
                    />
                    {current === `mbti_n_s` && (
                        <RatingBox
                            onLike={() => likeHandler(current, true)}
                            onDislike={() => likeHandler(current, false)}
                            like={likes?.get("mbti_n_s")}
                        />
                    )}
                </RatingContainer>
                <RatingContainer>
                    <MbtiInput
                        id={`mbti_t_f`}
                        value={data.tf || undefined}
                        onClick={(e: any) => setCurrent(e.target.id)}
                        ref={(e) => e && (inputRefs.current[2] = e)}
                        selected={
                            inputRefs.current[2] &&
                            inputRefs.current[2].id === current
                        }
                    />
                    {current === `mbti_t_f` && (
                        <RatingBox
                            onLike={() => likeHandler(current, true)}
                            onDislike={() => likeHandler(current, false)}
                            like={likes?.get("mbti_t_f")}
                        />
                    )}
                </RatingContainer>
                <RatingContainer>
                    <MbtiInput
                        id={`mbti_p_j`}
                        value={data.pj || undefined}
                        onClick={(e: any) => setCurrent(e.target.id)}
                        ref={(e) => e && (inputRefs.current[3] = e)}
                        selected={
                            inputRefs.current[3] &&
                            inputRefs.current[3].id === current
                        }
                    />
                    {current === `mbti_p_j` && (
                        <RatingBox
                            onLike={() => likeHandler(current, true)}
                            onDislike={() => likeHandler(current, false)}
                            like={likes?.get("mbti_p_j")}
                        />
                    )}
                </RatingContainer>
            </MbtiContainer>
            <CommentContainer>
                <CommentBox
                    onChange={(e: any) =>
                        setComments((prev) =>
                            new Map(prev).set(current, e.target.value),
                        )
                    }
                    value={comments?.get(current) || ""}
                    id={"test"}
                ></CommentBox>
            </CommentContainer>
            <ButtonContainer>
                <ButtonDivider>
                    {current !== "mbti_e_i" && (
                        <CommonButton
                            onClick={prevHandler}
                            content={`이전`}
                            disabled={false}
                        />
                    )}
                </ButtonDivider>
                <ButtonDivider>
                    {current !== "mbti_p_j" ? (
                        <CommonButton
                            onClick={nextHandler}
                            content={`다음`}
                            disabled={likes?.get(current) === undefined}
                        />
                    ) : (
                        <CommonButton
                            onClick={submitHandler}
                            content={`제출`}
                            disabled={Array.from(likes || []).length !== 4}
                        />
                    )}
                </ButtonDivider>
            </ButtonContainer>
        </Container>
    );
};

const Container = styled.form`
    width: 100%;
    height: auto;
`;

const MbtiContainer = styled.div`
    ${flexBox("row", "center", "center")}
    gap: 12px;
    width: 100%;
    height: auto;
`;

const RatingContainer = styled.div`
    ${flexBox("column", "center", "flex-start")}
    width: 80px;
    height: 150px;
`;

const CommentContainer = styled.div`
    ${flexBox("row", "center", "center")}
    width: 100%;
    height: auto;
`;

const ButtonContainer = styled.div`
    ${flexBox("row", "center", "flex-end")}
    width: 100%;
    height: 90px;
    padding: 0 40px;
    padding-top: 40px;
`;

const ButtonDivider = styled.div`
    ${flexBox("row", "center", "center")}
    width: 100%;
    height: auto;
`;

export default forwardRef(RatingForm);
