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
            
            {/* Cracked Peach Pill Button / Easter Egg Button */}
            <div 
              onClick={handleCrackButtonClick}
              className={`h-[48px] rounded-full border-[2.5px] border-[#2b2b2b] bg-[#F7DAC1] flex items-center justify-center relative shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition-all ${
                isRepaired ? 'px-8 min-w-[150px]' : 'w-[130px]'
              }`}
              title={isRepaired ? 'Easter Egg' : isGemEquipped ? 'Click with Gem cursor to repair' : ''}
            >
              {!isRepaired ? (
                /* Prominent, realistic crack fracture network */
                <svg viewBox="0 0 130 48" className="w-full h-full absolute inset-0 p-1 pointer-events-none fill-none stroke-linecap-round stroke-linejoin-round">
                    {/* Deep shadow fracture fissures */}
                    <path 
                      d="M 65 3 L 60 13 L 71 21 L 62 31 L 67 45 M 60 13 L 44 17 L 31 11 L 16 20 M 62 31 L 47 35 L 37 32 M 71 21 L 87 18 L 102 26 L 115 20 M 87 18 L 94 34 L 109 38" 
                      stroke="#222222" 
                      strokeWidth="2.8" 
                    />
                    {/* High-contrast highlight specular edge */}
                    <path 
                      d="M 66 4 L 61 14 L 72 22 L 63 32 L 68 46 M 61 14 L 45 18 L 32 12 L 17 21 M 63 32 L 48 36 L 38 33 M 72 22 L 88 19 L 103 27 L 116 21 M 88 19 L 95 35 L 110 39" 
                      stroke="#FFFFFF" 
                      strokeWidth="1.8" 
                      opacity="0.95" 
                    />
                </svg>
              ) : (
                /* Repaired button showing Easter Egg */
                <span className="font-JustM text-3xl md:text-4xl text-[#1E1E1E] tracking-wide pt-0.5">
                  Easter Egg
                </span>
              )}
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