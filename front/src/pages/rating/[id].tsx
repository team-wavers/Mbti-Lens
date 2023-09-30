import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import mbtiAtom from "@/recoil/mbti";
import flexBox from "@/styles/utils/flexbox";
import MbtiButton from "@/components/result/MbtiButton";
import { CommonButton } from "@/components/common/Button";
import RatingForm from "@/components/rating/RatingForm";

const id = () => {
    //다른 사람의 링크를 타고 들어갔을 때, 그 사람의 id값과 쿠키의 id값이 다르면 rating페이지로 유도.

    const router = useRouter();
    const { id } = router.query;
    //const { data, error, isLoading } = useGetMbti(userid);
    //console.log(data, error, isLoading);
    const mbti = useRecoilValue(mbtiAtom);

    const mbtiLetter = ["E", "N", "F", "P"];
    const [mbtiState, setMbtiState] = useState<number>(0);
    const formRef = useRef<HTMLFormElement>(null);

    const buttonHandler = (prop: boolean) => {
        if (typeof mbtiState === "number" && prop == false) {
            mbtiState !== 0 && setMbtiState(mbtiState - 1);
        }
        if (typeof mbtiState === "number" && prop == true) {
            mbtiState !== 3 && setMbtiState(mbtiState + 1);
        }
    };

    return (
        <Container>
            <Title>
                김철수 님의
                <br /> MBTI 평가하기
            </Title>
            <MbtiButton
                mbtiLetter={mbtiLetter}
                setState={setMbtiState}
                state={mbtiState}
            />
            <RatingForm mbti={mbtiState} ref={formRef} />
            <ButtonContainer>
                <CommonButton
                    content={"이전"}
                    disabled={false}
                    onClick={() => buttonHandler(false)}
                />
                <CommonButton
                    content={"다음"}
                    disabled={false}
                    onClick={() => buttonHandler(true)}
                />
            </ButtonContainer>
        </Container>
    );
};

const Container = styled.div`
    ${flexBox("column", "center", "center;")}
    width: 100%;
    height: 100vh;
    background: #f0e4d8;
`;

const Title = styled.h1`
    color: ${({ theme }) => theme.colors.primary_4};
    font-size: ${({ theme }) => theme.typography.xl};
    font-family: "HSYuji", sans-serif;
    font-weight: 500;
    line-height: ${({ theme }) => theme.typography.x2l};
    text-align: center;
`;
const ButtonContainer = styled.div`
    ${flexBox("row", "center", "center")}
    width: 100%;
`;

export default id;
