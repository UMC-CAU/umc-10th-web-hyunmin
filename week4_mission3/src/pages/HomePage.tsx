import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-2xl font-bold">홈</h1>

            {/*로그인 페이지 이동 버튼*/}
            <button
                onClick={() => navigate("/login")}
                className="w-60 py-3 bg-blue-500 text-white rounded-lg
             hover:bg-blue-700 cursor-pointer
             transition-all duration-200 hover:scale-105 active:scale-95"
            >
                로그인
            </button>

            {/*회원가입 페이지 이동 버튼*/}
            <button
                onClick={() => navigate("/signup")}
                className="w-60 py-3 border rounded-lg
             hover:bg-gray-100 cursor-pointer
             transition-all duration-200 hover:scale-105 active:scale-95"
            >
                회원가입
            </button>
        </div>
    );
}