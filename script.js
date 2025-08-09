// --- Initialize Swup.js for Page Transitions ---
const swup = new Swup();

// This function will run for all scripts that need to be re-initialized on page load
function init() {
    // --- Initialize AOS (Animate on Scroll) ---
    AOS.init({
        duration: 1000,
        once: true,
        offset: 50,
    });

    // --- Custom Cursor Logic ---
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        const interactiveElements = document.querySelectorAll('a, button, .magnetic-link, .portfolio-item, .faq-question');
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        interactiveElements.forEach(link => {
            link.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            link.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    }

    // --- Magnetic Buttons/Links Logic ---
    const magneticLinks = document.querySelectorAll('.magnetic-link');
    if (magneticLinks.length > 0) {
        const moveAmount = 25;
        magneticLinks.forEach(link => {
            link.addEventListener('mousemove', (e) => {
                const { offsetX: x, offsetY: y } = e;
                const { offsetWidth: width, offsetHeight: height } = link;
                const xMove = (x / width * (moveAmount * 2)) - moveAmount;
                const yMove = (y / height * (moveAmount * 2)) - moveAmount;
                link.style.transform = `translate(${xMove}px, ${yMove}px)`;
            });
            link.addEventListener('mouseleave', () => {
                link.style.transform = '';
            });
        });
    }

    // --- Typewriter Effect Logic (Only runs if element exists on page) ---
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const words = ["AI Master.", "SEO Specialist.", "Web Developer."];
        let wordIndex = 0, letterIndex = 0, isDeleting = false;
        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, letterIndex - 1);
                letterIndex--;
            } else {
                typewriterElement.textContent = currentWord.substring(0, letterIndex + 1);
                letterIndex++;
            }
            let typeSpeed = isDeleting ? 75 : 150;
            if (!isDeleting && letterIndex === currentWord.length) {
                typeSpeed = 2000; isDeleting = true;
            } else if (isDeleting && letterIndex === 0) {
                isDeleting = false; wordIndex = (wordIndex + 1) % words.length; typeSpeed = 500;
            }
            setTimeout(type, typeSpeed);
        }
        type();
    }
    
    // --- FAQ Accordion Logic (If exists on page) ---
     const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const answer = item.querySelector('.faq-answer');
                const isOpen = question.classList.contains('active');
                faqItems.forEach(otherItem => {
                    otherItem.querySelector('.faq-question').classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0px';
                });
                if (!isOpen) {
                    question.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        });
    }

    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(18, 18, 18, 0.9)';
                header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            } else {
                header.style.background = 'rgba(18, 18, 18, 0.8)';
                header.style.boxShadow = 'none';
            }
        });
    }
}

// --- Initial Load ---
document.addEventListener('DOMContentLoaded', () => {
    // --- Preloader Logic ---
    const preloader = document.querySelector('.preloader');
    if(preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1200); // Hide after 1.2 seconds
    }
    
    // Run all initialization scripts
    init();
});

// --- After Swup changes the page, re-run the init function ---
swup.on('contentReplaced', init);