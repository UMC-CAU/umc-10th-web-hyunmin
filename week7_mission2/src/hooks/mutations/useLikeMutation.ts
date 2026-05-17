import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLike, removeLike } from "../../apis/lp";

export const useLikeMutation = (lpId: string) => {
    const queryClient = useQueryClient();
    const myId = Number(localStorage.getItem("userId"));

    return useMutation({
        mutationFn: (isLiked: boolean) =>
            isLiked ? removeLike(lpId) : addLike(lpId),

        onMutate: async (isLiked: boolean) => {
            await queryClient.cancelQueries({ queryKey: ["lp", lpId] });

            const previousLP = queryClient.getQueryData(["lp", lpId]);

            queryClient.setQueryData(["lp", lpId], (old: any) => {
                if (!old) return old;
                const likes = old.data.likes;
                return {
                    ...old,
                    data: {
                        ...old.data,
                        likes: isLiked
                            ? likes.filter((l: any) => l.userId !== myId)
                            : [...likes, { id: Date.now(), userId: myId, lpId: Number(lpId) }],
                    },
                };
            });

            return { previousLP };
        },

        onError: (_err, _vars, context) => {
            queryClient.setQueryData(["lp", lpId], context?.previousLP);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["lp", lpId] });
            queryClient.invalidateQueries({ queryKey: ["lps"] });
        },
    });
};