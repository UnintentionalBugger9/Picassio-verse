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
import CursorEffects from './components/effects/cursorEffects';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isBlurred, setIsBlurred] = useState(true);
  const [showBottleAlert, setShowBottleAlert] = useState(false);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);
  const [equippedProject, setEquippedProject] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isAboutMode, setIsAboutMode] = useState(false);

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

  // "Get Started" => open About / Story flow (Introduction -> Job -> Story -> Footer)
  const handleGetStarted = () => {
    setIsAboutMode(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 60);
  };

  // Navbar handler
  const handleNav = (i) => {
    if (i === 0) {
      // Home: return to normal flow and scroll to top
      setIsAboutMode(false);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 60);
    } else if (i === 2) {
      // Projects: open projects page modal
      setIsProjectsOpen(true);
    } else if (i === 3) {
      // About: open about story flow
      setIsAboutMode(true);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 60);
    }
  };

  // Setup horizontal scroll for the about panels section
  useEffect(() => {
    if (!isAboutMode) return;
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

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [isAboutMode]);

  return (
    <div className="relative bg-[#FEF8E6] overflow-x-hidden min-h-screen">
      {/* Blurred page container when initially opening website */}
      <div className={`transition-all duration-700 ${isBlurred ? 'filter blur-[8px]' : ''}`}>
        {/* Fixed Navbar with Sound/Mute Toggle */}
        <Navbar
          onNavigate={handleNav}
          isMuted={isMuted}
          onToggleMute={() => setIsMuted((prev) => !prev)}
        />

        {/* 
          Page Flow:
          1. Normal scroll flow: FirstPage -> BeaconStory (orphanage) -> WandStory (boy) -> Footer
          2. About flow (opened by 'Get Started' or 'About'): Introduction -> Job -> Story -> Footer
          Persistent display toggle prevents DOM unmounting conflicts with GSAP pinSpacers (fixing removeChild error)
        */}
        <div style={{ display: isAboutMode ? 'block' : 'none' }}>
          {/* About Flow: Introduction -> Job -> Story -> Footer */}
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

        <div style={{ display: isAboutMode ? 'none' : 'block' }}>
          {/* Normal Flow: FirstPage -> BeaconStory -> WandStory -> Footer */}
          {/* 1. FirstPage — full viewport */}
          <section className="w-full h-screen">
            <FirstPage onGetStarted={handleGetStarted} />
          </section>

          {/* 2. BeaconStory — scroll-pinned orphanage section */}
          <section id="beacon-section">
            <BeaconStory isMuted={isMuted} />
          </section>

          {/* 3. WandStory — child scene with speech bubbles and threads */}
          <section id="wand-section">
            <WandStory />
          </section>

          {/* 4. Footer in normal scroll path */}
          <section id="footer-section" className="w-full h-screen">
            <Footer
              isGemEquipped={equippedProject === 'gem'}
              onOpenEasterEgg={() => setIsEasterEggOpen(true)}
            />
          </section>
        </div>
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

      {/* Initial BottleAlert popup (occupies entire window with beaconCursor effects) */}
      {showBottleAlert && (
        <div
          id="bottle-alert-container"
          className="fixed inset-0 z-[120] bg-[#FEF8E6] w-full h-full select-none overflow-hidden flex items-center justify-center cursor-[url('/cursors/beaconCursor.png'),_auto]"
          onClick={handleBottleAlertClick}
        >
          <BottleAlert />
        </div>
      )}

      {/* Global Cursor Effects & Audio Layer */}
      <CursorEffects equippedProject={equippedProject} isMuted={isMuted} />
    </div>
  );
}

export default App;
