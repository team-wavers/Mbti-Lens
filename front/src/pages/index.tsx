import styled from "styled-components";
import KakaoLogin from "@/assets/images/kakaologin.png";
import Image from "next/image";
import flexBox from "@/styles/utils/flexbox";
import ServiceLogo from "@/assets/images/logo.png";
import { useRouter } from "next/router";

const Index = () => {
    const router = useRouter();
    const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

    const loginHandler = () => {
        router.push(`${endpoint}/auth/oauth/kakao`);
    };

    return (
        <Container>
            <Information>
                <LogoContainer>
                    <Image
                        src={ServiceLogo}
                        alt="남이보는 내  MBTI는? MBTI LENS"
                        layout="responsive"
                    />
                </LogoContainer>
                <LoginWithKakao onClick={() => loginHandler()}>
                    <Image
                        src={KakaoLogin}
                        alt="Login With KaKao"
                        layout="responsive"
                    />
                </LoginWithKakao>
            </Information>
        </Container>
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

export default Index;
