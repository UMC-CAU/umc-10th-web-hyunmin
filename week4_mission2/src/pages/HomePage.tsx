import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    //로그아웃 함수
    const logout = () => {
        localStorage.removeItem("accessToken"); //토큰 삭제
        navigate("/login"); //로그인 페이지로 이동하게
    };

    return (
        <div>
            <h1>홈</h1>
        <button onClick={logout}>로그아웃</button>
        </div>
);
}