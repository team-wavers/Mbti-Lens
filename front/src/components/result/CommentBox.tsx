import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import flexBox from "@/styles/utils/flexbox";
import { CommentSearchResponse } from "@/types/response";
type Props = {
    data: CommentSearchResponse | undefined | undefined;
    mbtistate: string;
};
const CommentBox = ({ data, mbtistate }: Props) => {
    const [isMore, setismore] = useState<boolean>(false);
    useEffect(() => {
        setismore(false);
    }, [mbtistate]);

    //코멘트가 없는 데이터는 제외
    const commentList = data
        ?.map((e) => e)
        .filter(
            (e) =>
                e.comment !== undefined && e.mbti == mbtistate?.toLowerCase(),
        );
    return (
        <Container>
            {commentList && commentList.length > 3 && !isMore ? (
                //코멘트 3개이상
                <>
                    {commentList?.slice(commentList.length - 3).map((e, i) => (
                        <Comment
                            key={e._id}
                            comment={commentList[i].comment}
                            like={commentList[i].like}
                        />
                    ))}
                    <MoreButton
                        content={"더보기"}
                        onClick={() => setismore(true)}
                    />
                </>
            ) : null}
            {commentList &&
                commentList.length <= 3 &&
                commentList?.map((e, i) => (
                    //코멘트 3개 이하
                    <Comment
                        key={e._id}
                        comment={commentList[i].comment}
                        like={commentList[i].like}
                    />
                ))}
            {commentList?.length !== 0 &&
                isMore &&
                commentList?.map((e, i) => (
                    //더보기 눌렀을 때
                    <Comment
                        key={e._id}
                        comment={commentList[i].comment}
                        like={commentList[i].like}
                    />
                ))}
            {commentList?.length === 0 && (
                <Nothing
                    content={
                        "아직 코멘트가 없어요.공유하기 버튼을 눌러 공유해 보세요 !"
                    }
                />
            )}
        </Container>
    );
};

export default CommentBox;
const Container = styled.div`
    ${flexBox("column")}
    font-size: ${({ theme }) => theme.typography.xl};
    margin-bottom: 20px;
    width: 100%;
`;
const MoreButton = styled.button<{ content: string }>`
    width: 100px;
    height: auto;
    font-family: "RixInooAriDuri" sans-serif;
    margin-top: 1 0px;
    color: ${({ theme }) => theme.colors.primary_5};
    background-color: #f0e4d8;
    border: none;
    &:before {
        content: "${({ content }) => content}";
        font-size: ${({ theme }) => theme.typography.s};
    }
`;
const Nothing = styled.div<{ content: string }>`
    width: auto;
    height: auto;
    color: ${({ theme }) => theme.colors.primary_5};
    font-family: "HSYuji" sans-serif;
    text-align: center;
    margin: 30px 0 10px 0;
    &:before {
        content: "${({ content }) => content}";
        font-size: ${({ theme }) => theme.typography.m};
    }
`;
