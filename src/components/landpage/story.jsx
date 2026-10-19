import React from 'react';

function Story() {
  return (
    <div className='flex flex-col justify-between items-center h-full py-4 md:py-8 font-JustM select-none'>
      <div className='relative text-center h-[54px] md:h-[60px] w-[130px] md:w-[140px] mt-2 md:mt-3 top-8 md:top-20'>
        <div className='bg-[#CA5B5B] h-[45px] md:h-[50px] pt-1 md:pt-1.5 mt-1 rounded-4xl w-[120px] md:w-[130px] relative left-1'>
          <h1 className='text-white text-2xl md:text-3xl'>Story</h1>
        </div>
        <img src='/buttons/buttonsReal.png' className='absolute inset-0 w-full h-full brightness-40' alt="">
        </img>
      </div>

      <div className='text-center text-2xl sm:text-3xl md:text-4xl max-w-4xl px-4 sm:px-6 my-auto relative top-2 md:top-4 leading-relaxed'>
        Picassio is a baby creature blessed by God with the power to bring anything he draws to life. But this gift comes with a curse he will forever live with anxiety and fear. To escape his own worries, Picassio draws things that bring joy and dopamine to himself and others. Yet his curse serves a greater purpose: it allows him to feel empathy, understand people, and see the world through their emotions.
      </div>

      <div className='h-4 md:h-6'></div>
    </div>
  );
}

export default Story;