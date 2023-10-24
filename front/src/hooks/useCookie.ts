import { getCookie } from "cookies-next";
import { LoginCookieType } from "@/types/cookie";

const useCookie = () => {
    const raw = getCookie("user");
    const cookie: LoginCookieType | undefined = raw
        ? JSON.parse(raw.toString())
        : undefined;

    if (process.env.NODE_ENV == "development") {
        const cookie: LoginCookieType = {
            userid: "1",
            username: "용원",
            public_key: "CULKpgPKlQKDZnV6dRLYg",
        };
        return { cookie };
    } else {
        return { cookie };
    }
};

export default useCookie;
