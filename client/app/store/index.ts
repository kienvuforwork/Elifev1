
import { configureStore } from "@reduxjs/toolkit";


import registerModalSlice from "./registerModalSlice";
import loginModalSlice from "./loginModalSlice";
import userSlice from "./userSlice";
import shareModalSlice from "./shareModalSlice";


export const store = configureStore({
  reducer: {  registerModalSlice, loginModalSlice,userSlice, shareModalSlice, },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;