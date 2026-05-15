import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLike } from "../../apis/lp";

export const useLikeMutation = (lpId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => addLike(lpId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["lp", lpId],
            });
        },
    });
};