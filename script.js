function initializeWebsite() {
    gsap.registerPlugin(ScrollTrigger);
    const isMobile = window.innerWidth < 768;

    gsap.timeline()
        .from(".hero-title .line > span", { y: "120%", duration: 1, ease: "power4.out", stagger: 0.2 })
        .from(".hero-description", { opacity: 0, y: 20, duration: 0.8 }, "-=0.5");

    document.querySelectorAll(".reveal-text").forEach(elem => {
        gsap.from(elem.querySelector("span"), { y: "110%", ease: "power4.out", duration: 1, scrollTrigger: { trigger: elem, start: "top 90%" }});
    });

    document.querySelectorAll(".numbered-heading").forEach(heading => {
        gsap.from(heading, { opacity: 0, y: 50, duration: 1, scrollTrigger: { trigger: heading, start: "top 85%" }});
    });

    gsap.from(".service-item", { opacity: 0, y: 50, duration: 0.8, stagger: 0.2, scrollTrigger: { trigger: ".services-section", start: "top 70%" }});
    
    document.querySelectorAll(".work-item").forEach(item => {
        gsap.from(item, { opacity: 0, y: 100, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: item, start: "top 80%" }});
    });

    const cursor = document.querySelector('.cursor');
    if (cursor && !isMobile) {
        const interactiveElements = document.querySelectorAll('a, button, .magnetic-link');
        document.addEventListener('mousemove', e => { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; });
        interactiveElements.forEach(link => {
            link.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            link.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    }

    const magneticLinks = document.querySelectorAll('.magnetic-link');
    if (magneticLinks.length > 0 && !isMobile) {
        const moveAmount = 20;
        magneticLinks.forEach(link => {
            link.addEventListener('mousemove', e => {
                const { offsetX: x, offsetY: y, target } = e;
                const { offsetWidth: width, offsetHeight: height } = target;
                const xMove = (x / width * (moveAmount * 2)) - moveAmount;
                const yMove = (y / height * (moveAmount * 2)) - moveAmount;
                target.style.transform = `translate(${xMove}px, ${yMove}px)`;
            });
            link.addEventListener('mouseleave', e => { e.target.style.transform = ''; });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.querySelector('.preloader');
    if(preloader) { setTimeout(() => preloader.classList.add('hidden'), 1500); }
    initializeWebsite();
    try {
        const swup = new Swup();
        swup.on('contentReplaced', initializeWebsite);
    } catch (e) { console.error("Swup.js library not found."); }
});
