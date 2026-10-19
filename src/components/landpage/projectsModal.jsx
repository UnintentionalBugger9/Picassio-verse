import React, { useState, useEffect } from 'react';

const PROJECTS = [
  {
    id: 'beacon',
    title: 'The Orphan Beacon',
    image: '/cursors/beacon.png',
    cursor: '/cursors/beaconCursor.png',
    description:
      'It is a device that was created that wherever there is an orphanage multiple men and women are spawned there to take care of babies like their own parents so they never feel lonely',
  },
  {
    id: 'wand',
    title: 'The dopamine wand',
    image: '/cursors/wand.png',
    cursor: '/cursors/wandCursor.png',
    description:
      'it is a device that helps any body who is feeling anxious feel sudden happiness',
  },
  {
    id: 'gem',
    title: 'The Repair gem',
    image: '/cursors/gems.png',
    cursor: '/cursors/gemCursor.png',
    description:
      'A device that helps things go back in time in their previous state',
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
        <div className="h-[200px] md:h-[260px] flex items-center justify-center mb-6 md:mb-8">
          <img
            src={currentProject.image}
            alt={currentProject.title}
            className="max-h-full max-w-[280px] md:max-w-[340px] object-contain drop-shadow-sm transition-all duration-300"
          />
        </div>

        {/* Project Description */}
        <p
          className="text-2xl md:text-3xl lg:text-4xl text-[#1E1E1E] font-JustM max-w-2xl leading-relaxed mb-8 md:mb-10 px-4"
          style={{ fontFamily: "'Just Me Again Down Here', cursive, sans-serif" }}
        >
          {currentProject.description}
        </p>

        {/* Buttons Row with buttonsReal image borders */}
        <div className="flex items-center justify-center gap-5 md:gap-8">
          {/* Prev Button (shown on project 2 and 3) */}
          {currentIndex > 0 && (
            <div
              onClick={handlePrev}
              className="relative h-[56px] px-8 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all select-none"
            >
              <div className="absolute inset-1 rounded-full bg-[#FFBCA1]"></div>
              <span
                className="relative z-10 text-3xl md:text-4xl text-[#1E1E1E] font-JustM pt-0.5"
                style={{ fontFamily: "'Just Me Again Down Here', cursive, sans-serif" }}
              >
                Prev &gt;
              </span>
              <img src="/buttons/buttonsReal.png" className="absolute inset-0 w-full h-full brightness-40 pointer-events-none" alt="" />
            </div>
          )}

          {/* Equip / Equipped Button */}
          <div
            onClick={handleEquipToggle}
            className="relative h-[56px] px-8 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all select-none"
          >
            <div
              className={`absolute inset-1 rounded-full transition-colors ${
                isEquipped ? 'bg-[#7BBBEB]' : 'bg-[#FFA2CE]'
              }`}
            ></div>
            <span
              className="relative z-10 text-3xl md:text-4xl text-[#1E1E1E] font-JustM pt-0.5"
              style={{ fontFamily: "'Just Me Again Down Here', cursive, sans-serif" }}
            >
              {isEquipped ? 'Equipped' : 'Equip'}
            </span>
            <img src="/buttons/buttonsReal.png" className="absolute inset-0 w-full h-full brightness-40 pointer-events-none" alt="" />
          </div>

          {/* Next Button (shown on project 1 and 2) */}
          {currentIndex < PROJECTS.length - 1 && (
            <div
              onClick={handleNext}
              className="relative h-[56px] px-8 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all select-none"
            >
              <div className="absolute inset-1 rounded-full bg-[#FDFBF7]"></div>
              <span
                className="relative z-10 text-3xl md:text-4xl text-[#1E1E1E] font-JustM pt-0.5"
                style={{ fontFamily: "'Just Me Again Down Here', cursive, sans-serif" }}
              >
                Next &gt;
              </span>
              <img src="/buttons/buttonsReal.png" className="absolute inset-0 w-full h-full brightness-40 pointer-events-none" alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectsModal;
