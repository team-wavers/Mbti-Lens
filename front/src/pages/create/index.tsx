import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import flexBox from "@/styles/utils/flexbox";
import { MbtiForm } from "@/components/create";
import Modal from "@/components/common/Modal/Modal";
import useModal from "@/hooks/useModal";
import { useRecoilState } from "recoil";
import mbtiAtom from "@/recoil/mbti";
import useCookie from "@/hooks/useCookie";
import { postMbti } from "@/apis/postData";
import theme from "@/styles/theme";
import { cookies } from "next/dist/client/components/headers";
import { getResponse } from "@/apis/getResponse";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps = async () => {
    const { cookie } = useCookie();
    const userId = cookie.userid;
    const mbtiResponse = await getResponse(userId)
        .then((res) => res.data)
        .catch((error) => console.log(error));
    return {
        props: { mbtiResponse, userId },
        revalidate: 1,
    };
};
const id = ({
    mbtiResponse,
    userId,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    // useEffect(() => {
    //     if (mbtiResponse) {
    //         router.push(`/result/${userId}`);
    //     }
    // }, [userId]);
    console.log(userId);
    const { cookie } = useCookie();
    console.log(cookie.userid);
    const [mbti, setMbti] = useRecoilState(mbtiAtom);
    const { visible, setVisible } = useModal();
    const formRef = useRef<HTMLFormElement>(null);

    const confirmEvent = () => {
        setVisible((prev) => !prev);
        postMbti(userId, mbti)
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
    };

    return (
        <Container>
            <Title>MBTI를 입력해 주세요!</Title>
            <MbtiForm
                onSubmit={(e: React.SyntheticEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    setVisible((prev) => !prev);
                    console.log(mbti);
                }}
                ref={formRef}
                setmbti={setMbti}
            />
            {visible && (
                <Modal
                    title={"잠깐! ✋"}
                    type={"confirm"}
                    onConfirm={confirmEvent}
                    onCancel={() => setVisible((prev) => !prev)}
                >
                    한 번 작성한 본인의 MBTI는 수정이 불가능합니다.
                    <br />
                    MBTI 정보를 0000으로 설정하시겠습니까?
                </Modal>
            )}
        </Container>
    );
};

const Container = styled.div`
    ${flexBox("column", "center", "center;")}
    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.background};
    font-size: ${({ theme }) => theme.typography.xl};
    line-height: ${({ theme }) => theme.typography.x2l};
    font-family: "HSYuji", sans-serif;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary_4};
`;

const Title = styled.h1`
    font-size: ${({ theme }) => theme.typography.xl};
    font-weight: 500;
    text-align: center;
    margin-bottom: 30px;
`;

export default id;
