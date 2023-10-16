import React from "react";
import styled from "styled-components";
import HashLoader from "react-spinners/HashLoader";
import flexBox from "@/styles/utils/flexbox";

type SpinnerType = { type: "default" | "full" };

const Spinner = ({ type }: SpinnerType) => {
    return (
        <Container type={type}>
            <HashLoader color="#A06868" />
            <Information>데이터를 불러오고 있습니다...</Information>
        </Container>
    );
};

const Container = styled.div<SpinnerType>`
    ${flexBox("column", "center", "center")}
    width: 100%;
    ${({ type }) => type === "default" && `height: auto;`}
    ${({ type }) => type === "full" && `height: 100vh;`}
    gap: 30px;
    padding: 30px 0;
`;

const Information = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    font-family: "HSYuji", sans-serif;
    font-size: ${({ theme }) => theme.typography.l};
`;

export default Spinner;
