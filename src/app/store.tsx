import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { CartState } from './cartSlice';
import popupReducer, { PopupState } from './popupSlice';

export interface RootState {
    cart: CartState;
    popup: PopupState;
}

const store = configureStore({
    reducer:{
        cart: cartReducer,
        popup: popupReducer,
    }
})

export default store;
