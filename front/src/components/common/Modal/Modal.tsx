import React from "react";
import { styled } from "styled-components";
import { ModalButton } from "../Button";
import flexBox from "@/styles/utils/flexbox";

type Props = {
    title: string;
    children: React.ReactNode;
    type: "ok" | "confirm";
    onCancel?: () => void;
    onConfirm: () => void;
};

const Modal = ({ title, children, type, onCancel, onConfirm }: Props) => {
    return (
        <BackgroundOverlay>
            <ModalContainer>
                <Title>{title}</Title>
                <ContentContainer>{children}</ContentContainer>
                <ButtonContainer>
                    {type === "ok" ? (
                        <ModalButton type={`ok`} onClick={onConfirm}>
                            확인
                        </ModalButton>
                    ) : (
                        <>
                            <ModalButton type={`ok`} onClick={onConfirm}>
                                확인
                            </ModalButton>
                            <ModalButton type={`cancel`} onClick={onCancel}>
                                취소
                            </ModalButton>
                        </>
                    )}
                </ButtonContainer>
            </ModalContainer>
        </BackgroundOverlay>
    );
};

const BackgroundOverlay = styled.div`
    ${flexBox("row", "center", "center")}
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 999;
`;

const ModalContainer = styled.div`
    width: 75%;
    min-height: 200px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 3px 7px 5px rgba(0, 0, 0, 0.05);
    padding: 10px 0;
`;

const Title = styled.h3`
    width: 100%;
    height: auto;
    padding: 20px 10px;
    padding-top: 10px;
    font-size: ${({ theme }) => theme.typography.xl};
    font-weight: 700;
    text-align: center;
    word-break: break-all;
`;

const ContentContainer = styled.div`
    width: 100%;
    min-height: 75px;
    font-size: ${({ theme }) => theme.typography.m};
    padding: 10px 20px;
    padding-top: 0;
    line-height: ${({ theme }) => theme.typography.xl};
`;

const ButtonContainer = styled.div`
    position: relative;
    ${flexBox("row", "center", "center")};
    width: 100%;
    height: auto;
    padding: 0 10px;
    gap: 5px;
`;

export default Modal;
