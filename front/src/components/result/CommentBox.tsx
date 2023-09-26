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
            {data && !isMore ? (
                <>
                    {commentList?.slice(commentList.length - 3).map((e, i) => (
                        <Comment
                            key={e._id}
                            comment={commentList[i].comment}
                            like={commentList[i].like}
                        />
                    ))}
                    <MoreButtom onClick={() => setismore(true)}>
                        더보기
                    </MoreButtom>
                </>
            ) : null}
            {data &&
                isMore &&
                commentList?.map((e, i) => (
                    <Comment
                        key={e._id}
                        comment={commentList[i].comment}
                        like={commentList[i].like}
                    />
                ))}
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
const MoreButtom = styled.button`
    font-size: ${({ theme }) => theme.typography.s};
    font-family: "RixInooAriDuri" sans-serif;
    font-weight: 500;
    margin-top: 20px;
    color: #a06868;
    background-color: #f0e4d8;
    border: none;
`;
