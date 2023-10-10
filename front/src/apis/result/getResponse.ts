import { instance } from "../base";
// userId: number, mbti: string
export const getResponse = async (
    userId: string | undefined,
    mbti?: string | undefined,
    public_key?: string,
) => {
    if (mbti) {
        return await instance().get(
            `/users/${userId}/mbtis/${mbti.toLowerCase()}/comments?public_key=${public_key}`,
        );
    } else {
        return await instance().get(`/users/${userId}/mbtis`);
    }
};
