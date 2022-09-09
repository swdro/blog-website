import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';

const initialState = {
    userData: null
}

export const signin = createAsyncThunk('user/signin', async({ formData, navigate }) => {
    try {
        // log in user
        const { data } = await api.signIn(formData);
        if (data?.result) {
            const { result, token } = data;
            localStorage.setItem('profile', JSON.stringify({ result, token }));
            navigate('/');
        }
        console.log(data);
        return data;
    } catch (error) {
        console.log(error.response.data);
        return error.response.data;
    }
});

export const signup = createAsyncThunk("user/signup", async ({ formData, navigate }) => {
    try {
        // sign up in user
        const { data } = await api.signUp(formData);
        if (data?.result) {
            console.log(JSON.stringify(data));
            const { result, token } = data;
            localStorage.setItem('profile', JSON.stringify({ result, token }));
            navigate('/');
            console.log("nagivated to home");
        }
        console.log(data);
        return data;
    } catch (error) {
        console.log(error.response.data);
        return error.response.data;
    }
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            localStorage.clear();
            return { ...state, userData: null};
        },
        resetuser(state) {
            return { ...state, userData: JSON.parse(localStorage.getItem("profile"))};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signin.pending, (state, action) => {
                console.log("pending");
            })
            .addCase(signin.fulfilled, (state, action) => {
                return { ...state, userData: action.payload };
            })
            .addCase(signin.rejected, (state, action) => {
                console.log("rejected");
            })
            .addCase(signup.pending, (state, action) => {
                console.log("pending");
            })
            .addCase(signup.fulfilled, (state, action) => {
                return { ...state, userData: action.payload };
            })
            .addCase(signup.rejected, (state, action) => {
                console.log("rejected");
            })
    } 
});

export const { logout, resetuser } = userSlice.actions;

export default userSlice.reducer;