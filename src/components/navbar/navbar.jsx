import React, { useState } from 'react';

function Navbar({ onNavigate, isMuted, onToggleMute }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = (index) => {
    setIsMenuOpen(false);
    if (onNavigate) {
      onNavigate(index);
    }
  };

  return (
    <nav className='w-full fixed top-0 left-0 z-50 px-5 sm:px-8 md:px-14 py-3 md:py-4 bg-transparent font-JustA select-none'>
      <div className='flex justify-between items-center'>
        {/* Desktop Navigation Links */}
        <ul className='hidden md:flex items-center gap-12 md:gap-16 font-JustA text-3xl md:text-4xl text-[#1E1E1E]'>
          <li
            onClick={() => handleLinkClick(0)}
            className="cursor-pointer hover:text-[#FF4EA4] transition-colors"
          >
            Home
          </li>
          <li
            onClick={() => handleLinkClick(3)}
            className="cursor-pointer hover:text-[#FF4EA4] transition-colors"
          >
            About
          </li>
          <li
            onClick={() => handleLinkClick(2)}
            className="cursor-pointer hover:text-[#FF4EA4] transition-colors"
          >
            Projects
          </li>
        </ul>

        {/* Mobile Hamburger Button in same font */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="text-3xl font-JustA text-[#1E1E1E] hover:text-[#FF4EA4] transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span className="text-3xl leading-none">{isMenuOpen ? '✕' : '☰'}</span>
            <span className="text-3xl pt-1">Menu</span>
          </button>
        </div>

        {/* Sound / Mute Toggle Button */}
        <div
          onClick={onToggleMute}
          className='relative text-center h-[54px] md:h-[60px] w-[120px] md:w-[140px] cursor-pointer hover:scale-105 active:scale-95 transition-transform'
        >
          <div className='bg-[#1E1E1E] h-[45px] md:h-[50px] pt-1 md:pt-1.5 mt-1 rounded-4xl w-[112px] md:w-[130px] relative left-1'>
            <h1 className='text-white text-2xl md:text-3xl font-JustM'>{isMuted ? 'Mute' : 'Sound'}</h1>
          </div>
          <img src='/buttons/buttonsReal.png' className='absolute inset-0 w-full h-full brightness-40 pointer-events-none' alt="" />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 bg-[#FEF8E6]/95 backdrop-blur-md rounded-2xl border border-[#1E1E1E]/15 p-5 shadow-lg flex flex-col gap-4 font-JustA text-3xl text-[#1E1E1E] animate-fadeIn">
          <div
            onClick={() => handleLinkClick(0)}
            className="cursor-pointer hover:text-[#FF4EA4] transition-colors py-1 border-b border-[#1E1E1E]/10"
          >
            Home
          </div>
          <div
            onClick={() => handleLinkClick(3)}
            className="cursor-pointer hover:text-[#FF4EA4] transition-colors py-1 border-b border-[#1E1E1E]/10"
          >
            About
          </div>
          <div
            onClick={() => handleLinkClick(2)}
            className="cursor-pointer hover:text-[#FF4EA4] transition-colors py-1"
          >
            Projects
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;