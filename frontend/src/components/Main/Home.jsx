import React, { useState } from 'react'
import Box from './Box';
import "./Home.css"

function Home() {
  const [activeProduct, setActiveProducts] = useState("Chapter Tickets");

  const buttons = ["Chapter Tickets", "Regular Tickets", "Insurance"]
  return (
    <div className='pb-32 background-image h-[90vh]'>
      <p className='text-8xl text-zinc-800 w-screen text-center pt-24 pb-80'>
        Ticket search
      </p>
      <div className='flex space-x-4'>
        {buttons.map((item) =>
          <button onClick={()=>setActiveProducts(item)} className={`p-2 ${activeProduct === item ? "bg-main-color" : ""} cursor-pointer ml-[5vw] mb-1 text-lg text-text-color-dark flex justify-between`} >
            {item}
          </button>)}
      </div>
      <Box/>
    </div>
  )
}

export default Home