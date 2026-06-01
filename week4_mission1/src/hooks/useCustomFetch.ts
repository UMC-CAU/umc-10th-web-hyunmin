import { useEffect, useState } from "react";
import axios from "axios";

//커스텀 훅
export const useCustomFetch = <T,>(url: string) => {
    //상태 관리 부분
    const [data, setData] = useState<T | null>(null); //API 응답 데이터
    const [loading, setLoading] = useState(false); //로딩 상태
    const [error, setError] = useState(false); //에러 상태

    useEffect(() => {
        //url 바뀔 때마다 자동으로 재요청되도록 의존성 설정
        const fetchData = async () => {
            setLoading(true);
            setError(false);

            try {
                const res = await axios.get<T>(url, {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    },
                });

                setData(res.data);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]); //url 바뀌면 자동으로 재요청

    return { data, loading, error };
};