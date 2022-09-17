import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';

const initialState = {
    mostFrequentTags: [],
    status: 'idle'
}

export const getMostFrequentTagsThunk = createAsyncThunk('tags/getMostFrequentTags', async () => {
    try {
        const result = await api.getMostFrequentTags();
        return result.data.tags;
    } catch (error) {
        console.log(error);
        return error.response.result;
    }
})

export const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getMostFrequentTagsThunk.pending, (state, action) => {
                return {...state, status: "loading"}
            })
            .addCase(getMostFrequentTagsThunk.fulfilled, (state, action) => {
                console.log("most common tags: ", action.payload);
                return {...state, status: "succeeded", mostFrequentTags: action.payload};
            })
            .addCase(getMostFrequentTagsThunk.rejected, (state, action) => {
                return {...state, status: "failed"}
            })
    }
});

export default tagsSlice.reducer;