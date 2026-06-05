import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchMovies, getPopularMovies } from "./apis/movie";
import type { Movie, SearchParams } from "./types/movie";
import MovieSearchForm from "./components/MovieSearchForm";
import MovieList from "./components/MovieList";
import MovieModal from "./components/MovieModal";

function App() {
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // 검색이 실행됐는지 여부
  const isSearching = !!searchParams && searchParams.query.trim() !== "";

  // 검색 결과 쿼리 (검색했을 때만)
  // enabled로 검색이 실행되기 전에는 요청하지 않음
  const searchQuery = useQuery({
    queryKey: ["searchMovies", searchParams],
    queryFn: () => searchMovies(searchParams!),
    enabled: isSearching,
  });

  // 검색 중이 아닐 때만 인기영화 조회
  const popularQuery = useQuery({
    queryKey: ["popularMovies"],
    queryFn: getPopularMovies,
    enabled: !isSearching,
  });

  // 현재 보여줄 쿼리 선택
  const activeQuery = isSearching ? searchQuery : popularQuery;
  const { data, isLoading, isError } = activeQuery;

  const handleSearch = useCallback((params: SearchParams) => {
    setSearchParams(params);
  }, []);

  const handleSelectMovie = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  // 평점 순으로 정렬 (useMem를 사용하여 data가 변경될 때만)
  const sortedMovies = useMemo(() => {
    if (!data?.results) return [];
    return [...data.results].sort((a, b) => b.vote_average - a.vote_average);
  }, [data]);

  return (
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <MovieSearchForm onSearch={handleSearch} />

        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* 검색 전이면 안내 문구 */}
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            {isSearching ? "검색 결과" : "인기 영화"}
          </h2>

          {isLoading && <p className="text-center text-gray-500">불러오는 중...</p>}
          {isError && (
              <p className="text-center text-red-500">에러가 발생했어요.</p>
          )}
          {!isLoading && data && sortedMovies.length === 0 && (
              <p className="text-center text-gray-400">검색 결과가 없습니다.</p>
          )}
          <MovieList movies={sortedMovies} onSelectMovie={handleSelectMovie} />
        </main>

        {selectedMovie && (
            <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
        )}
      </div>
  );
}

export default App;