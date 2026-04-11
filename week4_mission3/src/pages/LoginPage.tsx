import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        const savedUser = localStorage.getItem("user");

        //가입된 유저가 아닐 때(localStorage에 없을때)
        if (!savedUser) {
            alert("회원가입 먼저 해주세요!");
            return;
        }

        const parsedUser = JSON.parse(savedUser);

        //이메일+비밀번호 검증
        if (email === parsedUser.email && password === parsedUser.password) {
            alert("로그인 성공!");
            navigate("/");
        } else {
            setPassword(""); //틀리면 비밀번호 초기화
            alert("이메일 또는 비밀번호가 틀렸습니다.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-[350px] bg-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center mb-4">

                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full hover:bg-gray-200 cursor-pointer transition-all duration-200 active:scale-90"
                    >
                        {"<"}
                    </button>

                    <h2 className="ml-3 text-lg font-semibold">
                        로그인
                    </h2>

                </div>
                <input
                    className="w-full p-3 border rounded-lg mb-2"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="w-full p-3 border rounded-lg mb-2"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                >
                    로그인
                </button>
            </div>
        </div>
    );
}