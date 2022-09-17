import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import postReducer from './reducers/post';
import postsReducer from './reducers/posts';
import tagsReducer from './reducers/tags';

export default configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
        posts: postsReducer,
        tags: tagsReducer
    }
});