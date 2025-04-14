import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './pages/Header';
import Home from './pages/HomePage';
import SavedTrip from './pages/SavedTrip';
import Login from './pages/Auth';
import RouteDetails from './pages/RouteDetails';
import ExploreDestination from './pages/Explore';

function App() {
    return (
        <Router>
            <MainLayout />
        </Router>
    );
}

function MainLayout() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    return (
        <div>
            {/* Conditionally render the Header */}
            {!isLoginPage && <Header />}
            <div>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/saved-trip" element={<SavedTrip />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/route-details" element={<RouteDetails />} />
                    <Route path="/explore/:destination" element={<ExploreDestination />} />
                    <Route path="*" element={<Login />} /> {/* Redirect unknown routes */}
                </Routes>
            </div>
        </div>
    );
}

export default App;
