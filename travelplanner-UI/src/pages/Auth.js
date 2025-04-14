import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import retroImage from './retro.jpg'; 
import Cookies from 'js-cookie';

function Auth() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setFirstName] = useState('');
    const [userType, setUserType] = useState('user');
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [passwordErrors, setPasswordErrors] = useState([]);
    const navigate = useNavigate();
    
    const validatePassword = (pass) => {
        const errors = [];
        if (pass.length < 8) errors.push("At least 8 characters long");
        if (!/[A-Z]/.test(pass)) errors.push("One uppercase letter");
        if (!/[a-z]/.test(pass)) errors.push("One lowercase letter");
        if (!/[0-9]/.test(pass)) errors.push("One number");
        if (!/[!@#$%^&*]/.test(pass)) errors.push("One special character (!@#$%^&*)");
        return errors;
    };

    const validateEmail = (email) => {
        // RFC 5322 compliant email regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email) {
            return "Email is required";
        } else if (!emailRegex.test(email)) {
            return "Please enter a valid email address (e.g., user@example.com)";
        }
        return "";
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setEmailError(validateEmail(newEmail));
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (!isLogin) {
            setPasswordErrors(validatePassword(newPassword));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const emailValidationError = validateEmail(email);
        if (emailValidationError) {
            setEmailError(emailValidationError);
            return;
        }

        if (!isLogin && passwordErrors.length > 0) {
            setMessage('Please fix password requirements before submitting');
            return;
        }

        const data = isLogin
            ? { email, password }
            : { 
                userName: userName,
                email: email,
                password: password,
                userType: userType
              };

        const url = isLogin
            ? 'http://localhost:8080/login'
            : 'http://localhost:8080/api/register';  

        try {
            console.log('Sending request to:', url);
            console.log('Request data:', data);
            
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            
            console.log('Response:', response.data);
            
            if (response.data) {
                Cookies.set('userid', response.data.id || response.data.userId || response.data, { expires: 7 });
                alert(isLogin ? 'Login successful!' : 'Registration successful!');
                navigate('/home');
            } else {
                setMessage('Registration successful but no user ID received');
            }
        } catch (error) {
            console.error('Error details:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            });
            
            const errorMessage = error.response?.data?.message || 
                               error.response?.data?.error || 
                               error.message || 
                               'Registration failed. Please try again.';
            setMessage(errorMessage);
        }
    };

    return (
<div className="w-100 vh-100">
    <div className="row h-100 m-0">
        <div className="col-8 p-0 d-none d-md-block" style={{ position: 'relative' }}>
            <div
                style={{
                    backgroundImage: `url(${retroImage})`,
                    backgroundSize: 'center 71%',
                    backgroundPosition: 'center',
                    height: '100%',
                    borderRadius: '15px 0 0 15px',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                    }}
                >
                    <p>Travel is the only thing you buy that makes you richer</p>
                </div>
            </div>
        </div>
        <div
            className="col-4 bg-white p-4 shadow"
            style={{
                borderRadius: '0 15px 15px 0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <h3 className="text-center mb-4" style={{ color: '#34568B' }}>
            {isLogin ? 'Welcome Back!' : 'Join Us'}
            </h3>
            <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="userName"
                                className="form-control"
                                placeholder="Enter your first name"
                                value={userName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className={`form-control ${emailError ? 'is-invalid' : ''}`}
                            placeholder="Enter your email (e.g., user@example.com)"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                            title="Please enter a valid email address (e.g., user@example.com)"
                        />
                        {emailError && (
                            <div className="invalid-feedback">
                                {emailError}
                            </div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            minLength={8}
                        />
                        {!isLogin && (
                            <div className="password-requirements mt-2">
                                <small className="text-muted">Password Requirements:</small>
                                <ul className="list-unstyled">
                                    {[
                                        "At least 8 characters long",
                                        "One uppercase letter",
                                        "One lowercase letter",
                                        "One number",
                                        "One special character (!@#$%^&*)"
                                    ].map((req, index) => (
                                        <li key={index} className="small">
                                            <span style={{ 
                                                color: passwordErrors.includes(req) ? '#dc3545' : '#28a745',
                                                marginRight: '5px'
                                            }}>
                                                {passwordErrors.includes(req) ? '✗' : '✓'}
                                            </span>
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {!isLogin && (
                        <div className="mb-3">
                            <label htmlFor="userType" className="form-label">
                                User Type
                            </label>
                            <select
                                id="userType"
                                className="form-select"
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                                required
                            >
                                <option value="user">User</option>
                                <option value="transport">Transport</option>
                                <option value="hotel admin">Hotel Admin</option>
                                <option value="restaurant owner">Restaurant Owner</option>
                            </select>
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary w-100">
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>

                {message && (
                    <div className={`alert ${isLogin ? 'alert-danger' : 'alert-info'} mt-3`}>
                        {message}
                    </div>
                )}

                <div className="text-center mt-3">
                    <p>
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}
                        <button
                            type="button"
                            className="btn btn-link p-0 ms-1"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Register' : 'Login'}
                        </button>
                    </p>
                </div>
        </div>
    </div>
</div>
    );
}

export default Auth;
