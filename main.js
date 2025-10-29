document.addEventListener('DOMContentLoaded', function() {
    setActivePage();
    
    document.getElementById('Graph').style.display = 'block';
});

function navigateTo(page) {
    document.body.style.opacity = '0.7';
    setTimeout(function() {
        window.location.href = page;
    }, 200);
}

function setActivePage() {
    var currentPage = window.location.pathname.split('/').pop();
    if (!currentPage) currentPage = 'index.html';
    
    var navLinks = document.querySelectorAll('.nav-link');
    
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove('active');
        if (navLinks[i].getAttribute('href') === currentPage) {
            navLinks[i].classList.add('active');
        }
    }
}