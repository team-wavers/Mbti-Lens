import React, { useState } from "react";
import styled from "styled-components";
import flexBox from "@/styles/utils/flexbox";
import CommentBox from "@/components/result/CommentBox";
import ResultBox from "@/components/result/ResultBox";
import { NextButton } from "@/components/common/Button";

//코멘트 있는지 없는지 확인-> 있으면 띄우고 없으면 없다고 띄우기
//코멘트 수가 많을 때 어떤 식으로 스크롤?
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
                comment: "comment",
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
            ei_like: 4,
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
    return (
        <Container>
            {mbtiState === null ? (
                <Title>남이보는 김철수님의 MBTI는?</Title>
            ) : null}
            <MbtiContainer>
                {mbti.map((e, i) => (
                    <MbitButton
                        key={i}
                        onClick={() => setMbtiState(mbti[i].toLowerCase())}
                        isFocus={mbtiState && mbti[i].toLowerCase}
                    >
                        {mbti[i]}
                    </MbitButton>
                ))}
            </MbtiContainer>
            {mbtiState === null ? (
                <ResultBox data={mbtiResponse.data} mbti={mbti} />
            ) : (
                <CommentSection>
                    <CommentBox
                        data={commentResponse.data}
                        mbtistate={mbtiState}
                    />
                    <NextButton
                        disabled={false}
                        text="결과보기"
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
    font-weight: 500;
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
const MbitButton = styled.button<{ isFocus: boolean }>`
    width: 80px;
    height: 100px;
    outline: none;
    color: ${({ theme, isFocus }) =>
        !isFocus ? theme.colors.primary_1 : theme.colors.primary_3};
    border: 1px solid ${({ theme }) => theme.colors.gray};
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.typography.x3l};
    font-family: "LINE Seed Sans", sans-serif;
    font-weight: 900;
    text-align: center;
    transition: 0.2s ease transform, 0.2s ease box-shadow;
    &:focus {
        transform: scale(1.1);
        box-shadow: 0px 1px 7px 3px rgba(86, 154, 255, 0.2);
    }
`;
const CommentSection = styled.div`
    ${flexBox("column", "center", "center;")}
    height: auto;
    width: 100%;
    margin-bottom: 20px;
`;
