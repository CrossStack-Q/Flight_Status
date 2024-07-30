// User.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

const User = () => {


    const [userInfo, setuserInfo] = useState([]);
    const [flights, setFlights] = useState([]);




    const { user } = useContext(AuthContext);



    async function fetchUser(username) {
        const response = await fetch(`http://localhost:8080/user-info?username=${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const userData = await response.json();
            console.log(userData);
            setuserInfo(userData);
        } else {
            console.error('Failed to fetch user:', response.statusText);
        }
    }

    useEffect(() => {
        fetchUser(user.username)
        const ws = new WebSocket('ws://localhost:8080/ws');

        ws.onmessage = (event) => {
            setFlights(JSON.parse(event.data));
        };

        ws.onclose = () => {
            console.log('WebSocket closed');
        };

        return () => ws.close();
    }, [])




    return (
        <div>
            <p className='text-2xl px-4 font-semibold tracking-wider'>User Profile</p>
            {userInfo ? (
                <div>
                    <div className='flex flex-col space-y-6 p-4'>
                        <div className='flex space-x-4'>
                        <span className='bg-white text-blue-400 border-2 border-blue-400 text-xl px-4 py-2 font-semibold tracking-wide rounded-md'>UserName</span>
                        <span className='bg-blue-400 text-white text-xl px-4 py-2 font-semibold tracking-wide rounded-md'>{userInfo.username}</span>
                        </div>
                        <div className='flex space-x-4'>
                        <span className='bg-white text-blue-400 border-2 border-blue-400 text-xl px-4 py-2 font-semibold tracking-wide rounded-md'>Flight No. </span>
                        <span className='bg-blue-400 text-white text-xl px-4 py-2 font-semibold tracking-wide rounded-md'>{userInfo.flightno}</span>
                        </div>
                    </div>
                    <div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrival</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider wide-column">Origin</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider wide-column">Destination</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider wide-column">Gate Change</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {
                                    flights.filter(flight => flight.flight_number === userInfo.flightno).map(flight => (
                                        <tr key={flight.flight_number}>
                                            <td className="px-6 py-4 whitespace-nowrap bg-blue-50">{flight.flight_number}</td>
                                            <td className="px-6 py-4 whitespace-nowrap bg-blue-50">{flight.deport_time}</td>
                                            <td className="px-6 py-4 whitespace-nowrap bg-blue-50">{flight.destination_time}</td>
                                            <td className="px-6 py-4 whitespace-nowrap bg-blue-50">{flight.deport_location}</td>
                                            <td className="px-6 py-4 whitespace-nowrap bg-blue-50">{flight.destination_location}</td>
                                            <td className={`px-6 py-4 whitespace-nowrap  ${flight.gate_change ? "bg-yellow-400" : "bg-blue-50"}`}>{flight.gate_change ? "True" : "False"}</td>

                                            <td className={`px-6 py-4 whitespace-nowrap ${flight.status === "Delayed" ? "bg-red-500" : "bg-green-600"}`}>
                                                {flight.status}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default User;
