import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../apis/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//회원가입 유효성 검사(zod)
const schema = z.object({
  email: z.string().email("올바른 이메일 형식을 입력해주세요."),
  password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다."),
  confirm: z.string(),
  nickname: z.string().min(1, "닉네임 입력"),
}).refine((data) => data.password === data.confirm, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["confirm"],
});

type FormData = z.infer<typeof schema>;

export default function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const email = watch("email");
  const password = watch("password");
  const confirm = watch("confirm");

    //회원가입 api요청
  const onSubmit = async (data: FormData) => {
    try {
      await signup(data.email, data.password, data.nickname);
      alert("회원가입 완료!");
      navigate("/login");
    } catch {
      alert("회원가입 실패");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[350px] bg-white p-6 rounded-2xl shadow-md"
      >
        <div className="flex items-center mb-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-200 cursor-pointer transition-all duration-200 active:scale-90"
          >
            {"<"}
          </button>
          <h2 className="ml-3 text-lg font-semibold">회원가입</h2>
        </div>

        {/*STEP 1*/}
        {step === 1 && (
          <>
            <input
              {...register("email")}
              placeholder="이메일을 입력해주세요!"
              className={`w-full p-3 border rounded-lg mb-2 ${
                errors.email ? "border-red-500" : ""
              }`}
            />

            {/*이메일 에러*/}
            {errors.email && (
              <p className="text-red-500 text-sm mb-2">
                {errors.email.message}
              </p>
            )}

            {/*다음단계로 이동*/}
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!!errors.email}
              className={`w-full mt-2 py-3 rounded-lg ${
                !errors.email
                  ? "bg-blue-500 text-white hover:bg-blue-700 cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              다음
            </button>
          </>
        )}

        {/*STEP 2*/}
        {step === 2 && (
          <>
            <p className="mb-2 text-sm text-gray-500">{email}</p>

            {/*비밀번호 입력*/}
            <div className="flex items-center border rounded-lg p-2 mb-2">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="비밀번호"
                className="flex-1 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                👁️
              </button>
            </div>

             {/*비밀번호 에러*/}
            {errors.password && (
              <p className="text-red-500 text-sm mb-2">
                {errors.password.message}
              </p>
            )}

            {/*비밀번호 확인*/}
            <input
              type="password"
              {...register("confirm")}
              placeholder="비밀번호 확인"
              className={`w-full p-3 border rounded-lg mb-2 ${
                errors.confirm ? "border-red-500" : ""
              }`}
            />

            {/*confirm 에러*/}
            {errors.confirm && (
              <p className="text-red-500 text-sm mb-2">
                {errors.confirm.message}
              </p>
            )}

            {/*추가 UI 에러 메시지 (비밀번호 불일치)*/}
            {passwordError && (
              <p className="text-red-500 text-sm mb-2">
                {passwordError}
              </p>
            )}

            {/*다음 버튼*/}
            <button
              type="button"
              onClick={() => {
                if (password !== confirm) {
                  setPasswordError("비밀번호가 일치하지 않습니다.");
                  return;
                }
                setPasswordError("");
                setStep(3);
              }}
              disabled={!!errors.password || !!errors.confirm}
              className={`w-full mt-2 py-3 rounded-lg ${
                !errors.password && !errors.confirm
                  ? "bg-blue-500 text-white hover:bg-blue-700 cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              다음
            </button>
          </>
        )}

        {/*STEP 3*/}
        {step === 3 && (
          <>
            <p className="text-sm text-gray-500 mb-3">{email}</p>

            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4" />

            <input
              {...register("nickname")}
              placeholder="닉네임 입력"
              className="w-full p-3 border rounded-lg mb-2"
            />

            {/*닉네임 에러*/}
            {errors.nickname && (
              <p className="text-red-500 text-sm mb-2">
                {errors.nickname.message}
              </p>
            )}

            <button
              type="submit"
              disabled={!isValid}
              className={`w-full mt-2 py-3 rounded-lg ${
                isValid
                  ? "bg-blue-500 text-white hover:bg-blue-700 cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              회원가입 완료
            </button>
          </>
        )}
      </form>
    </div>
  );
}