import { NavLink } from "react-router-dom"

//메뉴 목록(라우팅 경로 + 화면에 띄워지는 이름)
const LINKS = [
    {to: '/',label: '홈'},
    {to: '/movies/category/popular',label: '인기 영화'},
    {to: '/movies/category/now_playing',label: '상영 중'},
    {to: '/movies/category/top_rated',label: '평점 높은'},
    {to: '/movies/category/upcoming',label: '개봉 예정'},
]
export const NavBar = () => {
    return (
        <div className='flex gap-3 p-4'>
            {LINKS.map(({to, label}) => (
                <NavLink
                    key={to} //react용 (리스트 구분)
                    to={to} //router용 (이동할 경로)
                    //현재 페이지인지 확인해서 스타일 다르게
                    className={({ isActive}) => {
                        return isActive ? 'text-[#b2dab1] font-bold' //현재 페이지
                            : 'text-gray-500'; //기본
                    }}
                >
                    {label}
                </NavLink>
            ))}
        </div>
    )
}