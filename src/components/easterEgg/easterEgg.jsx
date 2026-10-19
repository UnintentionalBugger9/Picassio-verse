import React from 'react';

function EasterEgg() {
  return (
    <div className='flex flex-col items-center justify-center font-JustM select-none max-w-5xl mx-auto px-4 py-2'>
      {/* Top congrats announcement */}
      <div className='text-center mb-6 md:mb-8'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl text-[#FF4EA4] font-JustM tracking-wide drop-shadow-xs'>
          Congrats! You unlocked the Easter Egg
        </h1>
      </div>

      {/* Symmetric image + text layout */}
      <div className='flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14 w-full'>
        {/* Angry Picassio creature illustration */}
        <div className='h-[260px] md:h-[300px] w-[210px] md:w-[240px] flex items-center justify-center flex-shrink-0'>
          <img
            src='/creature/pencilAngry.png'
            alt="Angry Picassio"
            className="max-h-full max-w-full object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Description text with balanced symmetry and size */}
        <div className='flex-1 max-w-2xl text-center md:text-left'>
          <p className='text-3xl md:text-4xl text-[#1E1E1E] leading-relaxed'>
            Picassio thinks some participant used his story as a submission in hax.baby hackathon on earth but his anxiety is not letting him ask anybody for confirmation of the same. To relax he drew picture of himself with his imaginary mother in landpage
          </p>
        </div>
      </div>
    </div>
  );
}

export default EasterEgg;