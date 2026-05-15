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

        setTags((prev) => [...prev, tagInput]);
        setTagInput("");
    };

    const removeTag = (target: string) => {
        setTags((prev) =>
            prev.filter((tag) => tag !== target)
        );
    };

    const handleSubmit = () => {
        const formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);

        if (thumbnail) {
            formData.append("thumbnail", thumbnail);
        }

        tags.forEach((tag) => {
            formData.append("tags", tag);
        });

        createLPMutation.mutate(formData);
    };

    return (
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-2xl w-[400px]"
                onClick={(e) => e.stopPropagation()}
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
                    type="file"
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