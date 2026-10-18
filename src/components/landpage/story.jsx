import React from 'react';

function Story() {
  return (
    <div className='flex flex-col justify-between items-center h-full py-8 font-JustM select-none'>
        <div className='relative text-center h-[60px] w-[140px] mt-3'>
            <div className='bg-[#CA5B5B] h-[50px] pt-1.5 mt-1 rounded-4xl w-[130px] relative left-1'>
                <h1 className='text-white text-3xl'>Story</h1>
            </div>
            <img src='/buttons/buttonsReal.png' className='absolute inset-0 w-full h-full brightness-40' alt="">
            </img>
        </div>

        <div className='text-center text-4xl max-w-4xl px-6 my-auto leading-relaxed'>
            Picassio is a baby creature blessed by god who has the ability to bring anything he draws to life but his curse is that he will always be anxious and scared all his life and thus to keep himself out of his anxiety he draws the things that bring him and people joy and dopamine. The curse helps him feel empathy towards people and understand them.
        </div>

        <div className='h-6'></div>
    </div>
  );
}

export default Story;