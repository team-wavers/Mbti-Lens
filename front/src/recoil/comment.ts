import { atom } from "recoil";
import CommentType from "@/types/comment";

const commentAtom = atom<CommentType>({
    key: "comment",
    default: { like: true, comment: "" },
});

export default commentAtom;
