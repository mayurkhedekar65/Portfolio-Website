/**
 * Contact.jsx — Contact section.
 *
 * Uses mailto: links — no backend required.
 * Configured with active contact details.
 */

import { motion } from 'motion/react';
import { Mail, Github, Linkedin, FileText, ArrowUpRight } from 'lucide-react';
import './Contact.css';

const CONTACT_LINKS = [
  {
    id: 'email',
    icon: Mail,
    label: 'Email',
    value: 'mayurkhedekar646@gmail.com',
    href: 'mailto:mayurkhedekar646@gmail.com',
    description: 'Technical & career inquiries',
  },
  {
    id: 'github',
    icon: Github,
    label: 'GitHub',
    value: 'github.com/mayurkhedekar65',
    href: 'https://github.com/mayurkhedekar65',
    description: 'Source code & system implementations',
    external: true,
  },
  {
    id: 'linkedin',
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/mayur-khedekar',
    href: 'https://www.linkedin.com/in/mayur-khedekar',
    description: 'Professional engineering network',
    external: true,
  },
  {
    id: 'resume',
    icon: FileText,
    label: 'Résumé',
    value: 'Download PDF',
    href: '/Mayur-Khedekar-Resume.pdf',
    description: 'Engineering CV & background',
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="contact section">
      {/* Background glow */}
      <div className="contact__glow" aria-hidden="true" />

      <div className="container contact__inner">
        {/* Left: heading and message */}
        <motion.div
          className="contact__text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="contact__eyebrow">Contact & Inquiries</p>
          <h2 className="contact__heading font-display">
            Let&apos;s discuss systems and{' '}
            <span className="text-accent">engineering.</span>
          </h2>
          <p className="contact__description">
            I am open to software engineering internships, backend-focused
            roles, and discussions around system architecture, database design, and applied AI.
          </p>
          <a
            href="mailto:mayurkhedekar646@gmail.com"
            className="btn btn--primary contact__cta"
            id="contact-email-btn"
          >
            <Mail size={16} strokeWidth={1.5} />
            Send an email
          </a>
        </motion.div>

        {/* Right: contact links grid */}
        <div className="contact__links">
          {CONTACT_LINKS.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.id}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="contact__link-card"
                id={`contact-${link.id}`}
                aria-label={`${link.label}: ${link.value}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + index * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <div className="contact__link-icon">
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <div className="contact__link-info">
                  <span className="contact__link-label">{link.label}</span>
                  <span className="contact__link-value">{link.value}</span>
                  <span className="contact__link-desc">{link.description}</span>
                </div>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="contact__link-arrow"
                  aria-hidden="true"
                />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
