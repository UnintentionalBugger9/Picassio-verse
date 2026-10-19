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
          },
        },
      });

      // House starts partially on left (shifted a little to the right), slides into center
      tl.fromTo(
        houseRef.current,
        { xPercent: -48 },
        { xPercent: 0, duration: 1, ease: 'none' },
        0
      );

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

    // Fade out stage 2 texts
    tl.to([stage2LeftRef.current, stage2RightRef.current], {
      opacity: 0, duration: 0.4,
    });

    // 1. Grass
    tl.fromTo(grassRef.current,
      { opacity: 0, y: 40 },
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

      {/* Stage 1 text — right side */}
      <div ref={stage1Ref}
        className="absolute right-8 md:right-16 lg:right-24 top-[18%] w-[45%] max-w-2xl z-20 pointer-events-none font-JustM">
        {/* Hope Heaven button matching sound button design */}
        <div className="relative text-center h-[60px] w-[160px] inline-block mb-5 select-none">
          <div className="bg-[#9BA3CC] h-[50px] pt-1.5 mt-1 rounded-4xl w-[150px] relative left-1">
            <h1 className="text-white text-3xl font-JustM">Hope Heaven</h1>
          </div>
          <img src="/buttons/buttonsReal.png" className="absolute inset-0 w-full h-full brightness-40 pointer-events-none" alt="" />
        </div>
        <p className="text-3xl md:text-4xl lg:text-[2.7rem] text-[#1E1E1E] leading-relaxed">
          Hope Heaven is an orphanage tucked away in a remote part of Venice, surrounded by very few homes and almost no signs of human life. Its presence feels like the only trace of humanity in an otherwise quiet and isolated corner of city.
        </p>
      </div>

      {/* Stage 2 left text */}
      <div ref={stage2LeftRef}
        className="absolute left-6 md:left-12 lg:left-20 top-[30%] w-[200px] md:w-[260px] z-20 pointer-events-none font-JustM opacity-0">
        <p className="text-3xl md:text-4xl text-[#1E1E1E] leading-snug">
          Picassio wants to bless this place with life. The children should nurture in joy he yearns
        </p>
      </div>

      {/* Stage 2 right text */}
      <div ref={stage2RightRef}
        className="absolute right-6 md:right-12 lg:right-20 top-[26%] w-[220px] md:w-[280px] z-20 pointer-events-none font-JustM opacity-0">
        <p className="text-3xl md:text-4xl text-[#1E1E1E] leading-snug">
          Use the Beacon by clicking on orphanage to blossom a parenthood environment around these kids
        </p>
      </div>

      {/* House — positioned at center-bottom, GSAP slides xPercent from -70 to 0 */}
      <div ref={houseRef}
        onClick={handleHouseClick}
        className={`absolute left-1/2 -translate-x-1/2 bottom-0 z-20 ${canClick && !awakened ? 'cursor-pointer' : ''}`}>
        <img src="/projects/beacon/orphanage.png" alt="Orphanage"
          className="h-[72vh] md:h-[80vh] w-auto object-contain" />
      </div>

      {/* Stage 3 — Grass at bottom */}
      <img ref={grassRef} src="/projects/beacon/grass.png" alt=""
        className="absolute bottom-0 left-0 w-full h-auto object-contain object-bottom opacity-0 z-10 pointer-events-none" />

      {/* Stage 3 — Lights on right */}
      <div ref={lightsRef}
        className="absolute right-[10%] bottom-0 z-30 opacity-0 pointer-events-none">
        <img src="/projects/beacon/lights.png" alt="Streetlight"
          className="h-[300px] md:h-[360px] w-auto object-contain" />
      </div>

      {/* Stage 3 — Couple on right of house */}
      <div ref={coupleRef}
        className="absolute right-[22%] bottom-[4%] z-30 opacity-0 pointer-events-none">
        <img src="/projects/beacon/couple.png" alt="Couple"
          className="h-[170px] md:h-[210px] w-auto object-contain" />
      </div>

      {/* Stage 3 — Table on left of house */}
      <div ref={tableRef}
        className="absolute left-[22%] bottom-[3%] z-30 opacity-0 pointer-events-none">
        <img src="/projects/beacon/table.png" alt="Table"
          className="h-[170px] md:h-[210px] w-auto object-contain" />
      </div>

      {/* Stage 3 — Man on far left */}
      <div ref={manRef}
        className="absolute left-[8%] bottom-[4%] z-30 opacity-0 pointer-events-none">
        <img src="/projects/beacon/man.png" alt="Man"
          className="h-[190px] md:h-[230px] w-auto object-contain" />
      </div>

    </div>
  );
}

export default BeaconStory;