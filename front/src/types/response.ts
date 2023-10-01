interface Response<T = void> {
    Code: number;
    message: string;
    data: T;
}
export type APIResponseType = {
    SearchResponse: Response<{
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
    SubmitResponse?: Response;
};

export type CommentResponseType = {
    SearchResponse: Response<{
        _id: number;
        host_id: number;
        mbti: string;
        like: boolean;
        comment?: string;
    }>;
    SubmitResponse?: Response;
};

export type CommentSearchResponse = (
    | {
          _id: number;
          host_id: number;
          mbti: string;
          like: boolean;
          comment?: undefined;
      }
    | {
          _id: number;
          host_id: number;
          mbti: string;
          like: boolean;
          comment: string;
      }
)[];

export type MbtiSearchResponse = APIResponseType["SearchResponse"]["data"];

interface GenaralResponse {
    statusCode: number;
    message: string;
}
interface SearchResponse extends GenaralResponse {
    data: {
        _id: number;
        user_id: number;
        ei: "e" | "i" | " ";
        ns: "n" | "s" | " ";
        tf: "t" | "f" | " ";
        pj: "p" | "j" | " ";
        ei_like: number;
        ns_like: number;
        tf_like: number;
        pj_like: number;
    };
}

export default SearchResponse;
