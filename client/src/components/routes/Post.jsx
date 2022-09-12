import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

import getDate from '../../helperFunctions/getDate';
import './Post.css';


const Post = () => {
    const posts = useSelector((state) => state.posts.posts);
    const params = useParams();
    const { postId } = params;

    const post = posts.filter((post) => 
        post.id === postId
    )[0]

    console.log(post);

    return (
        <div className="p-10">
            <div className="text-6xl text-primary text-center break-words">
                {post.title}
            </div>
            <div className='mt-8 mb-6 text-center'>
                <div className="text-secondary inline-block ml-1 mr-10">
                    {`by ${post.authorname}`}
                </div>
                <div className="opacity-50 inline-block">
                    <svg className="opacity-50 inline-block mr-2 align-middle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                    </svg>
                    {getDate(post.datecreated)}
                </div>
            </div>
            <div className='post-body break-words p-5 border-t-2 rounded'>
                { parse(post.body) }
            </div>
        </div>
    )
}

export default Post;

