import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from './store'; 

export interface CartItem {
    productId: string;
}

export interface CartState {
    items: CartItem[];
}

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    } as CartState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            state.items.push(action.payload);
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.productId !== action.payload
            );
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.items;
export default cartSlice.reducer;
