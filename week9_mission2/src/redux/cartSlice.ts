import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";

const initialAmount = cartItems.reduce(
    (sum, item) => sum + item.amount,
    0
);

const initialTotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.amount,
    0
);

const initialState = {
    cartItems,
    amount: initialAmount,
    total: initialTotal,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {
        increase: (state, action) => {
            const item = state.cartItems.find(
                (item) => item.id === action.payload
            );

            if (item) {
                item.amount += 1;
            }
        },

        decrease: (state, action) => {
            const item = state.cartItems.find(
                (item) => item.id === action.payload
            );

            if (!item) return;

            item.amount -= 1;

            if (item.amount < 1) {
                state.cartItems = state.cartItems.filter(
                    (cartItem) => cartItem.id !== action.payload
                );
            }
        },

        removeItem: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.id !== action.payload
            );
        },

        clearCart: (state) => {
            state.cartItems = [];
            state.amount = 0;
            state.total = 0;
        },

        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;

            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * Number(item.price);
            });

            state.amount = amount;
            state.total = total;
        },
    },
});

export const {
    increase,
    decrease,
    removeItem,
    clearCart,
    calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;