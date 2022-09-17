import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ReactComponent as Search } from '../assets/search.svg';
import { ReactComponent as FilterLeft } from '../assets/filter-left.svg';
import { ReactComponent as ArrowUpDown } from '../assets/arrow-down-up.svg';
import Dropdown from './Dropdown';
import { useOutletContext, useNavigate } from 'react-router-dom';

const SORTBYITEMS = ["Date Created", "Title"];
const ORDER = ["Descending", "Ascending"];

const SideNavBar = () => {
    const { sortBy, order, changeSortBy, changeOrder, sideBar, setSelectedTag } = useOutletContext();
    const mostFrequentTags = useSelector((store) => store.tags.mostFrequentTags);
    const navigate = useNavigate();
    console.log("side nav bar most frequent tags: ", mostFrequentTags);

    useEffect(() => {
        console.log("sortBy: ", sortBy);
        console.log("order: ", order);
    }, [sortBy, order]);

    const handleSearch = () => {

    }

    const handleTagClick = (tag) => {
        setSelectedTag(tag); 
        navigate('/posts/1');
    }

    return (
        // <div className={`${!sideBar ? "" : "basis-1/5 min-w-[20%]"} flex flex-col p-3 overflow-scroll border-r-2 text-m ${sideBar ? "" : "-translate-x-[100%] transition duration-500 ease-in-out"}`}>
            <div className={`flex flex-col p-3 inline-block shadow-md text-m ${sideBar ? "" : "hidden"} transition duration-500 ease-in-out`}>
            {/* <div className="flex justify-center my-5 h-7">
                <div className="grid place-items-center">
                    <Search />
                </div>
                <input className="px-3 ml-2 box-border w-full outline-black/50 outline-offset-0 border rounded-full border-black/10" name="search" placeholder="Search" onChange={handleSearch}/>
            </div> */}
            <div className="flex justify-start mt-14 mb-3">
                <Dropdown icon={<FilterLeft />} options={SORTBYITEMS} setSelected={changeSortBy} selected={sortBy} />
            </div>
            <div className="flex justify-start mt-3 mb-14">
                <Dropdown icon={<ArrowUpDown />} options={ORDER} setSelected={changeOrder} selected={order} />
            </div>
            <div>
                <div className="underline">
                    Popular Tags
                </div>
                <div className="pl-3">
                    {mostFrequentTags.map((tag) => 
                        <button onClick={() => handleTagClick(tag)} className="hover:text-black text-primary my-6 break-all block" key={tag}> 
                            {tag}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SideNavBar;