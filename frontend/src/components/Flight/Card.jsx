import React, { useState } from 'react'
import Progress from './Progress'

function Card({ deportDistance, destinationDistance , deportLocation , destinationLocation , destinationTime , deportTime }) {
    const [progress, setProgress] = useState(40);

    const handleIncrease = () => {
        setProgress((prev) => Math.min(prev + 10, 100));
    };

    const handleDecrease = () => {
        setProgress((prev) => Math.max(prev - 10, 0));
    };

    return (
        <div className='bg-white m-6 rounded-xl shadow-xl border-2 border-zinc-600'>
            <div className='flex justify-between px-8 py-4'>
                <div>
                    <p className='text-sm text-zinc-600'>Distance from <br />Departure</p>
                    <p className='text-sm text-zinc-600'><span className='font-semibold text-lg text-zinc-800'> {deportDistance} </span>mi</p>
                </div>
                <div>
                    <p className='text-sm text-zinc-600'>Distance to</p>
                    <p className='text-sm text-zinc-600'>Destination</p>
                    <p className='text-sm text-zinc-600 text-right'><span className='font-semibold text-lg text-zinc-800'> {destinationDistance} </span>mi</p>
                </div>
            </div>
            <div className='mx-8'>
                <Progress value={progress} max={100} />
                <div className='flex justify-between'>
                    {/* <button onClick={handleIncrease}>Increase</button>
                    <button onClick={handleDecrease}>Decrease</button> */}
                </div>

            </div>
            <div className='flex justify-between px-8 py-4'>
                <div>
                    <p className='text-2xl font-semibold text-zinc-800'>{deportLocation}</p>
                    <p className='text-sm text-zinc-600'>{deportTime}</p>
                </div>
                <div className=''>
                    <p className='text-2xl font-semibold text-zinc-800'>{destinationLocation}</p>
                    <p className='text-sm text-zinc-600 text-right'>{destinationTime}</p>
                </div>
            </div>
        </div>
    )
}

export default Card