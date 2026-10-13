/**
 * Hero.jsx — The first-impression section.
 *
 * React concepts demonstrated:
 * - motion (from Motion for React): animate elements on mount
 * - Image imports: Vite handles image bundling when you import them
 * - Semantic HTML: <section>, <h1>, <p>, <nav> for accessibility
 *
 * Layout: Two-column grid — text left, portrait right.
 * On mobile it stacks vertically.
 *
 * To replace the portrait:
 *   1. Add your photo to src/assets/images/portrait.jpg
 *   2. The import below already points there — just replace the file.
 */

import { motion } from 'motion/react';
import { Github, Linkedin, ArrowDown, Mail } from 'lucide-react';
import portrait from '../assets/images/Professional Office Selfie Portrait.png';
// 👆 TO REPLACE YOUR PORTRAIT:
// 1. Save your photo as: src/assets/images/portrait.jpg
// 2. Change the line above to: import portrait from '../assets/images/portrait.jpg';
import './Hero.css';

// Animation variants — defines enter animation sequences.
// 'initial' = start state, 'animate' = end state.
// 'transition' controls timing and easing with restrained, smooth curves.
const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const portraitVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
};

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero section">
      {/* Background glow elements — purely decorative */}
      <div className="hero__glow hero__glow--left" aria-hidden="true" />
      <div className="hero__glow hero__glow--right" aria-hidden="true" />

      <div className="container hero__inner">
        {/* LEFT: Text content — animated with staggered children */}
        <motion.div
          className="hero__content"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Eyebrow label */}
          <motion.p className="hero__eyebrow" variants={itemVariants}>
            BACKEND ENGINEERING · SYSTEM DESIGN · AI INTEGRATION
          </motion.p>

          {/* Main heading — h1 is the most important heading on the page */}
          <motion.h1 className="hero__heading font-display" variants={itemVariants}>
            Engineering{' '}
            <span className="hero__heading-accent">Scalable Systems</span>{' '}
            with thoughtful Architecture and AI Engineering.
          </motion.h1>

          {/* Short bio */}
          <motion.p className="hero__description" variants={itemVariants}>
            I build backend-focused applications and explore how system
            architecture, data flow and AI integration come together to solve
            practical engineering problems.
          </motion.p>

          {/* Call-to-action buttons */}
          <motion.div className="hero__actions" variants={itemVariants}>
            <button
              className="btn btn--primary"
              onClick={scrollToProjects}
              id="hero-explore-btn"
            >
              Explore Projects
            </button>
            <button
              className="btn btn--secondary"
              onClick={scrollToContact}
              id="hero-contact-btn"
            >
              Contact Me
            </button>
          </motion.div>

          {/* Social links */}
          <motion.nav
            className="hero__social"
            aria-label="Social links"
            variants={itemVariants}
          >
            <a
              href="https://github.com/mayurkhedekar65"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              aria-label="GitHub profile"
              id="hero-github-link"
            >
              <Github size={18} strokeWidth={1.5} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/mayur-khedekar"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              aria-label="LinkedIn profile"
              id="hero-linkedin-link"
            >
              <Linkedin size={18} strokeWidth={1.5} />
              LinkedIn
            </a>
            <a
              href="mailto:mayurkhedekar646@gmail.com"
              className="hero__social-link"
              aria-label="Send email"
              id="hero-email-link"
            >
              <Mail size={18} strokeWidth={1.5} />
              Email
            </a>
          </motion.nav>
        </motion.div>

        {/* RIGHT: Hero Visual — subtle, technical orbit system */}
        <motion.div
          className="hero__portrait-wrapper"
          variants={portraitVariants}
          initial="initial"
          animate="animate"
        >
          {/* Outer continuous orbit track with primary node */}
          <div className="hero__orbit-ring hero__orbit-ring--outer" aria-hidden="true">
            <span className="hero__orbit-node hero__orbit-node--primary" />
          </div>

          {/* Inner subtle concentric orbit track with secondary node */}
          <div className="hero__orbit-ring hero__orbit-ring--inner" aria-hidden="true">
            <span className="hero__orbit-node hero__orbit-node--secondary" />
          </div>

          <div className="hero__portrait-frame">
            <img
              src={portrait}
              alt="Mayur Khedekar — Backend Systems & Applied AI Software Engineer"
              className="hero__portrait-img"
              width={400}
              height={400}
              loading="eager"
            />
            {/* Subtle glow overlay */}
            <div className="hero__portrait-glow" aria-hidden="true" />
          </div>

          {/* Floating status badge */}
          <div className="hero__badge" aria-label="Open to opportunities">
            <span className="hero__badge-dot" aria-hidden="true" />
            <span>Open to opportunities</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        className="hero__scroll-indicator"
        onClick={scrollToProjects}
        aria-label="Scroll down to projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <ArrowDown size={18} strokeWidth={1.5} />
      </motion.button>
    </section>
  );
}
