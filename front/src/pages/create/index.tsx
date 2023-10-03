import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import flexBox from "@/styles/utils/flexbox";
import { MbtiForm } from "@/components/create";
import Modal from "@/components/common/Modal/Modal";
import useModal from "@/hooks/useModal";
import useCookie from "@/hooks/useCookie";
import addMbti from "@/apis/create/addMbti";
import { GetServerSideProps } from "next";
import searchMbti from "@/apis/create/searchMbti";
import { SearchResponse } from "@/types/response";

type Props = {
    res: SearchResponse;
};

const CreateMBTI = ({ res }: Props) => {
    const router = useRouter();
    const { cookie } = useCookie();

    const { visible, setVisible } = useModal();
    const formRef = useRef<HTMLFormElement>(null);
    const [mounted, setMounted] = useState<boolean>(false);
    console.log(res);

    useEffect(() => {
        if (typeof window !== "undefined" && !cookie) {
            router.push("/");
            return;
        } else if (
            typeof window !== "undefined" &&
            res.statusCode === 200 &&
            cookie
        ) {
            router.push(`/result/${cookie.userid}`);
            return;
        }
        setMounted(true);
    }, []);

    const confirmEvent = async () => {
        if (formRef.current && cookie) {
            const { mbti_e_i, mbti_n_s, mbti_t_f, mbti_p_j } = formRef.current;
            const res = await addMbti({
                userId: cookie.userid,
                ei: mbti_e_i.value,
                ns: mbti_n_s.value,
                tf: mbti_t_f.value,
                pj: mbti_p_j.value,
            }).then((e) => {
                if (e.data.statusCode !== 201) {
                    alert("유효하지 않은 Request 입니다.");
                    return;
                }
                router.push(`/result/${cookie.userid}`);
            });
        }
    };

    return (
        mounted && (
            <Container>
                <Title>MBTI를 입력해 주세요!</Title>
                <MbtiForm
                    onSubmit={(e: React.SyntheticEvent) => {
                        e.preventDefault();
                        setVisible((prev) => !prev);
                    }}
                    ref={formRef}
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
                        MBTI 정보를{" "}
                        {`${formRef.current && formRef.current.mbti_e_i.value}`}
                        {`${formRef.current && formRef.current.mbti_n_s.value}`}
                        {`${formRef.current && formRef.current.mbti_t_f.value}`}
                        {`${formRef.current && formRef.current.mbti_p_j.value}`}
                        으로 설정하시겠습니까?
                    </Modal>
                )}
            </Container>
        )
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const { cookie } = useCookie();
    const req = await searchMbti({
        userId: Number((cookie && cookie.userid) || -1),
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
    text-align: center;
    margin-bottom: 30px;
`;

export default CreateMBTI;
