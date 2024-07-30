import React from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { BiTransfer } from "react-icons/bi";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

function Box() {
  return (
    <div className='w-[90vw] m-auto bg-text-color-dark border-main-color border-8 md:flex '>
        <div className='flex flex-[1.5] items-center space-x-4 p-4'>
            <p className='text-2xl'>
                <IoLocationOutline/>
            </p>
            <div>
                <p>From</p>
                <p className="text-main-color font-medium">Depart Location</p>
            </div>
            <p>
                <FaChevronDown/>
            </p>
        </div>
        <div className='flex flex-[1.5] items-center space-x-4 p-4'>
            <p className='text-2xl'>
                <BiTransfer/>
            </p>
            <div>
                <p>To</p>
                <p className="text-main-color font-medium">Arrival Location</p>
            </div>
            <p>
                <FaChevronDown/>
            </p>
        </div>
        <div className='flex flex-[1.5] items-center space-x-4 p-4'>
            <p className='text-2xl'>
                <MdOutlineCalendarMonth/>
            </p>
            <div>
                <p>Dates</p>
                <p className="text-main-color font-medium">d.m.y- d.m.y</p>
            </div>
            <p>
                <FaChevronDown/>
            </p>
        </div>
        <div className='flex flex-[1.5] items-center space-x-4 p-4'>
            <p className='text-2xl'>
                <FaUser/>
            </p>
            <div>
                <p>Passenger</p>
                <p className="text-main-color font-medium">1 Adult</p>
            </div>
            <p>
                <FaChevronDown/>
            </p>
        </div>
        <div className='flex font-medium flex-grow text-xl justify-center text-text-color-dark items-center space-x-4 bg-main-color'>
            FIND <br/> TICKETS
        </div>
    </div>
  )
}

export default Box