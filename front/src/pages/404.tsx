import { CommonButton } from "@/components/common/Button";
import flexBox from "@/styles/utils/flexbox";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const notFound = () => {
    const router = useRouter();
    return (
        <Container>
            페이지를 찾을 수 없습니다 :(
            <CommonButton disabled={false} onClick={() => router.push("/")}>
                메인화면으로 가기
            </CommonButton>
        </Container>
    );
};

const Container = styled.div`
    ${flexBox("column", "center", "center")}
    width: 100%;
    height: 100vh;
    font-size: ${({ theme }) => theme.typography.l};
    color: ${({ theme }) => theme.colors.primary};
    gap: 20px;
`;

export default notFound;
