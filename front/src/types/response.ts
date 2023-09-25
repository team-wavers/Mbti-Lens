interface GeneralResponse<T = void> {
    Code: number;
    message: string;
    data: T;
}
export type APIResponseType = {
    SearchResponse: GeneralResponse<{
        _id: number;
        user_id: number;
        ei: "e" | "i";
        ns: "n" | "s";
        tf: "t" | "f";
        pj: "p" | "j";
        ei_like: number;
        ns_like: number;
        tf_like: number;
        pj_like: number;
    }>;
    SubmitResponse?: GeneralResponse;
};

export type CommentResponseType = {
    SearchResponse: GeneralResponse<{
        _id: number;
        host_id: number;
        mbti: string;
        like: boolean;
        comment?: string;
    }>;
    SubmitResponse?: GeneralResponse;
};

export type CommentSearchResponse =
    CommentResponseType["SearchResponse"]["data"][];

export type MbtiSearchResponse = APIResponseType["SearchResponse"]["data"];
