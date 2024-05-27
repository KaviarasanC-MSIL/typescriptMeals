import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from './store'; 

export interface PopupState {
    showPopup:boolean;
    actionType:string | null;
}
const popupSlice = createSlice({
    name:'popup',
    initialState:{
        showPopup:false,
        actionType:null,
    } as PopupState,
    reducers:{
        setShowPopup:(state,actions:PayloadAction<boolean>)=>{
            state.showPopup = actions.payload
        },
        setActionType:(state,actions:PayloadAction<string>)=>{
            state.actionType = actions.payload
        }

    }
})
export const {setShowPopup,setActionType} = popupSlice.actions;

export const selectPopupState = (state:RootState)=>state.popup;
export default popupSlice.reducer