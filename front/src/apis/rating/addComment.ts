import { instance } from "../base";

type Props = {
    userId: number;
    mbti: string;
    public_key: string;
    like: boolean;
    comment: string | undefined;
};

const addComment = async ({
    userId,
    mbti,
    public_key,
    like,
    comment,
}: Props) => {
    return await instance().post(
        `/users/${userId}/mbtis/${mbti}/comments?public_key=${public_key}`,
        { like: like, comment: comment },
    );
};

export default addComment;
