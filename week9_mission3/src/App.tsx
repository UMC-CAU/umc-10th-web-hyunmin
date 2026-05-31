import CartItem from "./components/CartItem";
import Modal from "./components/Modal";

import { useCartStore } from "./store/useCartStore";

function App() {
  const {
    cartItems,
    amount,
    total,
    isOpen,
    openModal,
  } = useCartStore();

  return (
      <>
        {isOpen && <Modal />}

        <div className="min-h-screen bg-slate-100 py-10">
          <div className="max-w-5xl mx-auto px-4">

            <h1 className="text-4xl font-bold text-center mb-10">
              UMC Play List
            </h1>

            <div className="bg-white rounded-xl px-6">
              {cartItems.map((item) => (
                  <CartItem
                      key={item.id}
                      item={item}
                  />
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mt-8">

              <div className="flex justify-between text-lg">
                <span>총 수량</span>
                <span className="font-bold">
                                {amount}
                            </span>
              </div>

              <div className="flex justify-between text-lg mt-3">
                <span>총 금액</span>
                <span className="font-bold text-blue-600">
                                {total.toLocaleString()}원
                            </span>
              </div>

              <button
                  onClick={openModal}
                  className="w-full mt-5 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600"
              >
                전체 삭제
              </button>

            </div>

          </div>
        </div>
      </>
  );
}

export default App;