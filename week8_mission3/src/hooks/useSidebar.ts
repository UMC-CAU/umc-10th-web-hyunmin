import { useState } from "react";

export default function useSidebar() {
    // Sidebar 열림 상태
    const [isOpen, setIsOpen] =
        useState(false);

    // 열기
    const open = () => {
        setIsOpen(true);
    };

    // 닫기
    const close = () => {
        setIsOpen(false);
    };

    // 토글
    const toggle = () => {
        setIsOpen((prev) => !prev);
    };

    return {
        isOpen,
        open,
        close,
        toggle,
    };
}