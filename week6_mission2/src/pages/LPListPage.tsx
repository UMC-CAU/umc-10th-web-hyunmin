import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import instance from "../apis/axios";
import { useLPListQuery } from "../hooks/queries/useLpQueries";
import Layout from "../components/Layout";

export default function LPListPage() {
    const navigate = useNavigate();

    //토큰 가져오기 (있으면 로그인 된 상태, 없으면 로그인 안 된 상태)
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("accessToken")
    );
    // 로그인한 사용자 이름 (localStorage에서
    const [userName] = useState<string | null>(
        localStorage.getItem("userName")
    );
    const [sort, setSort] = useState<"asc" | "desc">("desc");

    const { data, isLoading, isError, refetch } =
        useLPListQuery(sort);

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
        <Layout>
            <div className="min-h-screen">

                <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                    <h1 className="text-2xl font-bold">홈</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setSort("desc")}
                            className={`px-4 py-2 rounded-lg ${
                                sort === "desc"
                                    ? "bg-black text-white"
                                    : "bg-gray-200"
                            }`}
                        >
                            최신순
                        </button>

                        <button
                            onClick={() => setSort("asc")}
                            className={`px-4 py-2 rounded-lg ${
                                sort === "asc"
                                    ? "bg-black text-white"
                                    : "bg-gray-200"
                            }`}
                        >
                            오래된순
                        </button>
                    </div>
                    {isLoading && <p>로딩중...</p>}

                    {isError && (
                        <div className="flex flex-col items-center gap-2">
                            <p>에러가 발생했습니다.</p>

                            <button
                                onClick={() => refetch()}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                            >
                                다시 시도
                            </button>
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data?.data?.data.map((lp: any) => (
                            <div
                                key={lp.id}
                                onClick={() => navigate(`/lp/${lp.id}`)}
                                className="group relative w-72 h-96 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                            >
                                {/*썸네일*/}
                                <img
                                    src={lp.thumbnail}
                                    alt={lp.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                                />

                                {/*오버레이*/}
                                <div
                                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                                    <h2 className="text-white text-xl font-bold">
                                        {lp.title}
                                    </h2>

                                    <p className="text-gray-200 text-sm">
                                        {new Date(lp.createdAt).toLocaleDateString()}
                                    </p>

                                    <p className="text-pink-300 mt-2">
                                        ❤️ {lp.likes.length}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/*로그인 상태*/}
                    {token ? (
                        <>
                            <p className="text-green-600">
                                로그인 상태입니다
                            </p>

                            {/*로그인한 사용자 이름 표시*/}
                            {userName && (
                                <p className="text-gray-700 font-semibold">
                                    {userName}
                                </p>
                            )}

                            <button
                                onClick={logout}
                                className="w-60 py-3 bg-red-500 text-white hover:bg-red-600 cursor-pointer rounded-lg"
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
            </div>
        </Layout>
    );
}