import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type { Users, CreateNewUser } from "../../types";
import toast from "react-hot-toast";
interface InitialStateType{
    users: Users[];
    isLoading: boolean;
    newUserLoading:boolean;
    deleteUserLoading: boolean
    error: {
        errorPresent: boolean;
        errorMessage: string;
    };
}



const initialState:InitialStateType ={
    users:[],
    isLoading: true,
    newUserLoading: false,
    deleteUserLoading: false,
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
    const newUser = {
        name:newUserData.name,
        username: newUserData.username,
        email: newUserData.email,
        phone: newUserData.phone,
        company:{
            name: newUserData.company
        },
        address:{
            street: newUserData.street
        }
    }
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:  JSON.stringify(newUser)
        })

        if(res.status === 201){
            const data = await res.json()
            return data
        }else{
            throw new Error("Could not create user")
        }
    } catch (error) {
        console.log("ERROR CREATING NEW USER",error)
        return thunkApi.rejectWithValue("Could not create new user")
    }
})


export const deleteUser = createAsyncThunk("users/delete", async(id:number, thunkApi)=>{
    try{
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method:"DELETE"
        })
        return id
    }catch(error){
        console.log(error)
        thunkApi.rejectWithValue("Could not delete user")
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
                state.newUserLoading = false
                toast(`New user created`)
                state.users.unshift(action.payload)
            })
            .addCase(createUser.rejected, (state)=>{
                state.newUserLoading = false
                toast.error("Could not create new user")
            })
            .addCase(deleteUser.pending, (state)=>{
                state.deleteUserLoading = true
            })
            .addCase(deleteUser.fulfilled, (state, action)=>{
                state.deleteUserLoading = false
                state.users = state.users.filter(user => user.id !== action.payload)
                toast.success("Sucessfuly deleted user")
            })
            .addCase(deleteUser.rejected, (state)=>{
                state.deleteUserLoading = false
                toast.error("Could not delete user")
            })
    }
})


export default userSlice.reducer
