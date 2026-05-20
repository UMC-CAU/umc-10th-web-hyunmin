import { useMutation } from "@tanstack/react-query";
import { login, deleteUser } from "../../apis/auth";

export const useLoginMutation = () => {
    return useMutation({
        //로그인은 인증 상태를 변경하는 작업이므로 mutation
        mutationFn: ({
                         email,
                         password,
                     }: {
            email: string;
            password: string;
        }) => login(email, password),
    });
};

export const useDeleteUserMutation = () => {
    return useMutation({
        mutationFn: deleteUser,

        onSuccess: () => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userName");

            window.location.href = "/login";
        },
    });
};