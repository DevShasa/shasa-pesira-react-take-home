import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./dataSlices/userSlice";
import modalReducer from "./dataSlices/modalSlice"

export const store = configureStore({
    reducer:{
        users:userReducer,
        modal: modalReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch