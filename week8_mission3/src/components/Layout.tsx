import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import LPModal from "./LPModal";
import useSidebar from "../hooks/useSidebar";

export default function Layout({
                                   children,
                               }: {
    children: React.ReactNode;
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        isOpen,
        close,
        toggle,
    } = useSidebar();

    const token = localStorage.getItem("accessToken");

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userName");

        window.location.href = "/login";
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/*헤더*/}
            <Navbar isLoggedIn={!!token}
                    onLogout={logout}
                    onMenuClick={toggle}
            />


            <div className="flex">
                {/*사이드바*/}
                <Sidebar
                    isOpen={isOpen}
                    onClose={close}
                />

                {/*메인*/}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>

            {/*플로팅 버튼*/}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-pink-500 text-white text-3xl shadow-lg hover:scale-110 transition-all"
            >
                +
            </button>

            {isModalOpen && (
                <LPModal
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}