import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../type';

interface UserState {
    users: UserData[];
}

const initialState: UserState = {
    users: JSON.parse(localStorage.getItem('user') || '[]') as UserData[],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signOut: (state, action: PayloadAction<string>) => {
            const userEmail = action.payload;
            console.log("loggedout--"+state.users)
            const activeUserIndex = state.users.findIndex(user => user.email === userEmail && user.status === 'active');
           console.log("------"+activeUserIndex)
            if (activeUserIndex > -1) { 
                state.users[activeUserIndex].status = 'inactive';
                console.log("*****"+JSON.stringify(state.users[activeUserIndex]))
                localStorage.setItem('user', JSON.stringify(state.users));
            }
        }
    },
});

export const { signOut } = userSlice.actions;
export default userSlice.reducer;
