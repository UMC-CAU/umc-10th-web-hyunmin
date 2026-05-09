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