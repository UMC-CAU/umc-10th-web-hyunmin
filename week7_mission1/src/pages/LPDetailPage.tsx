import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import Layout from "../components/Layout";
import { useLPDetailQuery } from "../hooks/queries/useLpQueries";
import { useCommentQuery } from "../hooks/queries/useCommentQuery";
import { useLikeMutation } from "../hooks/mutations/useLikeMutation";
import {
    useCreateCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
} from "../hooks/mutations/useCommentMutation";
import {
    useUpdateLPMutation,
    useDeleteLPMutation,
} from "../hooks/mutations/useLpMutation";

export default function LPDetailPage() {
    const { lpid } = useParams();

    const [order] = useState<"asc" | "desc">("desc");

    const [comment, setComment] = useState("");

    const [editingId, setEditingId] =
        useState<number | null>(null);

    const [editContent, setEditContent] =
        useState("");

    const [isEditingLP, setIsEditingLP] =
        useState(false);

    const [editTitle, setEditTitle] =
        useState("");

    const [editLPContent, setEditLPContent] =
        useState("");

    const myName = localStorage.getItem("userName");

    const likeMutation =
        useLikeMutation(lpid || "");

    const commentMutation =
        useCreateCommentMutation(lpid || "");

    const updateCommentMutation =
        useUpdateCommentMutation(lpid || "");

    const deleteCommentMutation =
        useDeleteCommentMutation(lpid || "");

    const updateLPMutation =
        useUpdateLPMutation(lpid || "");

    const deleteLPMutation =
        useDeleteLPMutation(); //LP 삭제 API 호출

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
        //스크롤이 observer 영역에 도달했는지 감지
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage(); //스크롤 끝 도달하면 자동으로 다음 댓글 데이터 요청
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

                <p className="mb-8">
                    {lp.content}
                </p>

                <div className="flex gap-2 mb-10">
                    <button
                        onClick={() => {
                            setIsEditingLP(true);
                            setEditTitle(lp.title);
                            setEditLPContent(lp.content);
                        }}
                        className="px-4 py-2 bg-yellow-400 rounded-lg"
                    >
                        수정
                    </button>

                    <button
                        onClick={() => {
                            const ok = confirm(
                                "삭제하시겠습니까?"
                            );

                            if (ok) {
                                deleteLPMutation.mutate(
                                    lpid || ""
                                );
                            }
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                        삭제
                    </button>

                    <button
                        onClick={() =>
                            likeMutation.mutate() //좋아요 추가는 서버 상태 변경 작업이므로 mutation
                        }
                        className="px-4 py-2 bg-pink-500 text-white rounded-lg"
                    >
                        좋아요
                    </button>
                </div>

                {/*LP 수정 UI*/}
                {isEditingLP && (
                    <div className="border p-4 rounded-lg mb-6 flex flex-col gap-2">
                        <input
                            value={editTitle}
                            onChange={(e) =>
                                setEditTitle(
                                    e.target.value
                                )
                            }
                            className="border p-2 rounded-lg"
                        />

                        <textarea
                            value={editLPContent}
                            onChange={(e) =>
                                setEditLPContent(
                                    e.target.value
                                )
                            }
                            className="border p-2 rounded-lg"
                        />

                        <button
                            onClick={() => {
                                updateLPMutation.mutate({ //lp 수정 수정 데이터를 서버로 보내는 요청 시작
                                    title: editTitle,
                                    content: editLPContent,
                                    thumbnail: lp.thumbnail,
                                    tags: [],
                                    published: true,
                                });

                                setIsEditingLP(false);
                            }}
                            className="bg-blue-500 text-white p-2 rounded-lg"
                        >
                            저장
                        </button>
                    </div>
                )}

                {/*댓글*/}
                <h2 className="text-xl font-bold mb-4">
                    댓글
                </h2>

                {/*skeleton*/}
                {commentLoading &&
                    Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-12 bg-gray-200 animate-pulse rounded mb-2"
                        />
                    ))}

                {/*댓글 작성*/}
                <div className="flex gap-2 mb-4">
                    <input
                        value={comment}
                        onChange={(e) =>
                            setComment(
                                e.target.value
                            )
                        }
                        placeholder="댓글 입력"
                        className="border p-2 flex-1 rounded-lg"
                    />

                    <button
                        onClick={() => {
                            //댓글 작성은 서버 상태 변경 작업이므로 mutation
                            commentMutation.mutate(
                                comment
                            );

                            setComment("");
                        }}
                        className="bg-pink-500 text-white px-4 rounded-lg"
                    >
                        작성
                    </button>
                </div>

                {/*댓글 리스트*/}
                {commentData?.pages.map((page: any) =>
                    page.data.data.map((comment: any) => (
                        <div
                            key={comment.id}
                            className="border-b py-2"
                        >
                            {editingId === comment.id ? (
                                <div className="flex gap-2">
                                    <input
                                        value={editContent}
                                        onChange={(e) =>
                                            setEditContent(
                                                e.target.value
                                            )
                                        }
                                        className="border p-2 rounded-lg flex-1"
                                    />

                                    <button
                                        onClick={() => {
                                            updateCommentMutation.mutate(
                                                {
                                                    commentId:
                                                    comment.id,
                                                    content:
                                                    editContent,
                                                }
                                            );

                                            setEditingId(
                                                null
                                            );
                                        }}
                                        className="bg-blue-500 text-white px-3 rounded-lg"
                                    >
                                        저장
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <p>
                                        {comment.content}
                                    </p>

                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-500">
                                            {
                                                comment.author
                                                    .name
                                            }
                                        </p>

                                        {/*본인 댓글만 수정 삭제 가능*/}
                                        {comment.author.name ===
                                            myName && (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setEditingId(
                                                                comment.id
                                                            );

                                                            setEditContent(
                                                                comment.content
                                                            );
                                                        }}
                                                        className="text-yellow-500"
                                                    >
                                                        수정
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            deleteCommentMutation.mutate(
                                                                comment.id
                                                            )
                                                        }
                                                        className="text-red-500"
                                                    >
                                                        삭제
                                                    </button>
                                                </div>
                                            )}
                                    </div>
                                </>
                            )}
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