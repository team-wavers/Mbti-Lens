import { atom } from "recoil";
import MbtiType from "@/types/mbti";

const mbtiAtom = atom<MbtiType>({
    key: "mbti",
    default: { mbti_e_i: null, mbti_n_s: null, mbti_t_f: null, mbti_p_j: null },
});

export default mbtiAtom;
