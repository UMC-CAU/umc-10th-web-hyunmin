import { useParams } from "react-router-dom";
import { useCustomFetch } from "../hooks/useCustomFetch";
import { LoadingSpinner } from "../components/LoadingSpinner";

interface MovieDetail {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    release_date: string;
}

interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string;
}

interface Credits {
    cast: Cast[];
}

const MovieDetailPage = () => {
    const { movieId } = useParams<{ movieId: string }>();

    const detailUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;
    const creditUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;

    const { data: movie, loading: loading1, error: error1 } =
        useCustomFetch<MovieDetail>(detailUrl);

    const { data: credits, loading: loading2, error: error2 } =
        useCustomFetch<Credits>(creditUrl);

    if (loading1 || loading2) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    if (error1 || error2 || !movie) {
        return (
            <div className="text-red-500 text-xl text-center mt-10">
                상세 정보를 불러오는 중 오류가 발생했습니다.
            </div>
        );
    }

    return (
        <div className="text-white">
            <div
                className="h-[400px] bg-cover bg-center flex items-end p-10"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
            >
                <div className="bg-black/60 p-6 rounded-xl">
                    <h1 className="text-3xl font-bold">{movie.title}</h1>
                    <p>{movie.release_date}</p>
                </div>
            </div>

            <div className="p-10 flex gap-10">
                <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    className="rounded-xl"
                />

                <div>
                    <h2 className="text-2xl font-bold mb-4 text-black">줄거리</h2>
                    <p className="text-black">{movie.overview}</p>
                    <p className="text-lg font-semibold text-black">
                        ⭐ {movie.vote_average} / 10
                    </p>
                </div>
            </div>

            <div className="p-10">
                <h2 className="text-2xl font-bold mb-4 text-black">출연진</h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                    {credits?.cast.slice(0, 8).map((actor) => (
                        <div key={actor.id} className="text-center">
                            <img
                                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                className="w-full rounded-lg mb-2 hover:scale-110 transition"
                            />
                            <p className="text-xl font-bold">{actor.name}</p>
                            <p className="text-sm text-black">{actor.character}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;