import { useNavigate } from "react-router-dom";
import { login } from "../apis/auth";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });

    //로그인 요청 처리 함수
  const onSubmit = async (data: FormData) => {
    try {
        //백엔드 로그인 api 호출
      const res = await login(data.email, data.password);

      //서버에서 받은 accessToken 꺼내기
      const accessToken = res?.data?.accessToken;

      if (!accessToken) { //토큰없을때
        alert("로그인 실패");
        return;
      }

        //로그인 성공 -> 토큰 저장(로그인 상태유지)
      localStorage.setItem("accessToken", accessToken);

      alert("로그인 성공!");
      navigate("/");
    } catch (error: any) {
      //로그인에러, 실패
      console.log("로그인 에러:", error);
      alert("로그인 실패");
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

          <h2 className="ml-3 text-lg font-semibold">로그인</h2>
        </div>

        {/*이메일 입력*/}
        <input
          {...register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "유효하지 않은 이메일 형식입니다.",
            },
          })}
          placeholder="이메일"
          className="w-full p-3 border rounded-lg mb-2"
        />

        {errors.email && (
          <p className="text-red-500 text-sm mb-2">
            {errors.email.message}
          </p>
        )}

        {/*비밀번호 입력*/}
        <input
          type="password"
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            minLength: {
              value: 6,
              message: "비밀번호는 최소 6자 이상이어야 합니다.",
            },
          })}
          placeholder="비밀번호"
          className="w-full p-3 border rounded-lg mb-2"
        />

        {errors.password && (
          <p className="text-red-500 text-sm mb-2">
            {errors.password.message}
          </p>
        )}

        <button
          type="submit"
          disabled={!isValid}
          className="w-full bg-blue-500 text-white hover:bg-blue-700 cursor-pointer rounded-lg py-2"
        >
          로그인
        </button>
      </form>
    </div>
  );
}