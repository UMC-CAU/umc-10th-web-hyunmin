import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

//로그인한 사용자만 접근 가능하게
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isLogin } = useAuth(); //로그인 여부확인

    //로그인 안 했으면 로그인 페이지로
    if (!isLogin) {
        return <Navigate to="/login" replace />;
    }

    //로그인 상태면
    return children;
}