import React, { useEffect, useRef, useState, forwardRef } from "react";
import { styled } from "styled-components";
import { NextButton } from "../common/Button";
import flexBox from "@/styles/utils/flexbox";
import MbtiType from "@/types/mbti";
import MbtiInput from "./MbtiInput";

type Props = {
    onSubmit: (e: React.SyntheticEvent) => void;
};

const MbtiForm = (props: Props, ref: React.ForwardedRef<HTMLFormElement>) => {
    const inputRefs = useRef<Array<any>>([]);
    const [mbtiData, setMbtiData] = useState<MbtiType>({
        mbti_e_i: null,
        mbti_n_s: null,
        mbti_t_f: null,
        mbti_p_j: null,
    });
    const disabled = Object.values(mbtiData).includes(null) ? true : false;

    const keyPressHandler = (
        e: React.KeyboardEvent<HTMLInputElement>,
        stringArray: Array<string>,
    ) => {
        // console.log(e);
        e.preventDefault();
        if (stringArray.includes(e.key.toUpperCase())) {
            const targetInput = inputRefs.current.find(
                (ref) => ref === e.target,
            );
            targetInput.value = e.key.toUpperCase();
            setMbtiData({ ...mbtiData, [targetInput.id]: e.key.toUpperCase() });
        }
    };

    return (
        <Container>
            <FormContainer method="post" {...props} ref={ref}>
                <InputContainer>
                    <MbtiInput
                        id={`mbti_e_i`}
                        onKeyPress={(e) => keyPressHandler(e, ["E", "I"])}
                        ref={(e) => e && (inputRefs.current[0] = e)}
                    />
                    <MbtiInput
                        id={`mbti_n_s`}
                        onKeyPress={(e) => keyPressHandler(e, ["N", "S"])}
                        ref={(e) => e && (inputRefs.current[1] = e)}
                    />
                    <MbtiInput
                        id={`mbti_t_f`}
                        onKeyPress={(e) => keyPressHandler(e, ["T", "F"])}
                        ref={(e) => e && (inputRefs.current[2] = e)}
                    />
                    <MbtiInput
                        id={`mbti_p_j`}
                        onKeyPress={(e) => keyPressHandler(e, ["P", "J"])}
                        ref={(e) => e && (inputRefs.current[3] = e)}
                    />
                </InputContainer>
                <NextButton disabled={disabled} text="다음" />
            </FormContainer>
        </Container>
    );
};

const Container = styled.div`
    ${flexBox("column", "center", "center ")}
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};
`;

const FormContainer = styled.form`
    ${flexBox("column", "center", "center")}
    width: 100%;
    height: auto;
`;

const InputContainer = styled.div`
    ${flexBox("row", "center", "center")}
    gap: 10px;
    margin-bottom: 50px;
`;

export default forwardRef(MbtiForm);
