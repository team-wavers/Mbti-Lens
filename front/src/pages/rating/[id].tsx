import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import RatingForm from "@/components/rating/RatingForm";
import mbtiAtom from "@/recoil/mbti";
import flexBox from "@/styles/utils/flexbox";
import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    GetStaticProps,
} from "next";
import searchMbti from "@/apis/create/searchMbti";

type Props = {
    res: any;
};

const id = ({ res }: Props) => {
    const router = useRouter();
    const { id } = router.query; // id 통해 data fetching 후 ratingform으로 data 전달

    useEffect(() => {
        console.log(res);
    }, [res]);

    return (
        <Container>
            <Title>
                김철수 님의
                <br /> MBTI 평가하기
            </Title>
            <RatingForm res={res} />
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    const req = await searchMbti({
        userId: Number((context.params && context?.params.id) || 0),
    })
        .then((res) => {
            return res.data;
        })
        .catch((e) => console.log(e));
    return { props: { res: req } };
};

const Container = styled.div`
    ${flexBox("column", "center", "center")}
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
