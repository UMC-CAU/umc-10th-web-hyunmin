import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLP } from "../../apis/lp";
import { updateLP, deleteLP } from "../../apis/lp";

export const useCreateLPMutation = (
    onClose: () => void
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createLP,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["lps"],
            });

            onClose();
        },
    });
};

// LP 수정
export const useUpdateLPMutation = (
    lpId: string
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) =>
            updateLP(lpId, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["lp", lpId],
            });

            queryClient.invalidateQueries({
                queryKey: ["lps"],
            });

            alert("수정 완료");
        },
    });
};

// LP 삭제
export const useDeleteLPMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteLP,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["lps"],
            });

            alert("삭제 완료");

            window.location.href = "/lps";
        },

        onError: (error: any) => {
            if (error.response?.status === 401) {
                alert("본인의 LP만 삭제할 수 있습니다.");
            } else {
                alert("삭제 실패");
            }
        },
    });
};