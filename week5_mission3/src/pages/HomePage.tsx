import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import instance from "../apis/axios";

export default function HomePage() {
    const navigate = useNavigate();

    //토큰 가져오기 (있으면 로그인 된 상태, 없으면 로그인 안 된 상태)
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("accessToken")
    );
    // 로그인한 사용자 이름 (localStorage에서
    const [userName, setUserName] = useState<string | null>(
        localStorage.getItem("userName")
    );
    //AccessToken 만료 상황을 가정하기 위한 테스트 API 호출
    useEffect(() => {
        if (token) {
        instance.get("/v1/auth/protected");
        }
    }, []);

    //로그아웃(토큰 삭제하고 로그인 페이지로 이동)
    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userName");
        setToken(null);
        navigate("/login");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-2xl font-bold">홈</h1>

            {/*로그인 상태*/}
            {token ? (
                <>
                    <p className="text-green-600">
                        로그인 상태입니다
                    </p>
                    {/*로그인한 사용자 이름 표시*/}
                    {userName && (
                        <p className="text-gray-700 font-semibold"> {userName}</p>
                    )}

                    <button
                        onClick={logout}
                        className="w-60 py-3 bg-red-500 text-white hover:bg-red-600
    cursor-pointer rounded-lg"
                    >
                        로그아웃
                    </button>

                    <button
                        onClick={async () => {
                            try {
                                await instance.get("/v1/auth/protected");
                            } catch (err) {
                                console.log("API 실패 (401 테스트)");
                            }
                        }}
                        className="w-60 py-3 bg-purple-500 text-white hover:bg-purple-700 cursor-pointer rounded-lg"
                    >
                        401 테스트 API 호출
                    </button>

                </>
            ) : (
                <>
                    {/*비로그인 상태 -> 로그인 페이지 이동*/}
                    <button
                        onClick={() => navigate("/login")}
                        className="w-60 py-3 bg-blue-500 text-white hover:bg-blue-700 cursor-pointer rounded-lg"
                    >
                        로그인
                    </button>

                    {/*회원가입 페이지로 이동*/}
                    <button
                        onClick={() => navigate("/signup")}
                        className="w-60 py-3 border hover:bg-gray-300 cursor-pointer rounded-lg"
                    >
                        회원가입
                    </button>
                </>
            )}
        </div>
    );
}