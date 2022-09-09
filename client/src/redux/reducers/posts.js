import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';

const initialState = {
    posts: [],
    status: 'idle'
}

export const getPostsThunk = createAsyncThunk('post/getposts', async () => {
    try {
        const { data } = await api.getPosts();
        return data.posts;
    } catch (error) {
        console.log(error);
        return error.response.data;
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
                return {...state, status: "succeeded", posts: action.payload};
            })
            .addCase(getPostsThunk.rejected, (state, action) => {
                return {...state, status: "failed"}
            })
    }
});

//export const { createPost } = postSlice.actions;

export default postsSlice.reducer;