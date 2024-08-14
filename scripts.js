// Function to fetch UGC data from the Roblox API
async function fetchUGCData(ugcId) {
    try {
        const response = await fetch(`https://economy.roblox.com/v1/assets/${ugcId}/resellers`);
        const data = await response.json();

        let totalSales = 0;
        let totalRevenue = 0;

        if (data && data.data) {
            data.data.forEach(item => {
                const quantity = item.quantity || 1;
                const price = item.price || 0;
                totalSales += quantity;
                totalRevenue += price * quantity;
            });
        }

        return {
            sales: totalSales,
            revenue: totalRevenue,
            profit: totalRevenue
        };
    } catch (error) {
        console.error('Error fetching UGC data:', error);
        return {
            sales: 0,
            revenue: 0,
            profit: 0
        };
    }
}

// Initialize the page by fetching data and displaying it
async function initializeDashboard() {
    const ugcIds = ['18470946989', '17834295731'];
    let totalSales = 0;
    let totalRevenue = 0;
    let totalProfit = 0;

    for (let ugcId of ugcIds) {
        const data = await fetchUGCData(ugcId);
        totalSales += data.sales;
        totalRevenue += data.revenue;
        totalProfit += data.profit;
    }

    document.getElementById('product-sales').innerText = totalSales.toLocaleString();
    document.getElementById('total-revenue').innerText = totalRevenue.toLocaleString();
    document.getElementById('total-profit').innerText = totalProfit.toLocaleString();

    const ctxProductSales = document.getElementById('productSalesChart').getContext('2d');
    new Chart(ctxProductSales, {
        type: 'bar',
        data: {
            labels: ['UGC 1', 'UGC 2'],
            datasets: [{
                label: 'Product Sales',
                data: [totalSales],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const ctxRevenue = document.getElementById('revenueChart').getContext('2d');
    new Chart(ctxRevenue, {
        type: 'line',
        data: {
            labels: ['UGC 1', 'UGC 2'],
            datasets: [{
                label: 'Total Revenue',
                data: [totalRevenue],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const ctxProfit = document.getElementById('profitChart').getContext('2d');
    new Chart(ctxProfit, {
        type: 'line',
        data: {
            labels: ['UGC 1', 'UGC 2'],
            datasets: [{
                label: 'Total Profit (Robux)',
                data: [totalProfit],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Call initializeDashboard when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeDashboard);

// Handle login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'bl4rr' && password === 'luminou') {
        localStorage.setItem('isLoggedIn', 'true');
        showPage('dashboard-section');
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
});

// Page switching logic
document.getElementById('show-dashboard').addEventListener('click', function () {
    showPage('dashboard-section');
});

document.getElementById('show-dashboard-from-settings').addEventListener('click', function () {
    showPage('dashboard-section');
});

document.getElementById('show-settings').addEventListener('click', function () {
    showPage('settings-section');
});

document.getElementById('logout').addEventListener('click', function () {
    localStorage.removeItem('isLoggedIn');
    showPage('login-section');
});

document.getElementById('logout-from-settings').addEventListener('click', function () {
    localStorage.removeItem('isLoggedIn');
    showPage('login-section');
});

function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(function (section) {
        section.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}
