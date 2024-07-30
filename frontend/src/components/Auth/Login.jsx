// Login.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "./AuthContext"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('black');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

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
        // const userData = "Anurag"
        const userData = await response.json();
        setMessage('Login successful!');
        setMessageColor('green');
        login(userData)
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
      <form onSubmit={handleSubmit} className='flex flex-col items-center space-y-4 p-4'>
        <div className=''>
          <p className='p-1'> Username:</p>
          <input
            className='border rounded-md border-zinc-400 text-zinc-400 shadow-2xl placeholder-shown:pl-2 p-1 text-lg '

            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div>
          <p className='p-1'>Password:</p>
          <input
            className='border rounded-md border-zinc-400 text-zinc-400 shadow-2xl placeholder-shown:pl-2 p-1 text-lg '

            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button className='bg-blue-500 text-white font-semibold text-xl tracking-wide m-4 px-6 py-2 rounded-md' type="submit">Login</button>
      </form>
      <p style={{ color: messageColor }}>{message}</p>
    </div>
  );
};

export default Login;
