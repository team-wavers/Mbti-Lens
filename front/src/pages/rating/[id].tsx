import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import RatingForm from "@/components/rating/RatingForm";
import mbtiAtom from "@/recoil/mbti";
import flexBox from "@/styles/utils/flexbox";

const id = () => {
    const router = useRouter();
    const { id } = router.query; // id 통해 data fetching 후 ratingform으로 data 전달
    const mbti = useRecoilValue(mbtiAtom);

    return (
        <Container>
            <Title>
                김철수 님의
                <br /> MBTI 평가하기
            </Title>
            <RatingForm />
        </Container>
    );
};

const Container = styled.div`
    ${flexBox("column", "center", "center;")}
    width: 100%;
    height: 100vh;
`;

const Title = styled.h1`
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.typography.xl};
    font-weight: 500;
    line-height: ${({ theme }) => theme.typography.x2l};
    text-align: center;
    margin-bottom: 30px;
`;

export default id;
