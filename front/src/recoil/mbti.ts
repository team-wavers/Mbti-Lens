import { atom } from "recoil";
import MbtiType from "@/types/mbti";

const mbtiAtom = atom<MbtiType>({
    key: "mbti",
    default: { ei: null, ns: null, tf: null, pj: null },
});

export default mbtiAtom;
