import React, { useEffect, useRef } from 'react';

/**
 * Global Cursor Effects & Audio Controller
 * Handles:
 * - Beacon cursor: Pixel trail burst (ReactBits Pixel Trail style) + beaconSound.mp3
 * - Wand cursor: Glow cursor flare (ReactBits Glow Cursor style) + wandSound.mp3
 * - Gem cursor: Magic cursor sparkle (21st.dev Magic Cursor style) + gemSound.mp3
 * - Scene-scoped cursors: beaconCursor for beaconStory, wandCursor for wandStory, default after
 */
function CursorEffects({ equippedProject, isMuted }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const lastMoveRef = useRef({ x: 0, y: 0, time: 0 });

  const isMutedRef = useRef(isMuted);
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Sound player helper
  const playAudio = (soundPath) => {
    if (isMutedRef.current) return;
    try {
      const audio = new Audio(soundPath);
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } catch (e) {
      // Audio playback failed silently
    }
  };

  // Helper to determine which cursor is active for an event
  const getActiveCursorType = (target) => {
    if (equippedProject === 'gem') return 'gem';
    if (equippedProject === 'wand') return 'wand';
    if (equippedProject === 'beacon') return 'beacon';

    // Check if target is inside bottle-alert, beacon or wand sections
    const bottleAlertEl = document.getElementById('bottle-alert-container');
    if (bottleAlertEl && target && (bottleAlertEl === target || bottleAlertEl.contains(target))) {
      return 'beacon';
    }

    const beaconEl = document.getElementById('beacon-section');
    const wandEl = document.getElementById('wand-section');

    if (beaconEl && target && (beaconEl === target || beaconEl.contains(target))) {
      return 'beacon';
    }
    if (wandEl && target && (wandEl === target || wandEl.contains(target))) {
      return 'wand';
    }

    return null;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Particle Spawners
    const spawnPixelTrailBurst = (x, y) => {
      // Colors from ReactBits Pixel Trail & beacon theme
      const colors = ['#00E5FF', '#E040FB', '#D500F9', '#7C4DFF', '#FFFFFF', '#FF4081', '#18FFFF'];
      const count = 28;

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1.5;
        const size = Math.random() * 8 + 6; // Square pixel size
        particlesRef.current.push({
          type: 'pixel',
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size,
          initialSize: size,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.03 + 0.02,
          gravity: 0.12,
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.2,
        });
      }
    };

    const spawnGlowCursorFlare = (x, y) => {
      // Main central expanding radiant orb
      particlesRef.current.push({
        type: 'glow-core',
        x,
        y,
        radius: 8,
        maxRadius: 55,
        alpha: 1,
        decay: 0.04,
      });

      // Drifting luminous embers
      const count = 16;
      const colors = ['#FFFFFF', '#FF80AB', '#FF4081', '#FFD54F', '#FF1744'];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1;
        particlesRef.current.push({
          type: 'glow-ember',
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.8, // subtle upward float
          radius: Math.random() * 5 + 2.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.035 + 0.02,
        });
      }
    };

    const spawnMagicCursorSparkle = (x, y) => {
      // 4-point magical sparkle stars & stardust (21st.dev Magic Cursor style)
      const colors = ['#00E676', '#1DE9B6', '#FFD700', '#76FF03', '#FFFFFF', '#69F0AE', '#A7FFEB'];
      const count = 22;

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5.5 + 2;
        const size = Math.random() * 12 + 6;
        particlesRef.current.push({
          type: 'magic-star',
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.03 + 0.02,
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.25,
          twinkleSpeed: Math.random() * 15 + 10,
        });
      }
    };

    // Global Click Handler
    const handleClick = (e) => {
      const cursorType = getActiveCursorType(e.target);
      if (!cursorType) return;

      const x = e.clientX;
      const y = e.clientY;

      if (cursorType === 'beacon') {
        playAudio('/sounds/beaconSound.mp3');
        spawnPixelTrailBurst(x, y);
      } else if (cursorType === 'wand') {
        playAudio('/sounds/wandSound.mp3');
        spawnGlowCursorFlare(x, y);
      } else if (cursorType === 'gem') {
        playAudio('/sounds/gemSound.mp3');
        spawnMagicCursorSparkle(x, y);
      }
    };

    // Global Mousemove Trail Handler
    const handleMouseMove = (e) => {
      const now = performance.now();
      if (now - lastMoveRef.current.time < 35) return; // limit trail density
      lastMoveRef.current = { x: e.clientX, y: e.clientY, time: now };

      const cursorType = getActiveCursorType(e.target);
      if (!cursorType) return;

      // Cap maximum active particles to preserve 60-120fps
      if (particlesRef.current.length > 50) {
        particlesRef.current.splice(0, particlesRef.current.length - 50);
      }

      const x = e.clientX;
      const y = e.clientY;

      if (cursorType === 'beacon') {
        // Subtle pixel trail behind cursor
        const colors = ['#00E5FF', '#E040FB', '#D500F9', '#FFFFFF'];
        particlesRef.current.push({
          type: 'pixel',
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 + 0.5,
          size: Math.random() * 5 + 4,
          initialSize: 8,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0.8,
          decay: 0.05,
          gravity: 0.05,
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.1,
        });
      } else if (cursorType === 'wand') {
        // Subtle glow ember trailing cursor
        particlesRef.current.push({
          type: 'glow-ember',
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1,
          vy: -Math.random() * 1.2,
          radius: Math.random() * 4 + 2,
          color: Math.random() > 0.5 ? '#FF80AB' : '#FFD54F',
          alpha: 0.8,
          decay: 0.045,
        });
      } else if (cursorType === 'gem') {
        // Small twinkling magic sparkle
        const colors = ['#00E676', '#1DE9B6', '#FFD700', '#FFFFFF'];
        particlesRef.current.push({
          type: 'magic-star',
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          size: Math.random() * 7 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0.85,
          decay: 0.045,
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.15,
          twinkleSpeed: 12,
        });
      }
    };

    window.addEventListener('click', handleClick, true);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 4-point star path drawing helper
    const draw4PointStar = (ctx, cx, cy, size, rot) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.quadraticCurveTo(0, 0, size, 0);
      ctx.quadraticCurveTo(0, 0, 0, size);
      ctx.quadraticCurveTo(0, 0, -size, 0);
      ctx.quadraticCurveTo(0, 0, 0, -size);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        if (p.type === 'pixel') {
          // Pixel Trail particle
          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity;
          p.vx *= 0.96;
          p.rotation += p.vRot;
          p.alpha -= p.decay;
          const currentSize = p.size * (p.alpha);

          if (p.alpha <= 0 || currentSize <= 0.5) {
            particles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.fillRect(-currentSize / 2, -currentSize / 2, currentSize, currentSize);
          ctx.restore();
        } else if (p.type === 'glow-core') {
          // Central expanding glow flare
          p.radius += (p.maxRadius - p.radius) * 0.12;
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          grad.addColorStop(0, '#FFFFFF');
          grad.addColorStop(0.35, 'rgba(255, 64, 129, 0.9)');
          grad.addColorStop(0.7, 'rgba(255, 171, 64, 0.5)');
          grad.addColorStop(1, 'rgba(255, 64, 129, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (p.type === 'glow-ember') {
          // Soft floating ember
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (p.type === 'magic-star') {
          // 21st.dev Magic Cursor sparkle star
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.95;
          p.vy *= 0.95;
          p.rotation += p.vRot;
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }

          const currentSize = p.size * p.alpha;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 9;
          draw4PointStar(ctx, p.x, p.y, currentSize, p.rotation);
          ctx.restore();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick, true);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [equippedProject]);

  return (
    <>
      {/* Dynamic style for scene-specific cursors */}
      <style>{`
        /* Only apply scene cursors when no manual cursor is equipped via projects */
        ${
          !equippedProject
            ? `
          #beacon-section, #beacon-section * {
            cursor: url('/cursors/beaconCursor.png') 16 16, auto !important;
          }
          #wand-section, #wand-section * {
            cursor: url('/cursors/wandCursor.png') 16 16, auto !important;
          }
        `
            : ''
        }
      `}</style>

      {/* High-performance canvas particle layer */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{ width: '100vw', height: '100vh' }}
      />
    </>
  );
}

export default CursorEffects;
