import instance from "./axios";
//LP 목록 조회
export const getLPList = async (
    cursor = 0,
    limit = 10,
    search = "",
    order: "asc" | "desc" = "desc"
) => {
    const response = await instance.get("/v1/lps", {
        params: {
            cursor,
            limit,
            search,
            order,
        },
    });

    return response.data;
};

//LP 상세 조회
export const getLPDetail = async (lpId: string) => {
    const response = await instance.get(`/v1/lps/${lpId}`);

    return response.data;
};

//LP 생성
export const createLP = async (formData: FormData) => {
    const response = await instance.post(
        "/v1/lps",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

//좋아요 추가
export const addLike = async (lpId: string) => {
    const res = await instance.post(`/v1/lps/${lpId}/likes`);

    return res.data;
};

//LP 수정
export const updateLP = async (
    lpId: string,
    body: {
        title: string;
        content: string;
        thumbnail: string;
        tags: string[];
        published: boolean;
    }
) => {
    const res = await instance.patch(
        `/v1/lps/${lpId}`,
        body
    );

    return res.data;
};

//LP 삭제
export const deleteLP = async (lpId: string) => {
    const res = await instance.delete(`/v1/lps/${lpId}`);

    return res.data;
};