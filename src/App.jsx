/**
 * App.jsx — The root component.
 *
 * React concept: Component composition
 * App is the top-level component that renders all sections in order.
 * Each section is an independent component that manages its own
 * state and animations. App just arranges them.
 *
 * Data flow:
 * App → renders Navbar, Hero, About, Projects, Skills, Experience, Contact, Footer
 * Projects → renders ProjectOrbit
 * ProjectOrbit → renders ProjectWindow (×8) + ProjectInfo (×1)
 *
 * No props are passed down from App — each section imports its own data.
 */

import './App.css';
import './index.css';

import Navbar    from './components/Navbar';
import Hero      from './sections/Hero';
import About     from './sections/About';
import Projects  from './sections/Projects';
import Skills    from './sections/Skills';
import Experience from './sections/Experience';
import Contact   from './sections/Contact';
import Footer    from './components/Footer';

export default function App() {
  return (
    <div className="app">
      {/* Fixed navbar — always on top */}
      <Navbar />

      {/* Main content — one-page layout */}
      <main id="main-content" role="main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
