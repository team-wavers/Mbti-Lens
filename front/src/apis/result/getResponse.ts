import { instance } from "../base";
// userId: number, mbti: string

type Props = {
    userId: string | undefined;
    mbti?: string | undefined;
    public_key?: string;
    page: number;
    size: number;
};

export const getResponse = async ({
    userId,
    mbti,
    public_key,
    page,
    size,
}: Props) => {
    if (mbti) {
        return await instance().get(
            `/users/${userId}/mbtis/${mbti.toLowerCase()}/comments?public_key=${public_key}&page=${page}&size=${size}`,
        );
    } else {
        return await instance().get(`/users/${userId}/mbtis`);
    }
};
