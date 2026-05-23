import { useEffect, useState } from "react";

// value를 delay(ms)만큼 늦게 반영하는 debounce 훅
export default function useDebounce<T>(
    value: T,
    delay: number
) {
    //실제로 지연되어 저장될 값
    const [debouncedValue, setDebouncedValue] =
        useState(value);

    useEffect(() => {
        // delay 이후 value 반영
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // value 또는 delay 변경 시 기존 타이머 제거
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}