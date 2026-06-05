import { memo, useState, type FormEvent } from "react";
import type { Language, SearchParams } from "../types/movie";

interface Props {
    onSearch: (params: SearchParams) => void;
}

function MovieSearchForm({ onSearch }: Props) {
    const [query, setQuery] = useState("");
    const [includeAdult, setIncludeAdult] = useState(false);
    const [language, setLanguage] = useState<Language>("ko-KR");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // 검색어가 비어있으면 불필요한 API 요청 방지
        if (query.trim() === "") return;
        // 부모 컴포넌트로 검색 조건 전달
        onSearch({ query: query.trim(), includeAdult, language });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="sticky top-0 z-10 bg-white px-4 py-5 shadow-sm border-b border-gray-200"
        >
            <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-3">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="영화 제목을 입력하세요"
                    className="flex-1 min-w-[200px] px-4 py-2 rounded-md bg-gray-100 text-gray-900 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="px-3 py-2 rounded-md bg-gray-100 text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="ko-KR">한국어</option>
                    <option value="en-US">영어</option>
                    <option value="ja-JP">일본어</option>
                </select>

                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={includeAdult}
                        onChange={(e) => setIncludeAdult(e.target.checked)}
                        className="w-4 h-4 accent-blue-600"
                    />
                    성인 콘텐츠 포함
                </label>

                <button
                    type="submit"
                    className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                >
                    검색
                </button>
            </div>
        </form>
    );
}

export default memo(MovieSearchForm);