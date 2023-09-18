import { instance } from "./base";
// userId: number, mbti: string
export const getComment = async (id: number, mbti: string) => {
    const response = await instance().get(
        `/v1/users?userId=${id}/mbtis?mbti=${mbti}/comments`,
    );
    return response.data;
};

export const getMbti = async () => {
    const response = await instance().get(``);
    return response.data;
};
//v1/users?userId=${id}/mbtis
