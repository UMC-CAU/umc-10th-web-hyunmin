import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLike, removeLike } from "../../apis/lp";

export const useLikeMutation = (lpId: string) => {
    const queryClient = useQueryClient();
    const myId = Number(localStorage.getItem("userId"));

    return useMutation({
        mutationFn: (isLiked: boolean) =>
            //현재 좋아요 상태에 따라 좋아요 추가 또는 삭제 API를 호출하도록
            isLiked ? removeLike(lpId) : addLike(lpId),

        // 서버 응답 전에 좋아요 UI를 먼저 변경하기 위해(onMutate)
        onMutate: async (isLiked: boolean) => {
            //기존 서버 요청이 Optimistic Update 데이터를 덮어쓰지 않도록 현재 진행 중인 query를 취소
            await queryClient.cancelQueries({ queryKey: ["lp", lpId] });

            //실패할 때 롤백할 수 있도록 미리 값 저장해둠
            const previousLP = queryClient.getQueryData(["lp", lpId]);

            queryClient.setQueryData(["lp", lpId], (old: any) => {
                // 서버 다시 요청 안하고 프론트에서 캐시값 바꾼다.: optimistic update (old로 기존데이터 받아옴)
                if (!old) return old;
                const likes = old.data.likes;
                return {
                    ...old,
                    data: {
                        ...old.data,
                        likes: isLiked
                            //좋아요 취소 시 현재 사용자 좋아요 데이터를 제거
                            ? likes.filter((l: any) => l.userId !== myId) //내 userId가 아닌 좋아요만 남김 = 내 좋아요 제거
                            : [...likes, { id: Date.now(), userId: myId, lpId: Number(lpId) }],
                    },
                };
            });

            return { previousLP };
        },

        //실패 시 롤 백
        onError: (_err, _vars, context) => {
            queryClient.setQueryData(["lp", lpId], context?.previousLP);
        },

        //요청 성공/실패 여부와 상관없이 서버 데이터를 다시 조회하여 최종 상태를 동기화
        onSettled: () => {
            // 서버에서 다시 최신 데이터 가져와
            queryClient.invalidateQueries({ queryKey: ["lp", lpId] });
            queryClient.invalidateQueries({ queryKey: ["lps"] });
        },
    });
};
