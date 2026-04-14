export function calculatePaycheck(income, federalTaxRate, stateTaxRate, socialSecurityRate, medicareRate) {
    const federalTax = income * federalTaxRate;
    const stateTax = income * stateTaxRate;
    const socialSecurity = income * socialSecurityRate;
    const medicare = income * medicareRate;
    const totalTaxes = federalTax + stateTax + socialSecurity + medicare;
    return {
        grossPay: income,
        federalTax: federalTax,
        stateTax: stateTax,
        socialSecurity: socialSecurity,
        medicare: medicare,
        totalTaxes: totalTaxes,
        netPay: income - totalTaxes
    };
}
export function calculateLoanPayment(principal, annualRate, years){
    const monthlyRate = annualRate / 12;
    const totalPayments = years * 12;
    return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPayments));
}
export function calculateMortgage(loanAmount, annualRate, years){
    const monthlyRate = annualRate / 12;
    const totalPayments = years * 12;
    return (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPayments));
}
export function calculateCompoundInterest(principal, annualRate, timesCompounded, years){
    return principal * Math.pow(1 + annualRate / timesCompounded, timesCompounded * years);
}
export function calculatePercent(value, percent){
    return (value * percent) / 100;
}
export function calculateMonthlyBudget(income, expenses){
    return income - expenses;
}