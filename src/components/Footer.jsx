/**
 * Footer.jsx — Minimal site footer.
 */

import { Github, Linkedin, Mail } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        {/* Left: name and tagline */}
        <div className="footer__left">
          <span className="footer__name font-display">Mayur Khedekar</span>
          <span className="footer__tagline">
            Engineering reliable backend systems & intelligent software
          </span>
        </div>

        {/* Center: social links */}
        <nav className="footer__social" aria-label="Footer social links">
          <a
            href="https://github.com/mayurkhedekar65"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="footer__social-link"
            id="footer-github"
          >
            <Github size={16} strokeWidth={1.5} />
          </a>
          <a
            href="https://www.linkedin.com/in/mayur-khedekar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="footer__social-link"
            id="footer-linkedin"
          >
            <Linkedin size={16} strokeWidth={1.5} />
          </a>
          <a
            href="mailto:mayurkhedekar646@gmail.com"
            aria-label="Email"
            className="footer__social-link"
            id="footer-email"
          >
            <Mail size={16} strokeWidth={1.5} />
          </a>
        </nav>

        {/* Right: copyright */}
        <p className="footer__copyright">
          © {year} Mayur Khedekar
        </p>
      </div>
    </footer>
  );
}
