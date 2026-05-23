import {
    useState,
    useEffect,
    useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import instance from "../apis/axios";
import { useLPListQuery } from "../hooks/queries/useLpQueries";
import Layout from "../components/Layout";
import useDebounce from "../hooks/useDebounce";

export default function LPListPage() {
    const navigate = useNavigate();
    //토큰 가져오기 (있으면 로그인 된 상태, 없으면 로그인 안 된 상태)
    const [token, setToken] =
        useState<string | null>(
            localStorage.getItem("accessToken")
        );

    //로그인한 사용자 이름 (localStorage에서
    const [userName] = useState<string | null>(
        localStorage.getItem("userName")
    );

    //정렬 상태
    const [sort, setSort] =
        useState<"asc" | "desc">("desc");
    //검색 입력값
    const [search, setSearch] =
        useState("");
    //사용자가 입력을 멈춘 뒤 300ms 후 실제 검색어 반영
    const debouncedQuery =
        useDebounce(search, 300);
    //LP 목록 조회
    const {
        data,
        isLoading,
        isError,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useLPListQuery(
        debouncedQuery,
        sort
    );

    //로그아웃(토큰 삭제하고 로그인 페이지로 이동)
    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userName");
        setToken(null);
        navigate("/login");
    };

    //무한스크롤 감지용 ref
    const observerRef =
        useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer =
            new IntersectionObserver(
                (entries) => {
                    //화면 하단 도달 시 다음 페이지 요청
                    if (
                        entries[0].isIntersecting &&
                        hasNextPage
                    ) {
                        fetchNextPage();
                    }
                }
            );

        if (observerRef.current) {
            observer.observe(
                observerRef.current
            );
        }

        //observer 정리
        return () =>
            observer.disconnect();
    }, [hasNextPage, fetchNextPage]);

    return (
        <Layout>
            <div className="min-h-screen">
                <div className="flex flex-col items-center justify-center min-h-screen gap-4">

                    {/*검색 입력*/}
                    <input
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value)
                        }
                        placeholder="LP 검색"
                        className="w-full max-w-xl border p-3 rounded-lg"                    />

                    {/*정렬 버튼*/}
                    <div className="flex gap-2">
                        <button onClick={() =>
                            setSort("desc")
                        }
                                className={`px-4 py-2 rounded-lg ${
                                    sort === "desc"
                                        ? "bg-black text-white"
                                        : "bg-gray-200"
                                }`}
                        >
                            최신순
                        </button>

                        <button
                            onClick={() =>
                                setSort("asc")
                            }
                            className={`px-4 py-2 rounded-lg ${sort === "asc" ? "bg-black text-white" : "bg-gray-200"}`}
                        >
                            오래된순
                        </button>

                    </div>
                    {/*로딩*/}
                    {isLoading && (
                        <p>로딩중...</p>
                    )}
                    {/*에러*/}
                    {isError && (
                        <div className="flex flex-col items-center gap-2">
                            <p>
                                에러가 발생했습니다.
                            </p>
                            <button
                                onClick={() =>
                                    refetch()
                                }
                                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                            >
                                다시 시도
                            </button>
                        </div>
                    )}

                    {/*LP 목록*/}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data?.pages.map(
                            (page: any) =>
                                page.data.data.map(
                                    (lp: any) => (
                                        <div
                                            key={lp.id}
                                            onClick={() =>
                                                navigate(
                                                    `/lp/${lp.id}`
                                                )
                                            }
                                            className="group relative w-72 h-96 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                                        >
                                            {/*썸네일*/}
                                            <img
                                                src={lp.thumbnail}
                                                alt={lp.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                                            />

                                            {/*오버레이*/}
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                                                <h2 className="text-white text-xl font-bold">
                                                    {lp.title}
                                                </h2>
                                                <p className="text-gray-200 text-sm">
                                                    {new Date(lp.createdAt).toLocaleDateString()}
                                                </p>
                                                <p className="text-pink-300 mt-2">
                                                    ❤️{" "}
                                                    {lp.likes.length}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                )
                        )}
                    </div>

                    {/*다음 페이지 로딩*/}
                    {isFetchingNextPage && (
                        <p className="text-gray-400">
                            로딩중...
                        </p>
                    )}

                    {/*무한스크롤 감지 div*/}
                    <div ref={observerRef} />

                    {/*로그인 상태*/}
                    {token ? (
                        <>
                            <p className="text-green-600">
                                로그인 상태입니다
                            </p>
                            {/*로그인한 사용자 이름*/}
                            {userName && (
                                <p className="text-gray-700 font-semibold">
                                    {userName}
                                </p>
                            )}

                            {/*로그아웃 버튼*/}
                            <button
                                onClick={logout}
                                className="w-60 py-3 bg-red-500 text-white hover:bg-red-600 cursor-pointer rounded-lg"
                            >
                                로그아웃
                            </button>

                            {/*401 테스트*/}
                            <button
                                onClick={async () => {
                                    try {
                                        await instance.get(
                                            "/v1/auth/protected"
                                        );
                                    } catch (err) {
                                        console.log(
                                            "API 실패 (401 테스트)"
                                        );
                                    }
                                }}
                                className="w-60 py-3 bg-purple-500 text-white hover:bg-purple-700 cursor-pointer rounded-lg"
                            >
                                401 테스트 API 호출
                            </button>

                        </>
                    ) : (
                        <>
                            {/*로그인 버튼*/}
                            <button
                                onClick={() =>
                                    navigate("/login")
                                }
                                className="w-60 py-3 bg-blue-500 text-white hover:bg-blue-700 cursor-pointer rounded-lg"
                            >
                                로그인
                            </button>

                            {/*회원가입 버튼*/}
                            <button
                                onClick={() =>
                                    navigate("/signup")
                                }
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