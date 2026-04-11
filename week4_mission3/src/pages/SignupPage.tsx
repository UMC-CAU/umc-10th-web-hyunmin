import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [emailTouched, setEmailTouched] = useState(false);

    const [password, setPassword] = useState("");
    const [passwordTouched, setPasswordTouched] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmTouched, setConfirmTouched] = useState(false);

    const [nickname, setNickname] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    //유효성검사
    //이메일: @와 .포함 여부 확인
    const isValidEmail = email.includes("@") && email.includes(".");
    //비밀번호: 6자 이상
    const isValidPassword = password.length >= 6;
    //비밀번호 일치 확인
    const isMatch = password === confirmPassword;

    //버튼 활성화 조건
    const canNextStep1 = isValidEmail;
    const canNextStep2 = isValidPassword && isMatch;
    const canSubmit = nickname.length > 0;

    //이메일 중복 확인(localStorage와 비교)
    const checkDuplicateEmail = () => {
        const savedUser = localStorage.getItem("user");

        if (!savedUser) return false; //저장된 유저 없을 때

        const parsedUser = JSON.parse(savedUser);

        //이메일 동일하면 중복
        return parsedUser.email === email;
    };

    //회원가입
    const handleSignup = () => {
        const userData = {
            email,
            password,
            nickname,
        };

        //localStorage에 유저 저장
        localStorage.setItem("user", JSON.stringify(userData));

        alert("회원가입 완료!");
        navigate("/"); //홈으로 이동
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
                    <h2 className="ml-3 text-lg font-semibold">회원가입</h2>
                </div>

                {/*step1: 이메일 입력*/}
                {step === 1 && (
                    <>
                        {/*이메일 입력 필드*/}
                        <input
                            className={`w-full p-3 border rounded-lg outline-none
              ${emailTouched && !isValidEmail ? "border-red-500" : "border-gray-300"}`}
                            placeholder="이메일을 입력해주세요!"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setEmailTouched(true)}
                        />

                        {emailTouched && !isValidEmail && (
                            <p className="text-red-500 text-sm mt-1">
                                올바른 이메일 형식을 입력해주세요.
                            </p>
                        )}

                        <button
                            onClick={() => {
                                if (checkDuplicateEmail()) { //중복된 이메일인지 확인 먼저
                                    alert("이미 회원가입한 이메일입니다.");
                                    return;
                                }
                                setStep(2);
                            }}
                            disabled={!canNextStep1}
                            className={`w-full mt-4 py-3 rounded-lg transition-colors duration-200
              ${
                                canNextStep1
                                    ? "bg-blue-500 text-white hover:bg-blue-700 cursor-pointer"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                        >
                            다음
                        </button>
                    </>
                )}

                {/*step2: 비밀번호 입력*/}
                {step === 2 && (
                    <>
                        {/*입력된 이메일 표시*/}
                        <p className="mb-2 text-sm text-gray-500">{email}</p>

                        {/*비밀번호 입력*/}
                        <div className="flex items-center border rounded-lg p-2 mb-2">
                            <input
                                type={showPassword ? "text" : "password"} //show상태에 따라
                                placeholder="비밀번호"
                                className="flex-1 outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={() => setPasswordTouched(true)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="text-gray-500 hover:text-black transition-colors duration-200 hover:scale-110"
                            >
                                {showPassword ? "hide" : "👁️"}
                            </button>

                        </div>

                        {/*비밀번호 길이 확인*/}
                        {passwordTouched && !isValidPassword && (
                            <p className="text-red-500 text-sm mb-2">
                                비밀번호는 6자 이상이어야 합니다.
                            </p>
                        )}

                        {/*비밀번호 확인*/}
                        <input
                            type="password"
                            placeholder="비밀번호 확인"
                            className={`w-full p-3 border rounded-lg mb-2
              ${confirmTouched && !isMatch ? "border-red-500" : ""}`}
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            onBlur={() => setConfirmTouched(true)}
                        />

                        {confirmTouched && !isMatch && (
                            <p className="text-red-500 text-sm">
                                비밀번호가 일치하지 않습니다.
                            </p>
                        )}

                        <button
                            onClick={() => setStep(3)}
                            disabled={!canNextStep2}
                            className={`w-full mt-4 py-3 rounded-lg transition-colors duration-200
              ${
                                canNextStep2
                                    ? "bg-blue-500 text-white hover:bg-blue-700 cursor-pointer"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                        >
                            다음
                        </button>
                    </>
                )}

                {/*step3: 닉네임 입력*/}
                {step === 3 && (
                    <>
                        <p className="text-sm text-gray-500 mb-3">
                            {email}
                        </p>

                        {/*프로필 이미지 ui만*/}
                        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4" />

                        <input
                            placeholder="닉네임 입력"
                            className="w-full p-3 border rounded-lg"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />

                        <button
                            onClick={handleSignup}
                            disabled={!canSubmit}
                            className={`w-full mt-4 py-3 rounded-lg transition-colors duration-200
              ${
                                canSubmit
                                    ? "bg-blue-500 text-white hover:bg-blue-700 cursor-pointer"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                        >
                            회원가입 완료
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}