import {useEffect, useState} from "react";
import axios from 'axios'
import MovieCard from "../components/MovieCard.tsx";
import type {Movie, MovieResponse} from "../types/movie.ts";
import Buttons from "../components/Buttons";
import {useParams} from "react-router-dom";

function LoadingSpinner() { //로딩중일때
    return null;
}

export default function MoviePage() {
    //영화 리스트 상태
    const [movies,setMovies] = useState<Movie[]>([]); //영화리스트 저장 배열
    //로딩실패 (true: 요청 중)
    const [isPending, setIsPending] = useState(false);
    //에러상태 (true: 에러 발생?
    const [isError, setIsError] = useState(false);
    //페이지번호
    const [page, setPage] = useState(1);

    //url에서 category값 가져오기
    const {category} = useParams<{
        category: string;
    }>();

    useEffect(()=> {
        //영화 데이터 가져오는 함수(aysnc 비동기)
        const fetchMovies = async() => {
            setIsPending(true); //true: 로딩 시작
            try {
                const {data} = await axios.get<MovieResponse> ( //axios.get<타입> : 응답 데이터 타입을 지정
                    //category에 따라 api경로 바뀌게 url
                    `https://api.themoviedb.org/3/movie/${category}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        }
                    }
                );
                setMovies(data.results); //받아온 영화 리스트 저장
            }  catch {
                setIsError(true); //요청 실패 시 에러상태 (true)
            } finally {
                setIsPending(false); //false: 로딩종료
            }
            }
        fetchMovies();
    }, [page, category]); //page나 category 바뀔 때마다 재요청

    //에러발생시 UI
    if(isError) {
        return (
            <div>
                <span className='text-red-500 text-2xl'>영화 정보를 불러오는 중 에러가 발생했습니다.</span>
            </div>
        )
    }

    return (
        <>
            {/*페이지 이동 버튼 */}
            <Buttons page={page} setPage={setPage} />
            {isPending ? (
                <div className="flex items-center justify-center">
                    <LoadingSpinner />
                </div>
            ) : (
                <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </>
    )
}