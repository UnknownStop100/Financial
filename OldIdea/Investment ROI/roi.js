
        function updateInvestment() {
            const initial = parseFloat(document.getElementById('initialInvestment').value) || 0;
            const returnRate = parseFloat(document.getElementById('annualReturn').value) / 100;
            const years = parseFloat(document.getElementById('investmentYears').value) || 0;
            const annual = parseFloat(document.getElementById('annualContribution').value) || 0;
            const compoundFreq = parseInt(document.getElementById('compoundFreq').value);

            if (initial <= 0 || years <= 0) return;

            const ratePerPeriod = returnRate / compoundFreq;
            const periodsPerYear = compoundFreq;
            const totalPeriods = years * periodsPerYear;

            let balance = initial;
            const annualContributionPerPeriod = annual / periodsPerYear;

            for (let i = 1; i <= totalPeriods; i++) {
                balance *= (1 + ratePerPeriod);
                balance += annualContributionPerPeriod;
            }

            const totalInvested = initial + (annual * years);
            const totalGain = balance - totalInvested;
            const roi = (totalGain / totalInvested) * 100;

            document.getElementById('finalValue').textContent = balance.toFixed(2);
            document.getElementById('totalInvested').textContent = totalInvested.toFixed(2);
            document.getElementById('totalGain').textContent = totalGain.toFixed(2);
            document.getElementById('roi').textContent = roi.toFixed(2);
            document.getElementById('results').classList.remove('hidden');
            drawInvestmentChart(initial, returnRate, years, annual, compoundFreq);
        }

        function drawInvestmentChart(initial, returnRate, years, annual, compoundFreq) {
            const canvas = document.getElementById('investmentChart');
            const ctx = canvas.getContext('2d');
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            const width = canvas.width;
            const height = canvas.height;
            
            ctx.clearRect(0, 0, width, height);
            
            // Calculate values over time
            const values = [];
            const invested = [];
            let balance = initial;
            let investedAmount = initial;
            
            values.push(balance);
            invested.push(investedAmount);
            
            for (let year = 1; year <= years; year++) {
                const ratePerPeriod = returnRate / compoundFreq;
                for (let p = 0; p < compoundFreq; p++) {
                    balance *= (1 + ratePerPeriod);
                    balance += annual / compoundFreq;
                }
                values.push(balance);
                invested.push(investedAmount + annual * year);
            }
            
            // Draw axes
            const padding = 50;
            const chartWidth = width - padding - 30;
            const chartHeight = height - padding - 50;
            
            ctx.strokeStyle = '#333';
            ctx.beginPath();
            ctx.moveTo(padding, 20);
            ctx.lineTo(padding, height - padding);
            ctx.lineTo(width - 30, height - padding);
            ctx.stroke();
            
            // Scale
            const maxValue = Math.max(...values);
            const xScale = chartWidth / (years || 1);
            const yScale = chartHeight / (maxValue || 1);
            
            // Draw invested line
            ctx.strokeStyle = '#ccc';
            ctx.lineWidth = 2;
            ctx.beginPath();
            invested.forEach((val, i) => {
                const x = padding + i * xScale;
                const y = height - padding - val * yScale;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();
            
            // Draw growth line
            ctx.strokeStyle = '#667eea';
            ctx.lineWidth = 3;
            ctx.beginPath();
            values.forEach((val, i) => {
                const x = padding + i * xScale;
                const y = height - padding - val * yScale;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();
            
            // Fill between lines
            ctx.fillStyle = 'rgba(102, 126, 234, 0.1)';
            ctx.beginPath();
            values.forEach((val, i) => {
                const x = padding + i * xScale;
                const y = height - padding - val * yScale;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            for (let i = values.length - 1; i >= 0; i--) {
                const val = invested[i];
                const x = padding + i * xScale;
                const y = height - padding - val * yScale;
                if (i === values.length - 1) ctx.lineTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.fill();
            
            // Labels
            ctx.fillStyle = '#333';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Investment Growth vs Contributions', width / 2, 15);
            
            ctx.font = '11px Arial';
            for (let i = 0; i <= years; i++) {
                const x = padding + i * xScale;
                ctx.fillText(i + 'y', x, height - padding + 20);
            }
            
            ctx.textAlign = 'right';
            for (let i = 0; i <= 4; i++) {
                const val = maxValue * i / 4;
                const y = height - padding - (val * yScale);
                ctx.fillText('$' + (val / 1000).toFixed(0) + 'k', padding - 10, y + 5);
            }
            
            // Legend
            ctx.fillStyle = '#667eea';
            ctx.fillRect(width - 200, 30, 10, 10);
            ctx.fillStyle = '#333';
            ctx.textAlign = 'left';
            ctx.font = '11px Arial';
            ctx.fillText('Total Value', width - 185, 38);
            
            ctx.fillStyle = '#ccc';
            ctx.fillRect(width - 200, 45, 10, 10);
            ctx.fillStyle = '#333';
            ctx.fillText('Total Invested', width - 185, 53);
        }

        document.getElementById('initialInvestment').addEventListener('input', updateInvestment);
        document.getElementById('annualReturn').addEventListener('input', updateInvestment);
        document.getElementById('investmentYears').addEventListener('input', updateInvestment);
        document.getElementById('annualContribution').addEventListener('input', updateInvestment);
        document.getElementById('compoundFreq').addEventListener('change', updateInvestment);

        updateInvestment();