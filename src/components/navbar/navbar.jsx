import React from 'react';

function Navbar({ onNavigate, isMuted, onToggleMute }) {
  return (
    <div className='w-full fixed top-0 left-0 z-50 flex justify-between items-center px-10 md:px-14 py-4 bg-transparent font-JustA select-none'>
      <ul className='flex items-center gap-12 md:gap-16 font-JustA text-3xl md:text-4xl text-[#1E1E1E]'>
        <li
          onClick={() => onNavigate && onNavigate(0)}
          className="cursor-pointer hover:text-[#FF4EA4] transition-colors"
        >
          Home
        </li>
        <li
          onClick={() => onNavigate && onNavigate(3)}
          className="cursor-pointer hover:text-[#FF4EA4] transition-colors"
        >
          About
        </li>
        <li
          onClick={() => onNavigate && onNavigate(2)}
          className="cursor-pointer hover:text-[#FF4EA4] transition-colors"
        >
          Projects
        </li>
      </ul>

      <div
        onClick={onToggleMute}
        className='relative text-center h-[60px] w-[140px] cursor-pointer hover:scale-105 active:scale-95 transition-transform'
      >
        <div className='bg-[#1E1E1E] h-[50px] pt-1.5 mt-1 rounded-4xl w-[130px] relative left-1'>
          <h1 className='text-white text-3xl font-JustM'>{isMuted ? 'Mute' : 'Sound'}</h1>
        </div>
        <img src='/buttons/buttonsReal.png' className='absolute inset-0 w-full h-full brightness-40' alt="">
        </img>
      </div>
    </div>
  );
}

export default Navbar;