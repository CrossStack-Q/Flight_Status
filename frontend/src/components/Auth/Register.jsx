// Register.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);

  const [flightNumber, setFlightNumber] = useState("");
  const [phone, setPhone] = useState("");



  const updateUserDetails = async (event) => {
    event.preventDefault();
    console.log(flightNumber, phone)

    try {
      const response = await fetch('http://localhost:8080/auth/user-flight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          flightNumber: flightNumber,
          username: user.username,
          email: user.email,
          phone: phone
        })
      });

      if (response.ok) {
        setMessage('Registration successful!');
        console.log(user);
        navigate('/');

        
      } else {
        setMessage('Registration failed. Please try again.');

      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');

    }

  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      if (response.ok) {
        setMessage('Registration successful!');
        const userData = await response.json();
        login(userData);
        console.log(user);
     
      } else {
        setMessage('Registration failed. Please try again.');

      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');

    }
  };

  useEffect(() => {

  }, [user])


  return (
    <div>
      {!user &&
        <form onSubmit={handleSubmit} className='flex flex-col items-center p-4 space-y-4'>
          <div className=''>
            <p className=''>
              Username:
            </p>
            <input
              className='border rounded-md border-zinc-400 text-zinc-400 shadow-2xl placeholder-shown:pl-2 p-1 text-lg '
              type="text"
              value={username}
              placeholder='ram'
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className=''>
            <p className=''>
              Email:
            </p>

            <input
              className='border rounded-md border-zinc-400 text-zinc-400 shadow-2xl placeholder-shown:pl-2 p-1 text-lg '
              type="email"
              value={email}
              placeholder='Email@mail.com'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className=''>
            <p className=''>
              Password:
            </p>
            <input
              className='border rounded-md border-zinc-400 text-zinc-400 shadow-2xl placeholder-shown:pl-2 p-1 text-lg '
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className='bg-blue-500 text-white font-semibold text-xl tracking-wide m-4 px-6 py-2 rounded-md' type="submit">Register</button>
        </form>
      }
      {
        user && <div>
          <form onSubmit={updateUserDetails} className='flex flex-col items-center p-4 space-y-4'>
            <div className=''>
              <p className=''>
                Flight Number :
              </p>
              <input
                className='border rounded-md border-zinc-400 text-zinc-400 shadow-2xl placeholder-shown:pl-2 p-1 text-lg '
                type="text"
                value={flightNumber}
                placeholder='zz03'
                onChange={(e) => setFlightNumber(e.target.value)}
                required
              />
            </div>

            <div className=''>
              <p className=''>
                Phone Number
              </p>

              <input
                className='border rounded-md border-zinc-400 text-zinc-400 shadow-2xl placeholder-shown:pl-2 p-1 text-lg '
                type="number"
                value={phone}
                placeholder='9988776655'
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>



            <button className='bg-blue-500 text-white font-semibold text-xl tracking-wide m-4 px-6 py-2 rounded-md' type="submit">Register</button>
          </form>
        </div>
      }

    </div>
  );
};

export default Register;
