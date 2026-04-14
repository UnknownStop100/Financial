function updateGraph() {
    const principal = parseFloat(document.getElementById('principal').value) || 0;
    const rate = parseFloat(document.getElementById('rate').value) / 100 || 0;
    const years = parseFloat(document.getElementById('years').value) || 10;
    const compounding = parseInt(document.getElementById('compounding').value);
    const contribution = parseFloat(document.getElementById('contribution').value) || 0;
    const contributionFreq = parseInt(document.getElementById('contributionFreq').value);

    // Calculate final amount with contributions
    let balance = principal;
    const totalPeriods = years * compounding;
    const contribPerPeriod = contribution * (contributionFreq / compounding);
    for (let p = 1; p <= totalPeriods; p++) {
        balance *= (1 + rate / compounding);
        balance += contribPerPeriod;
    }
    const finalAmount = balance;

    // Calculate total contributions
    const totalContributions = contribution * years * contributionFreq;
    const totalInvested = principal + totalContributions;
    const interestEarned = finalAmount - totalInvested;

    document.getElementById('amountInvested').textContent = totalInvested.toFixed(2);
    document.getElementById('finalAmount').textContent = finalAmount.toFixed(2);
    document.getElementById('interestEarned').textContent = interestEarned.toFixed(2);

    if (principal > 0 || contribution > 0) {
        document.getElementById('results').classList.add('show');
    } else {
        document.getElementById('results').classList.remove('show');
    }

    // Draw the graph
    drawGraph(principal, rate, years, compounding, contribution, contributionFreq);
}

// Add event listeners for live updates
document.getElementById('principal').addEventListener('input', updateGraph);
document.getElementById('rate').addEventListener('input', updateGraph);
document.getElementById('years').addEventListener('input', updateGraph);
document.getElementById('compounding').addEventListener('change', updateGraph);
document.getElementById('contribution').addEventListener('input', updateGraph);
document.getElementById('contributionFreq').addEventListener('change', updateGraph);

// Initial draw of the graph
drawGraph(0, 0, 10, 12, 0, 12);

function drawGraph(principal, rate, years, compounding, contribution, contributionFreq) {
    const canvas = document.getElementById('interestChart');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const contribPerPeriod = contribution * (contributionFreq / compounding);

    // Calculate balances over time with interest and contributions
    const balancesWithInterest = [principal];
    let balance = principal;
    for (let y = 1; y <= years; y++) {
        for (let p = 1; p <= compounding; p++) {
            balance *= (1 + rate / compounding);
            balance += contribPerPeriod;
        }
        balancesWithInterest.push(balance);
    }

    // Calculate balances without interest but with contributions
    const balancesNoInterest = [principal];
    let balanceNo = principal;
    for (let y = 1; y <= years; y++) {
        for (let p = 1; p <= compounding; p++) {
            balanceNo += contribPerPeriod;
        }
        balancesNoInterest.push(balanceNo);
    }

    // Find max balance for scaling
    const allBalances = [...balancesWithInterest, ...balancesNoInterest];
    const maxBalance = Math.max(...allBalances);

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(50, 20);
    ctx.lineTo(50, height - 100);
    ctx.lineTo(width - 20, height - 100);
    ctx.stroke();

    // Draw labels
    ctx.font = '14px Arial';
    ctx.fillText('Years', width - 30, height - 50);
    ctx.fillText('Balance ($)', 5, 15);

    // Add balance markers on y-axis
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    const numMarkers = 5;
    for (let i = 0; i <= numMarkers; i++) {
        const balanceValue = (maxBalance / numMarkers) * i;
        const y = height - 100 - (balanceValue / maxBalance) * (height - 140);
        ctx.fillText(balanceValue.toFixed(0), 10, y + 5);
    }

    // Function to draw line
    function drawLine(balances, color) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        for (let i = 0; i < balances.length; i++) {
            const x = 50 + (i / years) * (width - 70);
            const y = height - 100 - (balances[i] / maxBalance) * (height - 140);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
    }

    // Draw no interest line (red)
    drawLine(balancesNoInterest, 'red');

    // Draw with interest line (blue)
    drawLine(balancesWithInterest, 'blue');

    // Add some markers on x-axis
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    for (let i = 0; i <= years; i += Math.max(1, Math.floor(years / 5))) {
        const x = 50 + (i / years) * (width - 70);
        ctx.fillText(i.toString(), x - 10, height - 80);
    }

    // Add legend with colored blocks
    const blockSize = 10;
    const legendStartY = height - 25;
    
    // Red block for Without Interest
    ctx.fillStyle = 'red';
    ctx.fillRect(50, legendStartY, blockSize, blockSize);
    ctx.fillStyle = 'black';
    ctx.font = 'bold 13px Arial';
    ctx.fillText('Without Interest', 65, legendStartY + 10);
    
    // Blue block for With Interest
    ctx.fillStyle = 'blue';
    ctx.fillRect(260, legendStartY, blockSize, blockSize);
    ctx.fillStyle = 'black';
    ctx.fillText('With Interest', 275, legendStartY + 10);
}