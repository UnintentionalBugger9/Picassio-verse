import React from 'react'

function Footer() {
  return (
    <div className='flex flex-col items-center gap-5 justify-center font-JustM text-4xl'>
        <div className='h-50 w-50'>
            <img src='/animals/zebra.png' />
        </div> 
        <div className='h-30 w-160'>
Picassio ate some pencils trying to create this website.
    Make sure your verdict is worth his pain.
  
        </div>
          
          <div className='relative  text-center h-[60px] w-[140px] mt-3 mr-4'>
            <div className='bg-[#FAE1C6] h-[50px] pt-1.5 mt-1 rounded-4xl w-[130px] relative left-1'>
<h1 className='text-white text-3xl'></h1>
            </div>
        <img src='/buttons/buttonsReal.png' className='absolute inset-0 w-full h-full brightness-40'>
        </img>
        </div>

        <div className='h-10 w-200 flex justify-between bg-[#4C6782]'>
            <h1>2026 hax baby</h1>
            <h1>All rights reserved</h1>

        </div>
        
    </div>
  )
}

export default Footer;