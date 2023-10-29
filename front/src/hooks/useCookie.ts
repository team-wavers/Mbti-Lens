import { getCookie } from "cookies-next";
import { LoginCookieType } from "@/types/cookie";

const useCookie = () => {
    const raw = getCookie("user");
    const cookie: LoginCookieType | undefined = raw
        ? JSON.parse(raw.toString())
        : undefined;

    return { cookie };
};

export default useCookie;
