import React from "react";
import styled from "styled-components";

const Footer = () => {
    return (
        <Container>
            © 2023 Team Culfare <br />
            All Rights Reserved.
        </Container>
    );
};

const Container = styled.div`
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
    padding: 40px 0;
    text-align: center;
    color: ${({ theme }) => theme.colors.primary2};
    font-family: "LINE Seed Sans", sans-serif;
    font-size: ${({ theme }) => theme.typography.s};
    line-height: ${({ theme }) => theme.typography.m};
    z-index: 2;
`;

export default Footer;
