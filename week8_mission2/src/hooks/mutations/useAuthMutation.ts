import { useMutation } from "@tanstack/react-query";
import { login, deleteUser } from "../../apis/auth";

export const useLoginMutation = () => {
    return useMutation({
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