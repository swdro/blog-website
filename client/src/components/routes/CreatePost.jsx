import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import './CreatePost.css';

import { createpost } from '../../redux/reducers/post';

const CreatePost = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const modules = {
        toolbar: [
            ["italic", "bold", "underline",  "strike"],
            ["link", "code-block", { "list": "bullet" }, { "align": [] }],
            ["video"]
        ]
    }
    const [value, setValue] = useState('');
    const [tags, setTags] = useState('');
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleTags = (e) => {
        setTags(e.target.value.trim());
    }

    const submitFormData = async () => {
        const firstName = user.result.firstName;
        const lastName = user.result.lastName;
        const formData = {
            authorId: user.result.id,
            authorName: firstName + " " + lastName,
            title,
            text: value,
            tags
        }

        const res = await dispatch(createpost({ formData, navigate }));
        console.log("res: ", res);
    }

    useEffect(() => {
        console.log(value);
    }, [value]);

    return (
        <div className="p-10 h-screen">
            <div className="flex justify-between mb-5">
                <h1 className="text-2xl bold">Create Post</h1>
                <button className="px-4 py-2 border rounded-full text-white bg-primary transform transition duration-300 hover:scale-110" onClick={submitFormData}>
                    Post
                </button>
            </div>
            <input className="my-3 px-5 py-2 border border-black/10 w-full" value={title} onChange={(e) => setTitle(e.target.value)} name="title" placeholder="Title" required />
            <ReactQuill theme="snow" modules={modules} value={value} onChange={setValue} />
            <input className="my-3 px-5 py-2 border border-black/10 w-full" value={tags} onChange={handleTags} name="tags" placeholder="Tags" required />
        </div>
    );
}

export default CreatePost;