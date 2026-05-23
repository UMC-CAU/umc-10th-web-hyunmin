import instance from "./axios";

//댓글 목록 조회
export const getComments = async (
    lpId: string,
    cursor = 0,
    limit = 10,
    order = "desc"
) => {
    const res = await instance.get(`/v1/lps/${lpId}/comments`, {
        params: { cursor, limit, order },
    });

    return res.data;
};

//댓글 추가
export const createComment = async (
    lpId: string,
    content: string
) => {
    const res = await instance.post(
        `/v1/lps/${lpId}/comments`,
        { content }
    );

    return res.data;
};

//댓글 수정
export const updateComment = async (
    lpId: string,
    commentId: number,
    content: string
) => {
    const res = await instance.patch(
        `/v1/lps/${lpId}/comments/${commentId}`,
        { content }
    );

    return res.data;
};

//댓글 삭제
export const deleteComment = async (
    lpId: string,
    commentId: number
) => {
    const res = await instance.delete(
        `/v1/lps/${lpId}/comments/${commentId}`
    );

    return res.data;
};