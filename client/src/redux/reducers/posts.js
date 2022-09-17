import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';

const initialState = {
    posts: [],
    totalPages: 0,
    status: 'idle'
}

export const getPostsThunk = createAsyncThunk('post/getposts', async (data) => {
    try {
        const result = await api.getPosts(data);
        console.log(result.data);
        return result.data;
    } catch (error) {
        console.log(error);
        return error.response.result;
    }
})

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getPostsThunk.pending, (state, action) => {
                return {...state, status: "loading"}
            })
            .addCase(getPostsThunk.fulfilled, (state, action) => {
                const { posts, totalPages } = action.payload;
                console.log("total pages: ", totalPages);
                return {...state, status: "succeeded", posts, totalPages};
            })
            .addCase(getPostsThunk.rejected, (state, action) => {
                return {...state, status: "failed"}
            })
    }
});

//export const { createPost } = postSlice.actions;

export default postsSlice.reducer;