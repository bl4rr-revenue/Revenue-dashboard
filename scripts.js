document.addEventListener('DOMContentLoaded', function() {
    // Example Data
    const revenueData = [1000, 1200, 900, 1500, 2000, 1800, 2200, 2400, 2800, 3000, 3200, 3500];
    const unitsData = [50, 60, 55, 70, 80, 75, 90, 95, 100, 110, 120, 130];

    const totalRevenue = revenueData.reduce((a, b) => a + b, 0);
    const totalUnits = unitsData.reduce((a, b) => a + b, 0);

    document.getElementById('total-revenue').innerText = `$${totalRevenue}`;
    document.getElementById('total-units').innerText = totalUnits;

    // Revenue Chart
    const ctxRevenue = document.getElementById('revenueChart').getContext('2d');
    new Chart(ctxRevenue, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Revenue',
                data: revenueData,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.5)',
                fill: true,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Units Sold Chart
    const ctxUnits = document.getElementById('unitsChart').getContext('2d');
    new Chart(ctxUnits, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Units Sold',
                data: unitsData,
                backgroundColor: '#2ecc71',
                borderColor: '#27ae60',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
