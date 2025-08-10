document.addEventListener('DOMContentLoaded', () => {

    // === FINAL CODE: GLOWING WATERFALL BEHIND TITLES ===
    (() => {
        const canvas = document.getElementById('title-effects-canvas');
        if (!canvas) { console.error("Title effects canvas not found!"); return; }
        
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const titles = document.querySelectorAll('.section-title');
        let particles = [];
        const glowColor = getComputedStyle(document.documentElement).getPropertyValue('--quantum-accent').trim() || '#00FFD1';

        class Particle {
            constructor(x, y, ymax) {
                this.x = x;
                this.y = y;
                this.ymax = ymax;
                this.speed = 1 + Math.random() * 2;
                this.life = 60 + Math.random() * 60;
                this.originalLife = this.life;
                this.radius = 1.5 + Math.random() * 2; 
            }

            update() {
                this.y += this.speed;
                this.life -= 1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.shadowColor = glowColor;
                ctx.shadowBlur = 20;
                ctx.globalAlpha = this.life / this.originalLife;
                ctx.fillStyle = glowColor;
                ctx.fill();
            }
        }

        function animate() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, width, height);

            titles.forEach(title => {
                const rect = title.getBoundingClientRect();
                if (rect.top < height && rect.bottom > 0) {
                    
                    // === CHANGE: Particles ki tadad kam karne ke liye 2 se 1 kar diya ===
                    // Ab effect zyada subtle aur professional lagega.
                    for (let i = 0; i < 1; i++) {
                        const x = rect.left + Math.random() * rect.width;
                        const y = rect.top + Math.random() * (rect.height / 2);
                        const ymax = rect.bottom + 50;
                        particles.push(new Particle(x, y, ymax));
                    }
                }
            });

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.update();
                p.draw();
                
                if (p.life <= 0 || p.y > p.ymax) {
                    particles.splice(i, 1);
                }
            }
            
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;

            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });
    })();



    // === 3D SPHERE (GLOBE) CODE ===
    
    if (typeof THREE === 'undefined') {
        console.error('Three.js is not loaded!');
        return;
    }

    const canvas = document.getElementById('quantum-canvas');
    if (!canvas) { console.error('3D Globe canvas not found!'); return; }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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

    const pointLight = new THREE.PointLight(0x00FFD1, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    camera.position.z = 6;

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    let scrollY = window.scrollY;
    window.addEventListener('scroll', () => { scrollY = window.scrollY; });

    const clock = new THREE.Clock();
    function animate3D() {
        requestAnimationFrame(animate3D);
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
    animate3D();

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            projectCards.forEach(c => c.classList.remove('project-active'));
            card.classList.add('project-active');
        });
    });
});
