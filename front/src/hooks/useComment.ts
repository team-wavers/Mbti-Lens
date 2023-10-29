// 댓글 데이터 종합 및 생성 custom hook

import { addComment } from "@/apis/rating";
import { SearchResponse } from "@/types/response";
import { useState } from "react";
import { mbtiArray } from "@/constants/mbti";
import axios, { AxiosResponse } from "axios";
import { getResponse } from "@/apis/result/getResponse";

type MbtiType<T> = Map<string, T> | undefined;

const useComment = (
    res: SearchResponse,
    userId: number,
    public_key: string,
) => {
    const { ei, ns, tf, pj } = res.data;
    const [current, setCurrent] = useState<string>("mbti_e_i");
    const [likes, setLikes] = useState<MbtiType<boolean>>(undefined);
    const [comments, setComments] = useState<MbtiType<string>>(undefined);
    const mbtiData: { [key: string]: string } = {
        mbti_e_i: ei,
        mbti_n_s: ns,
        mbti_t_f: tf,
        mbti_p_j: pj,
    };

    const currentHandler = (mbtiKey: string) => {
        setCurrent(mbtiKey);
    };

    const likeHandler = (key: string, value: boolean) => {
        setLikes((prev) => new Map(prev).set(key, value));
    };

    const commentHandler = (key: string, content: string) => {
        setComments((prev) => new Map(prev).set(key, content));
    };

    const postComment = async () => {
        const res = mbtiArray.map((value) => {
            return {
                mbti: mbtiData[value].toLowerCase(),
                like: likes?.get(value) || false,
                comment: comments?.get(value) || "",
            };
        });

        return await addComment({
            userId: userId,
            mbtiData: res,
            public_key: public_key,
        });
    };

    // const fetchComment = async () => {
    //     return await axios
    //         .all(
    //             mbtiArray.map((value) =>
    //                 getResponse(String(userId), mbtiData[value], public_key),
    //             ),
    //         )
    //         .then(
    //             axios.spread<AxiosResponse<any>, any>((ei, ns, tf, pj) => {
    //                 const resArray = ei.data.concat(ns.data, tf.data, pj.data);
    //                 return resArray;
    //             }),
    //         );
    // };

    return {
        current,
        likes,
        setCurrent,
        comments,
        mbtiData,
        currentHandler,
        likeHandler,
        commentHandler,
        postComment,
        // fetchComment,
    };
};

export default useComment;
