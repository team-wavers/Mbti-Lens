import { instance } from "../base";

type Props = {
    userId: number;
    mbti: string;
    public_key: string;
    page: number;
    size: number;
};

const searchComment = async ({
    userId,
    mbti,
    public_key,
    page,
    size,
}: Props) => {
    return await instance().get(
        `/users/${userId}/mbtis/${mbti}/comments?public_key=${public_key}&page=${page}&size=${size}`,
    );
};

export default searchComment;
