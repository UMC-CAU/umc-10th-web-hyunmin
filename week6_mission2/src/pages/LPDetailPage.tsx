import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import Layout from "../components/Layout";
import { useLPDetailQuery } from "../hooks/queries/useLpQueries";
import { useCommentQuery } from "../hooks/queries/useCommentQuery";

export default function LPDetailPage() {
    const { lpid } = useParams();

    const [order] = useState<"asc" | "desc">("desc");

    //LP 상세
    const {
        data: lpData,
        isLoading: lpLoading,
        isError,
        refetch,
    } = useLPDetailQuery(lpid || "");

    //댓글 무한스크롤
    const {
        data: commentData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: commentLoading,
    } = useCommentQuery(lpid || "", order);

    //observer
    const observerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        });

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [hasNextPage]);

    //LP 로딩
    if (lpLoading) {
        return <div className="p-10">로딩중...</div>;
    }

    //LP 에러
    if (isError) {
        return (
            <Layout>
                <div className="p-10 flex flex-col gap-2">
                    <p>에러가 발생했습니다.</p>

                    <button
                        onClick={() => refetch()}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                        다시 시도
                    </button>
                </div>
            </Layout>
        );
    }

    const lp = lpData?.data;

    return (
        <Layout>
            <div className="min-h-screen p-10">

                {/*LP 상세*/}
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

                <div className="flex gap-2 mb-10">
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

                {/*댓글*/}
                <h2 className="text-xl font-bold mb-4">댓글</h2>

                {/*skeleton*/}
                {commentLoading &&
                    Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-12 bg-gray-200 animate-pulse rounded mb-2"
                        />
                    ))}

                {/*댓글 리스트*/}
                {commentData?.pages.map((page: any) =>
                    page.data.data.map((comment: any) => (
                        <div
                            key={comment.id}
                            className="border-b py-2"
                        >
                            <p>{comment.content}</p>
                            <p className="text-sm text-gray-500">
                                {comment.author.name}
                            </p>
                        </div>
                    ))
                )}

                {isFetchingNextPage && (
                    <p className="text-center text-gray-400 mt-2">
                        로딩중...
                    </p>
                )}

                {/*observer*/}
                <div ref={observerRef} />
            </div>
        </Layout>
    );
}