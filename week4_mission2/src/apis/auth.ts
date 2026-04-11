import instance from "./axios";

//로그인 API 호출 함수
export const login = async (email: string, password: string) => {
    const response = await instance.post("/auth/login", {
        email,
        password,
    });

    return response.data;
};