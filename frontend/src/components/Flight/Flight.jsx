import React, { useEffect, useState } from 'react'
import Progress from './Progress';
import FlightStatusForm from './FlightStatusForm';
import "./Flight.css"

function Flight() {

    const [flights, setFlights] = useState([]);






    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080/ws');

        ws.onmessage = (event) => {
            setFlights(JSON.parse(event.data));
        };

        ws.onclose = () => {
            console.log('WebSocket closed');
        };

        return () => ws.close();
    }, []);


    return (
        <div>

            <FlightStatusForm />

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
                        flights.map((flight) => (
                            <tr key={flight.flight_number}>
                                <td className="px-6 py-4 whitespace-nowrap">{flight.flight_number}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{flight.deport_time}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{flight.destination_time}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{flight.deport_location}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{flight.destination_location}</td>
                                <td className={`px-6 py-4 whitespace-nowrap bg-blue-50 ${flight.gate_change ? "bg-yellow-400" : ""} `}>{flight.gate_change ? "True" : "False"}</td>

                                <td className={`px-6 py-4 whitespace-nowrap ${flight.status === "Delayed" ? "bg-red-500" : "bg-green-600"}`}>
                                    {flight.status}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Flight