import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000", // 백엔드 주소
  withCredentials: true,
});

//토큰 자동 추가
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;