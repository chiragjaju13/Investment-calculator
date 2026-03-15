/**
 * components/AppHeader.jsx
 * Site-wide header with brand mark and title.
 */

import styles from '../styles/Layout.module.css';

export default function AppHeader() {
  return (
    <header className={styles.header} role="banner">
      {/* Brand mark — purely decorative bar chart icon */}
      <div className={styles.headerMark} aria-hidden="true">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="3"  y="10" width="3" height="8" fill="white" rx="1" />
          <rect x="8.5" y="6" width="3" height="12" fill="white" rx="1" />
          <rect x="14" y="2" width="3" height="16" fill="white" rx="1" />
        </svg>
      </div>

      <div>
        <h1 className={styles.headerTitle}>
          Goal-Based Investment Calculator
        </h1>
        <p className={styles.headerSubtitle}>
          Estimate your required monthly SIP to achieve a future financial goal
        </p>
      </div>
    </header>
  );
}
