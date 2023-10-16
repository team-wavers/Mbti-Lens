import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import flexBox from "@/styles/utils/flexbox";
import Link from "next/link";
import MenuCloseIcon from "../../assets/icons/menu-close.svg";

const menuItemList: Array<{ name: string; link: string }> = [
    { name: "홈", link: "/" },
    { name: "소개", link: "/about" },
    { name: "자주 묻는 질문", link: "/faq" },
    { name: "개발자들", link: "/makers" },
];

type Props = {
    isOpen: boolean;
    closeEvent: () => void;
};

const Drawer = ({ isOpen, closeEvent }: Props) => {
    const bgRef = useRef<HTMLDivElement>(null);
    const drawerRef = useRef<HTMLDivElement>(null);

    const bgClickHandler: EventListener = (e) => {
        if (e.target === drawerRef.current) return;
        closeEvent();
    };

    useEffect(() => {
        bgRef && bgRef.current?.addEventListener("click", bgClickHandler);
        return () => {
            bgRef.current?.removeEventListener("click", bgClickHandler);
        };
    });

    if (!isOpen) return <></>;
    return (
        <BackgroundOverlay ref={bgRef}>
            <CloseButton onClick={() => closeEvent()}>
                <MenuCloseIcon width={28} />
            </CloseButton>
            <Container ref={drawerRef}>
                <MenuItemContainer>
                    {menuItemList.map((item) => (
                        <Link
                            style={{ width: "100%" }}
                            href={item.link}
                            key={item.name}
                        >
                            <MenuItem>{item.name}</MenuItem>
                        </Link>
                    ))}
                </MenuItemContainer>
            </Container>
        </BackgroundOverlay>
    );
};

const BackgroundOverlay = styled.div`
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
    z-index: 999;
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

const CloseButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border: none;
    background-color: transparent;
    outline: none;
    z-index: 9999;
`;

export default Drawer;
