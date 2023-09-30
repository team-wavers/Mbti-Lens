import { instance } from "../base";

type Props = {
    userId: number;
    mbti: "E" | "I" | "N" | "S" | "T" | "F" | "P" | "J";
    public_key: string;
};

const searchComment = async ({ userId, mbti, public_key }: Props) => {
    return await instance().get(
        `/users/${userId}/mbtis/${mbti}/comments?public_key=${public_key}`,
    );
};

export default searchComment;
