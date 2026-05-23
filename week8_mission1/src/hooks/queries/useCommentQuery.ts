import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../../apis/comment";

export const useCommentQuery = (lpId: string, order: string) => {
    return useInfiniteQuery({
        queryKey: ["lpComments", lpId, order],

        queryFn: ({ pageParam = 0 }) =>
            getComments(lpId, pageParam as number, 10, order),

        initialPageParam: 0,

        getNextPageParam: (lastPage: any) => {
            if (!lastPage.data.hasNext) return undefined;
            return lastPage.data.nextCursor;
        },
    });
};