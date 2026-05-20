import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLP } from "../../apis/lp";
import { updateLP, deleteLP } from "../../apis/lp";

export const useCreateLPMutation = (
    onClose: () => void
) => {
    const queryClient = useQueryClient();

    //서버 상태 변경 작업이므로 mutation
    return useMutation({
        mutationFn: createLP,

        //LP 생성 성공 후 LP 목록 캐시를 무효화하여 최신 데이터 재조회
        onSuccess: () => {
            queryClient.invalidateQueries({ //기존 캐시를 오래된 상태로 만들고 다시 서버 요청 보내
                queryKey: ["lps"],
            });

            onClose(); //LP 생성 성공 시 모달 자동 닫힘
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