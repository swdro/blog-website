import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });
const config = {
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('profile'))?.token}`
    }
};

// users
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

// posts
export const createPost = (formData) => API.post('/post/createpost', formData, config);
export const getPosts = (page) => API.post('/post/getposts', page);
export const getPost = (post) => API.post('/post/getpost', post);

// tags
export const getMostFrequentTags = () => API.get('/tags/getcommontags');

/*
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPostApi = (newPost) => API.post('posts', newPost);
export const updatePostApi = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePostApi = (id) => API.delete(`/posts/${id}`);
export const likePostApi = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, {value});

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
*/
