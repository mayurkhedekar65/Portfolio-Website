/**
 * ProjectInfo.jsx
 *
 * Displays active project details below the orbit, including:
 * - High-level summary, tags and action links
 * - Collapsible "Engineering Breakdown" detailing problem requirements,
 *   architecture & data flow, decisions, trade-offs, reliability, and limitations.
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Github, ExternalLink, ChevronDown, ChevronUp, Layers, Cpu, ShieldCheck, AlertCircle } from 'lucide-react';
import './ProjectInfo.css';

export default function ProjectInfo({ project }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!project) return null;

  const hasDetails = Boolean(project.details);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        className="project-info"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ '--project-color': project.color }}
      >
        {/* Header */}
        <div className="project-info__header">
          <div>
            <p className="project-info__category">{project.category}</p>
            <h3 className="project-info__title font-display">{project.title}</h3>
          </div>
          <div className="project-info__actions">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-info__btn project-info__btn--primary"
                id={`project-github-${project.id}`}
                aria-label={`View ${project.title} on GitHub`}
              >
                <Github size={16} strokeWidth={1.5} />
                View on GitHub
              </a>
            ) : (
              <span
                className="project-info__btn project-info__btn--unavailable"
                title="Repository link to be updated"
              >
                <Github size={16} strokeWidth={1.5} />
                Repository [Private]
              </span>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-info__btn project-info__btn--secondary"
                id={`project-live-${project.id}`}
                aria-label={`Open ${project.title} live demo`}
              >
                <ExternalLink size={16} strokeWidth={1.5} />
                Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="project-info__description">{project.description}</p>

        {/* Technology tags */}
        <div className="project-info__tags" role="list" aria-label="Technologies used">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="project-info__tag"
              role="listitem"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Technical Breakdown Accordion */}
        {hasDetails && (
          <div className="project-info__deepdive">
            <button
              type="button"
              className={`project-info__deepdive-toggle ${isExpanded ? 'project-info__deepdive-toggle--active' : ''}`}
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-expanded={isExpanded}
              aria-controls={`deepdive-${project.id}`}
              id={`deepdive-btn-${project.id}`}
            >
              <div className="deepdive-toggle__left">
                <Layers size={16} className="deepdive-toggle__icon" />
                <span className="deepdive-toggle__label">
                  {isExpanded ? 'Hide Engineering Deep Dive' : 'Explore Engineering Deep Dive'}
                </span>
                <span className="deepdive-toggle__badge">Architecture & Trade-offs</span>
              </div>
              <div className="deepdive-toggle__arrow">
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  id={`deepdive-${project.id}`}
                  className="project-info__deepdive-content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="deepdive-grid">
                    {/* Problem & Requirements */}
                    {project.details.problem && (
                      <div className="deepdive-card">
                        <div className="deepdive-card__header">
                          <Cpu size={16} className="deepdive-card__icon" />
                          <h4 className="deepdive-card__title">Problem & Requirements</h4>
                        </div>
                        <p className="deepdive-card__text">{project.details.problem}</p>
                      </div>
                    )}

                    {/* Architecture & Data Flow */}
                    {project.details.architecture && (
                      <div className="deepdive-card">
                        <div className="deepdive-card__header">
                          <Layers size={16} className="deepdive-card__icon" />
                          <h4 className="deepdive-card__title">Architecture & Data Flow</h4>
                        </div>
                        <p className="deepdive-card__text">{project.details.architecture}</p>
                      </div>
                    )}

                    {/* Key Decisions & Trade-offs */}
                    {(project.details.keyDecisions || project.details.tradeoffs) && (
                      <div className="deepdive-card">
                        <div className="deepdive-card__header">
                          <ShieldCheck size={16} className="deepdive-card__icon" />
                          <h4 className="deepdive-card__title">Key Decisions & Trade-offs</h4>
                        </div>
                        {project.details.keyDecisions && (
                          <p className="deepdive-card__text">
                            <strong>Design Choice:</strong> {project.details.keyDecisions}
                          </p>
                        )}
                        {project.details.tradeoffs && (
                          <p className="deepdive-card__text">
                            <strong>Trade-offs:</strong> {project.details.tradeoffs}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Reliability, Error Handling & Limitations */}
                    {(project.details.reliability || project.details.limitations) && (
                      <div className="deepdive-card">
                        <div className="deepdive-card__header">
                          <AlertCircle size={16} className="deepdive-card__icon" />
                          <h4 className="deepdive-card__title">Reliability & Scope Limitations</h4>
                        </div>
                        {project.details.reliability && (
                          <p className="deepdive-card__text">
                            <strong>Validation & Reliability:</strong> {project.details.reliability}
                          </p>
                        )}
                        {project.details.limitations && (
                          <p className="deepdive-card__text">
                            <strong>Current Scope:</strong> {project.details.limitations}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
