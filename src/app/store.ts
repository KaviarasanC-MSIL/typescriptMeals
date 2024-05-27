import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { CartState } from './cartSlice';
import popupReducer, { PopupState } from './popupSlice';
import userReducer from './userSlice';
export interface RootState {
    cart: CartState;
    popup: PopupState;
}

const store = configureStore({
    reducer:{
        user: userReducer,
        cart: cartReducer,
        popup: popupReducer,
    }
})

export default store;
