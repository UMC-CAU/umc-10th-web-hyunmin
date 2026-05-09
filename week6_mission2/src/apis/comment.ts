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