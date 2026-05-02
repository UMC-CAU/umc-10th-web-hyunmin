import { useEffect, useState } from "react";

//로그인 상태 관리하는 커스텀 훅
export default function useAuth() {
    const [isLogin, setIsLogin] = useState(false); //로그인 여부

    useEffect(() => {
        //localStorage에 토큰이 있는지 확인
        const token = localStorage.getItem("accessToken");

        //토큰있으면 로그인 상태로 설정
        if (token) {
            setIsLogin(true);
        }
    }, []);

    return { isLogin };
}