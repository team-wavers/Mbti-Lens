import { instance } from "../base";

const getAccessToken = async () => {
    return await instance().get("/oauth/kakao/");
};

export default getAccessToken;
