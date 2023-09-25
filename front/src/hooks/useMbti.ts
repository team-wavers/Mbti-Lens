import { getResponse } from "@/apis/getResponse";
import { MbtiSearchResponse } from "@/types/response";
import { AxiosError, AxiosResponse } from "axios";
import useSwr, { SWRConfiguration } from "swr";
const config: SWRConfiguration = {
    fallbackData: "fallback",
    revalidateOnMount: false,
    // ...
};
const fetcher = (userid: string) =>
    getResponse(userid)
        .then((res) => res.data)
        .catch((error) => console.log(error));

const useGetMBTI = (userid: string) => {
    const { data, error, isLoading } = useSwr<
        AxiosResponse<MbtiSearchResponse>,
        AxiosError<Error>
    >([userid], (userid: string) => fetcher(userid), config);
    return { data, error, isLoading };
};

export default useGetMBTI;
///v1/users?userId=${userid}/mbtis?mbti=${mbti}
