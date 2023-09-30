import { getResponse } from "@/apis/getResponse";
import { CommentResponseType } from "@/types/response";
import { AxiosError, AxiosResponse } from "axios";
import useSwr, { SWRConfiguration } from "swr";
const config: SWRConfiguration = {
    fallbackData: "fallback",
    revalidateOnMount: false,
    // ...
};
const fetcher = (userid: string, mbti: string) =>
    getResponse(userid, mbti)
        .then((res) => res.data)
        .catch((error) => console.log(error));

const useGetComment = (userid: string, mbti: string) => {
    const { data, error, isLoading } = useSwr<
        AxiosResponse<CommentResponseType["SearchResponse"]["data"][]>,
        AxiosError<Error>
    >(
        [userid, mbti],
        ([userid, mbti]: string[]) => fetcher(userid, mbti),
        config,
    );
    return { data, error, isLoading };
};

export default useGetComment;
///v1/users?userId=${userid}/mbtis?mbti=${mbti}
