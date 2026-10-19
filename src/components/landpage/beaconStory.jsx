import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function BeaconStory({ isMuted }) {
  const containerRef = useRef(null);
  const houseRef = useRef(null);
  const stage1Ref = useRef(null);
  const stage2LeftRef = useRef(null);
  const stage2RightRef = useRef(null);
  const grassRef = useRef(null);
  const polkaRef = useRef(null);
  const lightsRef = useRef(null);
  const coupleRef = useRef(null);
  const tableRef = useRef(null);
  const manRef = useRef(null);

  const [canClick, setCanClick] = useState(false);
  const [awakened, setAwakened] = useState(false);
  const awakenedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=1500',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            setCanClick(self.progress > 0.65);
            if (awakenedRef.current) {
              gsap.set([stage2LeftRef.current, stage2RightRef.current], {
                opacity: 0,
                display: 'none',
              });
            }
          },
        },
      });

      const isMobile = window.innerWidth < 768;

      // House starts partially on left on desktop; on mobile enters linearly from bottom
      if (isMobile) {
        tl.fromTo(
          houseRef.current,
          { yPercent: 12, opacity: 0.85 },
          { yPercent: 0, opacity: 1, duration: 1, ease: 'none' },
          0
        );
      } else {
        tl.fromTo(
          houseRef.current,
          { xPercent: -48 },
          { xPercent: 0, duration: 1, ease: 'none' },
          0
        );
      }

      // Stage 1 text visible initially, fades out first half
      tl.to(
        stage1Ref.current,
        { opacity: 0, duration: 0.3, ease: 'none' },
        0.3
      );

      // Stage 2 texts fade in second half
      tl.fromTo(
        stage2LeftRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'none' },
        0.6
      );
      tl.fromTo(
        stage2RightRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'none' },
        0.65
      );
    }, container);

    return () => ctx.revert();
  }, []);

  const isMutedRef = useRef(isMuted);
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  const handleHouseClick = () => {
    if (!canClick || awakened) return;
    awakenedRef.current = true;
    setAwakened(true);

    // Play orphanageSound ONCE when things start to assemble (unless muted)
    if (!isMutedRef.current) {
      try {
        const audio = new Audio('/sounds/orphanageSound.mp3');
        audio.currentTime = 0;
        audio.play().catch(() => { });
      } catch (e) { }
    }

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // Instantly hide and kill stage 2 left and right texts
    gsap.set([stage2LeftRef.current, stage2RightRef.current], {
      opacity: 0,
      display: 'none',
    });

    // 1. Grass
    tl.fromTo(grassRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '+=0.1'
    );

    // 2. Polka bg
    tl.fromTo(polkaRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.7 },
      '-=0.5'
    );

    // 3. Lights
    tl.fromTo(lightsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.4)' },
      '-=0.2'
    );

    // 4. Couple
    tl.fromTo(coupleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.4)' },
      '-=0.2'
    );

    // 5. Table
    tl.fromTo(tableRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.4)' },
      '-=0.2'
    );

    // 6. Man
    tl.fromTo(manRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.4)' },
      '-=0.1'
    );
  };

  return (
    <div ref={containerRef} className="w-full h-screen bg-[#FEF8E6] relative overflow-hidden select-none">

      {/* Polka sky bg — Stage 3 */}
      <img ref={polkaRef} src="/projects/beacon/polka.png" alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-0 z-0 pointer-events-none" />

      {/* Stage 1 text: Linear centered at top on mobile, right side on desktop */}
      <div ref={stage1Ref}
        className="absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 lg:right-24 top-10 sm:top-14 md:top-[18%] w-[90%] md:w-[45%] max-w-2xl z-20 pointer-events-none font-JustM flex flex-col items-center md:items-start text-center md:text-left">
        {/* Hope Heaven button matching sound button design */}
        <div className="relative text-center h-[54px] md:h-[60px] w-[140px] md:w-[160px] inline-block mb-3 md:mb-5 select-none">
          <div className="bg-[#9BA3CC] h-[45px] md:h-[50px] pt-1 md:pt-1.5 mt-1 rounded-4xl w-[130px] md:w-[150px] relative left-1">
            <h1 className="text-white text-2xl md:text-3xl font-JustM">Hope Heaven</h1>
          </div>
          <img src="/buttons/buttonsReal.png" className="absolute inset-0 w-full h-full brightness-40 pointer-events-none" alt="" />
        </div>
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.7rem] text-[#1E1E1E] leading-relaxed">
          Hope Heaven is an orphanage tucked away in a remote part of Venice, surrounded by very few homes and almost no signs of human life. Its presence feels like the only trace of humanity in an otherwise quiet and isolated corner of city.
        </p>
      </div>

      {/* Stage 2 text: Linear stacked above house on mobile, left & right flanking on desktop */}
      <div ref={stage2LeftRef}
        style={{ display: awakened ? 'none' : undefined }}
        className={`absolute left-1/2 -translate-x-1/2 md:left-6 lg:left-20 md:translate-x-0 top-12 sm:top-14 md:top-[30%] w-[90%] md:w-[260px] max-w-sm md:max-w-none text-center md:text-left z-20 pointer-events-none font-JustM ${awakened ? '!hidden !opacity-0' : 'opacity-0'}`}>
        <p className="text-2xl sm:text-3xl md:text-4xl text-[#1E1E1E] leading-snug">
          Picassio wants to bless this place with life. The children should nurture in joy he yearns
        </p>
      </div>

      <div ref={stage2RightRef}
        style={{ display: awakened ? 'none' : undefined }}
        className={`absolute left-1/2 -translate-x-1/2 md:left-auto md:right-6 lg:right-20 md:translate-x-0 top-28 sm:top-32 md:top-[26%] w-[90%] md:w-[280px] max-w-sm md:max-w-none text-center md:text-left z-20 pointer-events-none font-JustM ${awakened ? '!hidden !opacity-0' : 'opacity-0'}`}>
        <p className="text-2xl sm:text-3xl md:text-4xl text-[#1E1E1E] leading-snug">
          Use the Beacon by clicking on orphanage to blossom a parenthood environment around these kids
        </p>
      </div>

      {/* House — positioned at center-bottom */}
      <div ref={houseRef}
        onClick={handleHouseClick}
        className={`absolute left-1/2 -translate-x-1/2 bottom-0 z-20 ${canClick && !awakened ? 'cursor-pointer' : ''}`}>
        <img src="/projects/beacon/orphanage.png" alt="Orphanage"
          className="h-[44vh] sm:h-[50vh] md:h-[80vh] w-auto object-contain" />
      </div>

      {/* Stage 3 — Grass at bottom */}
      <img ref={grassRef} src="/projects/beacon/grass.png" alt=""
        className="absolute -bottom-4 sm:-bottom-8 md:-bottom-12 lg:-bottom-16 left-0 w-full h-auto object-contain object-bottom opacity-0 z-10 pointer-events-none" />

      {/* Stage 3 — Lights on right */}
      <div ref={lightsRef}
        className="absolute right-[2%] md:right-[10%] bottom-0 z-30 opacity-0 pointer-events-none">
        <img src="/projects/beacon/lights.png" alt="Streetlight"
          className="h-[180px] sm:h-[240px] md:h-[360px] w-auto object-contain" />
      </div>

      {/* Stage 3 — Couple on right of house */}
      <div ref={coupleRef}
        className="absolute right-[12%] md:right-[22%] bottom-[2%] md:bottom-[4%] z-30 opacity-0 pointer-events-none">
        <img src="/projects/beacon/couple.png" alt="Couple"
          className="h-[95px] sm:h-[130px] md:h-[210px] w-auto object-contain" />
      </div>

      {/* Stage 3 — Table on left of house */}
      <div ref={tableRef}
        className="absolute left-[12%] md:left-[22%] bottom-[2%] md:bottom-[3%] z-30 opacity-0 pointer-events-none">
        <img src="/projects/beacon/table.png" alt="Table"
          className="h-[95px] sm:h-[130px] md:h-[210px] w-auto object-contain" />
      </div>

      {/* Stage 3 — Man on far left */}
      <div ref={manRef}
        className="absolute left-[2%] md:left-[8%] bottom-[2%] md:bottom-[4%] z-30 opacity-0 pointer-events-none">
        <img src="/projects/beacon/man.png" alt="Man"
          className="h-[105px] sm:h-[145px] md:h-[230px] w-auto object-contain" />
      </div>

    </div>
  );
}

export default BeaconStory;