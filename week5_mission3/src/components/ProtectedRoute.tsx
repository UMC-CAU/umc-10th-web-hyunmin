import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
    //로컬스토리지에 저장된 토큰 가져오기 (로그인 여부 판단)
  const token = localStorage.getItem("accessToken");

  //로그인 안 된 상태 (=토큰 없음)
  if (!token) {
      //보호된 페이지 접근 막고 로그인 페이지로 이동
    return <Navigate to="/login" replace />;
  }

  //로그인 된 상태
  return children;
}