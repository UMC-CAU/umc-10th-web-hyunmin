import type {Movie} from '../types/movie';
import {useState} from "react";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
    movie: Movie; //props로 Movie타입 객체 받음
}

export default function MovieCard({movie}: MovieCardProps) {
    const [isHovered, setIsHovered] = useState(false); //hover에서 boolean타입: true(마우스올림), false(마우스 벗어남)
    const navigate = useNavigate(); //페이지 이동 함수

    return (<div
            onClick={() => navigate(`/movies/${movie.id}`)} //클릭하면 상세 페이지로 이동(동적 라우팅)
            className='relative rounded-xl shadow-lg overflow-hidden cursor-pointer w-44 transition-transform duration-500 hover:scale-105'
            onMouseEnter={ () => setIsHovered(true)} //마우스 올릴 때
            onMouseLeave={()  => setIsHovered(false)}> {/*마우스 벗어날때*/}
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                 alt={`${movie.title} 영화의 이미지`}
                 className=''/>

            {isHovered&& ( //호버상태일때
                <div className='absolute inset-0 bg-gradient-to-t from-black/50
             to-transparent backdrop-blur-md flex flex-col justify-center
             items-center text-white text-white p-4'>
                    <h2 className =' text-lg font-bold text-center leading-snug'>{movie.title}</h2>
                    <p className='text-sm text-gray-300 leading-relaxed mt-2
        line-clamp-5'>{movie.overview}</p>
                </div>)}
        </div>
    );
}