import { instance } from "../base";
// userId: number, mbti: string
export const getResponse = async (
    userId: string | undefined,
    mbti?: string | undefined,
    public_key?: string,
    page?: number,
    size?: number,
) => {
    if (mbti) {
        return await instance().get(
            `/users/${userId}/mbtis/${mbti.toLowerCase()}/comments?public_key=${public_key}?page=1?size=1`,
        );
    } else {
        return await instance().get(`/users/${userId}/mbtis`);
    }
};
