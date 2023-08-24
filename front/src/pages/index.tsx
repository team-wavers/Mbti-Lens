import styled from "styled-components";
import KakaoLogin from "@/assets/images/kakaologin.png";
import Image from "next/image";
import flexBox from "@/styles/utils/flexbox";
import { useRouter } from "next/router";

const Index = () => {
    const router = useRouter();
    const clientId = process.env.NEXT_PUBLIC_KAKAO_LOGIN_CLIENT_ID;
    const loginHandler = () => {
        console.log("test");
        console.log(process.env.NEXT_PUBLIC_KAKAO_OAUTH_CLIENT_ID);
        router.push(
            `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}`,
        );
    };
    return (
        <Container>
            <Information>
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
    height: 300px;
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
    filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.1));
`;

export default Index;
