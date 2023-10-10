import styled from "styled-components";
import KakaoLogin from "@/assets/images/kakaologin.png";
import Image from "next/image";
import flexBox from "@/styles/utils/flexbox";

const Index = () => {
    const loginHandler = () => {
        console.log("test");
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
`;

export default Index;
