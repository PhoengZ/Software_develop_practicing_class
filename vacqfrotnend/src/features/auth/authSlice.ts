import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import authServices from './authServices'

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')
const id = localStorage.getItem('id')
const initialState = {
    user: user ? user:null,
    token: token ? token: null,
    id:id ? id:null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}
// createAsyncThunk(a,b) 'a' is name of AsyncThunk function, b is function that retrieve 2 parameter are user data and ThunkAPI (using for call redux action)
export const register = createAsyncThunk('auth/register', async(user: object,thunkAPI)=>{
    console.log(user);
    try{
        return await authServices.register(user)
    }catch(err){
        if (axios.isAxiosError(err)) {
            const message = (err.response?.data?.message) || err.message || 'An unknown error occurred.';
            return thunkAPI.rejectWithValue(message);
        } else {
            const message = (err instanceof Error) ? err.message : 'An unknown error occurred.';
            return thunkAPI.rejectWithValue(message); // call redux action to trigger rejected case
        }
    }
})
// createAsyncThunk(a,b) 'a' is name of AsyncThunk function, b is function that retrieve 2 parameter are user data and ThunkAPI (using for call redux action)
export const login = createAsyncThunk('auth/login',async(user: object, thunkAPI)=>{
    try{
        return await authServices.login(user)
    }catch(err){
        if (axios.isAxiosError(err)) {
            const message = (err.response?.data?.message) || err.message || 'An unknown error occurred.';
            console.log(err.response?.data);
            return thunkAPI.rejectWithValue(message);
        } else {
            const message = (err instanceof Error) ? err.message : 'An unknown error occurred.';
            return thunkAPI.rejectWithValue(message); // call redux action to trigger rejected case
        }
    }
})

export const logout = createAsyncThunk('auth/logout', async()=>{
    await authServices.logout()
})

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset: (state)=>{
            state.isLoading = false,
            state.isError = false,
            state.isSuccess = false,
            state.message = ''
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(register.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action)=>{
            state.isLoading = false,
            state.isSuccess = true,
            state.user = action.payload.name
            state.token = action.payload.token
            state.id = action.payload._id
        })
        .addCase(register.rejected, (state, action)=>{
            state.isError = true,
            state.isLoading = false,
            state.message = action.payload as string,
            state.user = null
        })
        .addCase(login.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action)=>{
            state.isLoading = false,
            state.isSuccess = true,
            state.user = action.payload.name
            state.token = action.payload.token
            state.id = action.payload._id
        })
        .addCase(login.rejected, (state, action)=>{
            state.isLoading =false,
            state.isError = true,
            state.message = action.payload as string,
            state.user = null
        })
        .addCase(logout.fulfilled, (state)=>{
            state.user = null
        })
    }
})

export const {reset} = authSlice.actions

export default authSlice.reducer