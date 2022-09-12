import React, { useState, useEffect } from 'react';
import SideNavBar from '../SideNavBar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { getPostsThunk } from '../../redux/reducers/posts';
import getDate from '../../helperFunctions/getDate';
import Pagination from '../Pagination';

const Home = () => {
    const dispatch = useDispatch();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const posts = useSelector((state) => state.posts.posts);
    const postStatus = useSelector((state) => state.posts.status);
    const params = useParams();
    const [page, setPage] = useState(params?.posts ? parseInt(params?.posts) : 1)

    //console.log("posts", posts);

    useEffect(() => {
        console.log("you updated state");
        console.log("useEffect page: ", page);
        dispatch(getPostsThunk({ page }));
    }, [page]);

    return (
        <div className="flex w-screen">
            <div className="w-1/12 h-screen absolute bg-gradient-to-r from-lightprimary via-white to-white -z-10"></div>
            <div className="w-1/12 h-screen absolute right-0 bg-gradient-to-r from-white via-white to-lightprimary -z-10"></div>
            <SideNavBar/>
            <div className="w-[80%] bg-lightPrimary min-w-5/6 max-w-5/6 px-10 flex flex-col content-between">
                {
                    user?.result?.adminRole && 
                    <Link to="/createpost" className="px-4 py-2 border rounded-full text-white bg-primary mt-5">Create Post</Link>
                }
                <div className='flex flex-col mt-6'>
                    {
                        (postStatus === "idle" || postStatus === "loading") ? "loading..." : (
                            <>
                                {posts.map((post) => (
                                    <div className="w-full my-2 p-2 border-b-2 flex flex-col" key={post.id}>
                                        <Link className="text-3xl text-primary break-words" to={`/post/${post.id}`}>
                                            {post.title}
                                        </Link>
                                        <div className="opacity-50 inline-block h-full mt-1">
                                            {/* <svg className="opacity-50 inline-block mr-2 align-middle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                            </svg> */}
                                            {getDate(post.datecreated)}
                                        </div>
                                        {/* <div className="text-secondary">
                                            {post.authorname}
                                        </div> */}
                                    </div>
                                ))}
                            </>
                        ) 
                    }
                </div>
                <Pagination page={parseInt(page)} setPage={setPage}/>
            </div>
        </div>
    );
};

export default Home;