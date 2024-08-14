// Handle login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple login validation
    if (username === 'bl4rr' && password === 'luminou') {
        localStorage.setItem('isLoggedIn', 'true');
        showPage('dashboard-section');
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
});

// Redirect user based on login status
document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
        showPage('dashboard-section');
    } else {
        showPage('login-section');
    }
});

// Handle logout
document.getElementById('logout').addEventListener('click', function () {
    localStorage.removeItem('isLoggedIn');
    showPage('login-section');
});

document.getElementById('logout-from-settings').addEventListener('click', function () {
    localStorage.removeItem('isLoggedIn');
    showPage('login-section');
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

function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(function (section) {
        section.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}
