document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');
    let particlesArray;

    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size; this.color = color;
        }
        draw() {
            ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); ctx.fillStyle = this.color; ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) { this.directionX = -this.directionX; }
            if (this.y > canvas.height || this.y < 0) { this.directionY = -this.directionY; }
            this.x += this.directionX; this.y += this.directionY; this.draw();
        }
    }
    
    const particleColors = ['rgba(245, 245, 245, 0.7)', 'rgba(34, 197, 94, 0.7)', 'rgba(59, 130, 246, 0.7)', 'rgba(239, 68, 68, 0.7)'];

    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 14000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let directionX = (Math.random() * .4) - .2;
            let directionY = (Math.random() * .4) - .2;
            let color = particleColors[Math.floor(Math.random() * particleColors.length)];
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width/10) * (canvas.height/10)) {
                    opacityValue = 1 - (distance/25000);
                    ctx.strokeStyle = `rgba(161, 161, 170, ${opacityValue})`;
                    ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(particlesArray[a].x, particlesArray[a].y); ctx.lineTo(particlesArray[b].x, particlesArray[b].y); ctx.stroke();
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate); ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); }
        connect();
    }

    window.addEventListener('resize', () => { 
        setCanvasSize(); 
        init(); 
    });
    init(); animate();

    // --- Role Cycler Logic ---
    const roleElement = document.getElementById('role-cycler');
    const roles = ["Data Analyst", "Python Developer", "AI/ML Enthusiast"];
    let roleIndex = 0;
    function cycleRoles() {
        if(roleElement){
            roleElement.classList.add('is-fading');
            setTimeout(() => {
                roleIndex = (roleIndex + 1) % roles.length;
                roleElement.textContent = roles[roleIndex];
                roleElement.classList.remove('is-fading');
            }, 500);
        }
    }
    if(roleElement) setInterval(cycleRoles, 3000);

    // --- Intersection Observer for Animations & Active Nav Link ---
    const sections = document.querySelectorAll('.scroll-section');
    const navLinks = document.querySelectorAll('nav a.nav-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const cards = entry.target.querySelectorAll('.main-card');
            if (entry.isIntersecting) {
                cards.forEach(card => card.classList.add('is-visible'));

                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                
                navLinks.forEach(link => link.classList.remove('active'));
                if(activeLink){
                   activeLink.classList.add('active');
                }
            }
        });
    }, { threshold: 0.6 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Hamburger Menu Logic ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('translate-x-full');
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });
    });
});
