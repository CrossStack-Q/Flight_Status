import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Auth/AuthContext';

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <div className=''>
            <ul className='flex justify-between items-center'>
                <span className='flex space-x-4 p-4'>
                    
                    <Link to="/flight">
                        <li>
                            Flight
                        </li>
                    </Link>
                </span>
                {!user ? (
                    <span className='flex space-x-4 p-4'>
                        <Link to="/login">
                            <li>
                                Login
                            </li>
                        </Link>
                        <Link to="/signup">
                            <li>
                                SignUp
                            </li>
                        </Link>
                    </span>
                ) : (
                    <span className='flex space-x-4 p-4 items-center'>
                        <Link to="/me">
                            <li>
                                User
                            </li>
                        </Link>
                        <button className='bg-red-400 px-3 rounded-md text-white font-semibold tracking-wide py-1' onClick={()=>{
                            navigate("/");
                            logout();
                        }}>Logout</button>
                    </span>
                )}

            </ul>
        </div>
    )
}

export default Navbar