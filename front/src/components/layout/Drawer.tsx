import React from "react";
import styled from "styled-components";
import flexBox from "@/styles/utils/flexbox";
import Link from "next/link";

const menuItemList: Array<{ name: string; link: string }> = [
    { name: "홈", link: "/" },
    { name: "소개", link: "/about" },
    { name: "자주 묻는 질문", link: "/faq" },
    { name: "개발자들", link: "/makers" },
];

const Drawer = () => {
    return (
        <Background>
            <Container>
                <MenuItemContainer>
                    {menuItemList.map((item) => (
                        <Link href={item.link} key={item.name}>
                            <MenuItem>{item.name}</MenuItem>
                        </Link>
                    ))}
                </MenuItemContainer>
            </Container>
        </Background>
    );
};

const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 999;
`;

const Container = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    height: 100vh;
    padding-top: 25%;
    background-color: white;
    box-shadow: -3px 0px 12px 2px rgba(0, 0, 0, 0.05);
`;

const MenuItemContainer = styled.div`
    ${flexBox("column", "flex-start", "flex-start")}
    gap: 10px;
    width: 100%;
    height: auto;
    padding: 0 20px;
`;

const MenuItem = styled.div`
    width: 100%;
    height: 40px;
    font-size: ${({ theme }) => theme.typography.l};
    font-weight: 400;
`;

export default Drawer;
