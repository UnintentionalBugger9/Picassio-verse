import React from 'react'

function DisplayProject({title1,link1,text1}) {
    const display={title:"Orphan Beacon",link:"/cursors/beacon.png",text:"It is a device that was created that wherever there is an orphanage multiple men and women are spawned there to take care of babies like their own parents so they never feel lonely"}
  return (
    <div className='flex flex-col justify-center items-center gap-2 font-JustM text-3xl'>
        <div className='text-4xl'>{display.title}</div>
         <div className='h-100 w-100'><img src={display.link}/></div>
                <div className='w-250'>{display.text}</div>
                       <div className='flex'>
                         <div className='relative  text-center h-[60px] w-[140px] mt-3 mr-4'>
            <div className='bg-[#FF89C2] h-[50px] pt-1.5 mt-1 rounded-4xl w-[130px] relative left-1'>
<h1 className='text-black text-3xl'>Equip</h1>
            </div>
        <img src='/buttons/buttonsReal.png' className='absolute inset-0 w-full h-full brightness-40'>
        </img>
        </div>
         <div className='relative  text-center h-[60px] w-[140px] mt-3 mr-4'>
            <div className='bg-[#F8F8F8] h-[50px] pt-1.5 mt-1 rounded-4xl w-[130px] relative left-1'>
<h1 className='text-black text-3xl'>Next ➤</h1>
            </div>
        <img src='/buttons/buttonsReal.png' className='absolute inset-0 w-full h-full brightness-40'>
        </img>
        </div>
                       </div>

    </div>   
  )
}

export default DisplayProject;