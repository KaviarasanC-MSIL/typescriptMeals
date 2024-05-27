import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from './store';

export interface CartItem {
    productId: string;
    productName: string;
    productImage: string;
}

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            state.items.push(action.payload);
            updateLocalStorage(state.items);
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.productId !== action.payload);
            updateLocalStorage(state.items);
        },
        setCart: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
        },
    },
});

const updateLocalStorage = (cartItems: CartItem[]) => {
    const usersString = localStorage.getItem('user');
    if (usersString) {
        const users: any[] = JSON.parse(usersString);
        const activeUserIndex = users.findIndex(user => user.status === 'active');
        if (activeUserIndex !== -1) {
            users[activeUserIndex].cart = cartItems;
            console.log("product added in cart"+JSON.stringify(users[activeUserIndex].cart))
            localStorage.setItem('user', JSON.stringify(users));
        }
    }
};

export const { addToCart, removeFromCart, setCart } = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.items;
export default cartSlice.reducer;
