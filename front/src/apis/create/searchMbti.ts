import { instance } from "../base";

type Props = {
    userId: number;
};

const searchMbti = async ({ userId }: Props) => {
    return await instance().get(`/users/${userId}/mbtis`);
};

export default searchMbti;
