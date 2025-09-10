import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../Context/UserAuthContext";

function Navbar() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const { user, logOut } = useUserAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logOut();
            navigate("/login");
        } catch {
            console.log("can't log out");
        }
    }

    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <NavLink to="/" className="nav-logo">
                        LAXURY STAYS
                    </NavLink>

                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className={`nav-links ${window.location.pathname === '/' ? 'active' : ''}`}
                                onClick={handleClick}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/about"
                                className={`nav-links ${window.location.pathname === '/about' ? 'active' : ''}`}
                                onClick={handleClick}
                            >
                                About
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/rooms"
                                className={`nav-links ${window.location.pathname === '/rooms' ? 'active' : ''}`}
                                onClick={handleClick}
                            >
                                Rooms
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/contact"
                                className={`nav-links ${window.location.pathname === '/contact' ? 'active' : ''}`}
                                onClick={handleClick}
                            >
                                Contact Us
                            </NavLink>
                        </li>

                        {!user ? (
                            <>
                                <li className="nav-item2">
                                    <NavLink
                                        to="/login"
                                        className={`nav-links login-and-signup-btn login-btn ${window.location.pathname === '/login' ? 'active' : ''}`}
                                        onClick={handleClick}
                                    >
                                        Log In
                                    </NavLink>
                                </li>
                                <li className="nav-item2">
                                    <NavLink
                                        to="/signup"
                                        className={`nav-links login-wand-signup-btn signup-btn ${window.location.pathname === '/signup' ? 'active' : ''}`}
                                        onClick={handleClick}
                                    >
                                        Sign Up
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item2">
                                    <NavLink
                                        to="/mybookings"
                                        className={`nav-links login-and-signup-btn bookings-btn ${window.location.pathname === '/mybookings' ? 'active' : ''}`}
                                        onClick={handleClick}
                                    >
                                        Bookings
                                    </NavLink>
                                </li>
                                <li className="nav-item2">
                                    <NavLink
                                        to="/signup"
                                        className={`nav-links login-and-signup-btn logout-btn ${window.location.pathname === '/signup' ? 'active' : ''}`}
                                        onClick={handleLogout}
                                    >
                                        Log Out
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                    <div className="nav-icon" onClick={handleClick}>
                        <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
