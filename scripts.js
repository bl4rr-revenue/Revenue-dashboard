async function fetchUGCData(ugcId) {
    try {
        const response = await fetch(`https://economy.roblox.com/v1/assets/${ugcId}/resellers`);
        const data = await response.json();
        
        // Process the data according to what the API returns
        // For demonstration purposes, I'm using mock calculations.
        // You may need to adjust based on the actual API response structure.

        let sales = [];
        let revenue = [];
        if (data && data.data) {
            data.data.forEach(item => {
                sales.push(item.quantity);  // Assuming quantity sold
                revenue.push(item.price * item.quantity);  // Assuming price and quantity fields exist
            });
        }

        return {
            sales: sales,
            revenue: revenue
        };
    } catch (error) {
        console.error('Error fetching UGC data:', error);
        return {
            sales: [],
            revenue: []
        };
    }
}

async function getUGCSalesData() {
    const darkPurpleId = '18470946989';
    const yellowId = '17834295731';

    const darkPurpleData = await fetchUGCData(darkPurpleId);
    const yellowData = await fetchUGCData(yellowId);

    return {
        "Dark Purple": darkPurpleData,
        "Yellow": yellowData
    };
}
document.addEventListener('DOMContentLoaded', async function() {
    const salesData = await getUGCSalesData();

    const totalRevenue = salesData["Dark Purple"].revenue.reduce((a, b) => a + b, 0) +
                         salesData["Yellow"].revenue.reduce((a, b) => a + b, 0);
    const totalUnits = salesData["Dark Purple"].sales.reduce((a, b) => a + b, 0) +
                       salesData["Yellow"].sales.reduce((a, b) => a + b, 0);

    document.getElementById('total-revenue').innerText = `$${totalRevenue}`;
    document.getElementById('total-units').innerText = totalUnits;

    const ctxRevenue = document.getElementById('revenueChart').getContext('2d');
    new Chart(ctxRevenue, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Dark Purple',
                    data: salesData["Dark Purple"].revenue,
                    borderColor: '#8e44ad',
                    backgroundColor: 'rgba(142, 68, 173, 0.5)',
                    fill: true,
                },
                {
                    label: 'Yellow',
                    data: salesData["Yellow"].revenue,
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
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuad'
            }
        }
    });

    const ctxUnits = document.getElementById('unitsChart').getContext('2d');
    new Chart(ctxUnits, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Dark Purple',
                    data: salesData["Dark Purple"].sales,
                    backgroundColor: '#8e44ad',
                    borderColor: '#8e44ad',
                    borderWidth: 1
                },
                {
                    label: 'Yellow',
                    data: salesData["Yellow"].sales,
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
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuad'
            }
        }
    });
});
