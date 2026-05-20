import { useState } from "react";
import instance from "../apis/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function MyPage() {
    const queryClient = useQueryClient();

    const [name, setName] = useState(
        localStorage.getItem("userName") || ""
    );
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState("");

    const updateProfileMutation = useMutation({
        mutationFn: () =>
            instance.patch("/v1/users", { name, bio, avatar }),

        // 서버 응답 전에 즉시 반영: onMutate
        onMutate: async () => {
            // 이전 값 저장 (롤백용)
            const previousName = localStorage.getItem("userName");

            // 즉시 localStorage + queryCache 업데이트
            localStorage.setItem("userName", name);
            queryClient.setQueryData(["userName"], name);

            return { previousName };
        },

        // 성공 처리
        onSuccess: () => {
            alert("수정 완료");
        },

        // 실패 시 롤백
        onError: (_err, _vars, context) => {
            // 아까 저장해둔 원래 값(previousName)으로 되돌리기
            if (context?.previousName) {
                localStorage.setItem("userName", context.previousName);
                queryClient.setQueryData(["userName"], context.previousName);
            }
            alert("수정 실패");
        },
    });

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
            <h1 className="text-2xl font-bold mb-6">마이페이지</h1>

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름"
                className="w-full border p-3 rounded-lg mb-3"
            />
            <input
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="bio"
                className="w-full border p-3 rounded-lg mb-3"
            />
            <input
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="프로필 이미지 URL"
                className="w-full border p-3 rounded-lg mb-3"
            />

            <button
                onClick={() => updateProfileMutation.mutate()}
                className="w-full bg-pink-500 text-white py-3 rounded-lg"
            >
                저장
            </button>
        </div>
    );
}