interface PaginationButtonsProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PaginationButtons({ page, setPage }: PaginationButtonsProps) {
    return (
        <div className='flex items-center justify-center gap-6 mt-5'>
            {/* 이전 페이지 버튼 */}
            <button
                className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed'
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
            >
                {"<"}
            </button>

            {/* 현재 페이지 */}
            <span>{page} 페이지</span>

            {/* 다음 페이지 버튼 */}
            <button
                className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200 cursor-pointer'
                onClick={() => setPage((prev) => prev + 1)}
            >
                {">"}
            </button>
        </div>
    );
}