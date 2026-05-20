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
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                />
            )}

            <aside
                className={`
                    fixed md:static top-0 left-0 z-50
                    w-64 h-screen bg-white shadow-lg
                    transform transition-transform duration-300
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                `}
            >
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
                            const ok = confirm( //실수로 탈퇴하는 상황 방지 위해 confirm함수 이용
                                //confirm 사용하면 확인, 취소 팝업 뜸 (확인: true, 취소: false)
                                "정말 탈퇴하시겠습니까?"
                            );

                            if (ok) {
                                deleteUserMutation.mutate(); //회원 탈퇴는 서버 상태 변경 작업이므로 mutatio
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