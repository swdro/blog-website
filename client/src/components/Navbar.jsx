import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/user';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutUser = () => {
        dispatch(logout());
        setUser(null);
        navigate('/');
    }

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            const expiration = decodedToken.exp * 1000;
            const now = (new Date()).getTime();
            console.log("expiration date", expiration);
            console.log("current date", now);
            console.log("seconds left", expiration - now);

            if (now > expiration) {
                console.log("expired")
                logoutUser();
            } else {
                console.log("still valid");
            }
        }
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    return (
        <>
            <div className="flex justify-around p-4">
                <h1 className="font-medium text-6xl">
                    <Link to="/">The Software Blog</Link>
                </h1>
                <ul className="flex justify-evenly items-end">
                    <li className="mx-6">
                        <Link to="/now">Now</Link>
                    </li>
                    <li className="mx-6">
                        <Link to="/about">About</Link>
                    </li>
                    <li className="mx-6">
                        <Link to="/">Blogs</Link>
                    </li>
                    <li className="mx-6">
                        <Link to="/portfolio">Portfolio</Link>
                    </li>
                    <li className="mx-6">
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
                <div className="flex items-end">
                    <button className=" py-2 px-5 shadow-xl backdrop-blur-md rounded-lg" onClick={user && logoutUser}>
                        <Link to="/login">{user ? "Logout" : "Login"}</Link>
                    </button>
                </div>
            </div>
            <hr></hr>
        </>
    );
};

export default Navbar;