import { useCartStore } from "../store/useCartStore";

const Modal = () => {
    const {
        clearCart,
        closeModal,
    } = useCartStore();

    const handleConfirm = () => {
        clearCart();
    };

    const handleCancel = () => {
        closeModal();
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
                    <button
                        onClick={handleCancel}
                        className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                        아니요
                    </button>

                    <button
                        onClick={handleConfirm}
                        className="flex-1 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                    >
                        네
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;