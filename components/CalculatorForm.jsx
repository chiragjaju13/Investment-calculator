/**
 * components/CalculatorForm.jsx
 * The left-hand input card. Receives state and handlers from the parent page
 * via the useCalculator hook.
 */

import SliderField from './SliderField';
import styles from '../styles/CalculatorForm.module.css';

/**
 * @param {object}   props
 * @param {object}   props.fields     Current field values
 * @param {object}   props.errors     Validation errors keyed by field name
 * @param {function} props.onChange   (name, value) => void
 * @param {function} props.onSubmit   form submit handler
 */
export default function CalculatorForm({ fields, errors, onChange, onSubmit }) {
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
    </section>
  );
}
