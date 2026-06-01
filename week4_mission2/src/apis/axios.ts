import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8000", //백엔드 서버 주소
    withCredentials: true, //쿠키 자동요청 허용
});

//요청마다 토큰 자동 추가
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken"); //저장된 토큰 가져오기

    //토큰 있으면 추가
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default instance;