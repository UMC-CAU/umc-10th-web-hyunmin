import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";

//영화 상세 정보 타입 정의
interface MovieDetail {
    id: number;
    title: string; //제목
    overview: string; //줄거리
    poster_path: string; //포스터
    backdrop_path: string; //배경
    vote_average: number; //평점
    release_date: string; //개봉일
}

//배우(출연진) 정보 타입 정의
interface Cast {
    id: number;
    name: string; //이름
    character: string; //역할
    profile_path: string; //프로필 이미지
}

//출연진 목록
interface Credits {
    cast: Cast[];
}

const MovieDetailPage = () => {
    const { movieId } = useParams<{ movieId: string }>(); //URL에서 동적 파라미터(movieId) 가져옴

    const [movie, setMovie] = useState<MovieDetail | null>(null); //영화 상세 정보
    const [credits, setCredits] = useState<Credits | null>(null); //출연진 정보
    const [isPending, setIsPending] = useState(false); //로딩상태(true: 데이터 요청 중)
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchDetail = async () => { //비동기함수
            setIsPending(true);
            try {
                const detailRes = await axios.get<MovieDetail>( //영화상세 정보 API 호출
                    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                );

                const creditRes = await axios.get<Credits>( //출연진 API 호출
                    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                );

                setMovie(detailRes.data);
                setCredits(creditRes.data);

            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };

        fetchDetail();
    }, [movieId]); //movieId 바뀔때마다 재요철

    //로딩중일 때 UI
    if (isPending) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    //에러 or 데이터 없을 때
    if (isError || !movie) {
        return <div className="text-red-500 text-xl">에러 발생</div>;
    }

    return (
        <div className="text-white">
            {/*배경이미지 + 영화 상세 정보*/}
            <div
                className="h-[400px] bg-cover bg-center flex items-end p-10"
                style={{
                    //baackdrop_path로 배경이미지
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
            >
                <div className="bg-black/60 p-6 rounded-xl">
                    <h1 className="text-3xl font-bold">{movie.title}</h1>
                    <p>{movie.release_date}</p> {/*개봉일*/}
                </div>
            </div>

            {/*영화 상세 정보 영역*/}
            <div className="p-10 flex gap-10">
                <img //영화포스터
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    className="rounded-xl"
                />

                <div>  {/*줄거리 영역*/}
                    <h2 className="text-2xl font-bold mb-4 text-black">줄거리</h2>
                    <p className="text-black">{movie.overview}</p>
                    <p className="text-lg font-semibold text-black">
                        ⭐ {movie.vote_average} / 10
                    </p>
                </div>
            </div>

            {/*출연진 영역*/}
            <div className="p-10">
                <h2 className="text-2xl font-bold mb-4 text-black">출연진</h2>
                {/*배우 리스트*/}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                    {credits?.cast.slice(0, 8).map((actor) => (
                        <div className="text-center">
                            {/*출연진 이미지 +호버 효과*/}
                            <img
                                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                className="w-full rounded-lg mb-2 transition duration-300 hover:scale-110"
                            />
                            <p className="text-xl font-bold">{actor.name}</p>                            <p className="text-sm text-black">{actor.character}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;