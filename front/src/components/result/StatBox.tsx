import React from "react";
import { styled } from "styled-components";

type Props = {
    children: React.ReactNode;
};

const StatBox = ({ children }: Props) => {
    return (
        <Container>
            <div style={{ padding: "20px", height: "100%" }}>{children}</div>
        </Container>
    );
};

const Container = styled.div`
    width: 360px;
    height: 270px;
    padding: 10px;
    border-radius: 24px;
    background: #dfb8b2;
    box-shadow: 0px 3px 0px 0px #a06868;
    margin-top: 50px;
    &:before {
        content: "";
        width: 340px;
        height: 250px;
        position: absolute;
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='white' stroke-width='3' stroke-dasharray='12%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
        border-radius: 10px;
    }
`;

export default StatBox;
