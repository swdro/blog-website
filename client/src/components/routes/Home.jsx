import React, { useState, useEffect } from 'react';
import SideNavBar from '../SideNavBar';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getPostsThunk } from '../../redux/reducers/posts';
import getDate from '../../helperFunctions/getDate';

const Home = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const posts = useSelector((state) => state.posts.posts);
    const postStatus = useSelector((state) => state.posts.status);
    const dispatch = useDispatch();

    console.log("posts", posts);

    useEffect(() => {
        if (postStatus === "idle") {
            dispatch(getPostsThunk());
        }
    }, [postStatus, dispatch]);

    return (
        <div className="flex w-screen">
            <div className="w-1/12 h-screen absolute bg-gradient-to-r from-lightprimary via-white to-white -z-10"></div>
            <div className="w-1/12 h-screen absolute right-0 bg-gradient-to-r from-white via-white to-lightprimary -z-10"></div>
            <SideNavBar/>
            <div className="w-[80%] bg-lightPrimary min-w-5/6 max-w-5/6 p-10">
                {
                    user?.result?.adminRole && 
                    <Link to="/createpost" className="px-4 py-2 border rounded-full text-white bg-primary">Create Post</Link>
                }
                <div className='flex flex-wrap mt-6'>
                    {
                        (postStatus === "idle" || postStatus === "loading") ? "loading..." : (
                            <>
                                {posts.map((post) => (
                                    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 2xl:w-1/4 p-2 break-words" key={post.id}>
                                        <Link className="text-4xl text-primary font-bold" to={`/post/${post.id}`}>
                                            {post.title}
                                        </Link>
                                        <div className="opacity-50 my-2">
                                            <svg className="opacity-50 inline-block mr-2 align-middle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                            </svg>
                                            {getDate(post.datecreated)}
                                        </div>
                                        <div className="text-secondary">
                                            {post.authorname}
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) 
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;