import { useDispatch } from "react-redux";

import { closeModal } from "../redux/modalSlice";
import { clearCart } from "../redux/cartSlice";

const Modal = () => {
    const dispatch = useDispatch();

    const handleConfirm = () => {
        dispatch(clearCart());
        dispatch(closeModal());
    };

    const handleCancel = () => {
        dispatch(closeModal());
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-[400px] shadow-2xl">
                <h2 className="text-xl font-bold">
                    전체 삭제
                </h2>

                <p className="mt-3 text-gray-600">
                    장바구니를 모두 비우시겠습니까?
                </p>

                <div className="flex gap-3 mt-6">
                    {/* 아니요 */}
                    <button
                        onClick={handleCancel}
                        className="
                            flex-1
                            py-2
                            rounded-lg
                            border border-gray-300
                            text-gray-700
                            hover:bg-gray-100
                            hover:border-gray-400
                            active:scale-95
                            transition-all
                        "
                    >
                        아니요
                    </button>

                    {/* 네 */}
                    <button
                        onClick={handleConfirm}
                        className="
                            flex-1
                            py-2
                            rounded-lg
                            bg-red-500
                            text-white
                            hover:bg-red-600
                            hover:shadow-md
                            hover:shadow-red-200
                            active:scale-95
                            transition-all
                        "
                    >
                        네
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;