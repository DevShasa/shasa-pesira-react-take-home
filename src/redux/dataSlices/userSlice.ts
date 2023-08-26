import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type { Users, CreateNewUser } from "../../types";
interface InitialStateType{
    users: Users[];
    isLoading: boolean;
    newUserLoading:boolean;
    error: {
        errorPresent: boolean;
        errorMessage: string;
    };
}



const initialState:InitialStateType ={
    users:[],
    isLoading: true,
    newUserLoading: false,
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
        // this is where we would log error to sentry or other logging services 
        return thunkApi.rejectWithValue("Error fetching the users")
    }
})

export const createUser =  createAsyncThunk('users/createUser', async(newUserData:CreateNewUser, thunkApi)=>{
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users',{
            method:"POST",
            body:  JSON.stringify(newUserData)
        })

        const data = await res.json()
        return data

    } catch (error) {
        return thunkApi.rejectWithValue("Could not create new user")
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
            .addCase(createUser.pending, (state)=>{
                state.newUserLoading = true
            })
            .addCase(createUser.fulfilled, (state, action)=>{
                console.log("NEW USER CREATED RESPONSE:::", action.payload)
                state.newUserLoading = false
                //state.users.unshift(action.payload)
            })
    }
})


export default userSlice.reducer
