import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import RatingForm from "@/components/rating/RatingForm";
import mbtiAtom from "@/recoil/mbti";
import flexBox from "@/styles/utils/flexbox";
import { getResponse } from "@/apis/getResponse";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import useCookie from "@/hooks/useCookie";
import axios from "axios";

export const getStaticPaths = async () => {
    const { cookie } = useCookie();
    const userid = cookie.userid.toString();
    const paths = [{ params: { id: userid } }];

    return { paths, fallback: "blocking" };
};
export const getStaticProps: GetStaticProps = async () => {
    const { cookie } = useCookie();
    const userId = cookie.userid;

    const mbtiResponse = await getResponse(userId)
        .then((res) => res.data)
        .catch((error) => console.log(error));
    const mbtiData = mbtiResponse;
    const commentResponse = await axios
        .all([
            getResponse(userId, mbtiData.ei),
            getResponse(userId, mbtiData.ns),
            getResponse(userId, mbtiData.tf),
            getResponse(userId, mbtiData.pj),
        ])
        .then(
            axios.spread((ei, ns, tf, pj) => {
                const resArray = ei.data.concat(ns.data, tf.data, pj.data);
                return resArray;
            }),
        )
        .catch((error) => null && console.log(error));
    return {
        props: { mbtiResponse, commentResponse },
        revalidate: 1,
    };
};

const id = ({
    mbtiResponse,
    comment,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    console.log(mbtiResponse, comment);
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
