import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type { Users } from "../../types";


interface InitialStateType{
    users: Users[];
    isLoading: boolean;
    error: {
        errorPresent: boolean;
        errorMessage: string;
    };
}

const initialState:InitialStateType ={
    users:[],
    isLoading: true,
    error: {
        errorPresent:false,
        errorMessage:""
    }
}


export const getUsers = createAsyncThunk('users/getUsers', async(_, thunkApi)=>{
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        const users = await res.json()
        return users
    } catch (error) {
        return thunkApi.rejectWithValue("Error fetching the users")
    }
})



const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(getUsers.pending, (state)=>{
                state.isLoading = true
                state.error={
                    errorPresent:false,
                    errorMessage:""
                }
            })
            .addCase(getUsers.fulfilled, (state, action)=>{
                state.isLoading = false
                state.users = action.payload
                state.error={
                    errorPresent:false,
                    errorMessage:""
                }
            })
            .addCase(getUsers.rejected, (state)=>{
                state.isLoading = false
                state.users = []
                state.error={
                    errorPresent:true,
                    errorMessage:"There was an error fetching the users"
                }
            })

    }
})


export default userSlice.reducer
