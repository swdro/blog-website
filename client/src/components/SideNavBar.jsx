import React from 'react';

import { ReactComponent as Search } from '../assets/search.svg';
import { ReactComponent as FilterLeft } from '../assets/filter-left.svg';
import { ReactComponent as ArrowUpDown } from '../assets/arrow-down-up.svg';
import Dropdown from './Dropdown';

const SORTBYITEMS = ["Date Created", "Title", "Like Count", "Tags"];
const ORDER = ["Descending", "Ascending"];
const TAGS = ["reactjs", "webdev", "leetcode", "machine learning", "nodejs"]

const SideNavBar = () => {

    const handleChange = () => {

    };
    return (
        <div className="w-[20%] p-3 overflow-scroll h-screen border-r-2 text-m">
            <div className="flex justify-center my-5">
                <div className="grid place-items-center">
                    <Search />
                </div>
                <input className="px-3 ml-2 w-fit outline-primary/75 outline-offset-0 outline-1 border rounded-full border-black/10" name="search" placeholder="Search" onChange={handleChange}/>
            </div>
            <div className="flex justify-start mt-14 mb-3">
                <Dropdown icon={<FilterLeft />} options={SORTBYITEMS} />
            </div>
            <div className="flex justify-start mt-3 mb-14">
                <Dropdown icon={<ArrowUpDown />} options={ORDER} />
            </div>
            <div>
                <div className="underline">
                    Popular Tags
                </div>
                <div className="pl-3">
                    {TAGS.map((tag) => 
                        <div className="text-primary my-6 break-all" key={tag}> 
                            {tag}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SideNavBar;