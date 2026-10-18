import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import Navbar from './components/navbar/navbar';
import FirstPage from './components/landpage/firstPage';
import BeaconStory from './components/landpage/beaconStory';
import WandStory from './components/landpage/wandStory';
import Introduction from './components/landpage/introduction';
import Job from './components/landpage/job';
import Story from './components/landpage/story';
import Footer from './components/footer/footer';
import ProjectsModal from './components/landpage/projectsModal';
import BottleAlert from './components/bottleAlert/bottleAlert';
import EasterEgg from './components/easterEgg/easterEgg';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isBlurred, setIsBlurred] = useState(true);
  const [showBottleAlert, setShowBottleAlert] = useState(false);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);
  const [equippedProject, setEquippedProject] = useState(null);

  const horizontalRef = useRef(null);
  const trackRef = useRef(null);
  const totalPanels = 4; // Introduction, Job, Story, Footer

  // 1. When website is opened for first time: everything blur, in 2-3s bottleAlert opens
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBottleAlert(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Sync custom cursor globally whenever equippedProject changes
  useEffect(() => {
    const existingStyle = document.getElementById('custom-cursor-override');
    if (existingStyle) {
      existingStyle.remove();
    }

    if (equippedProject) {
      const cursorMap = {
        beacon: '/cursors/beaconCursor.png',
        wand: '/cursors/wandCursor.png',
        gem: '/cursors/gemCursor.png',
      };
      const cursorUrl = cursorMap[equippedProject];
      if (cursorUrl) {
        const style = document.createElement('style');
        style.id = 'custom-cursor-override';
        style.innerHTML = `
          *, *::before, *::after, html, body, button, a, div, span, img {
            cursor: url('${cursorUrl}') 16 16, auto !important;
          }
        `;
        document.head.appendChild(style);
      }
    }

    return () => {
      const el = document.getElementById('custom-cursor-override');
      if (el) el.remove();
    };
  }, [equippedProject]);

  // Handle bottleAlert refill click
  const handleBottleAlertClick = (e) => {
    if (e.target && e.target.tagName === 'IMG') {
      // 1. Reset cursor to normal
      setEquippedProject(null);
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
      const cursorEl = document.getElementById('custom-cursor-override');
      if (cursorEl) cursorEl.remove();

      // 2. Land to homepage ignoring if user scrolled some amount before popup
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

      // 3. Unblur and close popup
      setTimeout(() => {
        setIsBlurred(false);
        setShowBottleAlert(false);
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }, 700);
    }
  };

  // Scroll to a horizontal panel by index (0=Intro, 1=Job, 2=Story, 3=Footer)
  const scrollToHPanel = (index) => {
    const st = ScrollTrigger.getById('hScroll');
    if (st) {
      const progress = index / (totalPanels - 1);
      const target = st.start + (st.end - st.start) * progress;
      gsap.to(window, {
        scrollTo: { y: target, autoKill: false },
        duration: 1.2,
        ease: 'power2.inOut',
      });
    }
  };

  // "Get Started" => scroll to the horizontal section (Introduction)
  const handleGetStarted = () => {
    const el = horizontalRef.current;
    if (el) {
      gsap.to(window, {
        scrollTo: { y: el, autoKill: false },
        duration: 1.2,
        ease: 'power2.inOut',
      });
    }
  };

  // Navbar handler
  const handleNav = (i) => {
    if (i === 0) {
      // Home: scroll to top
      gsap.to(window, { scrollTo: { y: 0 }, duration: 1, ease: 'power2.inOut' });
    } else if (i === 2) {
      // Projects: open projects page
      setIsProjectsOpen(true);
    } else if (i === 3) {
      // About: scroll to Story panel (index 2 in horizontal)
      scrollToHPanel(2);
    }
  };

  // Setup horizontal scroll for the panels section
  useEffect(() => {
    const container = horizontalRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (totalPanels - 1),
            duration: { min: 0.2, max: 0.4 },
            ease: 'power1.inOut',
          },
          end: () => `+=${window.innerWidth * (totalPanels - 1)}`,
          invalidateOnRefresh: true,
          id: 'hScroll',
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative bg-[#FEF8E6] overflow-x-hidden min-h-screen">
      {/* Blurred page container when initially opening website */}
      <div className={`transition-all duration-700 ${isBlurred ? 'filter blur-[8px]' : ''}`}>
        {/* Fixed Navbar */}
        <Navbar onNavigate={handleNav} />

        {/* 
          Page flow (vertical):
          1. FirstPage (100vh) — hero landing
          2. BeaconStory (pinned, scroll-driven orphanage animation)
          3. WandStory (boy with speech bubbles and threads)
          4. Horizontal scroll section (Introduction → Job → Story → Footer)
          
          "Get Started" on FirstPage scrolls user to #4.
          Normal downward scroll from FirstPage goes into BeaconStory first.
        */}

        {/* 1. FirstPage — full viewport */}
        <section className="w-full h-screen">
          <FirstPage onGetStarted={handleGetStarted} />
        </section>

        {/* 2. BeaconStory — scroll-pinned orphanage section */}
        <section id="beacon-section">
          <BeaconStory />
        </section>

        {/* 3. WandStory — child scene with speech bubbles and threads */}
        <section id="wand-section">
          <WandStory />
        </section>

        {/* 4. Horizontal scroll panels */}
        <section ref={horizontalRef} className="w-screen h-screen overflow-hidden relative">
          <div
            ref={trackRef}
            className="flex flex-row h-full will-change-transform"
            style={{ width: `${totalPanels * 100}vw` }}
          >
            <div className="w-screen h-full flex-shrink-0 flex items-center justify-center overflow-hidden">
              <Introduction />
            </div>
            <div className="w-screen h-full flex-shrink-0 flex items-center justify-center overflow-hidden">
              <Job />
            </div>
            <div className="w-screen h-full flex-shrink-0 flex items-center justify-center overflow-hidden">
              <Story />
            </div>
            <div className="w-screen h-full flex-shrink-0 flex items-center justify-center overflow-hidden">
              <Footer
                isGemEquipped={equippedProject === 'gem'}
                onOpenEasterEgg={() => setIsEasterEggOpen(true)}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Projects Modal / Page */}
      <ProjectsModal
        isOpen={isProjectsOpen}
        onClose={() => setIsProjectsOpen(false)}
        equippedProject={equippedProject}
        setEquippedProject={setEquippedProject}
      />

      {/* Easter Egg Modal View */}
      {isEasterEggOpen && (
        <div className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-[#FEF8E6] select-none p-6 md:p-12 animate-fadeIn">
          <button
            onClick={() => setIsEasterEggOpen(false)}
            className="absolute top-6 right-8 text-4xl text-[#3E3E3E] hover:text-[#FF4EA4] transition-colors font-bold z-50 p-2"
            title="Close"
          >
            ✕
          </button>
          <div className="w-full max-w-5xl flex items-center justify-center">
            <EasterEgg />
          </div>
        </div>
      )}

      {/* Initial BottleAlert popup (opens in 2-3s after page opens blurred) */}
      {showBottleAlert && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/15 select-none overflow-hidden"
          onClick={handleBottleAlertClick}
        >
          <div className="bg-[#FEF8E6] p-4 md:p-8 rounded-3xl shadow-2xl max-w-4xl w-full mx-4 border-2 border-[#1E1E1E] flex items-center justify-center">
            <BottleAlert />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
