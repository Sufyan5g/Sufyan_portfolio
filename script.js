document.addEventListener('DOMContentLoaded', () => {

    // Check if Three.js library is loaded
    if (typeof THREE === 'undefined') {
        console.error('Three.js is not loaded! Please check the script tag.');
        return;
    }

    const canvas = document.getElementById('quantum-canvas');
    if (!canvas) {
        console.error('Canvas element with id "quantum-canvas" not found!');
        return;
    }

    // 1. Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. The 3D Object
    const geometry = new THREE.IcosahedronGeometry(2.5, 1);
    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.6,
        roughness: 0.2,
        wireframe: true,
        wireframeLinewidth: 2,
    });
    const shape = new THREE.Mesh(geometry, material);
    scene.add(shape);

    // 3. Lighting
    const pointLight = new THREE.PointLight(0x00FFD1, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    // 4. Camera Position
    camera.position.z = 6;

    // 5. Handle Window Resize for responsiveness
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // 6. SCROLL-BASED ANIMATION
    let scrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });

    // 7. Animation Loop
    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        shape.rotation.y = 0.1 * elapsedTime;
        shape.rotation.x = 0.05 * elapsedTime;
        const scrollRotation = (scrollY / window.innerHeight) * 1.5;
        shape.rotation.z = scrollRotation;
        const scrollScale = 1 + (scrollY / (document.body.scrollHeight - window.innerHeight)) * 1.5;
        if (scrollScale < 2.5) {
             shape.scale.set(scrollScale, scrollScale, scrollScale);
        }
        renderer.render(scene, camera);
    }
    animate();

    // === NAYA SCRIPT FOR MOBILE MENU ===
    const nav = document.querySelector('.nav-links');
    const navToggle = document.querySelector('.mobile-nav-toggle');

    navToggle.addEventListener('click', () => {
        const isVisible = nav.getAttribute('data-visible');

        if (isVisible === "false" || isVisible === null) {
            nav.setAttribute('data-visible', true);
            navToggle.querySelector('i').classList.replace('fa-bars', 'fa-times');
        } else {
            nav.setAttribute('data-visible', false);
            navToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
    });

    // Menu ke link par click karne se menu band ho jaye
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.setAttribute('data-visible', false);
            navToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });

});
