import React, { useState } from 'react';

function Footer({ isGemEquipped, onOpenEasterEgg }) {
  const [isRepaired, setIsRepaired] = useState(false);

  const handleCrackButtonClick = () => {
    if (!isGemEquipped && !isRepaired) {
      // Normally clicked without gem cursor: nothing should happen
      return;
    }

    if (isGemEquipped && !isRepaired) {
      // Gem cursor equipped: cracks disappear and button shows "Easter Egg"
      setIsRepaired(true);
      if (onOpenEasterEgg) {
        onOpenEasterEgg();
      }
    } else if (isRepaired) {
      // Already repaired: clicking Easter Egg button re-opens easter egg
      if (onOpenEasterEgg) {
        onOpenEasterEgg();
      }
    }
  };

  return (
    <div className='w-full h-full flex flex-col justify-between items-center relative select-none font-JustM pt-12'>
        {/* Center content */}
        <div className='my-auto flex flex-col items-center justify-center text-center gap-6'>
            {/* Zebra illustration */}
            <div className='flex items-center justify-center'>
                <img 
                  src='/animals/zebra.png' 
                  alt="Zebra" 
                  className="h-36 md:h-44 w-auto object-contain" 
                />
            </div> 

            {/* Message */}
            <div className='text-3xl md:text-4xl text-[#1E1E1E] leading-relaxed max-w-2xl px-4'>
                <p>Picassio ate some pencils trying to create this website.</p>
                <p className='mt-1'>Make sure your verdict is worth his pain.</p>
            </div>
            
            {/* Cracked Peach Pill Button / Easter Egg Button with buttonsReal border */}
            <div 
              onClick={handleCrackButtonClick}
              className={`relative h-[52px] flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all select-none ${
                isRepaired ? 'px-8 min-w-[160px]' : 'w-[140px]'
              }`}
              title={isRepaired ? 'Easter Egg' : isGemEquipped ? 'Click with Gem cursor to repair' : ''}
            >
              {/* Inner peach colored background pill */}
              <div className="absolute inset-1 rounded-full bg-[#F7DAC1]"></div>

              {!isRepaired ? (
                /* Prominent, realistic crack fracture network */
                <svg viewBox="0 0 140 52" className="w-full h-full absolute inset-0 p-1 pointer-events-none fill-none stroke-linecap-round stroke-linejoin-round z-10">
                    {/* Deep shadow fracture fissures */}
                    <path 
                      d="M 70 4 L 65 14 L 76 23 L 67 34 L 72 48 M 65 14 L 48 18 L 34 12 L 18 22 M 67 34 L 51 38 L 40 35 M 76 23 L 94 20 L 110 28 L 124 22 M 94 20 L 102 37 L 118 41" 
                      stroke="#222222" 
                      strokeWidth="2.8" 
                    />
                    {/* High-contrast highlight specular edge */}
                    <path 
                      d="M 71 5 L 66 15 L 77 24 L 68 35 L 73 49 M 66 15 L 49 19 L 35 13 L 19 23 M 68 35 L 52 39 L 41 36 M 77 24 L 95 21 L 111 29 L 125 23 M 95 21 L 103 38 L 119 42" 
                      stroke="#FFFFFF" 
                      strokeWidth="1.8" 
                      opacity="0.95" 
                    />
                </svg>
              ) : (
                /* Repaired button showing Easter Egg */
                <span className="relative z-10 font-JustM text-3xl md:text-4xl text-[#1E1E1E] tracking-wide pt-0.5">
                  Easter Egg
                </span>
              )}

              {/* Hand-drawn button border image matching sound button */}
              <img src="/buttons/buttonsReal.png" className="absolute inset-0 w-full h-full brightness-40 pointer-events-none z-20" alt="" />
            </div>
        </div>

        {/* Edge-to-edge slate bottom bar */}
        <div className='w-full bg-[#4C6782] text-white flex justify-between items-center px-8 md:px-14 py-3 text-2xl md:text-3xl'>
            <h1>2026 Hax Baby.</h1>
            <h1>All Rights Reserved</h1>
        </div>
    </div>
  );
}

export default Footer;