import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type { Users, CreateNewUser } from "../../types";
import toast from "react-hot-toast";
import { closeModal } from "./modalSlice";
interface InitialStateType{
    users: Users[];
    isLoading: boolean;
    newUserLoading:boolean;
    deleteUserLoading: boolean
    editUserLoading: boolean
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
    editUserLoading: false,
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

interface IeditUser extends CreateNewUser{
    id: number
}

export const editUser =  createAsyncThunk('users/edituser', async(newUserData:IeditUser, thunkApi)=>{
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
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${newUserData.id}`,{
            method:"PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body:  JSON.stringify(newUser)
        })

        if(res.status === 200){
            const data = await res.json()
            thunkApi.dispatch(closeModal())
            return {
                id: newUserData.id,
                data
            }
        }else{
            throw new Error("Could not edit user")
        }
    } catch (error) {
        console.log("ERROR EDITING  NEW USER",error)
        return thunkApi.rejectWithValue("Could not create edit user")
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
                action.payload.id = state.users.length +1
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
            .addCase(editUser.pending, (state)=>{
                state.editUserLoading = true
            })
            .addCase(editUser.fulfilled, (state, action)=>{
                state.editUserLoading = false
                const updatedList = state.users.map(user =>{
                    if(user.id === action.payload.id){
                        return {...action.payload.data, id:action.payload.id}
                    }else{
                        return user
                    }
                })
                state.users = updatedList
                toast.success("Sucessfuly modified user details")
            })
            .addCase(editUser.rejected, (state)=>{
                state.editUserLoading = false
                toast.error("There was an error modifiying user details")
            })
    }
})


export default userSlice.reducer
