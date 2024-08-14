document.addEventListener('DOMContentLoaded', async function() {
    const salesData = await getUGCSalesData();

    // Set total revenue and sales dynamically based on fetched data
    const totalRevenue = salesData["Dark Purple"].revenue.reduce((a, b) => a + b, 0);
    const totalUnits = salesData["Dark Purple"].sales.reduce((a, b) => a + b, 0);

    document.getElementById('total-revenue').innerText = `$${totalRevenue.toLocaleString()}`;
    document.getElementById('total-units').innerText = totalUnits.toLocaleString();

    // Charts
    const productSalesChart = new Chart(document.getElementById('productSalesChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Sales',
                    data: salesData["Dark Purple"].sales,
                    borderColor: '#ff4d4d',
                    backgroundColor: 'rgba(255, 77, 77, 0.2)',
                    fill: true,
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuad'
            }
        }
    });

    const revenueChart = new Chart(document.getElementById('revenueChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Revenue',
                    data: salesData["Dark Purple"].revenue,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    fill: true,
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuad'
            }
        }
    });

    // Populate Transaction History (example data)
    const transactions = [
        { id: '#2020', name: 'John Doe', date: '17/03/2020', price: '$1278.00', status: 'Complete' },
        { id: '#2021', name: 'Jane Doe', date: '18/03/2020', price: '$1450.00', status: 'Complete' },
        { id: '#2022', name: 'Bob Smith', date: '19/03/2020', price: '$1130.00', status: 'On hold' }
    ];

    const transactionHistoryBody = document.getElementById('transaction-history-body');
    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.id}</td>
            <td>${transaction.name}</td>
            <td>${transaction.date}</td>
            <td>${transaction.price}</td>
            <td>${transaction.status}</td>
        `;
        transactionHistoryBody.appendChild(row);
    });

    const saleStatusChart = new Chart(document.getElementById('saleStatusChart').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Active', 'Complete', 'On hold'],
            datasets: [
                {
                    data: [40, 50, 10],
                    backgroundColor: ['#4caf50', '#2196f3', '#ff5722'],
                }
            ]
        },
        options: {
            responsive: true,
            animation: {
                duration: 1000,
                easing: 'easeInOutQuad'
            }
        }
    });

    const dailySaleChart = new Chart(document.getElementById('dailySaleChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['SA', 'SU', 'MO', 'TU', 'WE', 'TH', 'FR'],
            datasets: [
                {
                    label: 'Sales',
                    data: [1000, 2000, 1500, 3000, 2500, 2000, 1000],
                    backgroundColor: '#ff4d4d',
                    borderColor: '#ff4d4d',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuad'
            }
        }
    });
});
