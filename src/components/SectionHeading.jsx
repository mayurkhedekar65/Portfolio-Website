/**
 * SectionHeading.jsx — Reusable section title component.
 *
 * React concept: Props
 * Props are arguments passed into a component, like function parameters.
 * This component accepts:
 *   - eyebrow: small uppercase label above the heading (optional)
 *   - heading: the main heading text (required)
 *   - highlight: a word/phrase to color with the accent (optional)
 *   - align: 'left' | 'center' (default 'left')
 */

import './SectionHeading.css';

export default function SectionHeading({ eyebrow, heading, highlight, align = 'left' }) {
  // If a highlight word is provided, we split the heading and wrap the matching word
  // in a <span> to apply the accent color.
  const renderHeading = () => {
    if (!highlight) return heading;
    const parts = heading.split(highlight);
    return (
      <>
        {parts[0]}
        <span className="heading-highlight">{highlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow && (
        <p className="section-heading__eyebrow">{eyebrow}</p>
      )}
      <h2 className="section-heading__title font-display">
        {renderHeading()}
      </h2>
    </div>
  );
}
