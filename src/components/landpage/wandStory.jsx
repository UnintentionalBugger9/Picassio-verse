import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 5 speech bubbles matching exact positions on desktop
const DESKTOP_BUBBLES = [
  {
    id: 'future',
    initialText: 'future?',
    positiveText: 'success',
    leftPercent: 13,
    topPercent: 15,
    widthVw: 19,
  },
  {
    id: 'parents',
    initialText: 'Parents?',
    positiveText: 'family',
    leftPercent: 33,
    topPercent: 62,
    widthVw: 19,
  },
  {
    id: 'money',
    initialText: 'Money?',
    positiveText: 'wealth',
    leftPercent: 49,
    topPercent: 34,
    widthVw: 19,
  },
  {
    id: 'friends',
    initialText: 'friends?',
    positiveText: 'friendship',
    leftPercent: 70,
    topPercent: 15,
    widthVw: 19,
  },
  {
    id: 'love',
    initialText: 'Love?',
    positiveText: 'loved',
    leftPercent: 72,
    topPercent: 61,
    widthVw: 19,
  },
];

// 5 speech bubbles optimized for mobile screens (<768px) to prevent overlap & overflow
const MOBILE_BUBBLES = [
  {
    id: 'future',
    initialText: 'future?',
    positiveText: 'success',
    leftPercent: 6,
    topPercent: 8,
    widthVw: 29,
  },
  {
    id: 'friends',
    initialText: 'friends?',
    positiveText: 'friendship',
    leftPercent: 60,
    topPercent: 8,
    widthVw: 29,
  },
  {
    id: 'money',
    initialText: 'Money?',
    positiveText: 'wealth',
    leftPercent: 34,
    topPercent: 26,
    widthVw: 29,
  },
  {
    id: 'love',
    initialText: 'Love?',
    positiveText: 'loved',
    leftPercent: 62,
    topPercent: 44,
    widthVw: 29,
  },
  {
    id: 'parents',
    initialText: 'Parents?',
    positiveText: 'family',
    leftPercent: 32,
    topPercent: 62,
    widthVw: 29,
  },
];

// Threads connecting the speech bubbles
const THREADS_CONFIG = [
  { id: 't-future-parents', from: 'future', to: 'parents', sag: 22 },
  { id: 't-future-money', from: 'future', to: 'money', sag: 28 },
  { id: 't-parents-money', from: 'parents', to: 'money', sag: -18 },
  { id: 't-money-friends', from: 'money', to: 'friends', sag: 24 },
  { id: 't-money-love', from: 'money', to: 'love', sag: 22 },
  { id: 't-friends-love', from: 'friends', to: 'love', sag: 20 },
];

function WandStory() {
  const containerRef = useRef(null);
  const introTextRef = useRef(null);
  const interactiveLayerRef = useRef(null);
  const [bubbleCoords, setBubbleCoords] = useState({});
  const [severedThreads, setSeveredThreads] = useState({});
  const [positiveBubbles, setPositiveBubbles] = useState({});
  const [severParticles, setSeverParticles] = useState([]);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const bubbleRefs = useRef({});

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeBubbles = isMobile ? MOBILE_BUBBLES : DESKTOP_BUBBLES;

  // ScrollTrigger pinned timeline: first show paragraph, on further scroll show threads and bubbles
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=1400',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Paragraph starts visible, smoothly fades out on scroll
      if (introTextRef.current) {
        tl.to(
          introTextRef.current,
          { opacity: 0, y: -25, duration: 0.35, ease: 'power1.out' },
          0.2
        );
      }

      // Interactive layer (threads & speech bubbles) fades in and becomes interactive
      if (interactiveLayerRef.current) {
        tl.fromTo(
          interactiveLayerRef.current,
          { opacity: 0, pointerEvents: 'none' },
          { opacity: 1, pointerEvents: 'auto', duration: 0.45, ease: 'power1.out' },
          0.5
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  // Calculate coordinates both geometrically and from DOM
  const updateCoordinates = useCallback(() => {
    if (!containerRef.current) return;
    const cRect = containerRef.current.getBoundingClientRect();
    const w = cRect.width || window.innerWidth;
    const h = cRect.height || window.innerHeight;
    const mobile = w < 768;
    const list = mobile ? MOBILE_BUBBLES : DESKTOP_BUBBLES;
    const coords = {};

    list.forEach((b) => {
      const el = bubbleRefs.current[b.id];
      if (el && el.offsetWidth > 0 && el.offsetHeight > 0) {
        const bRect = el.getBoundingClientRect();
        coords[b.id] = {
          x: bRect.left - cRect.left + bRect.width * 0.5,
          y: bRect.top - cRect.top + bRect.height * 0.42,
        };
      } else {
        // Geometric calculation fallback
        let bw = (b.widthVw / 100) * w;
        const minW = mobile ? 105 : 190;
        const maxW = mobile ? 135 : 290;
        if (bw < minW) bw = minW;
        if (bw > maxW) bw = maxW;
        const bh = bw * (1024 / 1536);
        const bx = (b.leftPercent / 100) * w;
        const by = (b.topPercent / 100) * h;
        coords[b.id] = {
          x: bx + bw * 0.5,
          y: by + bh * 0.42,
        };
      }
    });

    setBubbleCoords(coords);
  }, []);

  useEffect(() => {
    updateCoordinates();
    window.addEventListener('resize', updateCoordinates);
    const t1 = setTimeout(updateCoordinates, 100);
    const t2 = setTimeout(updateCoordinates, 500);
    return () => {
      window.removeEventListener('resize', updateCoordinates);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [updateCoordinates, isMobile]);

  // Handle clicking on a thread to severe it
  const handleSeverThread = (threadId, clickEvent) => {
    // When one thread is clicked on and severed, all other threads get severed automatically
    const allSevered = {};
    THREADS_CONFIG.forEach((t) => {
      allSevered[t.id] = true;
    });
    setSeveredThreads(allSevered);

    // Replace current words in speech with positive versions
    const allPositive = {};
    BUBBLE_DATA.forEach((b) => {
      allPositive[b.id] = true;
    });
    setPositiveBubbles(allPositive);

    // Particle burst at cut position
    if (clickEvent && containerRef.current) {
      const cRect = containerRef.current.getBoundingClientRect();
      const clickX = clickEvent.clientX - cRect.left;
      const clickY = clickEvent.clientY - cRect.top;

      const newParticles = Array.from({ length: 12 }).map((_, i) => ({
        id: `${threadId}-${Date.now()}-${i}`,
        x: clickX,
        y: clickY,
        vx: (Math.random() - 0.5) * 140,
        vy: (Math.random() - 0.7) * 120,
        size: Math.random() * 3 + 2,
        color: i % 2 === 0 ? '#E53935' : '#B71C1C',
      }));

      setSeverParticles((prev) => [...prev, ...newParticles]);

      // Remove particles after animation
      setTimeout(() => {
        setSeverParticles((prev) =>
          prev.filter((p) => !newParticles.find((np) => np.id === p.id))
        );
      }, 700);
    }
  };

  // Allow clicking directly on speech bubble to also severe any attached thread and transform words
  const handleBubbleClick = (bubbleId) => {
    const attached = THREADS_CONFIG.filter(
      (t) => t.from === bubbleId || t.to === bubbleId
    );
    const unsevered = attached.find((t) => !severedThreads[t.id]);
    if (unsevered) {
      handleSeverThread(unsevered.id);
    } else {
      setPositiveBubbles((prev) => ({ ...prev, [bubbleId]: true }));
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-[#FEF8E6] overflow-hidden select-none"
      style={{ minHeight: '100vh' }}
    >
      {/* Scene-specific geometric background at 50% opacity */}
      <img
        src="/projects/wand/bg.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none z-0"
      />

      {/* Stage 1: Paragraph to the right of the boy on desktop; centered above boy on mobile */}
      <div
        ref={introTextRef}
        className="absolute left-4 right-4 md:left-[36%] lg:left-[40%] top-14 sm:top-20 md:top-[28%] w-auto md:w-[52%] max-w-2xl z-20 pointer-events-none font-JustM text-center md:text-left"
      >
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] text-[#1E1E1E] leading-relaxed">
          A teenage mind, weighed down by uncertainty about the future and the things that matter most, was consumed by anxiety. Picassio severed those tangled threads with his wand, freeing the boy from the weight of his worries and bringing him a much-needed spark of joy and dopamine.
        </p>
      </div>

      {/* Stage 2: Interactive Threads & Speech Bubbles (revealed on further scroll) */}
      <div
        ref={interactiveLayerRef}
        className="absolute inset-0 w-full h-full z-10 opacity-0 pointer-events-none"
      >
        {/* SVG filter for realistic thread yarn texture */}
        <svg className="absolute w-0 h-0" aria-hidden="true">
          <defs>
            <filter id="thread-yarn-texture" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="1.8"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>

        {/* SVG Canvas for proper thick red threads */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{ overflow: 'visible' }}
        >
          {THREADS_CONFIG.map((thread) => {
            const fromPt = bubbleCoords[thread.from];
            const toPt = bubbleCoords[thread.to];
            if (!fromPt || !toPt) return null;

            const isSevered = severedThreads[thread.id];

            // Compute midpoint & curved catenary sag
            const midX = (fromPt.x + toPt.x) / 2;
            const midY = (fromPt.y + toPt.y) / 2 + (thread.sag || 20);

            if (!isSevered) {
              // Intact realistic thick thread with organic catenary droop
              const pathData = `M ${fromPt.x} ${fromPt.y} Q ${midX} ${midY} ${toPt.x} ${toPt.y}`;

              return (
                <g
                  key={thread.id}
                  className="group pointer-events-auto cursor-pointer"
                  onClick={(e) => handleSeverThread(thread.id, e)}
                >
                  {/* Invisible wide hit area for effortless clicking */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="28"
                    strokeLinecap="round"
                  />

                  {/* Dark under-shadow for depth */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#6B0A0A"
                    strokeWidth="6"
                    strokeLinecap="round"
                    opacity="0.8"
                  />

                  {/* Core thick scarlet red thread with yarn texture filter */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#D32F2F"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    filter="url(#thread-yarn-texture)"
                    className="transition-all duration-200 group-hover:stroke-[#E53935]"
                  />

                  {/* Intertwined twisted strand highlight for real yarn look */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#FF8A80"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    strokeLinecap="round"
                    opacity="0.9"
                  />

                  {/* Secondary twisted spiral ply */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#B71C1C"
                    strokeWidth="1.5"
                    strokeDasharray="3 7"
                    strokeLinecap="round"
                    opacity="0.75"
                  />
                </g>
              );
            } else {
              // Severed thread: snaps in two halves, recoiling and drooping down loose with frayed tips
              const cutDropY = midY + 45;
              const half1EndX = fromPt.x + (midX - fromPt.x) * 0.55;
              const half1EndY = fromPt.y + (cutDropY - fromPt.y) * 0.75;

              const half2StartX = toPt.x + (midX - toPt.x) * 0.55;
              const half2StartY = toPt.y + (cutDropY - toPt.y) * 0.75;

              const path1 = `M ${fromPt.x} ${fromPt.y} Q ${fromPt.x * 0.7 + midX * 0.3} ${midY + 15} ${half1EndX} ${half1EndY}`;
              const path2 = `M ${toPt.x} ${toPt.y} Q ${toPt.x * 0.7 + midX * 0.3} ${midY + 15} ${half2StartX} ${half2StartY}`;

              return (
                <g key={thread.id} className="pointer-events-none opacity-85">
                  {/* Half 1 drooping limp */}
                  <path
                    d={path1}
                    fill="none"
                    stroke="#6B0A0A"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                  <path
                    d={path1}
                    fill="none"
                    stroke="#D32F2F"
                    strokeWidth="4"
                    strokeLinecap="round"
                    filter="url(#thread-yarn-texture)"
                  />
                  <path
                    d={path1}
                    fill="none"
                    stroke="#FF8A80"
                    strokeWidth="1.8"
                    strokeDasharray="5 3"
                    strokeLinecap="round"
                  />
                  {/* Frayed fiber tip on severed end 1 */}
                  <line
                    x1={half1EndX}
                    y1={half1EndY}
                    x2={half1EndX - 3}
                    y2={half1EndY + 5}
                    stroke="#D32F2F"
                    strokeWidth="1.5"
                  />
                  <line
                    x1={half1EndX}
                    y1={half1EndY}
                    x2={half1EndX + 2}
                    y2={half1EndY + 6}
                    stroke="#FF8A80"
                    strokeWidth="1.2"
                  />

                  {/* Half 2 drooping limp */}
                  <path
                    d={path2}
                    fill="none"
                    stroke="#6B0A0A"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                  <path
                    d={path2}
                    fill="none"
                    stroke="#D32F2F"
                    strokeWidth="4"
                    strokeLinecap="round"
                    filter="url(#thread-yarn-texture)"
                  />
                  <path
                    d={path2}
                    fill="none"
                    stroke="#FF8A80"
                    strokeWidth="1.8"
                    strokeDasharray="5 3"
                    strokeLinecap="round"
                  />
                  {/* Frayed fiber tip on severed end 2 */}
                  <line
                    x1={half2StartX}
                    y1={half2StartY}
                    x2={half2StartX - 3}
                    y2={half2StartY + 6}
                    stroke="#D32F2F"
                    strokeWidth="1.5"
                  />
                  <line
                    x1={half2StartX}
                    y1={half2StartY}
                    x2={half2StartX + 2}
                    y2={half2StartY + 5}
                    stroke="#FF8A80"
                    strokeWidth="1.2"
                  />
                </g>
              );
            }
          })}

          {/* Dynamic cut particle sparks */}
          {severParticles.map((p) => (
            <circle
              key={p.id}
              cx={p.x + p.vx * 0.05}
              cy={p.y + p.vy * 0.05}
              r={p.size}
              fill={p.color}
              className="animate-ping"
              style={{ animationDuration: '0.6s' }}
            />
          ))}
        </svg>

        {/* 5 Speech Bubbles positioned responsively on mobile vs desktop */}
        {activeBubbles.map((bubble) => {
          const isPositive = positiveBubbles[bubble.id];
          const displayText = isPositive ? bubble.positiveText : bubble.initialText;

          return (
            <div
              key={bubble.id}
              ref={(el) => (bubbleRefs.current[bubble.id] = el)}
              onClick={() => handleBubbleClick(bubble.id)}
              style={{
                position: 'absolute',
                left: `${bubble.leftPercent}%`,
                top: `${bubble.topPercent}%`,
                width: isMobile ? '29vw' : `${bubble.widthVw}vw`,
                minWidth: isMobile ? '105px' : '190px',
                maxWidth: isMobile ? '135px' : '290px',
              }}
              className="z-20 cursor-pointer transition-transform duration-300 hover:scale-[1.03]"
            >
              <div className="relative w-full">
                {/* Dialogue Box Speech Bubble Image */}
                <img
                  src="/projects/wand/speech.png"
                  alt="Speech bubble"
                  onLoad={updateCoordinates}
                  className="w-full h-auto object-contain drop-shadow-sm select-none pointer-events-none"
                />

                {/* Text inside Speech Bubble */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{
                    top: '12%',
                    bottom: '38%',
                  }}
                >
                  <span
                    key={displayText}
                    className="font-JustM tracking-wide text-[#D62828] text-xl sm:text-2xl md:text-4xl"
                    style={{
                      fontFamily: "'Just Me Again Down Here', cursive, sans-serif",
                    }}
                  >
                    {displayText}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Boy sitting in bottom-left corner curled up */}
      <div className="absolute left-0 bottom-0 z-20 pointer-events-none select-none">
        <img
          src="/projects/wand/boy.png"
          alt="Curled up child"
          className="h-[25vh] sm:h-[32vh] md:h-[40vh] max-h-[380px] w-auto object-contain object-bottom"
        />
      </div>
    </div>
  );
}

export default WandStory;
