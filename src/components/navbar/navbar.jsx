import React from 'react'

function Navbar() {
  return (
    <div className='font-JustA text-3xl flex justify-between  '>
        <ul className='flex gap-45 p-6'>
            <li>Home</li>
            <li>Projects</li>
            <li>About</li>
        </ul>
        <div className='relative  text-center h-[60px] w-[140px] mt-3 mr-4'>
            <div className='bg-[#1E1E1E] h-[50px] pt-2 mt-1 rounded-4xl w-[130px] relative left-1'>
<h1 className='text-white'>Sound</h1>
            </div>
        <img src='/buttons/buttonsReal.png' className='absolute inset-0 w-full h-full brightness-40'>
        </img>
        </div>
    </div>
  )
}

export default Navbar;