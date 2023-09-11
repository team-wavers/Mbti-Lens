import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import flexBox from "@/styles/utils/flexbox";

type commentDataType = {
    _id: number;
    host_id: number;
    mbti: string;
    like: boolean;
    comment: string;
};
type Props = {
    data: commentDataType[];
    mbtistate: string;
};
const CommentBox = ({ data, mbtistate }: Props) => {
    const [isMore, setismore] = useState<boolean>(false);
    useEffect(() => {
        setismore(false);
    }, [mbtistate]);
    console.log(isMore);
    return (
        <Container>
            {data && !isMore && (
                <>
                    <Comment comment={data[0].comment} like={data[0].like} />
                    <Comment comment={data[1].comment} like={data[1].like} />
                    <Comment comment={data[2].comment} like={data[2].like} />
                    <MoreButtom onClick={() => setismore(true)}>
                        더보기
                    </MoreButtom>
                </>
            )}
            {data &&
                isMore &&
                data.map((e, i) => (
                    <Comment
                        key={e._id}
                        comment={data[i].comment}
                        like={data[i].like}
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
    background-color: #f0e4d8;
    width: auto;
    height: auto;
    border: none;
`;
