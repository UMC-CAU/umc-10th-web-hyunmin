import { useState } from "react";
import instance from "../apis/axios";

export default function MyPage() {

    const [name, setName] = useState(
        localStorage.getItem("userName") || ""
    );

    const [bio, setBio] = useState("");

    const [avatar, setAvatar] = useState("");

    const saveProfile = async () => {
        try {
            //사용자 정보 수정(기존 데이터 일부 수정이므로 PATCH)
            await instance.patch("/v1/users", {
                name,
                bio,
                avatar,
            });

            localStorage.setItem("userName", name);

            alert("수정 완료");
        } catch {
            alert("수정 실패");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">

            <h1 className="text-2xl font-bold mb-6">
                마이페이지
            </h1>

            <input
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
                placeholder="이름"
                className="w-full border p-3 rounded-lg mb-3"
            />

            <input
                value={bio}
                onChange={(e) =>
                    setBio(e.target.value)
                }
                placeholder="bio"
                className="w-full border p-3 rounded-lg mb-3"
            />

            <input
                value={avatar}
                onChange={(e) =>
                    setAvatar(e.target.value)
                }
                placeholder="프로필 이미지 URL"
                className="w-full border p-3 rounded-lg mb-3"
            />

            <button
                onClick={saveProfile}
                className="w-full bg-pink-500 text-white py-3 rounded-lg"
            >
                저장
            </button>
        </div>
    );
}