import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const localTheme = localStorage.getItem('theme');
        console.log(localTheme)
        document.querySelector('html').setAttribute('data-theme', localTheme || theme)
    }, [theme]);

    const handleToggle = e => {
        console.log(e.target.checked)
        if (e.target.checked) {
            setTheme('dark')
            localStorage.setItem('theme', 'dark');

        } else {
            setTheme('light')
            localStorage.setItem('theme', 'light');
        }

    }
    const handleLogOut = () => {
        logOut()
    }
    const styleNav = ({ isActive }) => {
        return {
            fontWeight: isActive ? "bold" : "",
            color: isActive ? "#4D869C" : "",
        };
    }
    const navLinks = <>
        <NavLink style={styleNav} to={'/'}>
            <li className="px-5 py-2">Home</li>
        </NavLink>
        <NavLink style={styleNav} to={'/assignments'}>
            <li className="px-5 py-2">Assignments</li>
        </NavLink>

        <NavLink style={styleNav} to={'/createAssignments'}>
            <li className="px-5 py-2">Create Assignments</li>
        </NavLink>
        <NavLink style={styleNav} to={'/pendingAssignments'}>
            <li className="px-5 py-2">Pending Assignments</li>
        </NavLink>
        <NavLink style={styleNav} to={'/mySubmitAssignments'}>
            <li className="px-5 py-2">My Submitted Assignments</li>
        </NavLink>

        <NavLink to={'/contactUs'} style={styleNav}>
            <li className="px-5 py-2">Contact Us</li>
        </NavLink>
    </>
    return (
        <div className="bg-cyan-100 fixed z-10 left-0 right-0">
            <div className="navbar container mx-auto">

                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-lg">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to={'/'} className="text-2xl text-cyan-600 font-black cursor-pointer hover:text-teal-600">Web Development</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-lg">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end space-x-4">
                    <label onClick={handleToggle} className="cursor-pointer grid place-items-center">
                        <input type="checkbox" value="dracula" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                        <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                        <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    </label>
                    {
                        user ?
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt={user?.displayName} src={user?.photoURL} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-5 shadow bg-base-100 rounded-box space-y-3">
                                    <span>
                                        <h1 className="text-xl">{user?.displayName}</h1>
                                    </span>
                                    <span>
                                        <h1 className="text-xl">{user?.email}</h1>
                                    </span>
                                    <button onClick={handleLogOut} className="px-8 py-3 bg-primary  font-medium rounded">Log Out</button>
                                </ul>
                            </div>

                            :
                            <Link to={'/login'} >
                                <button className="px-8 py-3 bg-cyan-600 hover:bg-teal-600 text-white font-medium rounded">Login</button>
                            </Link>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;