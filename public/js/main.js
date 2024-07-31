document.addEventListener('DOMContentLoaded', (event) => {
    // Get the form element
    const form = document.getElementById('registerForm');
    
    // Reset the form
    form.reset();
});

document.addEventListener('DOMContentLoaded', (event) => {
    // Get the form element
    const form = document.getElementById('loginForm');
    
    // Reset the form
    form.reset();
});

document.addEventListener('DOMContentLoaded', (event) => {
    // Get the form element
    const form = document.getElementById('forgotPasswordForm');
    
    // Reset the form
    form.reset();
});

document.addEventListener('DOMContentLoaded', (event) => {
    // Get the form element
    const form = document.getElementById('resetPasswordForm');
    
    // Reset the form
    form.reset();
});



document.addEventListener('DOMContentLoaded', function () {
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    // Add additional Leaflet functionalities...
});
