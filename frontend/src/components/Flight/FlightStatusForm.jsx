import React, { useEffect, useState } from 'react';
import Card from './Card';

function FlightStatusForm() {
    const [flightNumber, setFlightNumber] = useState('');
    const [date, setDate] = useState('today');
    const [flightStatus, setFlightStatus] = useState(null);
    const [error, setError] = useState(null);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setFlightStatus(null);

        try {
            const response = await fetch(`http://localhost:8080/flight-status?flight_number=${flightNumber}&date=${date}`);
            if (!response.ok) {
                setError("Not_Found")

                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();
            setFlightStatus(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleClearStatus = () => {
        setFlightNumber("");
        setDate('today');
        setError(null)
        setFlightStatus(null);
    };






    return (
        <div className='p-6'>
            {flightStatus && (
                <Card
                    deportDistance={flightStatus.deport_distance}
                    destinationDistance={flightStatus.destination_distance}
                    deportLocation={flightStatus.deport_location}
                    destinationLocation={flightStatus.destination_location}
                    deportTime={flightStatus.deport_time}
                    destinationTime={flightStatus.destination_time}
                />
            )}
            {error && <div>
                <p>Flight Not Found</p>
            </div>
            }
            <form onSubmit={handleSubmit}>
                <label>
                    <span className='text-lg p-2 tracking-wide'>Flight Number:</span>
                    <input
                        className='border rounded-md border-zinc-400 text-zinc-400 shadow-2xl placeholder-shown:pl-2 p-1 text-lg '
                        type="text"
                        placeholder='Flight No.'
                        value={flightNumber}
                        onChange={(e) => setFlightNumber(e.target.value)}
                    />
                </label>
                <label>
                    <span className='text-lg p-2'>Date:</span>
                    <select className='border rounded-md border-zinc-400 bg-white shadow-2xl py-1 px-3 text-lg' value={date} onChange={(e) => setDate(e.target.value)}>
                        <option value="yesterday">Yesterday</option>
                        <option value="today">Today</option>
                        <option value="tomorrow">Tomorrow</option>
                    </select>
                </label>
                <button className='bg-blue-500 text-white font-semibold text-lg tracking-wide m-4 px-4 py-2 rounded-md' type="submit">Check Status</button>

                { ( flightStatus || error ) && <button className='bg-orange-400 text-white font-semibold text-lg tracking-wide m-4 px-4 py-2 rounded-md' onClick={handleClearStatus}>Clear Status</button>}
            </form>
            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}




        </div>
    );
}

export default FlightStatusForm;
