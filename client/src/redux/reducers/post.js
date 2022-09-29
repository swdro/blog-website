import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';

const initialState = {
    postData: null
}

export const createpost = createAsyncThunk('post/createpost', async ({formData, navigate}) => {
    try {

        // var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        // for (let j = 0; j < 500; j++ ) {
        //     var length = Math.floor(Math.random() * (75 - 1 + 1) + 1);
        //     var titleResult = '';
        //     var textResult = '';
        //     var charactersLength = characters.length;
        //     for ( let i = 0; i < length; i++ ) {
        //         titleResult += characters.charAt(Math.floor(Math.random() * charactersLength));
        //     }
        //     for ( let i = 0; i < 100000; i++ ) {
        //         textResult += characters.charAt(Math.floor(Math.random() * charactersLength));
        //     }
        //     formData.title = titleResult;
        //     formData.text = textResult;
        //     const { data } = await api.createPost(formData);
        // }

        const { data } = await api.createPost(formData);
        if (data.message === "post successfully created") {
            navigate('/');
        }
        console.log("createpostthunk data: ", data);
        //return data;
    } catch (error) {
        console.log(error);
        // if (error.response.status === 401) {
        //     localStorage.removeItem('profile');
        //     navigate('/');
        // }
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