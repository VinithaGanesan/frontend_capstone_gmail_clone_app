import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, register } from "../../api";


export const fetchSignUpUser = createAsyncThunk('fetchSignUpUser', async (form) => {
    const response = await register(form)
    return response.data
})

export const fetchLoginUser = createAsyncThunk('fetchLoginUser', async (form) => {
    const response = await login(form)
    return response.data
})



export const AuthReducer = createSlice({
    name: "Auth",
    initialState: {
        isLoggedIn: false,
        isLoading: false,
        data: null,
        error: false,
    },
    reducers: {
        logout: (state, action) => {
            window.localStorage.setItem('token', '');
            console.log('Token removed from Local Storage');
            state.isLoggedIn =  false;
            state.isLoading= false;
            state.data=null;
            state.error= false;
          }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSignUpUser.pending, (state, action) => {
            state.isLoading = true
        });
        builder.addCase(fetchSignUpUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchSignUpUser.rejected, (state, action) => {
            state.error = action.error.message;
        });
        builder.addCase(fetchLoginUser.pending, (state, action) => {
            state.isLoading = true
        });
        builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
            window.localStorage.setItem('token', action.payload.token);
            console.log('Token saved to localstorage');
            state.isLoading = false;
            state.data = action.payload;
            state.isLoggedIn = true;
        });
        builder.addCase(fetchLoginUser.rejected, (state, action) => {
            state.error = action.error.message;
        });
    }
});

export const { logout } = AuthReducer.actions;


export default AuthReducer.reducer;