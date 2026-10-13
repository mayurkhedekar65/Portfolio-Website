/**
 * Skills.jsx — Skills section with grouped tech cards.
 *
 * React concept: .map() to render lists
 * We loop over skillGroups data and render a card for each group.
 * Each group loops over its skills array to render individual tags.
 */

import { motion } from 'motion/react';
import {
  Server, Code2, Brain, Database, Wrench, Monitor
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { skillGroups } from '../data/skills';
import './Skills.css';

// Maps the icon string in our data to a Lucide icon component
const ICON_MAP = {
  server:   Server,
  code:     Code2,
  brain:    Brain,
  database: Database,
  wrench:   Wrench,
  monitor:  Monitor,
};

export default function Skills() {
  return (
    <section id="skills" className="skills section">
      <div className="container">
        <SectionHeading
          eyebrow="Technical Foundation"
          heading="Core technologies and engineering stack."
          highlight="engineering stack."
        />

        <div className="skills__grid">
          {skillGroups.map((group, groupIndex) => {
            // Dynamically pick the icon component based on our data
            const Icon = ICON_MAP[group.icon] ?? Code2;

            return (
              <motion.div
                key={group.id}
                className="skills__card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: groupIndex * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {/* Card header */}
                <div className="skills__card-header">
                  <div className="skills__card-icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <h3 className="skills__card-title font-display">
                    {group.label}
                  </h3>
                </div>

                {/* Skill tags */}
                <ul className="skills__list" role="list">
                  {group.skills.map((skill) => (
                    <li key={skill.name} className="skills__item">
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
