import { calculatePaycheck } from '../JSModules/calculations.js';
import { formatCurrency } from '../JSModules/format.js';
import {getNumber, getSelectValue, validateNumber} from '../JSModules/Input.js'; // For enhanced input handling (optional)
import { setHTML } from '../JSModules/ui.js';

const form = document.getElementById('paycheckForm');
const results = document.getElementById('results');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // 1. INPUTS (controller responsibility)
  const salary = getNumber('grossSalary');
  const frequency = getSelectValue('payFrequency');

  const federal = getNumber('federalTax');
  const state = getNumber('stateTax');
  const ss = getNumber('socialSecurity');
  const medicare = getNumber('medicare');
  // 2. CALCULATE (math module)
  let frequencyval;
  if (frequency === 'weekly') {
    frequencyval = 52;
  } else if (frequency === 'biweekly') {
    frequencyval = 26;
  } else if (frequency === 'monthly') {
    frequencyval = 12;
  } else if (frequency === 'annual') {
    frequencyval = 1;
  }
 let grossPay = salary / frequencyval; // Convert annual salary to per paycheck amount
  const result = calculatePaycheck(
    grossPay,
    federal / 100,
    state / 100,
    ss / 100,
    medicare / 100
  );
  // 3. DISPLAY (UI logic — still okay here for Phase 1)

  setHTML('grossPay', formatCurrency(result.grossPay));

  setHTML('federalTaxAmount', '-' + formatCurrency(result.federalTax));

  setHTML('stateTaxAmount', '-' + formatCurrency(result.stateTax));

  setHTML('socialSecurityAmount', '-' + formatCurrency(result.socialSecurity));

  setHTML('medicareAmount', '-' + formatCurrency(result.medicare));

  setHTML('netPay', formatCurrency(result.netPay));

  // 4. SHOW RESULTS
  results.classList.add('show');
});