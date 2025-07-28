// Loading Screen Management
function showLoadingScreen() {
    const loader = document.getElementById('loading-screen');
    if (loader) {
        loader.style.display = 'flex';
    }
}

function hideLoadingScreen() {
    const loader = document.getElementById('loading-screen');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
}

// Theme Management
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle?.querySelector('i');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Scroll Progress
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Project Filters
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Project Modal
function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');
    const projectBtns = document.querySelectorAll('.project-view-btn');
    
    const projectData = {
        'circuit-breaker': {
            title: 'Circuit Breaker System',
            description: 'Designed a circuit breaker with fault detection using relay and LED indicators. The relay disconnects power output during short circuits, with a red LED signal. A reset switch restores the original connection.',
            features: [
                'Fault detection system',
                'Relay-based protection',
                'LED status indicators',
                'Reset functionality',
                'Safety automation'
            ],
            technologies: ['Electronics', 'Relay', 'LED', 'Circuit Design', 'Arduino'],
            github: null,
            live: null,
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'
        },
        'blogsphere': {
            title: 'BlogSphere – Blogging Website',
            description: 'Developed a responsive blogging platform where users can register, create posts, comment, and perform tag-based searches. Built responsive UI with Bootstrap and used Microsoft SQL for secure backend data handling.',
            features: [
                'User registration system',
                'Blog post creation',
                'Comment functionality',
                'Tag-based search',
                'Responsive design'
            ],
            technologies: ['Python', 'Flask', 'Microsoft SQL', 'HTML/CSS', 'Bootstrap'],
            github: '#',
            live: 'https://aditya-raj-parashar.github.io/blogsphere-local/',
            image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800'
        },
        'barsos': {
            title: 'BarsOS – Offline Multimodal AI Assistant',
            description: 'Creating an offline AI assistant featuring natural chat, voice input/output, memory, and modular code execution. Integrated GPU-accelerated LLM via LLaMA.cpp and designed a web UI with Flask + Monaco Editor.',
            features: [
                'Offline AI processing',
                'Voice input/output',
                'Natural language chat',
                'Memory system',
                'Modular code execution'
            ],
            technologies: ['Python', 'LLaMA.cpp', 'CUDA', 'Whisper', 'TTS', 'Flask'],
            github: 'https://github.com/Aditya-Raj-Parashar/bars-c',
            live: null,
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800'
        }
    };
    
    projectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project && modalContent) {
                modalContent.innerHTML = `
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <img src="${project.image}" alt="${project.title}" class="w-full h-64 object-cover rounded-lg mb-4">
                            <h3 class="text-2xl font-bold mb-4 orbitron">${project.title}</h3>
                            <p class="text-gray-300 mb-6">${project.description}</p>
                            <div class="flex gap-4 mb-6">
                                ${project.github ? `<a href="${project.github}" target="_blank" class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">
                                    <i class="fab fa-github mr-2"></i>GitHub
                                </a>` : ''}
                                ${project.live ? `<a href="${project.live}" target="_blank" class="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition">
                                    <i class="fas fa-external-link-alt mr-2"></i>Live Demo
                                </a>` : ''}
                            </div>
                        </div>
                        <div>
                            <h4 class="text-xl font-bold mb-4 orbitron">Features</h4>
                            <ul class="space-y-2 mb-6">
                                ${project.features.map(feature => `<li class="flex items-center"><i class="fas fa-check text-cyan-400 mr-2"></i>${feature}</li>`).join('')}
                            </ul>
                            <h4 class="text-xl font-bold mb-4 orbitron">Technologies</h4>
                            <div class="flex flex-wrap gap-2">
                                ${project.technologies.map(tech => `<span class="px-3 py-1 bg-cyan-900 bg-opacity-30 text-cyan-300 rounded-full text-sm">${tech}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `;
                
                modal.classList.add('active');
            }
        });
    });
    
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Enhanced Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const submitText = submitBtn.querySelector('.submit-text');
            const loadingText = submitBtn.querySelector('.loading-text');
            
            // Show loading state
            submitText.classList.add('hidden');
            loadingText.classList.remove('hidden');
            submitBtn.disabled = true;
            
            try {
                const formData = new FormData(form);
                
                // Simulate API call (replace with actual endpoint)
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // For demo purposes, we'll simulate a successful response
                // In production, replace with actual form service like Formspree
                /*
                const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Failed to send message');
                }
                */
                
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
                
            } catch (error) {
                console.error('Form submission error:', error);
                showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                // Reset button state
                submitText.classList.remove('hidden');
                loadingText.classList.add('hidden');
                submitBtn.disabled = false;
            }
        });
    }
}

// Notification System
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Animated Background Elements
function addFloatingShapes() {
    const shapes = ['triangle', 'square', 'circle', 'hexagon'];
    for (let i = 0; i < 8; i++) {
        const shape = document.createElement('div');
        shape.className = `floating-shape ${shapes[Math.floor(Math.random() * shapes.length)]}`;
        shape.style.left = Math.random() * 100 + '%';
        shape.style.animationDelay = Math.random() * 10 + 's';
        shape.style.animationDuration = (Math.random() * 10 + 10) + 's';
        document.body.appendChild(shape);
    }
}

// Mouse Trail Effect
function initMouseTrail() {
    let trailElements = [];
    const maxTrailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.left = e.clientX - 5 + 'px';
        trail.style.top = e.clientY - 5 + 'px';
        document.body.appendChild(trail);
        
        trailElements.push(trail);
        
        if (trailElements.length > maxTrailLength) {
            const oldTrail = trailElements.shift();
            oldTrail.remove();
        }
    });
}

// Enhanced Skill Bar Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Performance Optimization
function optimizePerformance() {
    // Limit Three.js frame rate
    let frameCount = 0;
    const maxFPS = 30;
    
    function limitFrameRate() {
        frameCount++;
        if (frameCount % (60 / maxFPS) !== 0) {
            return;
        }
    }
    
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize Three.js scene with performance optimization
function initThreeJS() {
    try {
        const container = document.getElementById('threejs-container');
        if (!container) return;
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
        container.appendChild(renderer.domElement);
        
        // Create a floating geometry
        const geometry = new THREE.IcosahedronGeometry(2, 1);
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x00ffff,
            emissive: 0x00ffff,
            emissiveIntensity: 0.2,
            shininess: 100,
            wireframe: true
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        
        const pointLight = new THREE.PointLight(0x00ffff, 1, 100);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);
        
        camera.position.z = 5;
        
        let frameCount = 0;
        const maxFPS = 30;
        
        // Animation loop with frame rate limiting
        function animate() {
            requestAnimationFrame(animate);
            
            frameCount++;
            if (frameCount % (60 / maxFPS) !== 0) {
                return;
            }
            
            mesh.rotation.x += 0.005;
            mesh.rotation.y += 0.01;
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    } catch (error) {
        console.warn('Three.js initialization failed:', error);
    }
}

// Initialize particles.js
function initParticles() {
    try {
        if (typeof particlesJS === 'undefined') {
            console.warn('Particles.js library not loaded');
            return;
        }
        
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 30, // Reduced for performance
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#00ffff"
                },
                "shape": {
                    "type": "circle"
                },
                "opacity": {
                    "value": 0.5,
                    "random": false
                },
                "size": {
                    "value": 3,
                    "random": true
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00ffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.5, // Reduced speed for performance
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 200,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 100,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
        
    } catch (error) {
        console.error('Particles.js initialization failed:', error);
        createFallbackParticles();
    }
}

// Fallback particles if particles.js fails
function createFallbackParticles() {
    const container = document.getElementById('particles-js');
    if (!container) return;
    
    container.innerHTML = '';
    container.style.position = 'absolute';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.zIndex = '-1';
    
    for (let i = 0; i < 20; i++) { // Reduced count for performance
        const particle = document.createElement('div');
        particle.className = 'fallback-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #00ffff;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle 6s infinite linear;
            animation-delay: ${Math.random() * 6}s;
        `;
        container.appendChild(particle);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-40px) translateX(-10px); }
            75% { transform: translateY(-20px) translateX(-5px); }
            100% { transform: translateY(0px) translateX(0px); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize Typed.js
function initTyped() {
    try {
        new Typed('#typed', {
            strings: [
                "Electronics Enthusiast",
                "Python Developer",
                "IoT Developer",
                "AI Enthusiast",
                "Robotics Enthusiast"
            ],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    } catch (error) {
        console.warn('Typed.js initialization failed:', error);
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    
    if (mobileMenuBtn && mobileMenu && closeMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
        });
        
        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
        
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

// Smooth scrolling for navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Update copyright year
function updateCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Show loading screen
    showLoadingScreen();
    
    // Initialize all features
    initThreeJS();
    initParticles();
    initTyped();
    initMobileMenu();
    initContactForm();
    initSmoothScroll();
    animateSkillBars();
    updateCopyrightYear();
    
    // New features
    initThemeToggle();
    initScrollProgress();
    initProjectFilters();
    initProjectModal();
    addFloatingShapes();
    initMouseTrail();
    optimizePerformance();
    
    // Hide loading screen after everything is ready
    window.addEventListener('load', () => {
        hideLoadingScreen();
    });
}); 