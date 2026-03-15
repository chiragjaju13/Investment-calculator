/**
 * components/SliderField.jsx
 * An accessible numeric input paired with a range slider.
 * Supports WCAG 2.1 AA: labelled, keyboard-navigable, ARIA-described.
 */

import styles from '../styles/CalculatorForm.module.css';

/**
 * @param {object} props
 * @param {string}   props.id          Input element id
 * @param {string}   props.label       Visible label text
 * @param {string}   props.dotClass    CSS class for the coloured legend dot
 * @param {number}   props.value       Current value
 * @param {function} props.onChange    Called with (name, value)
 * @param {string}   props.name        Field name key
 * @param {number}   props.min
 * @param {number}   props.max
 * @param {number}   props.step
 * @param {string}   props.hint        Helper text
 * @param {string}   [props.error]     Validation error message
 * @param {string}   props.hintDotLabel  Screen-reader label for the dot
 */
export default function SliderField({
  id,
  label,
  dotClass,
  value,
  onChange,
  name,
  min,
  max,
  step,
  hint,
  error,
  hintDotLabel,
}) {
  const errorId = `${id}-error`;
  const hintId  = `${id}-hint`;

  const handleInput = (val) => {
    onChange(name, val);
  };

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        <span className={`${styles.legendDot} ${styles[dotClass]}`} aria-hidden="true" />
        {label}
        <span className={styles.required} aria-label="required"> *</span>
      </label>

      <div className={styles.inputWrap}>
        <span className={styles.inputPrefix} aria-hidden="true">%</span>
        <input
          type="number"
          id={id}
          name={name}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => handleInput(e.target.value)}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          aria-required="true"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={`${hintId}${error ? ` ${errorId}` : ''}`}
        />
      </div>

      <div className={styles.sliderRow}>
        <input
          type="range"
          id={`${id}-slider`}
          min={min}
          max={max}
          step={step}
          value={value || min}
          onChange={(e) => handleInput(e.target.value)}
          className={styles.slider}
          aria-label={`${label} slider`}
          aria-controls={id}
        />
        <span className={styles.sliderVal} aria-live="polite">
          {value || min}%
        </span>
      </div>

      <div className={styles.hint} id={hintId}>
        {hintDotLabel && <span className="sr-only">{hintDotLabel} — </span>}
        {hint}
      </div>

      {error && (
        <div
          className={styles.errorMsg}
          id={errorId}
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}
    </div>
  );
}
