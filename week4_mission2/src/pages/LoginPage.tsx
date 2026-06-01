import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { login } from "../apis/auth";

export default function LoginPage() {
    const navigate = useNavigate();

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isValid,
    } = useForm();

    //폼 제출 시 실행
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isValid) return; //유효하지 않으면 종료

        try {
            const data = await login(values.email, values.password); //로그인 API

            localStorage.setItem("accessToken", data.data.accessToken); //accessToken 저장
            console.log(data);

            navigate("/"); //홈으로 이동
        } catch (error) {
            alert("로그인 실패");
        }
    };

    return (
        <div className="flex flex-col justify-center min-h-screen p-5 max-w-md mx-auto">

            <div className="relative mb-5 text-center">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-0 text-xl"
                >
                    {"<"}
                </button>

                <h1 className="text-2xl font-bold">로그인</h1>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/*이메일*/}
                <div>
                    <input
                        type="text"
                        name="email"
                        placeholder="이메일을 입력해주세요!"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`border p-2 w-full ${
                            touched.email && errors.email
                                ? "border-red-500"
                                : ""
                        }`}
                    />
                    {touched.email && errors.email && (
                        <p className="text-red-500 text-sm">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/*비밀번호*/}
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="비밀번호를 입력해주세요!"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`border p-2 w-full ${
                            touched.password && errors.password
                                ? "border-red-500"
                                : ""
                        }`}
                    />
                    {touched.password && errors.password && (
                        <p className="text-red-500 text-sm">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/*로그인 버튼*/}
                <button
                    type="submit"
                    disabled={!isValid} //유효하지 않으면 비활성화
                    className={`p-2 text-white transition ${
                        isValid
                            ? "bg-blue-300 hover:bg-blue-600 cursor-pointer"
                            : "bg-gray-300 cursor-not-allowed"
                    }`}
                >
                    로그인
                </button>
            </form>

        </div>
    );
}