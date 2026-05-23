import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    createComment,
    updateComment,
    deleteComment,
} from "../../apis/comment";
export const useCreateCommentMutation = (
    lpId: string
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (content: string) =>
            createComment(lpId, content),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["lpComments", lpId],
            });
        },
    });
};
//댓글 수정
export const useUpdateCommentMutation = (
    lpId: string
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
                         commentId,
                         content,
                     }: {
            commentId: number;
            content: string;
        }) =>
            updateComment(lpId, commentId, content),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["lpComments", lpId],
            });
        },
    });
};

//댓글 삭제
export const useDeleteCommentMutation = (
    lpId: string
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (commentId: number) =>
            deleteComment(lpId, commentId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["lpComments", lpId],
            });
        },
    });
};