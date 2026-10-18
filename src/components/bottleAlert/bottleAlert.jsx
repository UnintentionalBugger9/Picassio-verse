import React from 'react';
import {useState} from 'react';

function BottleAlert(){
    const[hasClicked,changeHasClicked]=useState(false)

    return (
        <>

        <div className="  cursor-[url('/cursors/beaconCursor.png'),_auto] flex flex-col justify-center items-center border border-red-800 h-180 w-full gap-2">
        <div className='bg-[#D9D9D9]  relative  top-20 right-100 h-[30px] w-[35px] rounded-2xl'></div>
                <div className='bg-[#D9D9D9]  relative  top-50 right-50 h-[30px] w-[35px] rounded-2xl'></div>
         <div className='bg-[#D9D9D9]  relative  left-100 h-[30px] w-[35px] rounded-2xl'></div>
          <div className='bg-[#D9D9D9]  relative  top-80 right-120 h-[30px] w-[35px] rounded-2xl'></div>
           <div className='bg-[#D9D9D9]  relative  top-80 left-100 h-[30px] w-[45px] rounded-2xl'></div>
{!hasClicked?<img onClick={()=>{changeHasClicked(true)}}  src='/babyBottles/empty.png'  className='h-[350px] w-[504px]  rotate-[-22deg]'/> : <img  src='/babyBottles/filled.png'  className='h-[350px] w-[504px] rotate-[-28deg]'/>}
            
<h1 className='font-JustM text-4xl'>The baby seems to be sad because his milk bottle is empty.  </h1>
<h1 className='font-JustM text-4xl'>Maybe thats why everything is blur. you can refill bottle by clicking on it.</h1>
        </div>
        </>
    )
}

export default BottleAlert;