import { instance } from "../base";
// userId: number, mbti: string
export const getResponse = async (
    userId: string | string[] | undefined,
    mbti?: string | string[] | undefined,
    public_key?: string,
) => {
    if (mbti) {
        return await instance().get(
            `/users/${userId}/mbtis/${mbti}/comments?public_key=${public_key}`,
        );
    } else {
        return await instance().get(`/users/${userId}/mbtis`);
    }
};
