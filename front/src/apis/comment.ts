import { instance } from "./base";
// userId: number, mbti: string
const getComment = async () => {
    const response = await instance().get(``);
    return response.data;
};
export default getComment;
