import { useQuery } from "@tanstack/react-query";
import { getLPList, getLPDetail } from "../../apis/lp";

//LP 목록 조회
export const useLPListQuery = (sort: "asc" | "desc") => {
    return useQuery({
        queryKey: ["lps", sort],

        queryFn: () => getLPList(0, 10, "", sort),

        staleTime: 1000 * 60, //1분

        gcTime: 1000 * 60 * 5, //5분
    });
};

//LP 상세 조회
export const useLPDetailQuery = (lpId: string) => {
    return useQuery({
        queryKey: ["lp", lpId],

        queryFn: () => getLPDetail(lpId),

        enabled: !!lpId,
    });
};