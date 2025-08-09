// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: true,     // Whether animation should happen only once - while scrolling down
    offset: 100,    // Offset (in px) from the original trigger point
});

// Optional: Add a class to the header on scroll for a cool effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(18, 18, 18, 0.9)';
    } else {
        header.style.background = 'rgba(18, 18, 18, 0.8)';
    }
});