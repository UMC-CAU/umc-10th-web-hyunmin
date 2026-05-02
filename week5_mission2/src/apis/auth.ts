import instance from "./axios";

//로그인
export const login = async (email: string, password: string) => {
  const response = await instance.post("/v1/auth/signin", { email, password });
  return response.data;
};

//회원가입
export const signup = async (
  email: string,
  password: string,
  name: string
) => {
  const response = await instance.post("/v1/auth/signup", {
    email,
    password,
    name,
  });
  return response.data;
};