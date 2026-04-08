import {useEffect, useState} from "react";
import axios from 'axios'
import MovieCard from "../components/MovieCard.tsx";
import type {Movie, MovieResponse} from "../types/movie.ts";

export default function MoviePage() {
    const [movies,setMovies] = useState<Movie[]>([]); //영화리스트 저장 배열
    useEffect(()=> {
        const fetchMovies = async() => {
            const {data} = await axios.get<MovieResponse> ( //axios.get<타입> : 응답 데이터 타입을 지정
                'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KO&page=1&sort_by=popularity.desc',
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    }
                }
            );
            console.log(data); //API 응답 확인용
        setMovies(data.results); //받아온 영화 리스트 저장
        };
        fetchMovies();
        }, []); //[]=의존성 x : 처음 렌더링될 때 한번만 실행


return <div className ='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4
lg:grid-cols-5 xl:grid-cols-6'>
    {movies.map((movie) =>(
        <MovieCard key={movie.id} movie={movie}/>))}
</div>
}