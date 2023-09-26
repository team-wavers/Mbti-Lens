import React, { useRef } from "react";
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

const id = () => {
    const { cookie } = useCookie();
    const router = useRouter();
    // const { id } = router.query;
    // useEffect(() => {
    //     console.log(id);
    // }, [id]);
    const [mbti, setMbti] = useRecoilState(mbtiAtom);
    const { visible, setVisible } = useModal();
    const formRef = useRef<HTMLFormElement>(null);
    const confirmEvent = () => {
        console.log(mbti);
        setVisible((prev) => !prev);
        postMbti(cookie.userid, mbti)
            .then((res) => console.log(res.data))
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
`;

const Title = styled.h1`
    font-size: ${({ theme }) => theme.typography.xl};
    font-weight: 500;
    text-align: center;
    margin-bottom: 30px;
`;

export default id;
