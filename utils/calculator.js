/**
 * utils/calculator.js
 * Pure calculation and formatting utilities.
 * Node-compatible — no browser or React dependencies.
 */

/**
 * Formats a rupee amount using Indian numbering conventions.
 * @param {number} n
 * @returns {string}  e.g. "₹12.50 L" | "₹1.25 Cr" | "₹9,500"
 */
export function formatINR(n) {
  if (n >= 1e7) return '₹' + (n / 1e7).toFixed(2) + ' Cr';
  if (n >= 1e5) return '₹' + (n / 1e5).toFixed(2) + ' L';
  return (
    '₹' +
    Math.round(n)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  );
}

/**
 * Formats a decimal rate as a percentage string.
 * @param {number} n  e.g. 6.5
 * @returns {string}  e.g. "6.5%"
 */
export function formatPct(n) {
  return Number(n).toFixed(1) + '%';
}

/**
 * Step 1 – Inflate goal value.
 *
 * FV = presentCost × (1 + inflationRate)^years
 *
 * @param {number} presentCost     Today's cost of the goal (₹)
 * @param {number} inflationRate   Annual inflation assumption (e.g. 0.06 for 6%)
 * @param {number} years           Years to goal
 * @returns {number}               Inflation-adjusted future value
 */
export function inflateGoal(presentCost, inflationRate, years) {
  return presentCost * Math.pow(1 + inflationRate, years);
}

/**
 * Step 2 – Required monthly SIP.
 *
 * Monthly rate:  r = annualReturn / 12
 * Total months:  n = years × 12
 * SIP = FV × r / [((1 + r)^n − 1) × (1 + r)]
 *
 * Edge case: when r = 0, SIP = FV / n (simple division).
 *
 * @param {number} fv            Inflated goal value
 * @param {number} annualReturn  Annual return assumption (e.g. 0.12 for 12%)
 * @param {number} years         Years to goal
 * @returns {number}             Required monthly SIP amount
 */
export function requiredSIP(fv, annualReturn, years) {
  const n = years * 12;
  const r = annualReturn / 12;

  if (r === 0) return fv / n;

  return (fv * r) / ((Math.pow(1 + r, n) - 1) * (1 + r));
}

/**
 * Master calculation — runs both steps and derives summary metrics.
 *
 * @param {object} params
 * @param {number} params.presentCost    Today's cost of goal (₹)
 * @param {number} params.years          Years to goal
 * @param {number} params.inflationRate  Annual inflation % (e.g. 6 → 0.06 internally)
 * @param {number} params.returnRate     Annual return %    (e.g. 12 → 0.12 internally)
 *
 * @returns {{
 *   fv: number,
 *   sip: number,
 *   totalInvested: number,
 *   wealthGained: number,
 *   inflationImpact: number
 * }}
 */
export function calculateGoalSIP({ presentCost, years, inflationRate, returnRate }) {
  const inf = inflationRate / 100;
  const ret = returnRate / 100;
  const n   = years * 12;

  const fv             = inflateGoal(presentCost, inf, years);
  const sip            = requiredSIP(fv, ret, years);
  const totalInvested  = sip * n;
  const wealthGained   = fv - totalInvested;
  const inflationImpact = fv - presentCost;

  return { fv, sip, totalInvested, wealthGained, inflationImpact };
}

/**
 * Validates calculator form inputs.
 *
 * @param {object} values
 * @returns {{ valid: boolean, errors: object }}
 */
export function validateInputs({ presentCost, years, inflationRate, returnRate }) {
  const errors = {};

  if (!presentCost || isNaN(presentCost) || Number(presentCost) <= 0) {
    errors.presentCost = 'Please enter a valid amount greater than 0.';
  }
  if (!years || isNaN(years) || Number(years) < 1 || Number(years) > 50) {
    errors.years = 'Please enter years between 1 and 50.';
  }
  if (isNaN(inflationRate) || Number(inflationRate) < 0 || Number(inflationRate) > 30) {
    errors.inflationRate = 'Please enter a value between 0 and 30.';
  }
  if (isNaN(returnRate) || Number(returnRate) < 0 || Number(returnRate) > 50) {
    errors.returnRate = 'Please enter a value between 0 and 50.';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
