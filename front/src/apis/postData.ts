import CommentType from "@/types/comment";
import { instance } from "./base";
import MbtiType from "@/types/mbti";
// userId: number, mbti: string
export const postMbti = async (
    userId?: string | string[] | undefined,
    body?: MbtiType,
) => {
    const res = await instance().post(`/users/${userId}/mbtis`, body, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data;
};

export const postComment = async (
    userId?: string | string[] | undefined,
    mbti?: string | string[] | undefined,
    body?: CommentType,
) => {
    const res = await instance().post(
        `/users/${userId}/mbtis/${mbti}/comments`,
        body,
    );
    return res.data;
};
