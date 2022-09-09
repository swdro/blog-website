import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import postReducer from './reducers/post';
import postsReducer from './reducers/posts';

export default configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
        posts: postsReducer
    }
});