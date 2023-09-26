import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import mbtiAtom from "@/recoil/mbti";
import flexBox from "@/styles/utils/flexbox";
import MbtiButton from "@/components/result/MbtiButton";
import { CommonButton } from "@/components/common/Button";
import RatingForm from "@/components/rating/RatingForm";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import useCookie from "@/hooks/useCookie";
import { getResponse } from "@/apis/getResponse";
import { MbtiSearchResponse } from "@/types/response";
import useModal from "@/hooks/useModal";
import Modal from "@/components/common/Modal/Modal";
import CommentType from "@/types/comment";
import { postComment } from "@/apis/postData";
import axios from "axios";

export const getStaticPaths = async () => {
    const { cookie } = useCookie();
    const userid = cookie.userid.toString();
    const paths = [{ params: { id: userid } }];
    return { paths, fallback: true };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { cookie } = useCookie();
    const userId = cookie.userid;
    const mbtiResponse = await getResponse(userId)
        .then((res) => res.data)
        .catch((error) => console.log(error));
    return {
        props: { mbtiResponse },
        revalidate: 1,
    };
};

const id = ({
    mbtiResponse,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    //다른 사람의 링크를 타고 들어갔을 때, 그 사람의 id값과 쿠키의 id값이 다르면 rating페이지로 유도.
    const router = useRouter();
    const { id } = router.query;
    const { cookie } = useCookie();
    console.log(cookie.userid);
    //mbti정보 조회
    const mbtiData: MbtiSearchResponse = mbtiResponse;
    const mbtiLetter = [mbtiData.ei, mbtiData.ns, mbtiData.tf, mbtiData.pj];
    const mbtiLetterUpuerCase = mbtiLetter.map((e) => e.toUpperCase());

    const [request, setRequset] = useState<CommentType[]>();
    const [mbtiState, setMbtiState] = useState<number>(0);
    const formRef = useRef<HTMLFormElement>(null);
    const { visible, setVisible } = useModal();
    //이전,다음 버튼 핸들링
    const buttonHandler = (prop: boolean) => {
        if (typeof mbtiState === "number" && prop == false) {
            mbtiState !== 0 && setMbtiState(mbtiState - 1);
        }
        if (typeof mbtiState === "number" && prop == true) {
            mbtiState !== 3 && setMbtiState(mbtiState + 1);
        }
    };
    //post
    const confirmEvent = async () => {
        setVisible((prev) => !prev);
        if (request) {
            return await axios
                .all([
                    postComment(id, mbtiLetter[0], request[0]),
                    postComment(id, mbtiLetter[1], request[1]),
                    postComment(id, mbtiLetter[2], request[2]),
                    postComment(id, mbtiLetter[3], request[3]),
                ])
                .then(
                    axios.spread((ei, ns, tf, pj) =>
                        console.log(ei, ns, tf, pj),
                    ),
                );
        }
    };
    return (
        <Container>
            <Title>
                김철수 님의
                <br /> MBTI 평가하기
            </Title>
            <MbtiButton
                mbtiLetter={mbtiLetterUpuerCase}
                setState={setMbtiState}
                state={mbtiState}
            />
            <RatingForm
                mbti={mbtiState}
                onSubmit={(e: React.SyntheticEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    setVisible((prev) => !prev);
                }}
                setRequest={setRequset}
                ref={formRef}
            />
            {mbtiState === 3 ? null : (
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
            )}
            {visible && (
                <Modal
                    title={"잠깐! ✋"}
                    type={"confirm"}
                    onConfirm={confirmEvent}
                    onCancel={() => setVisible((prev) => !prev)}
                >
                    한 번 작성한 평가는 수정이 불가능합니다.
                    <br />
                    작성하시겠습니까?
                </Modal>
            )}
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
