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
            
            {/* Cracked Peach Button / Easter Egg Button matching sound button design */}
            <div 
              onClick={handleCrackButtonClick}
              className={`relative text-center h-[60px] ${isRepaired ? 'w-[160px]' : 'w-[140px]'} cursor-pointer hover:scale-105 active:scale-95 transition-transform select-none`}
              title={isRepaired ? 'Easter Egg' : isGemEquipped ? 'Click with Gem cursor to repair' : ''}
            >
              <div className={`bg-[#F7DAC1] h-[50px] pt-1.5 mt-1 rounded-4xl ${isRepaired ? 'w-[150px]' : 'w-[130px]'} relative left-1 overflow-hidden`}>
                {!isRepaired ? (
                  /* Prominent, realistic crack fracture network */
                  <svg viewBox="0 0 130 50" className="w-full h-full absolute inset-0 p-1 pointer-events-none fill-none stroke-linecap-round stroke-linejoin-round z-10">
                    {/* Deep shadow fracture fissures */}
                    <path 
                      d="M 65 4 L 60 14 L 71 23 L 62 34 L 67 46 M 60 14 L 45 18 L 32 12 L 16 22 M 62 34 L 48 38 L 38 35 M 71 23 L 88 20 L 102 28 L 115 22 M 88 20 L 96 37 L 110 41" 
                      stroke="#222222" 
                      strokeWidth="2.8" 
                    />
                    {/* High-contrast highlight specular edge */}
                    <path 
                      d="M 66 5 L 61 15 L 72 24 L 63 35 L 68 47 M 61 15 L 46 19 L 33 13 L 17 23 M 63 35 L 49 39 L 39 36 M 72 24 L 89 21 L 103 29 L 116 23 M 89 21 L 97 38 L 111 42" 
                      stroke="#FFFFFF" 
                      strokeWidth="1.8" 
                      opacity="0.95" 
                    />
                  </svg>
                ) : (
                  /* Repaired button showing Easter Egg */
                  <h1 className="relative z-10 font-JustM text-3xl text-[#1E1E1E]">
                    Easter Egg
                  </h1>
                )}
              </div>

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