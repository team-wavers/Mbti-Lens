import React, { useRef, useState } from "react";
import styled from "styled-components";
import flexBox from "@/styles/utils/flexbox";
import CommentBox from "@/components/result/CommentBox";
import ResultBox from "@/components/result/ResultBox";
import MbtiButton from "@/components/result/MbtiButton";
import { CommonButton } from "@/components/common/Button";

//코멘트 있는지 없는지 확인-> 있으면 띄우고 없으면 없다고 띄우기
//활용 자료 = mbti, 좋아요 수, 코멘트
const index = () => {
    //state에 따라 data요청해서 commentBox에 동적으로 넘겨줘야할듯?
    const commentResponse = {
        statusCode: 200,
        message: "api.common.ok",
        data: [
            {
                _id: 2,
                host_id: 1,
                mbti: "e",
                like: true,
                comment: "comment",
            },
            {
                _id: 3,
                host_id: 1,
                mbti: "e",
                like: true,
                comment: "e2",
            },
            {
                _id: 4,
                host_id: 1,
                mbti: "e",
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
    const mbtiResponse = {
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
    const mbti = [
        mbtiResponse.data.ei.toUpperCase(),
        mbtiResponse.data.ns.toUpperCase(),
        mbtiResponse.data.tf.toUpperCase(),
        mbtiResponse.data.pj.toUpperCase(),
    ];
    const [mbtiState, setMbtiState] = useState<string | null>(null);
    console.log(commentResponse.data.length);
    return (
        <Container>
            {mbtiState === null ? (
                <Title>남이보는 김철수님의 MBTI는?</Title>
            ) : null}
            <MbtiContainer>
                <MbtiButton
                    mbti={mbti}
                    setState={setMbtiState}
                    state={mbtiState}
                />
            </MbtiContainer>
            {mbtiState === null ? (
                <ResultBox
                    data={mbtiResponse.data}
                    mbti={mbti}
                    length={commentResponse.data.length}
                />
            ) : (
                <CommentSection>
                    <CommentBox
                        data={commentResponse.data}
                        mbtistate={mbtiState}
                    />
                    <CommonButton
                        disabled={false}
                        content={"결과보기"}
                        onClick={() => setMbtiState(null)}
                    />
                </CommentSection>
            )}
        </Container>
    );
};

export default index;
const Container = styled.div`
    ${flexBox("column", "center", "center;")}
    width: 100%;
    min-height: 100vh;
    height: auto;
    background: #f0e4d8;
`;

const Title = styled.h1`
    font-size: ${({ theme }) => theme.typography.xl};
    font-family: "HSYuji", sans-serif;
    width: 350px;
    color: #a06868;
    text-align: center;
    margin: 0px;
`;
const MbtiContainer = styled.div`
    ${flexBox("row", "center", "center;")}
    margin-top: 10px;
    gap: 10px;
    margin-top: 80px;
    margin-bottom: 50px;
`;
const CommentSection = styled.div`
    ${flexBox("column", "center", "center;")}
    width: 100%;
    margin-bottom: 20px;
`;
