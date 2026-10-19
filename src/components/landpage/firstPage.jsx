import React from "react";

function FirstPage({ onGetStarted }) {
  return (
    <div className="w-full h-full relative flex flex-col justify-end overflow-hidden select-none">
      {/* Floating Text block: Centered on mobile, right-aligned on desktop */}
      <div className="absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-24 lg:right-32 top-[18%] sm:top-[22%] md:top-[32%] w-[90%] md:w-auto flex flex-col items-center text-center gap-3 md:gap-4 z-10 font-JustM">
        <h1 className="text-3xl sm:text-5xl md:text-6xl text-[#1E1E1E] leading-tight max-w-xl">
          The Story of Happiness and Curse of Anxiety
        </h1>

        <div
          onClick={onGetStarted}
          className="flex items-center gap-2 md:gap-3 text-[#FF4EA4] text-3xl sm:text-4xl cursor-pointer hover:opacity-80 transition-all transform hover:scale-105 active:scale-95"
        >
          <h1>Get Started</h1>
          <h1 className="pt-0.5">➤</h1>
        </div>
      </div>

      {/* Hero illustration anchored at the bottom edge */}
      <div className="w-full flex items-end justify-center pointer-events-none">
        <img
          src="/landpage/hero.png"
          alt="The ideal start to an ideal day illustration"
          className="w-full max-h-[56vh] object-cover object-bottom"
        />
      </div>
    </div>
  );
}

export default FirstPage;