import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import flexBox from "@/styles/utils/flexbox";
import { MbtiForm } from "@/components/create";
import Modal from "@/components/common/Modal/Modal";
import useModal from "@/hooks/useModal";
import useCookie from "@/hooks/useCookie";
import addMbti from "@/apis/create/addMbti";
import searchMbti from "@/apis/create/searchMbti";
import { CommonButton } from "@/components/common/Button";
import { useRouter } from "next/router";

const CreateMBTI = () => {
    const router = useRouter();
    const { cookie } = useCookie();
    const { visible, setVisible } = useModal();
    const formRef = useRef<HTMLFormElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [mounted, setMounted] = useState<boolean>(false);
    const [created, setCreated] = useState<boolean>(false);
    const [publicKey, setPublicKey] = useState<string>("");
    const fe_endpoint = `${process.env.NEXT_PUBLIC_FRONTEND_ENDPOINT}`;

    useEffect(() => {
        if (cookie) {
            searchMbti({ userId: Number(cookie.userid) }).then((res) => {
                if (res.data.statusCode === 200) {
                    setCreated(true);
                    setPublicKey(localStorage.getItem("public_key") || "null");
                } else {
                    setMounted(true);
                }
            });
        } else {
            router.push("/");
        }
    }, []);

    const confirmEvent = async () => {
        if (formRef.current && cookie) {
            const { mbti_e_i, mbti_n_s, mbti_t_f, mbti_p_j } = formRef.current;
            await addMbti({
                userId: cookie.userid,
                ei: mbti_e_i.value,
                ns: mbti_n_s.value,
                tf: mbti_t_f.value,
                pj: mbti_p_j.value,
            }).then((e) => {
                if (e.data.statusCode !== 201) {
                    alert("유효하지 않은 Request 입니다.");
                    setCreated(true);
                    return;
                }
                setCreated(true);
                setPublicKey(e.data.data);
                localStorage.setItem("public_key", e.data.data);
            });
        }
    };

    const copyHandler = () => {
        if (linkRef.current) {
            linkRef.current.select();
            document.execCommand("copy");
            alert("링크가 복사되었습니다!");
        }
    };

    if (created && cookie)
        return (
            <Container>
                <Title>성공적으로 생성했습니다!</Title>
                <LinkInput
                    value={`${fe_endpoint}/rating/${cookie.userid}?public_key=${publicKey}`}
                    ref={linkRef}
                />
                <ButtonContainer>
                    <CommonButton
                        content={`링크 복사하기`}
                        disabled={false}
                        onClick={copyHandler}
                    />
                    <CommonButton
                        content={`결과 보러가기`}
                        disabled={false}
                        onClick={() => router.push(`/result/${cookie.userid}`)}
                    />
                </ButtonContainer>
            </Container>
        );
    return (
        mounted &&
        !created && (
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

const LinkInput = styled.input`
    width: 300px;
    height: 50px;
    margin-bottom: 20px;
    padding: 0 20px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 20px;
    background-color: ${({ theme }) => theme.colors.primary2};
    outline: none;
    font-size: ${({ theme }) => theme.typography.l};
    color: ${({ theme }) => theme.colors.primary};
    font-family: "HSYuji", sans-serif;
`;

const ButtonContainer = styled.div`
    ${flexBox("column", "center", "center")}
    width: 100%;
    height: auto;
    gap: 20px;
`;

export default CreateMBTI;
