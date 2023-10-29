import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import MenuOpenIcon from "../../assets/icons/menu-open.svg";
import Drawer from "./Drawer";
import Footer from "./Footer";

type Props = {
    children: React.ReactNode;
};

const CommonLayout = ({ children }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        if (isOpen) {
            document.body.style.cssText =
                "overflow: hidden; touch-action: none;";
        } else {
            document.body.style.cssText = "";
        }
    }, [isOpen]);
    return (
        <Container>
            <DrawerButton onClick={() => setIsOpen((prev) => !prev)}>
                <MenuOpenIcon width={28} />
            </DrawerButton>
            <Drawer
                isOpen={isOpen}
                closeEvent={() => setIsOpen((prev) => !prev)}
            />
            <Main>{children}</Main>
            <Footer />
            <BoxContainer>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </BoxContainer>
        </Container>
    );
};

const BoxAnimation = keyframes`
    0% {
        transform: translateY(0) rotate(0deg);
    }
    100% {
        transform: translateY(-1000px) rotate(720deg);
    }
`;

const BoxContainer = styled.section`
    position: fixed;
    background-color: ${({ theme }) => theme.colors.bg};
    left: 0;
    top: 0;
    width: 100%;
    min-height: 100%;
    z-index: 1;
    div {
        position: absolute;
        width: 50px;
        height: 50px;
        animation: ${BoxAnimation} 25s linear infinite;
        bottom: -150px;
        background: ${({ theme }) => theme.colors.primary2};
        opacity: 50%;
        border-radius: 10px;
        &:nth-child(1) {
            width: 40px;
            height: 40px;
            left: 25%;
            animation-delay: 2s;
        }
        &:nth-child(2) {
            width: 70px;
            height: 70px;
            left: 50%;
            animation-delay: 4s;
        }
        &:nth-child(3) {
            width: 30px;
            height: 30px;
            left: 10%;
            animation-duration: 10s;
        }
        &:nth-child(4) {
            width: 80px;
            height: 80px;
            left: 80%;
            animation-delay: 6s;
        }
        &:nth-child(5) {
            width: 50px;
            height: 50px;
            left: 30%;
            animation-duration: 16s;
        }
        &:nth-child(6) {
            width: 20px;
            height: 20px;
            left: 45%;
        }
    }
`;

const Container = styled.div`
    position: relative;
    width: min(480px, 100%);
    min-height: 100vh;
    margin: 0 auto;
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.typography.l};
    background: transparent;
`;

const Main = styled.main`
    position: relative;
    width: 100%;
    height: auto;
    z-index: 2;
`;

const DrawerButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border: none;
    background-color: transparent;
    outline: none;
    z-index: 999;
`;

export default CommonLayout;
