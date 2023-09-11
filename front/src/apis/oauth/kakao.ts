import { instance } from "../base";

const clientId = process.env.NEXT_PUBLIC_KAKAO_OAUTH_CLIENT_ID;

const getAccessToken = async () => {
    return await instance().get("/auth/oauth/kakao");
};

export default getAccessToken;
