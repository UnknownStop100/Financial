import { calculateSalary } from '../JSModules/calculations.js';
import { formatCurrency } from '../JSModules/format.js';
import { getNumber } from '../JSModules/Input.js';
import { setText } from '../JSModules/ui.js';

function updateSalary(event) {
    event.preventDefault(); // Prevent form submission
    
    const hourlyWage = getNumber('hourlyWage');
    const hoursPerWeek = getNumber('hoursPerWeek');
    const weeksPerYear = getNumber('weeksPerYear');

    if (  Number.isFinite(hourlyWage) &&  Number.isFinite(hoursPerWeek) &&  Number.isFinite(weeksPerYear)) {
        const salary = calculateSalary(hourlyWage, hoursPerWeek, weeksPerYear);

        setText('annualSalary', formatCurrency(salary.annual));
        setText('monthlySalary', formatCurrency(salary.monthly));
        setText('biweeklySalary', formatCurrency(salary.biweekly));
        setText('weeklySalary', formatCurrency(salary.weekly));

        document.getElementById('results').classList.add('show');
    } else {
        document.getElementById('results').classList.remove('show');
    }
}

// Add event listener for form submission
document.getElementById('salaryForm').addEventListener('submit', updateSalary);