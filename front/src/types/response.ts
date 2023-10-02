export interface GeneralResponse {
    statusCode: number;
    message: string;
    data: string;
}

export interface SearchResponse extends Omit<GeneralResponse, "data"> {
    data: {
        _id: number;
        user_id: number;
        nickname: string;
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

export interface SearchCommentResponse extends Omit<GeneralResponse, "data"> {
    data: {
              _id: number;
              host_id: number;
              mbti: string;
              like: boolean;
              comment: string;
          }[];
}