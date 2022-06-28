import React from 'react';
import SideNavBar from '../SideNavBar';

const Home = () => {
    return (
        <div className="flex w-screen">
            <div className="w-1/12 h-screen absolute bg-gradient-to-r from-lightprimary via-white to-white -z-10"></div>
            <div className="w-1/12 h-screen absolute right-0 bg-gradient-to-r from-white via-white to-lightprimary -z-10"></div>
            <SideNavBar/>
            <div className="w-[80%] bg-lightPrimary min-w-5/6 max-w-5/6">

            </div>
        </div>
    );
};

export default Home;