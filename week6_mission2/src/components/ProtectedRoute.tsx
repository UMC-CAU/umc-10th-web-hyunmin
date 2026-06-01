import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
                                           children,
                                       }: {
    children: React.ReactNode;
}) {
    const token = localStorage.getItem("accessToken");

    const location = useLocation();

    //비로그인 상태
    if (!token) {
        alert("로그인이 필요한 서비스입니다.");

        //현재 가려던 경로 저장 후 로그인 페이지 이동
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    return children;
}