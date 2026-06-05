import { memo } from "react";
import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

interface Props {
    movies: Movie[];
    onSelectMovie: (movie: Movie) => void;
}

function MovieList({ movies, onSelectMovie }: Props) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onSelect={onSelectMovie} />
            ))}
        </div>
    );
}

export default memo(MovieList);