import { memo } from "react";
import type { Movie } from "../types/movie";

interface Props {
    movie: Movie;
    onClose: () => void;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieModal({ movie, onClose }: Props) {
    const imdbUrl = `https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative flex w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
                {/* 왼쪽: 포스터 */}
                {movie.poster_path ? (
                    <img
                        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                        alt={movie.title}
                        className="w-2/5 object-cover"
                    />
                ) : (
                    <div className="w-2/5 flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
                        No Image
                    </div>
                )}

                {/* 오른쪽: 정보 */}
                <div className="flex w-3/5 flex-col p-6 overflow-y-auto">
                    <h2 className="text-2xl font-bold text-gray-900">{movie.title}</h2>
                    {movie.original_title !== movie.title && (
                        <p className="mt-1 text-sm text-gray-500">{movie.original_title}</p>
                    )}
                    <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                        <span>⭐ {movie.vote_average.toFixed(1)}</span>
                        <span>📅 {movie.release_date || "정보 없음"}</span>
                    </div>
                    <p className="mt-4 flex-1 text-sm text-gray-700 leading-relaxed">
                        {movie.overview || "줄거리 정보가 없습니다."}
                    </p>

                    <div className="mt-6 flex gap-3">
                        <a
                            href={imdbUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-[2] whitespace-nowrap text-center px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                        >
                            IMDb에서 검색하기
                        </a>
                        <button
                            onClick={onClose}
                            className="flex-1 whitespace-nowrap px-4 py-2 rounded-md bg-white text-blue-600 border border-blue-600 font-semibold hover:bg-blue-50 transition-colors"
                        >
                            닫기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(MovieModal);