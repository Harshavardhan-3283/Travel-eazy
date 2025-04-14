import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any authentication tokens or session details if needed
        localStorage.clear(); // Example: clearing local storage
        navigate('/login'); // Redirect to login page
    };

    return (
<nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
    <div className="container-fluid">
        {/* Brand Section */}
        <a className="navbar-brand fw-bold" href="#">
            Personalized Travel Planner
        </a>

        {/* Toggle Button for Mobile */}
        <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
                <li className="nav-item">
                    <button
                        className="btn btn-link nav-link"
                        onClick={() => navigate('/home')}
                    >
                        Home
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className="btn btn-link nav-link"
                        onClick={() => navigate('/saved-trip')}
                    >
                        My Bookings
                    </button>
                </li>
            </ul>

            {/* Logout Button */}
            <div className="d-flex">
                <button
                    className="btn nav-link"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    </div>
</nav>

    );
}

export default Header;