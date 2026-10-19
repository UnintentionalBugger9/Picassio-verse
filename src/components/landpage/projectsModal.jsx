import React, { useState, useEffect } from 'react';

const PROJECTS = [
  {
    id: 'beacon',
    title: 'The Orphan Beacon',
    image: '/cursors/beacon.png',
    cursor: '/cursors/beaconCursor.png',
    description:
      'The Beacon is a device designed to transform orphanages into homes. Wherever an orphanage exists, it spawns caring men and women to nurture the children like their own, ensuring no child ever feels alone.',
  },
  {
    id: 'wand',
    title: 'The dopamine wand',
    image: '/cursors/wand.png',
    cursor: '/cursors/wandCursor.png',
    description:
      'It is a device designed to help anyone overcome anxiety and experience a sudden burst of happiness for a temporary amount of time',
  },
  {
    id: 'gem',
    title: 'The Repair gem',
    image: '/cursors/gems.png',
    cursor: '/cursors/gemCursor.png',
    description: (
      <>
        A device that helps things go back in time in their previous state and can repair{' '}
        <span className="font-bold text-black" style={{ WebkitTextStroke: '0.9px #000' }}>
          broken objects
        </span>{' '}
        by equipping
      </>
    ),
  },
];

function ProjectsModal({ isOpen, onClose, equippedProject: propEquipped, setEquippedProject: propSetEquipped }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localEquipped, setLocalEquipped] = useState(null);

  const equippedProject = propEquipped !== undefined ? propEquipped : localEquipped;
  const setEquippedProject = propSetEquipped || setLocalEquipped;

  // Apply custom cursor globally when equipped
  useEffect(() => {
    const existingStyle = document.getElementById('custom-cursor-override');
    if (existingStyle) {
      existingStyle.remove();
    }

    if (equippedProject) {
      const proj = PROJECTS.find((p) => p.id === equippedProject);
      if (proj && proj.cursor) {
        const style = document.createElement('style');
        style.id = 'custom-cursor-override';
        style.innerHTML = `
          *, *::before, *::after, html, body, button, a, div, span, img {
            cursor: url('${proj.cursor}') 16 16, auto !important;
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

  if (!isOpen) return null;

  const currentProject = PROJECTS[currentIndex];
  const isEquipped = equippedProject === currentProject.id;

  const handleEquipToggle = () => {
    if (isEquipped) {
      // Return cursor to default
      setEquippedProject(null);
    } else {
      // Equip current project cursor
      setEquippedProject(currentProject.id);
    }
  };

  const handleNext = () => {
    if (currentIndex < PROJECTS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FEF8E6] select-none p-6 md:p-12 animate-fadeIn">
      {/* Close button in top-right corner */}
      <button
        onClick={onClose}
        className="absolute top-6 right-8 text-4xl text-[#3E3E3E] hover:text-[#FF4EA4] transition-colors font-bold z-50 p-2"
        title="Close Projects"
        aria-label="Close"
      >
        ✕
      </button>

      {/* Main Content Container matching reference image */}
      <div className="w-full max-w-4xl flex flex-col items-center text-center">
        {/* Project Title */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl text-[#1E1E1E] font-JustM tracking-wide mb-6 md:mb-8"
          style={{ fontFamily: "'Just Me Again Down Here', cursive, sans-serif" }}
        >
          {currentProject.title}
        </h1>

        {/* Project Image */}
        <div className="h-[180px] md:h-[220px] flex items-center justify-center mb-5 md:mb-6">
          <img
            src={currentProject.image}
            alt={currentProject.title}
            className={`max-h-full ${
              currentProject.id === 'beacon' ? 'max-h-[160px] md:max-h-[190px] max-w-[210px] md:max-w-[250px]' : 'max-w-[280px] md:max-w-[340px]'
            } object-contain drop-shadow-sm transition-all duration-300`}
          />
        </div>

        {/* Project Description container with consistent height */}
        <div className="min-h-[76px] md:min-h-[96px] max-w-2xl flex items-center justify-center mb-6 md:mb-8 px-4">
          <p
            className="text-2xl md:text-3xl lg:text-4xl text-[#1E1E1E] font-JustM leading-snug"
            style={{ fontFamily: "'Just Me Again Down Here', cursive, sans-serif" }}
          >
            {currentProject.description}
          </p>
        </div>

        {/* Buttons Row with buttonsReal image borders matching sound button design */}
        <div className="flex items-center justify-center gap-5 md:gap-8">
          {/* Prev Button (shown on project 2 and 3) */}
          {currentIndex > 0 && (
            <div
              onClick={handlePrev}
              className="relative text-center h-[60px] w-[140px] cursor-pointer hover:scale-105 active:scale-95 transition-transform select-none"
            >
              <div className="bg-[#FFBCA1] h-[50px] pt-1.5 mt-1 rounded-4xl w-[130px] relative left-1">
                <h1
                  className="text-[#1E1E1E] text-3xl font-JustM"
                  style={{ fontFamily: "'Just Me Again Down Here', cursive, sans-serif" }}
                >
                  Prev &gt;
                </h1>
              </div>
              <img src="/buttons/buttonsReal.png" className="absolute inset-0 w-full h-full brightness-40 pointer-events-none" alt="" />
            </div>
          )}

          {/* Equip / Equipped Button */}
          <div
            onClick={handleEquipToggle}
            className="relative text-center h-[60px] w-[140px] cursor-pointer hover:scale-105 active:scale-95 transition-transform select-none"
          >
            <div
              className={`${
                isEquipped ? 'bg-[#7BBBEB]' : 'bg-[#FFA2CE]'
              } h-[50px] pt-1.5 mt-1 rounded-4xl w-[130px] relative left-1 transition-colors`}
            >
              <h1
                className="text-[#1E1E1E] text-3xl font-JustM"
                style={{ fontFamily: "'Just Me Again Down Here', cursive, sans-serif" }}
              >
                {isEquipped ? 'Equipped' : 'Equip'}
              </h1>
            </div>
            <img src="/buttons/buttonsReal.png" className="absolute inset-0 w-full h-full brightness-40 pointer-events-none" alt="" />
          </div>

          {/* Next Button (shown on project 1 and 2) */}
          {currentIndex < PROJECTS.length - 1 && (
            <div
              onClick={handleNext}
              className="relative text-center h-[60px] w-[140px] cursor-pointer hover:scale-105 active:scale-95 transition-transform select-none"
            >
              <div className="bg-[#FDFBF7] h-[50px] pt-1.5 mt-1 rounded-4xl w-[130px] relative left-1">
                <h1
                  className="text-[#1E1E1E] text-3xl font-JustM"
                  style={{ fontFamily: "'Just Me Again Down Here', cursive, sans-serif" }}
                >
                  Next &gt;
                </h1>
              </div>
              <img src="/buttons/buttonsReal.png" className="absolute inset-0 w-full h-full brightness-40 pointer-events-none" alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectsModal;
