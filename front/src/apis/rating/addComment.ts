import { instance } from "../base";

type Props = {
    userId: number;
    mbtiData: { mbti: string; like: boolean; comment?: string }[];
    public_key: string;
};

const addComment = async ({ userId, mbtiData, public_key }: Props) => {
    return await instance().post(
        `/users/${userId}/mbtis/comments?public_key=${public_key}`,
        mbtiData,
    );
};

export default addComment;
