import { axiosInstance } from "./axios";
import type { MovieResponse, SearchParams } from "../types/movie";

export const searchMovies = async ({
                                       query,
                                       includeAdult,
                                       language,
                                   }: SearchParams): Promise<MovieResponse> => {
    const { data } = await axiosInstance.get<MovieResponse>("/search/movie", {
        params: {
            query,
            include_adult: includeAdult,
            language,
        },
    });
    return data;
};

export const getPopularMovies = async (): Promise<MovieResponse> => {
    const { data } = await axiosInstance.get<MovieResponse>("/movie/popular", {
        params: { language: "ko-KR" },
    });
    return data;
};