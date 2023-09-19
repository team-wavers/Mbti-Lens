import { getResponse } from "@/apis/comment";
import { AxiosError, AxiosResponse } from "axios";
import useSwr from "swr";

const fetcher = ([userid, mbti]: string[]) =>
    getResponse(userid, mbti).then((res) => res.data);

const useComment = (userid: string, mbti: string) => {
    const { data, error, isLoading } = useSwr<
        AxiosResponse<string>,
        AxiosError<Error>
    >([userid, mbti], fetcher);
    return { data, error, isLoading };
};

export default useComment;
///v1/users?userId=${userid}/mbtis?mbti=${mbti}
