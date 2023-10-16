import React, { useState } from "react";
import styled from "styled-components";
import MenuOpenIcon from "../../assets/icons/menu-open.svg";
import Drawer from "./Drawer";
import Footer from "./Footer";

type Props = {
    children: React.ReactNode;
};

const CommonLayout = ({ children }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
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
        </Container>
    );
};

const Container = styled.div`
    position: relative;
    width: min(480px, 100%);
    min-height: 100vh;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.typography.l};
`;

const Main = styled.main`
    width: 100%;
    height: auto;
    background-color: ${({ theme }) => theme.colors.bg};
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
