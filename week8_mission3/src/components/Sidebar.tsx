import { Link } from "react-router-dom";
import { useDeleteUserMutation } from "../hooks/mutations/useAuthMutation";

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function Sidebar({
                                    isOpen,
                                    onClose,
                                }: SidebarProps) {

    const deleteUserMutation =
        useDeleteUserMutation();

    return (
        <>
            {/*모바일 오버레이*/}
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ease-in-out
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            />

            <aside
                className={`
                    fixed md:static top-0 left-0 z-50
                    w-64 h-screen bg-white shadow-lg
                    transform transition-transform duration-300 ease-in-out
                    ${
                        isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
    `}>
                <div className="p-6 text-xl font-bold border-b">
                    메뉴
                </div>

                <nav className="flex flex-col p-4 gap-3">

                    <Link
                        to="/lps"
                        className="hover:bg-gray-100 p-2 rounded-lg"
                    >
                        홈
                    </Link>

                    <Link
                        to="/mypage"
                        className="hover:bg-gray-100 p-2 rounded-lg"
                    >
                        마이페이지
                    </Link>

                    <button
                        onClick={() => {
                            const ok = confirm(
                                "정말 탈퇴하시겠습니까?"
                            );

                            if (ok) {
                                deleteUserMutation.mutate();
                            }
                        }}
                        className="text-left hover:bg-gray-100 p-2 rounded-lg text-red-500"
                    >
                        탈퇴하기
                    </button>

                </nav>
            </aside>
        </>
    );
}