import { CommonButton } from "@/components/common/Button";
import flexBox from "@/styles/utils/flexbox";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const FinishPage = () => {
    const router = useRouter();
    const clickHandler = () => {
        router.push("/");
    };
    return (
        <Container>
            <Title>평가가 완료되었습니다!</Title>
            <CommonButton disabled={false} onClick={clickHandler}>
                나도해보기
            </CommonButton>
        </Container>
    );
};

const Container = styled.div`
    ${flexBox("column", "center", "center")}
    width: 100%;
    height: 100vh;
    gap: 50px;
`;

const Title = styled.h1`
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.typography.xl};
    font-weight: 500;
    line-height: ${({ theme }) => theme.typography.x2l};
    text-align: center;
`;

export default FinishPage;
