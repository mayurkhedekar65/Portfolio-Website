/**
 * Projects.jsx — Section wrapper for the ProjectOrbit.
 *
 * Keeps the section structure (heading, container, padding)
 * separate from the orbit interaction logic.
 */

import { motion } from 'motion/react';
import SectionHeading from '../components/SectionHeading';
import ProjectOrbit from '../components/projects/ProjectOrbit';
import './Projects.css';

export default function Projects() {
  return (
    <section id="projects" className="projects section">
      {/* Subtle background accent */}
      <div className="projects__bg-glow" aria-hidden="true" />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <SectionHeading
            eyebrow="System Implementations"
            heading="Projects & engineering systems."
            highlight="engineering systems."
            align="center"
          />
          <p className="projects__subtitle">
            Swipe or drag to explore · Select any system to inspect architectural decisions & data flow
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <ProjectOrbit />
        </motion.div>
      </div>
    </section>
  );
}
