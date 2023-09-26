import { postComment, postMbti } from "@/apis/postData";
import CommentType from "@/types/comment";
import MbtiType from "@/types/mbti";
import { CommentSearchResponse } from "@/types/response";
import { AxiosError, AxiosResponse } from "axios";
import useSwr, { SWRConfiguration } from "swr";
const config: SWRConfiguration = {
    fallbackData: "fallback",
    revalidateOnMount: false,
    // ...
};
const mbtiFetcher = (userid: string, body: MbtiType) =>
    postMbti(userid, body)
        .then((res) => res.data)
        .catch((error) => console.log(error));

const commentFetcher = (userid: string, mbti: string[], body: CommentType) =>
    postComment(userid, mbti, body)
        .then((res) => res.data)
        .catch((error) => console.log(error));

const usePostMbti = (userid: string, body: MbtiType) => {
    const { data, error } = useSwr<AxiosResponse<MbtiType>, AxiosError<Error>>(
        [userid, body],
        (userid: string, body: MbtiType) => mbtiFetcher(userid, body),
    );
    return { data, error };
};
const usePostComment = (userid: string, mbti: string[], body: CommentType) => {
    const { data, error } = useSwr<
        AxiosResponse<CommentSearchResponse>,
        AxiosError<Error>
    >(
        [userid, mbti, body],
        (userid: string, mbti: string[], body: CommentType) =>
            commentFetcher(userid, mbti, body),
        config,
    );
    return { data, error };
};

export default usePostMbti;
///v1/users?userId=${userid}/mbtis?mbti=${mbti}
