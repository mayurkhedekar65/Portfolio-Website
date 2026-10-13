/**
 * ProjectOrbit.jsx — Interactive, fully-responsive 3D CSS carousel/orbit.
 *
 * Preserves 3D depth, perspective, and orbit rotation across all viewport sizes
 * (from 320px mobile to 4K ultra-wide desktop).
 *
 * Key responsive & interaction features:
 * - Dynamic geometry: radiusX, radiusZ, cardWidth, and perspective adapt fluidly to screen width.
 * - Non-hijacking touch gestures: directional intent detection allows native vertical page scrolling
 *   while supporting horizontal swipe navigation on touchscreens.
 * - Spring-lerp snapping: smooth settle animation after drag or navigation.
 * - Respects prefers-reduced-motion: auto-rotation is paused if reduced motion is requested.
 * - Accessible controls: keyboard arrow keys, dot indicators, prev/next buttons, and pause toggle.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import ProjectWindow from './ProjectWindow';
import ProjectInfo from './ProjectInfo';
import { projects } from '../../data/projects';
import './ProjectOrbit.css';

// Base animation configuration
const AUTO_ROTATE_SPEED = 0.12; // degrees per frame
const DRAG_SENSITIVITY = 0.35;
const SNAP_LERP = 0.10;
const SNAP_THRESHOLD = 0.05;

/**
 * Computes responsive 3D geometry parameters based on container/viewport width.
 * Ensures the 3D orbit never overflows the viewport or clips on narrow mobile screens.
 */
function getResponsiveGeometry(width) {
  if (width >= 1200) {
    return {
      radiusX: 380,
      radiusZ: 130,
      cardWidth: 280,
      stageHeight: 380,
      perspective: 1200,
      scaleFront: 1.05,
      scaleBack: 0.65,
      opacityBack: 0.35,
    };
  }
  if (width >= 960) {
    return {
      radiusX: 320,
      radiusZ: 110,
      cardWidth: 260,
      stageHeight: 360,
      perspective: 1100,
      scaleFront: 1.02,
      scaleBack: 0.64,
      opacityBack: 0.32,
    };
  }
  if (width >= 768) {
    return {
      radiusX: 250,
      radiusZ: 85,
      cardWidth: 230,
      stageHeight: 330,
      perspective: 950,
      scaleFront: 1.0,
      scaleBack: 0.60,
      opacityBack: 0.28,
    };
  }
  if (width >= 480) {
    return {
      radiusX: Math.min(170, Math.round((width - 48) * 0.38)),
      radiusZ: 60,
      cardWidth: Math.min(220, Math.round(width * 0.52)),
      stageHeight: 300,
      perspective: 800,
      scaleFront: 1.0,
      scaleBack: 0.56,
      opacityBack: 0.25,
    };
  }
  if (width >= 360) {
    return {
      radiusX: Math.min(125, Math.round((width - 32) * 0.35)),
      radiusZ: 45,
      cardWidth: Math.min(195, Math.round(width * 0.55)),
      stageHeight: 270,
      perspective: 650,
      scaleFront: 0.98,
      scaleBack: 0.52,
      opacityBack: 0.20,
    };
  }
  // Ultra-narrow mobile (< 360px down to 320px)
  return {
    radiusX: Math.min(95, Math.round((width - 24) * 0.32)),
    radiusZ: 35,
    cardWidth: Math.min(175, Math.round(width * 0.58)),
    stageHeight: 250,
    perspective: 520,
    scaleFront: 0.96,
    scaleBack: 0.48,
    opacityBack: 0.16,
  };
}

export default function ProjectOrbit() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [geometry, setGeometry] = useState(() =>
    getResponsiveGeometry(typeof window !== 'undefined' ? window.innerWidth : 1200)
  );

  // Animation & gesture refs
  const stageRef = useRef(null);
  const isDragging = useRef(false);
  const isSnapping = useRef(false);
  const snapTargetRef = useRef(null);
  const lastPointerX = useRef(0);
  const dragDeltaRef = useRef(0);
  const animFrameRef = useRef(null);
  const rotationRef = useRef(0);

  // Directional touch intent tracking
  const touchStartPos = useRef({ x: 0, y: 0 });
  const touchIntentDetermined = useRef(false);
  const isHorizontalSwipe = useRef(false);

  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setIsPaused(true);
      }
    }
  }, []);

  // Update geometry on window resize
  useEffect(() => {
    const handleResize = () => {
      setGeometry(getResponsiveGeometry(window.innerWidth));
    };

    window.addEventListener('resize', handleResize, { passive: true });
    handleResize(); // Initial sync
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotation loop
  useEffect(() => {
    if (isPaused || isHovered) {
      cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const tick = () => {
      if (!isDragging.current && !isSnapping.current) {
        setRotation((prev) => prev + AUTO_ROTATE_SPEED);
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPaused, isHovered]);

  // Compute 3D position for each project card
  const getWindowStyle = useCallback((index) => {
    const count = projects.length;
    const { radiusX, radiusZ, scaleFront, scaleBack, opacityBack } = geometry;
    const angleRad = ((index * (360 / count) + rotation) * Math.PI) / 180;

    const x = radiusX * Math.sin(angleRad);
    const z = radiusZ * Math.cos(angleRad);

    // Normalise z to 0..1 (1 = front, 0 = back)
    const normalised = (z + radiusZ) / (2 * radiusZ);

    const scale = scaleBack + normalised * (scaleFront - scaleBack);
    const opacity = opacityBack + normalised * (1 - opacityBack);
    const zIndex = Math.round(normalised * 100);

    return {
      transform: `translateX(calc(-50% + ${x}px)) translateY(-50%) scale(${scale})`,
      opacity,
      zIndex,
    };
  }, [rotation, geometry]);

  // Spring-lerp snapping to nearest project slot
  const snapToNearest = useCallback(() => {
    const count = projects.length;
    const step = 360 / count;
    const currentRot = rotationRef.current;

    const norm = ((-currentRot) % 360 + 360) % 360;
    const nearest = Math.round(norm / step) % count;
    setActiveIndex(nearest);

    const targetAngle = -(nearest * step);
    let diff = targetAngle - (currentRot % 360);
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    const snapTarget = currentRot + diff;
    snapTargetRef.current = snapTarget;
    isSnapping.current = true;

    const snapFrame = () => {
      const cur = rotationRef.current;
      const target = snapTargetRef.current;
      const remaining = target - cur;

      if (Math.abs(remaining) < SNAP_THRESHOLD) {
        setRotation(target);
        isSnapping.current = false;
        return;
      }

      const next = cur + remaining * SNAP_LERP;
      setRotation(next);
      animFrameRef.current = requestAnimationFrame(snapFrame);
    };

    cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(snapFrame);
  }, []);

  // Programmatic navigation to specific project
  const goToProject = useCallback((index) => {
    const count = projects.length;
    const step = 360 / count;
    const targetAngle = -(index * step);

    const currentRot = rotationRef.current;
    let currentNorm = currentRot % 360;
    if (currentNorm > 180) currentNorm -= 360;
    let diff = targetAngle - currentNorm;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    const snapTarget = currentRot + diff;

    snapTargetRef.current = snapTarget;
    isSnapping.current = true;
    setActiveIndex(index);

    const snapFrame = () => {
      const cur = rotationRef.current;
      const target = snapTargetRef.current;
      const remaining = target - cur;

      if (Math.abs(remaining) < SNAP_THRESHOLD) {
        setRotation(target);
        isSnapping.current = false;
        return;
      }

      const next = cur + remaining * SNAP_LERP;
      setRotation(next);
      animFrameRef.current = requestAnimationFrame(snapFrame);
    };

    cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(snapFrame);
  }, []);

  const goNext = useCallback(() => {
    const next = (activeIndex + 1) % projects.length;
    goToProject(next);
  }, [activeIndex, goToProject]);

  const goPrev = useCallback(() => {
    const prev = (activeIndex - 1 + projects.length) % projects.length;
    goToProject(prev);
  }, [activeIndex, goToProject]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
  }, [goNext, goPrev]);

  // ---- Mouse drag handlers (desktop) ----
  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return; // Left click only
    cancelAnimationFrame(animFrameRef.current);
    isSnapping.current = false;
    isDragging.current = true;
    lastPointerX.current = e.clientX;
    dragDeltaRef.current = 0;
    document.body.style.userSelect = 'none';

    const handleMouseMove = (moveEvent) => {
      if (!isDragging.current) return;
      const delta = moveEvent.clientX - lastPointerX.current;
      lastPointerX.current = moveEvent.clientX;
      dragDeltaRef.current += Math.abs(delta);
      setRotation((prev) => prev + delta * DRAG_SENSITIVITY);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      snapToNearest();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [snapToNearest]);

  // ---- Touch event handlers (mobile / touchscreens) ----
  // Crucial: directional intent check prevents hijacking vertical page scroll!
  const handleTouchStart = useCallback((e) => {
    if (e.touches.length !== 1) return;
    cancelAnimationFrame(animFrameRef.current);
    isSnapping.current = false;
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    lastPointerX.current = touch.clientX;
    dragDeltaRef.current = 0;
    touchIntentDetermined.current = false;
    isHorizontalSwipe.current = false;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartPos.current.x;
    const dy = touch.clientY - touchStartPos.current.y;

    if (!touchIntentDetermined.current) {
      if (Math.abs(dx) > 7 || Math.abs(dy) > 7) {
        touchIntentDetermined.current = true;
        if (Math.abs(dx) > Math.abs(dy)) {
          // Horizontal gesture — capture carousel rotation
          isHorizontalSwipe.current = true;
          isDragging.current = true;
        } else {
          // Vertical gesture — allow normal page scroll
          isHorizontalSwipe.current = false;
          isDragging.current = false;
        }
      }
    }

    if (isHorizontalSwipe.current && isDragging.current) {
      if (e.cancelable) e.preventDefault();
      const deltaX = touch.clientX - lastPointerX.current;
      lastPointerX.current = touch.clientX;
      dragDeltaRef.current += Math.abs(deltaX);
      setRotation((prev) => prev + deltaX * DRAG_SENSITIVITY);
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      snapToNearest();
    }
    touchIntentDetermined.current = false;
    isHorizontalSwipe.current = false;
  }, [snapToNearest]);

  return (
    <div
      className="project-orbit"
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Project showcase — swipe, drag, or use arrow keys to rotate"
      tabIndex={0}
      style={{
        '--orbit-card-width': `${geometry.cardWidth}px`,
        '--orbit-stage-height': `${geometry.stageHeight}px`,
        '--orbit-perspective': `${geometry.perspective}px`,
      }}
    >
      {/* 3D stage with touch and pointer support */}
      <div
        ref={stageRef}
        className={`project-orbit__stage no-select${isHovered && !isPaused ? ' project-orbit__stage--hovered' : ''}`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <div className="project-orbit__scene">
          {projects.map((project, index) => (
            <ProjectWindow
              key={project.id}
              project={project}
              style={getWindowStyle(index)}
              isActive={index === activeIndex}
              onClick={() => {
                if (dragDeltaRef.current < 8) {
                  goToProject(index);
                }
              }}
              tabIndex={index === activeIndex ? 0 : -1}
            />
          ))}
        </div>
      </div>

      {/* Navigation controls */}
      <div className="project-orbit__controls" aria-label="Orbit navigation controls">
        <button
          className="orbit-btn"
          onClick={goPrev}
          aria-label="Previous project"
          id="orbit-prev"
        >
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>

        {/* Dot indicators */}
        <div className="orbit-dots" role="tablist" aria-label="Project selector">
          {projects.map((project, index) => (
            <button
              key={project.id}
              className={`orbit-dot ${index === activeIndex ? 'orbit-dot--active' : ''}`}
              onClick={() => goToProject(index)}
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Go to ${project.title}`}
              id={`orbit-dot-${index}`}
              style={index === activeIndex ? { background: project.color } : {}}
            />
          ))}
        </div>

        <button
          className="orbit-btn"
          onClick={goNext}
          aria-label="Next project"
          id="orbit-next"
        >
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>

        <button
          className={`orbit-btn orbit-btn--pause ${isPaused ? 'orbit-btn--paused' : ''}`}
          onClick={() => setIsPaused((p) => !p)}
          aria-label={isPaused ? 'Resume rotation' : 'Pause rotation'}
          aria-pressed={isPaused}
          id="orbit-pause"
        >
          {isPaused ? <Play size={16} strokeWidth={1.5} /> : <Pause size={16} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Active project detail panel */}
      <ProjectInfo project={projects[activeIndex]} />
    </div>
  );
}
