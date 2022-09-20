import React, { useEffect } from 'react';
import SideNavBar from '../SideNavBar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation, useOutletContext, useParams } from 'react-router-dom';

import { ReactComponent as Slider } from '../../assets/slider.svg';
import { ReactComponent as FilterCircle } from '../../assets/filter-circle.svg';
import { ReactComponent as ArrowBarLeft } from '../../assets/arrow-bar-left.svg';
import { ReactComponent as Exit } from '../../assets/x-lg.svg';
import { getPostsThunk } from '../../redux/reducers/posts';
import { getMostFrequentTagsThunk } from '../../redux/reducers/tags';
import getDate from '../../helperFunctions/getDate';
import Pagination from '../Pagination';

const Home = () => {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const postStatus = useSelector((state) => state.posts.status);
    const totalPages = useSelector((store) => store.posts.totalPages);
    const { page, setPage, user, sortBy, order, sideBar, setSideBar, selectedTag, setSelectedTag } = useOutletContext();

    useEffect(() => {
        const { state } = location;
        // parse current page from address bar
        let currentPage = parseInt(params.posts);
        if (currentPage) {
            currentPage = parseInt(currentPage);
            setPage(currentPage);
        } else {
            currentPage = 1;
        }
        setSelectedTag(state?.selectedTag ?? selectedTag);
        // fetch new posts and fetch frequent tags
        dispatch(getPostsThunk({ 
            page: state?.page ?? page, 
            sortBy,
            order, 
            selectedTag: state?.selectedTag ?? selectedTag 
        }));
        dispatch(getMostFrequentTagsThunk());
    }, [page, dispatch, sortBy, order, selectedTag, location]);

    return (
        <div className={`flex flex-col sm:flex-row w-screen transition duration-500 ease-in-out`}>
            {/* <div className="w-1/12 h-screen absolute bg-gradient-to-r from-lightprimary via-white to-white -z-10"></div>
            <div className="w-1/12 h-screen absolute right-0 bg-gradient-to-r from-white via-white to-lightprimary -z-10"></div> */}
            <SideNavBar/>
            <div className="overflow-auto w-full bg-lightPrimary flex flex-col content-between font-exo font-medium">
                <div className='pl-2 pt-2 flex justify-between'>
                    <button onClick={() => setSideBar(!sideBar)} className="p-1 border-solid border-2 rounded-full shadow-md">
                        {
                            sideBar ? <ArrowBarLeft/> : <Slider/>
                        }
                    </button>
                    {
                        user?.result?.adminRole && 
                        <Link to="/createpost" className="mr-10 px-4 py-1 border rounded-full text-white bg-primary">Create Post</Link>
                    }
                </div>
                {
                    selectedTag && 
                    (<>
                    <div className='flex pt-5 pl-10'>
                        <div className='text-xl text-black/75 p-1'>Posts relating to:</div>
                        <div className='text-xl text-primary p-1'>{selectedTag}</div>
                    </div>
                    </>)
                }
                <div className='flex flex-col px-20 py-5'>
                    {
                        (postStatus === "idle" || postStatus === "loading") ? "loading..." : (
                            <>
                                {posts.map((post) => (
                                    <div className="w-full my-2 p-3 shadow-md flex flex-col" key={post.id}>
                                        <button 
                                            className="hover:text-black text-2xl text-primary break-words text-left" 
                                            onClick={() => navigate(`/post/${post.id}`, {
                                                state: {
                                                    page,
                                                    sortBy,
                                                    order,
                                                    selectedTag
                                            }})}
                                        >
                                            {post.title}
                                        </button>
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
                <Pagination page={parseInt(page)} setPage={setPage} selectedTag={selectedTag}/>
            </div>
        </div>
    );
};

export default Home;