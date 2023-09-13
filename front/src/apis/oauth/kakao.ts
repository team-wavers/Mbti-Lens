import { instance } from "../base";

const getAccessToken = async () => {
    return await instance().get("/oauth/kakao/", { params: { clientId } });
};

export default getAccessToken;
