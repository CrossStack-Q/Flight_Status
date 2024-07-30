// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('black');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                setMessage('Login successful!');
                setMessageColor('green');
                // Redirect to home page
                navigate('/');
            } else {
                setMessage('Login failed. Please check your credentials.');
                setMessageColor('red');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
            setMessageColor('red');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
            <p style={{ color: messageColor }}>{message}</p>
        </div>
    );
};

export default Login;
