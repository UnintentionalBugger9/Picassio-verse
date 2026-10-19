import React, { useState } from 'react';

function Job() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  const carousel = [
    {
      id: 1,
      link: '/objects/jug.png',
      text: 'He saw a girl who got sad after breaking the water jug which she used for growing her plants so he boosted her dopamine by repairing the jug'
    },
    {
      id: 2,
      link: '/objects/toy.png',
      text: 'He saw a boy disrespecting his toys, so he cracked them with plants, teaching him to value what he has to find happines and worth'
    },
    {
      id: 3,
      link: '/objects/flowers.png',
      text: 'He created a flower gift for a widow who remembered how beautiful were the flowers her late husband would bring to her when she would be sad'
    }
  ];

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      // Swiped left -> next
      setActiveIdx((prev) => (prev + 1) % carousel.length);
    } else if (diff < -50) {
      // Swiped right -> prev
      setActiveIdx((prev) => (prev - 1 + carousel.length) % carousel.length);
    }
    setTouchStart(null);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-4 md:py-6 px-4 md:px-12 max-w-6xl mx-auto select-none">
      {/* Badge */}
      <div className="relative inline-flex items-center justify-center w-[130px] md:w-[140px] h-[52px] md:h-[56px] top-6 md:top-20 flex-shrink-0">
        <div className="bg-[#CA5B5B] w-[120px] md:w-[130px] h-[44px] md:h-[48px] rounded-full flex items-center justify-center shadow-sm">
          <span className="text-white text-2xl md:text-3xl font-JustM pt-1">Job</span>
        </div>
        <img
          src="/buttons/buttonsReal.png"
          alt=""
          className="absolute inset-0 w-full h-full object-contain pointer-events-none brightness-75 opacity-70"
        />
      </div>

      {/* Desktop View: All 3 Story Cards side by side */}
      <div className="w-full hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 my-auto relative top-15 items-stretch">
        {carousel.map((content) => (
          <div
            key={content.id}
            className="bg-[#FFFDF6]/70 backdrop-blur-xs border border-[#1E1E1E]/12 rounded-3xl p-6 flex flex-col items-center text-center shadow-2xs hover:shadow-md hover:-translate-y-2 transition-all duration-300 font-JustM"
          >
            {/* Object Image */}
            <div className="h-36 w-36 flex items-center justify-center p-2 mb-4">
              <img
                src={content.link}
                alt="Story object"
                className="max-h-full max-w-full object-contain filter drop-shadow-sm hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Description */}
            <p className="text-2xl md:text-3xl text-[#1E1E1E] leading-relaxed flex-1 flex items-center justify-center">
              {content.text}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile View: Interactive Single Card Carousel with swipe and dots */}
      <div
        className="w-full md:hidden flex flex-col items-center justify-center my-auto px-2 relative top-2"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="w-full max-w-sm bg-[#FFFDF6]/85 backdrop-blur-xs border border-[#1E1E1E]/12 rounded-3xl p-5 flex flex-col items-center text-center shadow-md font-JustM transition-all duration-300">
          {/* Object Image */}
          <div className="h-24 w-24 sm:h-28 sm:w-28 flex items-center justify-center p-2 mb-3">
            <img
              src={carousel[activeIdx].link}
              alt="Story object"
              className="max-h-full max-w-full object-contain filter drop-shadow-sm"
            />
          </div>

          {/* Description */}
          <p className="text-xl sm:text-2xl text-[#1E1E1E] leading-relaxed min-h-[96px] flex items-center justify-center">
            {carousel[activeIdx].text}
          </p>

          {/* Carousel Navigation Arrows & Dots */}
          <div className="flex items-center justify-between w-full mt-4 pt-2 border-t border-[#1E1E1E]/10">
            <button
              onClick={() => setActiveIdx((prev) => (prev - 1 + carousel.length) % carousel.length)}
              className="px-3 py-1 text-2xl text-[#CA5B5B] hover:opacity-75 active:scale-90 font-bold"
              aria-label="Previous story"
            >
              ◀
            </button>

            <div className="flex items-center gap-2">
              {carousel.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    activeIdx === idx ? 'bg-[#CA5B5B] w-6' : 'bg-[#1E1E1E]/20'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveIdx((prev) => (prev + 1) % carousel.length)}
              className="px-3 py-1 text-2xl text-[#CA5B5B] hover:opacity-75 active:scale-90 font-bold"
              aria-label="Next story"
            >
              ▶
            </button>
          </div>
        </div>
      </div>

      {/* Bottom spacer for balanced vertical alignment */}
      <div className="h-4 md:h-6 flex-shrink-0" />
    </div>
  );
}

export default Job;