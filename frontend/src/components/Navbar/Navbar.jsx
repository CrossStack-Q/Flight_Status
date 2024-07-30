import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div className=''>
            <ul className='flex justify-between'>
                <span className='flex space-x-4 p-4'>
                    <Link to="/home">
                        <li>
                            Home
                        </li>
                    </Link>
                    <Link to="/about">
                        <li>
                            About
                        </li>
                    </Link>
                    <Link to="/flight">
                        <li>
                            Flight
                        </li>
                    </Link>
                </span>
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
            </ul>
        </div>
    )
}

export default Navbar