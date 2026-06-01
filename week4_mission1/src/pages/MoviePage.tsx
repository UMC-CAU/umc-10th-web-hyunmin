import MovieCard from "../components/MovieCard";
import type { MovieResponse } from "../types/movie";
import PaginationButtons from "../components/Buttons";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useCustomFetch } from "../hooks/useCustomFetch";
import { LoadingSpinner } from "../components/LoadingSpinner";

export default function MoviePage() {
    const { category } = useParams<{ category: string }>();
    const [page, setPage] = useState(1);

    const url = `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`;

    //커스텀 훅 사용해서 데이터, 로딩, 에러 상태를 한 번에 관리
    const { data, loading, error } = useCustomFetch<MovieResponse>(url);

    //로딩 중일 때 스피너
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="text-red-500 text-xl text-center mt-10">데이터 불러오는 중 오류가 발생했습니다.
            </div>
        );
    }

    return (
        <>
            <PaginationButtons page={page} setPage={setPage} />

            <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {data.results.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </>
    );
}