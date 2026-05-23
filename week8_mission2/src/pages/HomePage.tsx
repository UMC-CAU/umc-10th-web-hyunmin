import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-100">
            <h1 className="text-4xl font-bold">
                LP
            </h1>

            <p className="text-gray-600">
                돌려돌려 LP판
            </p>

            <div className="flex gap-4 mt-4">
                <button
                    onClick={() => navigate("/login")}
                    className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-700"
                >
                    로그인
                </button>

                <button
                    onClick={() => navigate("/signup")}
                    className="px-6 py-3 bg-white border rounded-xl hover:bg-gray-100"
                >
                    회원가입
                </button>
            </div>

            <button
                onClick={() => navigate("/lps")}
                className="mt-6 text-pink-500 hover:underline"
            >
                LP 목록(클릭)
            </button>
        </div>
    );
}