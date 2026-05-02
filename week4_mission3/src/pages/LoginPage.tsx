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

  const onSubmit = async (data: FormData) => {
    try {
      const res = await login(data.email, data.password);

      localStorage.setItem("accessToken", res.data.accessToken);

      alert("로그인 성공!");
      navigate("/");
    } catch (e) {
      alert("로그인 실패");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[350px] bg-white p-6 rounded-2xl shadow-md"
      >
        <button onClick={() => navigate(-1)}>{"<"}</button>
        <h2 className="mb-4">로그인</h2>

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
          disabled={!isValid}
          className="w-full bg-blue-500 text-white py-2"
        >
          로그인
        </button>
      </form>
    </div>
  );
}