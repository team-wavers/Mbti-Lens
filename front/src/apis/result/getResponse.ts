import { instance } from "../base";
// userId: number, mbti: string
export const getResponse = async (
    userId?: string | string[] | undefined,
    mbti?: string | string[] | undefined,
) => {
    if (mbti) {
        const res = await instance().get(
            `/users/${userId}/mbtis/${mbti}/comments`,
        );

        return res.data;
    } else {
        const res = await instance().get(`/users/${userId}/mbtis`);
        return res.data;
    }
};
