/**
 * pages/index.js
 * Main calculator page. Composes AppHeader, CalculatorForm, and ResultsPanel.
 * All logic lives in the useCalculator hook.
 */

import AppHeader     from '../components/AppHeader';
import CalculatorForm from '../components/CalculatorForm';
import ResultsPanel  from '../components/ResultsPanel';
import { useCalculator } from '../hooks/useCalculator';
import styles from '../styles/Layout.module.css';

export default function Home() {
  const {
    fields,
    errors,
    results,
    liveMsg,
    handleChange,
    handleSubmit,
    resultsRef,
  } = useCalculator();

  return (
    <>
      {/* Skip to main content — WCAG 2.1 AA */}
      <a className="skip-link" href="#calc-form">
        Skip to calculator
      </a>

      {/* Screen-reader live region */}
      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        role="status"
      >
        {liveMsg}
      </div>

      <AppHeader />

      <main className={styles.main} role="main" id="main-content">
        <CalculatorForm
          fields={fields}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />

        <ResultsPanel
          results={results}
          panelRef={resultsRef}
        />
      </main>

      <footer className={styles.footer} role="contentinfo">
        <p>
          For illustrative purposes only. All calculations are based on assumptions
          and do not constitute financial advice.
        </p>
      </footer>
    </>
  );
}
