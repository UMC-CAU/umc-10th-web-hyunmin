import { useParams, useNavigate } from "react-router-dom";

function MovieDetailPage() {
    const { movieId } = useParams();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
            <h1 className="text-2xl font-bold">영화 상세 페이지</h1>
            <p className="text-gray-600">movieId: {movieId}</p>
            <button
                onClick={() => navigate("/")}
                className="px-4 py-2 rounded-md bg-blue-600 text-white"
            >
                홈으로
            </button>
        </div>
    );
}

export default MovieDetailPage;