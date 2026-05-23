import {useInfiniteQuery, useQuery} from "@tanstack/react-query";

import {getLPList, getLPDetail} from "../../apis/lp";

// LP 목록 조회
export const useLPListQuery = (
    search: string,
    sort: "asc" | "desc"
) => {
    return useInfiniteQuery({
        queryKey: ["lps", search, sort],
        queryFn: ({ pageParam = 0 }) =>
            getLPList(
                pageParam as number,
                10,
                search,
                sort
            ),
        initialPageParam: 0,
        getNextPageParam: (lastPage: any) => {
            if (!lastPage.data.hasNext) {
                return undefined;
            }
            return lastPage.data.nextCursor;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};

// LP 상세 조회
export const useLPDetailQuery = (
    lpId: string
) => {
    return useQuery({
        queryKey: ["lp", lpId],
        queryFn: () => getLPDetail(lpId),
        enabled: !!lpId,
    });
};