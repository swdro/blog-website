import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useDispatch } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import './CreatePost.css';

import { createpost } from '../../redux/reducers/post';
import { ReactComponent as X } from '../../assets/x.svg';

const CreatePost = () => {
    const { user } = useOutletContext();
    const modules = {
        toolbar: [
            ["italic", "bold", "underline",  "strike"],
            ["link", "code-block", { "list": "bullet" }, { "align": [] }],
            ["video"]
        ]
    }
    const [value, setValue] = useState('');
    const [tags, setTags] = useState([]);
    const [tagsText, setTagsText] = useState('');
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleTagsText = (e) => {
        setTagsText(e.target.value.trim().toLowerCase());
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && tagsText && !tags.includes(tagsText)) {
          console.log(tagsText);
          setTags([...tags, tagsText]);
          setTagsText('');
          console.log(tags);
        }
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
            <input className="my-3 px-5 py-2 border border-black/10 w-full" value={tagsText} onChange={handleTagsText} onKeyDown={handleKeyDown} name="tags" placeholder="Press Enter to Add Tag" required />
            {
                tags.map((tag) => {
                    return (
                        <div className='text-white bg-primary rounded-full inline-block px-3 py-1 m-2' key={tag}>
                            {tag}
                            <button className='hover:bg-black/20 rounded-full ml-1' 
                                onClick={() => setTags(tags.filter((t) => t !== tag))}>
                                <X  className='-z-10'/>
                            </button>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default CreatePost;