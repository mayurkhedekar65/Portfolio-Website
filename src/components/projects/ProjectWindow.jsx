/**
 * ProjectWindow.jsx
 *
 * Renders a single floating browser-window-style project card.
 * This is a purely presentational (dumb) component:
 * it receives data via props and renders it. No state.
 *
 * Props:
 *   project    — the project data object
 *   style      — inline styles for position/transform (from parent orbit logic)
 *   isActive   — whether this is the focused project
 *   onClick    — callback when the window is clicked
 */

import './ProjectWindow.css';

// Gradient backgrounds for projects without screenshots
const GRADIENT_PLACEHOLDERS = [
  'linear-gradient(135deg, #1a0533 0%, #0d1433 50%, #0a0a1a 100%)',
  'linear-gradient(135deg, #0a1628 0%, #0d2040 50%, #0a0a14 100%)',
  'linear-gradient(135deg, #0a2010 0%, #0d3020 50%, #050f08 100%)',
  'linear-gradient(135deg, #28180a 0%, #3d2a0d 50%, #1a0f04 100%)',
  'linear-gradient(135deg, #0a1428 0%, #0a2040 50%, #060a14 100%)',
  'linear-gradient(135deg, #1e0e04 0%, #301804 50%, #120800 100%)',
  'linear-gradient(135deg, #041a1e 0%, #062830 50%, #030d10 100%)',
  'linear-gradient(135deg, #280a14 0%, #400d20 50%, #1a050d 100%)',
];

export default function ProjectWindow({ project, style, isActive, onClick, tabIndex }) {
  const gradientBg = GRADIENT_PLACEHOLDERS[(project.id - 1) % GRADIENT_PLACEHOLDERS.length];

  return (
    <button
      className={`project-window ${isActive ? 'project-window--active' : ''}`}
      style={{
        ...style,
        '--project-color': project.color,
      }}
      onClick={onClick}
      aria-label={`Select project: ${project.title}`}
      aria-pressed={isActive}
      tabIndex={tabIndex}
    >
      {/* Browser chrome bar */}
      <div className="project-window__chrome">
        <div className="project-window__dots" aria-hidden="true">
          <span className="dot dot--red" />
          <span className="dot dot--yellow" />
          <span className="dot dot--green" />
        </div>
        <div className="project-window__url-bar" aria-hidden="true">
          <span className="project-window__url-dot" />
          <span className="project-window__url-text">
            {project.title.toLowerCase().replace(/\s+/g, '-')}.dev
          </span>
        </div>
      </div>

      {/* Project screenshot or gradient placeholder */}
      <div className="project-window__screen">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="project-window__img"
            loading="lazy"
          />
        ) : (
          <div
            className="project-window__placeholder"
            style={{ background: gradientBg }}
            aria-hidden="true"
          >
            {/* Abstract geometric pattern for placeholder */}
            <div className="project-window__placeholder-inner">
              <div className="placeholder-ring" style={{ borderColor: project.color + '40' }} />
              <div className="placeholder-dot" style={{ background: project.color }} />
              <span className="placeholder-label" style={{ color: project.color }}>
                {project.title}
              </span>
            </div>
          </div>
        )}

        {/* Active glow overlay */}
        {isActive && (
          <div
            className="project-window__active-overlay"
            style={{ '--project-color': project.color }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Category label badge */}
      <div className="project-window__category">
        {project.category}
      </div>
    </button>
  );
}
