/**
 * components/CalculatorForm.jsx
 * The left-hand input card. Receives state and handlers from the parent page
 * via the useCalculator hook.
 */

import { useState } from 'react';
import SliderField from './SliderField';
import ExplanationModal from './ExplanationModal';
import styles from '../styles/CalculatorForm.module.css';

/**
 * @param {object}   props
 * @param {object}   props.fields     Current field values
 * @param {object}   props.errors     Validation errors keyed by field name
 * @param {function} props.onChange   (name, value) => void
 * @param {function} props.onSubmit   form submit handler
 */
export default function CalculatorForm({ fields, errors, onChange, onSubmit }) {
  const [activeModal, setActiveModal] = useState(null); // 'inflation' | 'return' | null

  return (
    <section className={styles.card} aria-labelledby="inputs-heading">
      <div className={styles.cardHeader}>
        <h2 id="inputs-heading" className={styles.cardHeading}>
          Your Goal Details
        </h2>
      </div>

      <div className={styles.cardBody}>
        <form
          id="calc-form"
          onSubmit={onSubmit}
          noValidate
          aria-label="Investment goal calculator inputs"
        >
          {/* ── Current Cost of Goal ── */}
          <div className={styles.field}>
            <label htmlFor="goal-cost" className={styles.label}>
              Current Cost of Goal
              <span className={styles.required} aria-label="required"> *</span>
            </label>
            <div className={styles.inputWrap}>
              <span className={styles.inputPrefix} aria-hidden="true">₹</span>
              <input
                type="number"
                id="goal-cost"
                name="presentCost"
                min="1"
                step="1"
                placeholder="e.g. 1000000"
                value={fields.presentCost}
                onChange={(e) => onChange('presentCost', e.target.value)}
                className={`${styles.input} ${errors.presentCost ? styles.inputError : ''}`}
                aria-required="true"
                aria-invalid={errors.presentCost ? 'true' : undefined}
                aria-describedby="goal-cost-hint goal-cost-error"
              />
              <span className={styles.inputSuffix} aria-hidden="true">INR</span>
            </div>
            <div className={styles.hint} id="goal-cost-hint">
              Enter today's cost of your goal in rupees
            </div>
            {errors.presentCost && (
              <div
                className={styles.errorMsg}
                id="goal-cost-error"
                role="alert"
                aria-live="assertive"
              >
                {errors.presentCost}
              </div>
            )}
          </div>

          {/* ── Years to Goal ── */}
          <div className={styles.field}>
            <label htmlFor="years" className={styles.label}>
              Years to Goal
              <span className={styles.required} aria-label="required"> *</span>
            </label>
            <div className={styles.inputWrap}>
              <span className={styles.inputPrefix} aria-hidden="true">#</span>
              <input
                type="number"
                id="years"
                name="years"
                min="1"
                max="50"
                step="1"
                placeholder="e.g. 10"
                value={fields.years}
                onChange={(e) => onChange('years', e.target.value)}
                className={`${styles.input} ${errors.years ? styles.inputError : ''}`}
                aria-required="true"
                aria-invalid={errors.years ? 'true' : undefined}
                aria-describedby="years-hint years-error"
              />
              <span className={styles.inputSuffix} aria-hidden="true">yrs</span>
            </div>
            <div className={styles.hint} id="years-hint">
              How many years until you need this amount? (1–50)
            </div>
            {errors.years && (
              <div
                className={styles.errorMsg}
                id="years-error"
                role="alert"
                aria-live="assertive"
              >
                {errors.years}
              </div>
            )}
          </div>

          {/* ── Inflation Assumption ── */}
          <SliderField
            id="inflation"
            name="inflationRate"
            label="Inflation Assumption"
            dotClass="dotRed"
            value={fields.inflationRate}
            onChange={onChange}
            min={0}
            max={30}
            step={0.1}
            hint="How much prices are expected to rise per year"
            hintDotLabel="Inflation assumption"
            error={errors.inflationRate}
            onInfoClick={() => setActiveModal('inflation')}
          />

          {/* ── Return Assumption ── */}
          <SliderField
            id="return-rate"
            name="returnRate"
            label="Return Assumption"
            dotClass="dotBlue"
            value={fields.returnRate}
            onChange={onChange}
            min={0}
            max={50}
            step={0.1}
            hint="Expected annual rate of return on investments"
            hintDotLabel="Return assumption"
            error={errors.returnRate}
            onInfoClick={() => setActiveModal('return')}
          />

          <button
            type="submit"
            className={styles.btnCalculate}
            aria-label="Calculate required monthly SIP"
          >
            Calculate Monthly SIP
          </button>
        </form>
      </div>

      <ExplanationModal
        isOpen={activeModal === 'inflation'}
        onClose={() => setActiveModal(null)}
        title="What is Inflation?"
        content={
          <>
            <p>
              Think of <span className={styles.highlight}>inflation</span> as the gradual increase in the price of things over time.
            </p>
            <p>
              For example, if a cup of coffee costs <strong>₹100</strong> today, with a <strong>6%</strong> inflation rate, it will cost <strong>₹106</strong> next year. The value of your money decreases over time because things become more expensive.
            </p>
            <p>
              When planning your goals, we estimate how much things will cost <span className={styles.highlight}>in the future</span> so that your investments stay ahead of rising prices.
            </p>
          </>
        }
      />

      <ExplanationModal
        isOpen={activeModal === 'return'}
        onClose={() => setActiveModal(null)}
        title="What is Return Assumption?"
        content={
          <>
            <p>
              The <span className={styles.highlight}>Return Assumption</span> is the percentage of profit or income you expect your investments to grow by each year.
            </p>
            <p>
              Different types of investments have different expected returns. For instance, putting money in a savings account might yield <strong>4-6%</strong>, while investing in mutual funds might yield <strong>10-14%</strong> over the long term.
            </p>
            <p>
              A higher return rate means your money will grow faster, but higher returns usually come with higher risks.
            </p>
          </>
        }
      />
    </section>
  );
}
