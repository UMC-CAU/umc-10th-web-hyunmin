import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import LPModal from "./LPModal";

export default function Layout({
                                   children,
                               }: {
    children: React.ReactNode;
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    const token = localStorage.getItem("accessToken");
    const userName = localStorage.getItem("userName");

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userName");

        window.location.href = "/login";
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/*헤더*/}
            <Navbar
                isLoggedIn={!!token}
                userName={userName}
                onLogout={logout}
                onMenuClick={() => setIsOpen(true)}
            />

            <div className="flex">
                {/*사이드바*/}
                <Sidebar
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />

                {/*메인*/}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>

            {/*플로팅 버튼*/}
            <button
                onClick={() => setIsModalOpen(true)} //우측 하단 플로팅 버튼 클릭 시 모달 상태를 true로 변경하여 LP 작성 모달 표시
                className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-pink-500 text-white text-3xl shadow-lg hover:scale-110 transition-all"
            >
                +
            </button>

            {isModalOpen && (
                <LPModal
                    onClose={() => setIsModalOpen(false)} //모달이 열려 있을 때만 렌더링되도록
                />
            )}
        </div>
    );
}