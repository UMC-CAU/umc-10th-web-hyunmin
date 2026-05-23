import { useEffect, useRef, useState } from "react";

// value를 interval마다 한 번만 반영하는 throttle 훅
export default function useThrottle<T>(
    value: T,
    interval: number
) {
    // 실제 throttle 적용된 값
    const [throttledValue, setThrottledValue] = useState(value);

    // 마지막 실행 시간 저장
    const lastExecuted = useRef(Date.now());

    useEffect(() => {
        const now = Date.now();

        // 마지막 실행 이후 interval 지났는지 확인
        const remaining =
            interval - (now - lastExecuted.current);

        // interval 지났으면 즉시 실행
        if (remaining <= 0) {
            setThrottledValue(value);
            lastExecuted.current = now;
        } else {
            // interval 안 지났으면 남은 시간 뒤 실행
            const timer = setTimeout(() => {
                setThrottledValue(value);
                lastExecuted.current = Date.now();
            }, remaining);

            // 언마운트, 값 변경하면 타이머 제거
            return () => clearTimeout(timer);
        }
    }, [value, interval]);
    return throttledValue;
}