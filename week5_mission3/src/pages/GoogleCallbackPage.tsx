import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    //백엔드에서 URL에 담아 보낸 토큰 추출
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken && refreshToken) {
        //토큰 localStorage에 저장해서 로그인 상태 유지
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      //백엔드에서 함께 보낸 사용자 이름 저장
      localStorage.setItem("userName", params.get("name") ?? "");
      navigate("/");
    }
  }, []);
 // 토큰 처리 중
  return <div>구글 로그인 처리 중...</div>;
}