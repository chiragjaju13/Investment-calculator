/**
 * components/ResultsPanel.jsx
 * Displays the calculated SIP result, summary metrics, assumption legend,
 * and an accessible bar chart breakdown.
 */

import { useEffect, useRef } from 'react';
import { formatINR, formatPct } from '../utils/calculator';
import styles from '../styles/ResultsPanel.module.css';

/* ── Bar row sub-component ── */
function BarRow({ labelId, label, value, maxValue, colorClass }) {
  const widthPct = Math.max(4, Math.round((value / maxValue) * 100)) + '%';

  return (
    <div className={styles.barRow}>
      <div className={styles.barLabel} id={labelId}>
        {label}
      </div>
      <div
        className={styles.barTrack}
        role="img"
        aria-labelledby={labelId}
        aria-label={`${label}: ${formatINR(value)}`}
      >
        <div
          className={`${styles.barFill} ${styles[colorClass]}`}
          style={{ width: widthPct }}
        />
      </div>
      <div className={styles.barAmount}>{formatINR(value)}</div>
    </div>
  );
}

/* ── Empty state ── */
function EmptyState() {
  return (
    <section className={styles.card} aria-label="No results yet">
      <div className={styles.emptyState}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect x="8"  y="28" width="6" height="14" fill="#d8d8d8" rx="2" />
          <rect x="18" y="20" width="6" height="22" fill="#c0c0c0" rx="2" />
          <rect x="28" y="14" width="6" height="28" fill="#b0b0b0" rx="2" />
          <rect x="38" y="8"  width="6" height="34" fill="#919090" rx="2" />
          <line x1="4" y1="44" x2="46" y2="44" stroke="#d8d8d8" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <p>
          Fill in your goal details and click{' '}
          <strong>Calculate Monthly SIP</strong> to see your investment plan.
        </p>
      </div>
    </section>
  );
}

/**
 * @param {object}        props
 * @param {object|null}   props.results   Output from calculateGoalSIP(), or null
 * @param {React.Ref}     props.panelRef  Forwarded ref for focus management
 */
export default function ResultsPanel({ results, panelRef }) {
  if (!results) return <EmptyState />;

  const {
    fv, sip, totalInvested, wealthGained, inflationImpact,
    years, inflationRate, returnRate,
  } = results;

  const maxBar = Math.max(totalInvested, wealthGained, inflationImpact, 1);

  return (
    <section
      className={styles.card}
      aria-labelledby="results-heading"
      aria-live="polite"
      tabIndex={-1}
      ref={panelRef}
    >
      <div className={styles.cardHeader}>
        <h2 id="results-heading" className={styles.cardHeading}>
          Your Investment Plan
        </h2>
        <span className={styles.badge} aria-hidden="true">
          {years} yr{years > 1 ? 's' : ''}
        </span>
      </div>

      <div className={styles.cardBody}>

        {/* ── Primary SIP ── */}
        <div
          className={styles.resultPrimary}
          role="region"
          aria-label="Required monthly SIP"
        >
          <div className={styles.primaryLabel}>Required Monthly SIP</div>
          <div
            className={styles.primaryAmount}
            aria-label={`${formatINR(sip)} per month`}
          >
            {formatINR(sip)}
          </div>
          <div className={styles.primarySub}>
            per month for {years} year{years > 1 ? 's' : ''}
          </div>
        </div>

        {/* ── Metric grid ── */}
        <div className={styles.resultGrid} role="list" aria-label="Summary figures">
          <div className={`${styles.resultItem} ${styles.blueTint}`} role="listitem">
            <div className={styles.rLabel}>Inflated Goal Value</div>
            <div className={styles.rValue}>{formatINR(fv)}</div>
          </div>
          <div className={styles.resultItem} role="listitem">
            <div className={styles.rLabel}>Total Invested</div>
            <div className={styles.rValue}>{formatINR(totalInvested)}</div>
          </div>
          <div className={`${styles.resultItem} ${styles.redTint}`} role="listitem">
            <div className={styles.rLabel}>Inflation Impact</div>
            <div className={styles.rValue}>{formatINR(inflationImpact)}</div>
          </div>
          <div className={styles.resultItem} role="listitem">
            <div className={styles.rLabel}>Wealth Gained</div>
            <div className={styles.rValue}>{formatINR(wealthGained)}</div>
          </div>
        </div>

        {/* ── Assumption legend ── */}
        <div
          className={styles.assumptionLegend}
          role="region"
          aria-label="Assumptions used"
        >
          <h3 className={styles.legendHeading}>Assumptions Used</h3>

          <div className={styles.legendRow}>
            <span>
              <span className={`${styles.legendDot} ${styles.dotRed}`} aria-hidden="true" />
              Inflation Assumption
            </span>
            <span
              className={styles.legendVal}
              aria-label={`Inflation rate: ${formatPct(inflationRate)}`}
            >
              {formatPct(inflationRate)} p.a.
            </span>
          </div>

          <div className={styles.legendRow}>
            <span>
              <span className={`${styles.legendDot} ${styles.dotBlue}`} aria-hidden="true" />
              Return Assumption
            </span>
            <span
              className={styles.legendVal}
              aria-label={`Return rate: ${formatPct(returnRate)}`}
            >
              {formatPct(returnRate)} p.a.
            </span>
          </div>

          <div className={styles.legendRow}>
            <span>
              <span className={`${styles.legendDot} ${styles.dotGrey}`} aria-hidden="true" />
              Time Horizon
            </span>
            <span className={styles.legendVal}>{years} Years</span>
          </div>
        </div>

        {/* ── Bar chart ── */}
        <div className={styles.chartSection} role="region" aria-label="Value breakdown chart">
          <h3 className={styles.chartHeading}>Value Breakdown</h3>

          <BarRow
            labelId="bar-invested"
            label="Total Invested"
            value={totalInvested}
            maxValue={maxBar}
            colorClass="blue"
          />
          <BarRow
            labelId="bar-gained"
            label="Wealth Gained"
            value={wealthGained}
            maxValue={maxBar}
            colorClass="grey"
          />
          <BarRow
            labelId="bar-inflation"
            label="Inflation Impact"
            value={inflationImpact}
            maxValue={maxBar}
            colorClass="red"
          />
        </div>

        {/* ── Disclaimer ── */}
        <p className={styles.disclaimer} role="note">
          These projections are based on assumed constant inflation of{' '}
          {formatPct(inflationRate)} and annual returns of {formatPct(returnRate)}.
          Actual results may vary. This tool is for illustrative purposes only and
          does not constitute financial advice. Past performance is not indicative of
          future results. Please consult a qualified financial advisor.
        </p>
      </div>
    </section>
  );
}
