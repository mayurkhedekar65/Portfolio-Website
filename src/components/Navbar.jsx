/**
 * Navbar.jsx
 *
 * React concepts demonstrated:
 * - useState: track scroll position and mobile menu open/close
 * - useEffect: subscribe to the window scroll event, cleanup on unmount
 * - Event handlers: onClick, onKeyDown for accessibility
 * - Conditional className: change navbar style once user scrolls
 */

import { useState, useEffect } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home',       href: '#home' },
  { label: 'About',      href: '#about' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
];

export default function Navbar() {
  // scrolled: true when window.scrollY > 20 — used to add a background blur
  const [scrolled, setScrolled] = useState(false);
  // menuOpen: controls the mobile hamburger menu
  const [menuOpen, setMenuOpen] = useState(false);
  // activeSection: highlights the correct nav link
  const [activeSection, setActiveSection] = useState('home');

  // useEffect runs once after component mounts.
  // We attach a scroll listener and RETURN a cleanup function
  // so it's removed when the component is destroyed.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (window.scrollY < 80) {
        setActiveSection('home');
        return;
      }

      // Detect active section by checking which section is in view
      const sections = NAV_LINKS.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // empty [] = run once on mount only

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // Close mobile menu when a link is clicked
  const handleLinkClick = (href) => {
    setMenuOpen(false);
    // Smooth scroll to section
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      role="banner"
    >
      <nav className="navbar__inner container" aria-label="Main navigation">
        {/* Logo / Monogram */}
        <a
          href="#home"
          className="navbar__logo"
          aria-label="Mayur Khedekar — back to top"
          onClick={(e) => { e.preventDefault(); handleLinkClick('#home'); }}
        >
          <span className="navbar__monogram">MK</span>
          <span className="navbar__name">Mayur Khedekar</span>
        </a>

        {/* Desktop nav links */}
        <ul className="navbar__links" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__link ${activeSection === link.href.slice(1) ? 'navbar__link--active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger button */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile menu drawer */}
      <div
        id="mobile-menu"
        className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}
        role="dialog"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <ul role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__mobile-link ${activeSection === link.href.slice(1) ? 'navbar__mobile-link--active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                tabIndex={menuOpen ? 0 : -1}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
