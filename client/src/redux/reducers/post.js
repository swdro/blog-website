import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';

const initialState = {
    postData: null
}

export const createpost = createAsyncThunk('post/createpost', async ({formData, navigate}) => {
    try {
        const { data } = await api.createPost(formData);
        if (data?.result) {
            const { result } = data;
            navigate('/');
        }
        console.log(data);
        //return data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
    return formData;
})

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createpost.pending, (state, action) => {
                console.log("createpost pending");
            })
            .addCase(createpost.fulfilled, (state, action) => {
                return {...state, postData: action.payload};
            })
            .addCase(createpost.rejected, (state, action) => {
                console.log("createpost rejected");
            })
    }
});

//export const { createPost } = postSlice.actions;

export default postSlice.reducer;