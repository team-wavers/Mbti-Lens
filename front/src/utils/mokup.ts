import { APIResponseType } from "@/types/response";

export const commentResponse = {
    statusCode: 200,
    message: "api.common.ok",
    data: [
        {
            _id: 2,
            host_id: 1,
            mbti: "e",
            like: false,
        },
        {
            _id: 3,
            host_id: 1,
            mbti: "e",
            like: false,
            comment: "e2",
        },
        {
            _id: 4,
            host_id: 1,
            mbti: "n",
            like: true,
            comment: "comment",
        },
        {
            _id: 5,
            host_id: 1,
            mbti: "e",
            like: true,
            comment:
                "comment comment comment commentcommentcomment comment comment",
        },
        {
            _id: 6,
            host_id: 1,
            mbti: "e",
            like: true,
            comment: "  comment",
        },
        {
            _id: 7,
            host_id: 1,
            mbti: "e",
            like: true,
            comment: "comment",
        },
        {
            _id: 8,
            host_id: 1,
            mbti: "e",
            like: true,
            comment: "comment",
        },
    ],
};

export const mbtiResponse: APIResponseType["SearchResponse"] = {
    Code: 200,
    message: "api.common.ok",
    data: {
        _id: 4,
        user_id: 1,
        ei: "e",
        ns: "n",
        tf: "t",
        pj: "p",
        ei_like: 7,
        ns_like: 0,
        tf_like: 0,
        pj_like: 0,
    },
};
