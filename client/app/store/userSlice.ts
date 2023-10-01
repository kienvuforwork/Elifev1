import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
interface userState{
    username:string,
    _id:string,
    avatar?: string
    notifications?:any
}

const initialState:userState = {
    username:'',
    _id:''
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state : userState, action: PayloadAction<userState>) => {
            return {
              ...state,
              ...action.payload,
            };
            
    }, clearUser: (state : userState) => {
        return initialState
    }}

})

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;