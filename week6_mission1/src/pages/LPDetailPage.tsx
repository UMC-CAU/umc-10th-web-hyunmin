import { useParams } from "react-router-dom";
import { useLPDetailQuery } from "../hooks/queries/useLpQueries";
import Layout from "../components/Layout";

export default function LPDetailPage() {
    const { lpid } = useParams();

    const { data, isLoading, isError, refetch } =
        useLPDetailQuery(lpid || "");

    if (isLoading) {
        return <div className="p-10">로딩중...</div>;
    }

    if (isError) {
        return (
            <div className="p-10 flex flex-col gap-2">
                <p>에러가 발생했습니다.</p>

                <button
                    onClick={() => refetch()}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                    다시 시도
                </button>
            </div>
        );
    }

    const lp = data?.data;

    return (
        <Layout>
            <div className="min-h-screen p-10">
                <img
                    src={lp.thumbnail}
                    alt={lp.title}
                    className="w-full max-w-md rounded-xl mb-6"
                />

                <h1 className="text-3xl font-bold mb-2">
                    {lp.title}
                </h1>

                <p className="text-gray-500 mb-2">
                    {new Date(lp.createdAt).toLocaleDateString()}
                </p>

                <p className="mb-4">
                    ❤️ {lp.likes.length}
                </p>

                <p className="mb-8">{lp.content}</p>

                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-yellow-400 rounded-lg">
                        수정
                    </button>

                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg">
                        삭제
                    </button>

                    <button className="px-4 py-2 bg-pink-500 text-white rounded-lg">
                        좋아요
                    </button>
                </div>
            </div>
        </Layout>
    );
}