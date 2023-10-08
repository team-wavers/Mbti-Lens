import styled from "styled-components";
import KakaoLogin from "@/assets/images/kakaologin.png";
import Image from "next/image";
import flexBox from "@/styles/utils/flexbox";
import ServiceLogo from "@/assets/images/logo.png";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useCookie from "@/hooks/useCookie";
import searchMbti from "@/apis/create/searchMbti";

const Index = () => {
    const router = useRouter();
    const { cookie } = useCookie();
    const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const [isClient, setIsClient] = useState<boolean>(false);

    const loginHandler = () => {
        router.push(`${endpoint}/auth/oauth/kakao`);
    };

    const buttonHandler = () => {
        if (cookie) router.push(`/result/${cookie.userid}`);
    };
    useEffect(() => {
        if (cookie) {
            searchMbti({ userId: Number(cookie.userid) }).then((res) => {
                if (res.data.statusCode === 400 && res.data.data === null) {
                    router.push(`/create`);
                } else {
                    router.push(`/result/${cookie.userid}`);
                }
            });
        } else {
            setIsClient(true);
        }
    }, []);

    return (
        isClient && (
            <Container>
                <Information>
                    <LogoContainer>
                        <Image
                            src={ServiceLogo}
                            alt="남이보는 내  MBTI는? MBTI LENS"
                            layout="responsive"
                        />
                    </LogoContainer>
                    {!cookie && (
                        <LoginWithKakao onClick={() => loginHandler()}>
                            <Image
                                src={KakaoLogin}
                                alt="Login With KaKao"
                                layout="responsive"
                            />
                        </LoginWithKakao>
                    )}
                    {cookie && (
                        <ButtonContainer>
                            <GotoResult onClick={buttonHandler} />
                        </ButtonContainer>
                    )}
                </Information>
            </Container>
        )
    );
};

const Container = styled.div`
    ${flexBox("row", "center", "center")}
    width: 100%;
    height: 100vh;
`;

const Information = styled.div`
    width: 100%;
    height: auto;
`;

const LogoContainer = styled.div`
    width: 100%;
    height: auto;
    padding: 20px;
    padding-top: 0;
    margin-bottom: 30px;
`;

const LoginWithKakao = styled.button`
    display: flex;
    width: 100%;
    height: auto;
    outline: none;
    border: none;
    padding: 0 10%;
    background: transparent;
    cursor: pointer;
    filter: drop-shadow(0 3px 2px rgba(0, 0, 0, 0.1));
`;

const ButtonContainer = styled.div`
    ${flexBox("row", "center", "center")}
    width: 100%;
    height: auto;
`;

const GotoResult = styled.button`
    width: 300px;
    height: 50px;
    outline: none;
    border: none;
    border-radius: 30px;
    background: #c69c9c;
    box-shadow: 0px 3px 0px 0px #a06868;
    font-family: "HSYuji", sans-serif;
    &:before {
        ${flexBox("row", "center", "center")}
        position: relative;
        top: 0px;
        left: -3px;
        content: "내 MBTI 결과 보러가기";
        width: 294px;
        height: 44px;
        border-radius: 24px;
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='white' stroke-width='3' stroke-dasharray='3%2c 7' stroke-dashoffset='42' stroke-linecap='square'/%3e%3c/svg%3e");
        font-size: ${({ theme }) => theme.typography.m};
        color: ${({ theme }) => theme.colors.white};
    }
    &[disabled] {
        border-radius: 30px;
        background: #eae5e0;
        box-shadow: 0px 2px 0px 0px #c9c4c0;
        &:before {
            color: ${({ theme }) => theme.colors.disabled_1};
            border-radius: 24px;
            background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23CDC5BD' stroke-width='2' stroke-dasharray='3%2c 7' stroke-dashoffset='42' stroke-linecap='square'/%3e%3c/svg%3e");
        }
    }
`;

export default Index;
