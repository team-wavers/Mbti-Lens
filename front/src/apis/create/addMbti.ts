import { instance } from "../base";

type Props = {
    userId: number;
    ei: "e" | "i";
    ns: "n" | "s";
    tf: "t" | "f";
    pj: "p" | "j";
};

const addMbti = async ({ userId, ei, ns, tf, pj }: Props) => {
    return await instance().post(`/users/${userId}/mbtis`, {
        ei: ei,
        ns: ns,
        tf: tf,
        pj: pj,
    });
};

export default addMbti;
