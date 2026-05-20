type NavbarProps = {
    isLoggedIn: boolean;
    userName?: string | null;
    onLogout?: () => void;
    onMenuClick?: () => void;
};

export default function Navbar({
                                   isLoggedIn,
                                   userName,
                                   onLogout,
                                   onMenuClick,
                               }: NavbarProps) {
    return (
        <nav className="w-full h-16 px-6 flex items-center justify-between border-b bg-white">
            <div className="flex items-center gap-3">
                {/*버거 버튼*/}
                <button
                    onClick={onMenuClick}
                    className="md:hidden"
                >
                    <svg
                        width="36"
                        height="36"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.95 11.95h32m-32 12h32m-32 12h32"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                <h1 className="text-xl font-bold cursor-pointer">
                    LP
                </h1>
            </div>

            {/* 오른쪽 로그인 상태 */}
            <div className="flex items-center gap-3">
                {isLoggedIn ? (
                    <>
                        <span className="text-sm text-gray-700">
                            안녕하세요, {userName}님
                        </span>

                        <button
                            onClick={onLogout}
                            className="px-3 py-1 bg-red-500 text-white rounded-lg"
                        >
                            로그아웃
                        </button>
                    </>
                ) : (
                    <span className="text-sm text-gray-500">
                        로그인되지 않음
                    </span>
                )}
            </div>
        </nav>
    );
}