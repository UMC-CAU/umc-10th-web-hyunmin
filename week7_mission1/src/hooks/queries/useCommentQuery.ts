import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../../apis/comment";

export const useCommentQuery = (lpId: string, order: string) => {
    //무한스크롤 쿼리
    return useInfiniteQuery({
        queryKey: ["lpComments", lpId, order],

        queryFn: ({ pageParam = 0 }) =>
            getComments(lpId, pageParam, 10, order),

        getNextPageParam: (lastPage) => {
            if (!lastPage.data.hasNext) return undefined; //다음 페이지 없으면 요청 중단
            return lastPage.data.nextCursor; //다음 요청에 사용할 cursor 값 반환
        },
    });
};