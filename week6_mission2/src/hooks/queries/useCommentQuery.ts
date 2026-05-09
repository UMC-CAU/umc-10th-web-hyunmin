import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../../apis/comment";

export const useCommentQuery = (lpId: string, order: string) => {
    return useInfiniteQuery({
        queryKey: ["lpComments", lpId, order],

        queryFn: ({ pageParam = 0 }) =>
            getComments(lpId, pageParam, 10, order),

        getNextPageParam: (lastPage) => {
            if (!lastPage.data.hasNext) return undefined;
            return lastPage.data.nextCursor;
        },
    });
};