type CommentType = {
    _id: number;
    host_id: number;
    mbti: string;
    like: boolean;
    comment: string | null;
};
export default CommentType;
