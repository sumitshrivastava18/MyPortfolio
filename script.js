document.addEventListener('DOMContentLoaded', () => {
    // --- Optimized, High-Visibility Background Canvas Animation ---
    const canvas = document.getElementById('background-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        
        // Vibrant, high-contrast UI colors
        const particleColors = [
            'rgba(34, 197, 94, 0.85)',  // Bright Green
            'rgba(59, 130, 246, 0.85)',  // Electric Blue
            'rgba(239, 68, 68, 0.85)',   // Accent Red
            'rgba(168, 85, 247, 0.85)',  // Purple
            'rgba(251, 191, 36, 0.85)'   // Vivid Amber
        ];

        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        setCanvasSize();

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
                if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            // Restored the original high-density particle volume formula
            let numberOfParticles = (canvas.height * canvas.width) / 14000; 
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2.5) + 1.5; // Slightly larger elements for better visibility
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                // Kept movements crisp and snappy
                let directionX = (Math.random() * 0.6) - 0.3;
                let directionY = (Math.random() * 0.6) - 0.3;
                let color = particleColors[Math.floor(Math.random() * particleColors.length)];
                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        function connect() {
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a + 1; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) ** 2) + ((particlesArray[a].y - particlesArray[b].y) ** 2);
                    // Standard connection distance radius threshold
                    let checkDistance = (canvas.width / 10) * (canvas.height / 10);
                    
                    if (distance < checkDistance) {
                        // Keeps lines highly visible when close, fading smoothly as they break away
                        let opacityValue = 1 - (distance / 25000);
                        if (opacityValue > 0) {
                            // Inherits the color profiles of the parent particles instead of plain zinc/gray
                            ctx.strokeStyle = particlesArray[a].color.replace('0.85', (opacityValue * 0.45).toString());
                            ctx.lineWidth = 1.2;
                            ctx.beginPath();
                            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                            ctx.stroke();
                        }
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
            requestAnimationFrame(animate);
        }

        // Simple debounce handler to safeguard frame rendering performance on resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                setCanvasSize();
                init();
            }, 100);
        });

        init();
        animate();
    }

    // --- Flawless Inline Text Cycler ---
    const roleElement = document.getElementById('role-cycler');
    const roles = ["Data Analyst", "AI-ML Enthusiast"]; 
    let roleIndex = 0;
    
    function cycleRoles() {
        if (roleElement) {
            // 1. Slide up and fade out
            roleElement.classList.add('is-changing');
            
            setTimeout(() => {
                // 2. Swap the text
                roleIndex = (roleIndex + 1) % roles.length;
                roleElement.textContent = roles[roleIndex];
                
                // 3. Snap text to the bottom position instantly while invisible
                roleElement.style.transition = 'none';
                roleElement.style.transform = 'translateY(15px)'; 
                
                // 4. Force browser layout recalculation
                roleElement.offsetHeight; 
                
                // 5. Turn transitions back on and CLEAR the inline transform
                roleElement.style.transition = '';
                roleElement.style.transform = ''; // <--- THIS FIXES THE BUG
                roleElement.classList.remove('is-changing');
            }, 800); 
        }
    }
    
    if (roleElement) setInterval(cycleRoles, 4500);

    // --- Navigation Intersections ---
    const sections = document.querySelectorAll('.scroll-section');
    const navLinks = document.querySelectorAll('nav a.nav-link');
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => navObserver.observe(section));

    // --- Mobile Menu Toggle Drawer ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        const isOpen = mobileMenu.classList.toggle('is-open');
        mobileMenuOverlay.classList.toggle('is-open', isOpen);
        document.body.classList.toggle('overflow-hidden', isOpen);
    }

    if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', () => mobileMenu.classList.contains('is-open') && toggleMenu()));
});

const form = document.querySelector('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  // 1. Check for Internet Connection
  if (!navigator.onLine) {
    result.innerHTML = "No internet connection detected. Please check your network and try again.";
    result.className = "text-center text-sm mt-4 text-red-500";
    return; // Stop the function here
  }

  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  
  result.innerHTML = "Sending...";
  result.className = "text-center text-sm mt-4 text-gray-400";

  fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: json
    })
    .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
            result.innerHTML = "Message sent successfully!";
            result.className = "text-center text-sm mt-4 text-green-400";
            form.reset();
        } else {
            result.innerHTML = json.message || "Something went wrong!";
            result.className = "text-center text-sm mt-4 text-red-500";
        }
    })
    .catch(error => {
        result.innerHTML = "Something went wrong! Please check your connection.";
        result.className = "text-center text-sm mt-4 text-red-500";
    })
    .then(function() {
        setTimeout(() => { result.innerHTML = ""; }, 5000);
    });
});
