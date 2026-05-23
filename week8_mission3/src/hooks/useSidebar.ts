import { useEffect, useState } from "react";

export default function useSidebar() {
    const [isOpen, setIsOpen] = useState(false);

    // 열기
    const open = () => setIsOpen(true);

    // 닫기
    const close = () => setIsOpen(false);

    // 토글
    const toggle = () => {
        setIsOpen((prev) => !prev);
    };

    // ESC 키 감지
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                close();
            }
        };

        // Sidebar 열려있을 때만 등록
        if (isOpen) {
            window.addEventListener(
                "keydown",
                handleKeyDown
            );
        }

        // cleanup 함수
        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [isOpen]);

    return {
        isOpen,
        open,
        close,
        toggle,
    };
}