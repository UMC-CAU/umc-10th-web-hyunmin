import { useDispatch } from "react-redux";
import {
    increase,
    decrease,
    removeItem,
} from "../redux/cartSlice";

interface Props {
    item: any;
}

const CartItem = ({ item }: Props) => {
    const dispatch = useDispatch();

    return (
        <div className="flex justify-between items-center py-5 border-b border-gray-200">

            {/* 왼쪽 영역 */}
            <div className="flex items-center gap-4 flex-1">

                {/* 사진 크기 완전 고정 */}
                <div className="w-24 h-24 min-w-24 min-h-24 overflow-hidden rounded-md border border-gray-200">
                    <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* 정보 */}
                <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-lg truncate">
                        {item.title}
                    </h2>

                    <p className="text-gray-500 truncate">
                        {item.singer}
                    </p>

                    <p className="mt-2 font-bold text-blue-600">
                        <p className="mt-2 font-bold text-blue-600">
                            {(Number(item.price) * item.amount).toLocaleString()}원
                        </p>                    </p>
                </div>

            </div>

            {/* 오른쪽 영역 */}
            <div className="flex flex-col items-center gap-2 ml-4">

                <div className="flex items-center gap-3">

                    <button
                        onClick={() => dispatch(decrease(item.id))}
                        className="
              w-8 h-8
              rounded-full
              bg-gray-100
              hover:bg-gray-200
              transition
            "
                    >
                        -
                    </button>

                    <span className="font-semibold w-5 text-center">
            {item.amount}
          </span>

                    <button
                        onClick={() => dispatch(increase(item.id))}
                        className="
              w-8 h-8
              rounded-full
              bg-blue-100
              text-blue-700
              hover:bg-blue-200
              transition
            "
                    >
                        +
                    </button>

                </div>

                <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="
            text-sm
            text-red-500
            hover:text-red-700
          "
                >
                    삭제
                </button>

            </div>

        </div>
    );
};

export default CartItem;