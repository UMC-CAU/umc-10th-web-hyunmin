import { useState } from "react";
import { useCreateLPMutation } from "../hooks/mutations/useLpMutation";

export default function LPModal({
                                    onClose,
                                }: {
    onClose: () => void;
}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [thumbnail, setThumbnail] =
        useState<File | null>(null);

    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const createLPMutation =
        useCreateLPMutation(onClose);

    const addTag = () => {
        if (!tagInput.trim()) return;

        setTags((prev) => [...prev, tagInput]); //원래 있던 배열에서 새 배열(새로운거 추가했으니까)
        setTagInput("");
    };

    const removeTag = (target: string) => {
        setTags((prev) =>
            prev.filter((tag) => tag !== target)
        );
    };

    const handleSubmit = () => {
        const formData = new FormData(); //일반 JSON으로는 파일 업로드가 불가능하기 때문에 FormData 사용

        formData.append("title", title);
        formData.append("content", content);

        if (thumbnail) {
            formData.append("thumbnail", thumbnail);
        }

        tags.forEach((tag) => {
            formData.append("tags", tag);
        });

        //LP 생성은 서버 데이터를 변경하는 작업이므로 useMutation
        createLPMutation.mutate(formData);
    };

    return (
        <div
            //오버레이:모달 뒤에 깔리는 검은 반투명 배경
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            onClick={onClose} //오버레이 영역 클릭하면 모달 닫히게
        >
            <div
                className="bg-white p-6 rounded-2xl w-[400px]"
                onClick={(e) => e.stopPropagation()} //내부 클릭하면 모달 닫히지 않게
                //(클릭이벤트는 부모까지 전파됨. 모달 내부 클릭도 overlay까지 전달되면 모달이 닫혀버림 그래서 stopPropagation로 내부는 안닫히게
            >
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-bold">
                        LP 추가
                    </h2>

                    <button onClick={onClose}>
                        X
                    </button>
                </div>

                <input
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    placeholder="제목"
                    className="w-full border p-2 rounded mb-3"
                />

                <textarea
                    value={content}
                    onChange={(e) =>
                        setContent(e.target.value)
                    }
                    placeholder="내용"
                    className="w-full border p-2 rounded mb-3"
                />

                <input
                    type="file" //lp이미지 업로드 가능하게(파일 입력창)
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                            setThumbnail(
                                e.target.files[0]
                            );
                        }
                    }}
                    className="mb-3"
                />

                <div className="flex gap-2 mb-3">
                    <input
                        value={tagInput}
                        onChange={(e) =>
                            setTagInput(e.target.value)
                        }
                        placeholder="태그 입력"
                        className="flex-1 border p-2 rounded"
                    />

                    <button
                        onClick={addTag}
                        className="bg-pink-500 text-white px-3 rounded"
                    >
                        추가
                    </button>
                </div>

                <div className="flex gap-2 flex-wrap mb-4">
                    {tags.map((tag) => (
                        <div
                            key={tag}
                            className="bg-gray-200 px-2 py-1 rounded flex gap-2"
                        >
                            <span>{tag}</span>

                            <button
                                onClick={() =>
                                    removeTag(tag)
                                }
                            >
                                x
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-pink-500 text-white py-2 rounded-lg"
                >
                    Add LP
                </button>
            </div>
        </div>
    );
}