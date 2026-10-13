/**
 * About.jsx — Editorial introduction section.
 *
 * Left column: Single-paragraph introduction & Core Engineering Focus list.
 * Right column: Exactly four concise engineering cards.
 */

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import './About.css';

const focusPoints = [
  'System architecture & design trade-offs',
  'Backend engineering & data modeling',
  'Security, scalability & reliability',
  'AI integration & intelligent systems',
];

const cards = [
  {
    number: '01',
    title: 'Backend Architecture',
    description:
      'Clear API boundaries, structured data models and maintainable service interfaces.',
  },
  {
    number: '02',
    title: 'Reliability & Security',
    description:
      'Input validation, edge cases, failure handling and data integrity.',
  },
  {
    number: '03',
    title: 'AI Systems & Retrieval',
    description:
      'Document processing, RAG pipelines and validated LLM outputs.',
  },
  {
    number: '04',
    title: 'LLM Evaluation & Reliability',
    description:
      'Assessing output consistency, validating results and identifying failure cases in model-assisted workflows.',
  },
];

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <SectionHeading
          eyebrow="Engineering Approach"
          heading="Designing systems that are secure, scalable, and reliable."
          highlight="secure, scalable, and reliable."
        />

        <div className="about__grid">
          {/* Left column: introduction & core engineering focus */}
          <motion.div
            className="about__text"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="about__paragraph">
              I approach software through system-level thinking, deliberate design
              decisions and an understanding of how components interact.
            </p>

            <div className="about__focus-card">
              <h3 className="about__focus-title">CORE ENGINEERING FOCUS</h3>
              <ul className="about__focus-list" role="list">
                {focusPoints.map((point) => (
                  <li key={point} className="about__focus-item">
                    <ArrowRight size={14} className="about__focus-icon" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right column: four engineering cards */}
          <div className="about__pillars">
            {cards.map((card, index) => (
              <motion.div
                key={card.number}
                className="about__pillar"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="about__pillar-number" aria-hidden="true">
                  {card.number}
                </div>
                <div className="about__pillar-body">
                  <h4 className="about__pillar-label">{card.title}</h4>
                  <p className="about__pillar-text">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
