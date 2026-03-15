/**
 * hooks/useCalculator.js
 * Encapsulates all calculator state, validation, and computation.
 */

import { useState, useCallback, useRef } from 'react';
import { calculateGoalSIP, validateInputs } from '../utils/calculator';

const INITIAL_FIELDS = {
  presentCost:   '',
  years:         '',
  inflationRate: '6',
  returnRate:    '12',
};

/**
 * @returns {{
 *   fields:    object,
 *   errors:    object,
 *   results:   object|null,
 *   liveMsg:   string,
 *   handleChange: function,
 *   handleSubmit: function,
 *   resultsRef: React.RefObject
 * }}
 */
export function useCalculator() {
  const [fields,  setFields]  = useState(INITIAL_FIELDS);
  const [errors,  setErrors]  = useState({});
  const [results, setResults] = useState(null);
  const [liveMsg, setLiveMsg] = useState('');
  const resultsRef = useRef(null);

  const handleChange = useCallback((name, value) => {
    setFields(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    setErrors(prev => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const { valid, errors: validationErrors } = validateInputs({
      presentCost:   fields.presentCost,
      years:         fields.years,
      inflationRate: fields.inflationRate,
      returnRate:    fields.returnRate,
    });

    if (!valid) {
      setErrors(validationErrors);
      setLiveMsg('Please fix the errors in the form before calculating.');
      return;
    }

    const data = calculateGoalSIP({
      presentCost:   Number(fields.presentCost),
      years:         Number(fields.years),
      inflationRate: Number(fields.inflationRate),
      returnRate:    Number(fields.returnRate),
    });

    setResults({
      ...data,
      years:         Number(fields.years),
      inflationRate: Number(fields.inflationRate),
      returnRate:    Number(fields.returnRate),
      presentCost:   Number(fields.presentCost),
    });

    setErrors({});

    // Announce to screen readers after a short tick
    setTimeout(() => {
      setLiveMsg(
        `Calculation complete. Required monthly SIP is approximately ₹${Math.round(data.sip).toLocaleString('en-IN')}. ` +
        `Inflated goal value is approximately ₹${Math.round(data.fv).toLocaleString('en-IN')}.`
      );
      resultsRef.current?.focus();
    }, 100);
  }, [fields]);

  return { fields, errors, results, liveMsg, handleChange, handleSubmit, resultsRef };
}
