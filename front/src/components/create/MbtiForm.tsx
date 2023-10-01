import React, { useRef, forwardRef } from "react";
import { styled } from "styled-components";
import { CommonButton } from "../common/Button";
import flexBox from "@/styles/utils/flexbox";
import MbtiInput from "./MbtiInput";
import { useRecoilState } from "recoil";
import mbtiAtom from "@/recoil/mbti";
import MbtiType from "@/types/mbti";

type Props = {
    onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
    setmbti: React.Dispatch<React.SetStateAction<MbtiType>>;
};

const MbtiForm = (props: Props, ref: React.ForwardedRef<HTMLFormElement>) => {
    const inputRefs = useRef<Array<any>>([]);
    const [mbti, setMbti] = useRecoilState(mbtiAtom);
    const disabled = Object.values(mbti).includes(null) ? true : false;

    const keyPressHandler = (
        e: React.KeyboardEvent<HTMLInputElement>,
        stringArray: Array<string>,
    ) => {
        e.preventDefault();
        if (stringArray.includes(e.key.toUpperCase())) {
            const targetInput = inputRefs.current.find(
                (ref) => ref === e.target,
            );
            targetInput.value = e.key.toUpperCase();
            setMbti({ ...mbti, [targetInput.id]: e.key.toLowerCase() });
        }
    };

    const nextHandler = () => {
        return;
    };

    return (
        <Container>
            <FormContainer method="post" onSubmit={props.onSubmit} ref={ref}>
                <InputContainer>
                    <MbtiInput
                        id={`ei`}
                        onKeyPress={(e) => keyPressHandler(e, ["E", "I"])}
                        ref={(e) => e && (inputRefs.current[0] = e)}
                    />
                    <MbtiInput
                        id={`ns`}
                        onKeyPress={(e) => keyPressHandler(e, ["N", "S"])}
                        ref={(e) => e && (inputRefs.current[1] = e)}
                    />
                    <MbtiInput
                        id={`tf`}
                        onKeyPress={(e) => keyPressHandler(e, ["T", "F"])}
                        ref={(e) => e && (inputRefs.current[2] = e)}
                    />
                    <MbtiInput
                        id={`pj`}
                        onKeyPress={(e) => keyPressHandler(e, ["P", "J"])}
                        ref={(e) => e && (inputRefs.current[3] = e)}
                    />
                </InputContainer>
                <CommonButton
                    onClick={nextHandler}
                    content={"다음"}
                    disabled={disabled}
                />
            </FormContainer>
        </Container>
    );
};

const Container = styled.div`
    ${flexBox("column", "center", "center ")}
    width: 100%;
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
