import { memo } from "react";
import type { Movie } from "../types/movie";

interface Props {
    movie: Movie;
    onSelect: (movie: Movie) => void;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie, onSelect }: Props) {
    return (
        <div
            onClick={() => onSelect(movie)}
            className="cursor-pointer rounded-lg overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
            {movie.poster_path ? (
                <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full aspect-[2/3] object-cover"
                />
            ) : (
                <div className="w-full aspect-[2/3] flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
                    No Image
                </div>
            )}
            <div className="p-2">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {movie.title}
                </h3>
                <p className="text-xs text-gray-500">⭐ {movie.vote_average.toFixed(1)}</p>
            </div>
        </div>
    );
}
// React.memo를 사용하여 props가 변경되지 않으면 재렌더링 방지하게
export default memo(MovieCard);