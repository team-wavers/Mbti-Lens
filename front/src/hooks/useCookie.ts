import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { LoginCookieType } from "@/types/cookie";

const useCookie = () => {
    const raw = getCookie("user");
    const cookie: LoginCookieType = raw
        ? JSON.parse(raw.toString())
        : { userid: 1, username: "null" };

    return { cookie };
};

export default useCookie;
