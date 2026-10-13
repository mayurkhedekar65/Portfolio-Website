/**
 * Experience.jsx — Work experience and education timeline.
 *
 * Uses a vertical timeline layout.
 * Data is imported from src/data/experience.js.
 *
 * React concept: conditional rendering
 * We check `exp.current` to add a "Current" badge.
 * We check `exp.technologies.length > 0` to optionally render the tech list.
 */

import { motion } from 'motion/react';
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { experience, education } from '../data/experience';
import './Experience.css';

function TimelineItem({ item, index }) {
  const isWork = item.type === 'work';
  const Icon = isWork ? Briefcase : GraduationCap;

  return (
    <motion.div
      className="timeline-item"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Timeline line connector */}
      <div className="timeline-item__connector">
        <div className="timeline-item__dot">
          <Icon size={14} strokeWidth={1.5} aria-hidden="true" />
        </div>
        <div className="timeline-item__line" />
      </div>

      {/* Content card */}
      <div className="timeline-item__card">
        <div className="timeline-item__header">
          <div>
            <h3 className="timeline-item__role font-display">
              {item.role || item.degree}
            </h3>
            <p className="timeline-item__company">
              {item.company || item.institution}
            </p>
          </div>

          {item.current && (
            <span className="timeline-item__badge timeline-item__badge--current">
              Current
            </span>
          )}
        </div>

        {/* Meta: period and location */}
        <div className="timeline-item__meta">
          {item.period && (
            <span className="timeline-item__meta-item">
              <Calendar size={12} strokeWidth={1.5} aria-hidden="true" />
              {item.period}
            </span>
          )}
          {item.location && (
            <span className="timeline-item__meta-item">
              <MapPin size={12} strokeWidth={1.5} aria-hidden="true" />
              {item.location}
            </span>
          )}
        </div>

        <p className="timeline-item__description">{item.description}</p>

        {/* Technologies used — only shown if the array is non-empty */}
        {item.technologies && item.technologies.length > 0 && (
          <div className="timeline-item__tags">
            {item.technologies.map((tech) => (
              <span key={tech} className="timeline-item__tag">{tech}</span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="experience section">
      <div className="container">
        <SectionHeading
          eyebrow="Background"
          heading="Experience & academic foundation."
          highlight="academic foundation."
        />

        {/* Work experience */}
        <div className="experience__subsection">
          <h3 className="experience__subsection-title">
            <Briefcase size={16} strokeWidth={1.5} aria-hidden="true" />
            Work Experience
          </h3>
          <div className="timeline">
            {experience.map((item, i) => (
              <TimelineItem key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="experience__divider" aria-hidden="true" />

        {/* Education */}
        <div className="experience__subsection">
          <h3 className="experience__subsection-title">
            <GraduationCap size={16} strokeWidth={1.5} aria-hidden="true" />
            Education
          </h3>
          <div className="timeline">
            {education.map((item, i) => (
              <TimelineItem key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
