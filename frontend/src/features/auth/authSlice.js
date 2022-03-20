import {createAsyncThunk , createSlice} from "@reduxjs/toolkit"
import authService from "./authServices"


// get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

// our initial state
const initialState = {
    user : user ? user : null,
    isError : false,
    isSucess: false,
    isLoading: false,
    message:''
}

// register user
export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
      try {
        return await authService.register(user)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
)

export const authSlice = createSlice(
    {
        name:'auth',
        initialState,
        reducers:{
            reset: (state) => {
                state.isLoading =false
                state.isSucess =false
                state.isError =false
                state.message=''
            }
        }, 
        extraReducers: (builder) =>{
            builder
            .addCase(register.pending , (state)=>{
                state.isLoading=true
            })
            .addCase(register.fulfilled , (state, action)=>{
                state.isLoading = false
                state.isSucess = true
                state.user = action.payload
            })
            .addCase(register.rejected , (state, action)=>{
                state.isLoading = false
                state.isSucess = false
                state.isError=true
                state.message = action.payload
                state.user=null
            })
        }
    }
)


export const {reset} = authSlice.actions
export default authSlice.reducer