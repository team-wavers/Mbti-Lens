import { instance } from "./base";
// userId: number, mbti: string
export const getResponse = async (
    userId?: string | string[] | undefined,
    mbti?: string | string[] | undefined,
) => {
    if (mbti) {
        const res = await instance().get(``);
        return res.data;
    } else {
        const res = await instance().get(`v1/users?userId=${userId}/mbtis`);
        return res.data;
    }
};

//v1/users?userId=${userId}/mbtis?mbti=${mbti}

//v1/users?userId=${userId}/mbtis
