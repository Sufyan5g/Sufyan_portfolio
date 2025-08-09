// This function contains all the scripts that need to be re-initialized on every page change.
// We create this function to make our code work with Swup.js page transitions.
function initializeWebsite() {

    // --- Initialize AOS (Animate on Scroll) ---
    // This library handles the fade-in animations as you scroll down.
    AOS.init({
        duration: 800, // Animation duration in milliseconds
        once: true,    // Animation happens only once per element
        offset: 50,    // Trigger animation when element is 50px into the viewport
    });

    // --- Custom Cursor Logic ---
    const cursor = document.querySelector('.cursor');
    // Only run this code if the cursor element exists on the page.
    if (cursor) {
        const interactiveElements = document.querySelectorAll('a, button, .magnetic-link, .portfolio-item, .faq-question');
        
        document.addEventListener('mousemove', (e) => {
            // Move the custom cursor to follow the mouse
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Add a "hovered" class to the cursor when it's over an interactive element
        interactiveElements.forEach(link => {
            link.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            link.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    }

    // --- Magnetic Buttons/Links Logic ---
    const magneticLinks = document.querySelectorAll('.magnetic-link');
    // Only run if magnetic links exist on the current page.
    if (magneticLinks.length > 0) {
        const moveAmount = 20; // How strongly the element follows the cursor
        magneticLinks.forEach(link => {
            link.addEventListener('mousemove', (e) => {
                const { offsetX: x, offsetY: y, target } = e;
                const { offsetWidth: width, offsetHeight: height } = target;
                
                // Calculate the movement based on cursor position inside the element
                const xMove = (x / width * (moveAmount * 2)) - moveAmount;
                const yMove = (y / height * (moveAmount * 2)) - moveAmount;
                
                target.style.transform = `translate(${xMove}px, ${yMove}px)`;
            });
            // Reset position when the mouse leaves
            link.addEventListener('mouseleave', (e) => {
                e.target.style.transform = '';
            });
        });
    }

    // --- Typewriter Effect Logic ---
    const typewriterElement = document.querySelector('.typewriter');
    // Only run if the typewriter element exists on the current page.
    if (typewriterElement) {
        const words = ["AI Master.", "SEO Specialist.", "Web Developer."];
        let wordIndex = 0, letterIndex = 0, isDeleting = false;
        
        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                // Deleting text
                typewriterElement.textContent = currentWord.substring(0, letterIndex - 1);
                letterIndex--;
            } else {
                // Typing text
                typewriterElement.textContent = currentWord.substring(0, letterIndex + 1);
                letterIndex++;
            }
            
            let typeSpeed = isDeleting ? 75 : 150;

            if (!isDeleting && letterIndex === currentWord.length) {
                // Pause at the end of a word
                typeSpeed = 2000; 
                isDeleting = true;
            } else if (isDeleting && letterIndex === 0) {
                // Move to the next word after deleting
                isDeleting = false; 
                wordIndex = (wordIndex + 1) % words.length; 
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        }
        type(); // Start the typing effect
    }
}


// --- MAIN EXECUTION: This part controls the flow ---

// This event fires when the initial HTML document has been completely loaded.
document.addEventListener('DOMContentLoaded', () => {

    // 1. Handle the Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        // Hide the preloader after a short delay to ensure a smooth experience.
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1000); // 1-second delay
    }

    // 2. Initialize all website scripts for the first time.
    initializeWebsite();

    // 3. Setup Swup.js for smooth page transitions.
    try {
        const swup = new Swup();
        // This is the most important part:
        // After Swup replaces the content of a page, we MUST re-run our scripts.
        swup.on('contentReplaced', initializeWebsite);
    } catch (e) {
        // If Swup.js library is not included in the HTML, this will prevent the site from crashing.
        console.error("Swup.js library not found. Page transitions will not work.");
    }
});
