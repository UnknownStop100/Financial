import { calculateHourlyRate } from '../JSModules/calculations.js';
import { formatCurrency } from '../JSModules/format.js';
import { getNumber } from '../JSModules/Input.js';
import { setText } from '../JSModules/ui.js';

function updateHourly(event) {
    event.preventDefault();

    const annualSalary = getNumber('annualSalary');
    const hoursPerWeek = getNumber('hoursPerWeek');
    const weeksPerYear = getNumber('weeksPerYear');

    if (Number.isFinite(annualSalary) && Number.isFinite(hoursPerWeek) && Number.isFinite(weeksPerYear) && annualSalary >= 0 && hoursPerWeek > 0 && weeksPerYear > 0) {
        const result = calculateHourlyRate(annualSalary, hoursPerWeek, weeksPerYear);

        setText('hourlyWage', formatCurrency(result.hourly));
        setText('monthlySalary', formatCurrency(result.monthly));
        setText('biweeklySalary', formatCurrency(result.biweekly));
        setText('weeklySalary', formatCurrency(result.weekly));

        document.getElementById('results').classList.add('show');
    } else {
        document.getElementById('results').classList.remove('show');
    }
}

document.getElementById('hourlyForm').addEventListener('submit', updateHourly);