// Example function to fetch UGC sales data
async function fetchUGCData(ugcId) {
    try {
        const response = await fetch(`https://economy.roblox.com/v1/assets/${ugcId}/resellers`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching UGC data:', error);
    }
}

// Example function to calculate revenue from the fetched data
function calculateRevenueAndSales(data) {
    let totalRevenue = 0;
    let totalSales = 0;

    if (data && data.length > 0) {
        data.forEach(sale => {
            totalRevenue += sale.price * sale.quantity;
            totalSales += sale.quantity;
        });
    }

    return {
        revenue: totalRevenue,
        sales: totalSales
    };
}

async function getUGCSalesData() {
    const darkPurpleId = '18470946989';
    const yellowId = '17834295731';

    const darkPurpleData = await fetchUGCData(darkPurpleId);
    const yellowData = await fetchUGCData(yellowId);

    const darkPurpleStats = calculateRevenueAndSales(darkPurpleData.data);
    const yellowStats = calculateRevenueAndSales(yellowData.data);

    return {
        "Dark Purple": darkPurpleStats,
        "Yellow": yellowStats
    };
}

document.addEventListener('DOMContentLoaded', async function() {
    const salesData = await getUGCSalesData();

    const totalRevenue = salesData["Dark Purple"].revenue + salesData["Yellow"].revenue;
    const totalUnits = salesData["Dark Purple"].sales + salesData["Yellow"].sales;

    document.getElementById('total-revenue').innerText = `$${totalRevenue}`;
    document.getElementById('total-units').innerText = totalUnits;

    // Revenue Chart
    const ctxRevenue = document.getElementById('revenueChart').getContext('2d');
    new Chart(ctxRevenue, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Dark Purple',
                    data: salesData["Dark Purple"].revenue, // Monthly data if available
                    borderColor: '#8e44ad',
                    backgroundColor: 'rgba(142, 68, 173, 0.5)',
                    fill: true,
                },
                {
                    label: 'Yellow',
                    data: salesData["Yellow"].revenue, // Monthly data if available
                    borderColor: '#f1c40f',
                    backgroundColor: 'rgba(241, 196, 15, 0.5)',
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
            }
        }
    });

    // Units Sold Chart
    const ctxUnits = document.getElementById('unitsChart').getContext('2d');
    new Chart(ctxUnits, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Dark Purple',
                    data: salesData["Dark Purple"].sales, // Monthly data if available
                    backgroundColor: '#8e44ad',
                    borderColor: '#8e44ad',
                    borderWidth: 1
                },
                {
                    label: 'Yellow',
                    data: salesData["Yellow"].sales, // Monthly data if available
                    backgroundColor: '#f1c40f',
                    borderColor: '#f1c40f',
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
            }
        }
    });
});
