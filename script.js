/**
 * Actress Portfolio - Interactive Features
 * Professional animations and intelligent interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initNavigation();
    initScrollEffects();
    initShowreel();
    initMotivationTabs();
    initContactForm();
    initCursor();
    initParallax();
    initTypewriter();
    initLightbox();
});

/**
 * Navigation functionality
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for navbar
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll (optional)
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll reveal animations
 */
function initScrollEffects() {
    // Add reveal class to elements
    const revealElements = document.querySelectorAll(
        '.section-header, .cv-card, .showreel-info, .video-wrapper, ' +
        '.contact-info, .contact-form, .motivation-content'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    // Intersection Observer for reveal animations
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: unobserve after animation
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // Staggered animation for CV cards
    const cvCards = document.querySelectorAll('.cv-card');
    cvCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

/**
 * Showreel video functionality
 */
function initShowreel() {
    const playBtn = document.getElementById('playShowreel');
    const cover = document.getElementById('videoCover');
    const wrapper = document.getElementById('videoWrapper');

    if (!playBtn || !cover || !wrapper) return;

    playBtn.addEventListener('click', () => {
        const iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube.com/embed/H3916Mv9XB4?autoplay=1&vq=hd1080&rel=0&modestbranding=1';
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowfullscreen', '');
        cover.remove();
        wrapper.appendChild(iframe);
    });
}

/**
 * Video modal functionality
 */
function openVideoModal() {
    // Create modal if it doesn't exist
    let modal = document.getElementById('videoModal');

    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'videoModal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close" aria-label="Close modal">&times;</button>
                <div class="modal-video">
                    <p style="color: white; text-align: center; padding: 2rem;">
                        Replace this with your video embed code.<br><br>
                        For YouTube: &lt;iframe src="https://youtube.com/embed/YOUR_ID"&gt;<br>
                        For Vimeo: &lt;iframe src="https://player.vimeo.com/video/YOUR_ID"&gt;
                    </p>
                </div>
            </div>
        `;

        // Add modal styles
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
            #videoModal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            #videoModal.active {
                opacity: 1;
                visibility: visible;
            }
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.9);
            }
            .modal-content {
                position: relative;
                width: 90%;
                max-width: 900px;
                aspect-ratio: 16/9;
                background: #000;
                border-radius: 4px;
                overflow: hidden;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }
            #videoModal.active .modal-content {
                transform: scale(1);
            }
            .modal-close {
                position: absolute;
                top: -40px;
                right: 0;
                width: 32px;
                height: 32px;
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                z-index: 1;
                transition: color 0.2s;
            }
            .modal-close:hover {
                color: #c9a227;
            }
            .modal-video {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .modal-video iframe {
                width: 100%;
                height: 100%;
                border: none;
            }
        `;
        document.head.appendChild(modalStyles);
        document.body.appendChild(modal);

        // Close modal events
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');

        closeBtn.addEventListener('click', closeVideoModal);
        overlay.addEventListener('click', closeVideoModal);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeVideoModal();
        });
    }

    // Show modal
    setTimeout(() => modal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * Motivation tabs functionality
 */
function initMotivationTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.motivation-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            // Update active button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update active panel with animation
            panels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetTab) {
                    setTimeout(() => panel.classList.add('active'), 50);
                }
            });
        });
    });
}

/**
 * Contact form handling
 */
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual form handling)
            // For real implementation, use a service like Formspree, Netlify Forms, or your own backend
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#4CAF50';

            // Reset form
            form.reset();

            // Reset button after delay
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        });

        // Floating label fix for autofilled inputs
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            // Check on load for autofilled values
            setTimeout(() => {
                if (input.value) {
                    input.classList.add('has-value');
                }
            }, 100);

            input.addEventListener('input', () => {
                if (input.value) {
                    input.classList.add('has-value');
                } else {
                    input.classList.remove('has-value');
                }
            });
        });
    }
}

/**
 * Custom cursor effect
 */
function initCursor() {
    // Only on devices with fine pointer (desktop)
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    let cursorX = 0, cursorY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        const ease = 0.15;
        currentX += (cursorX - currentX) * ease;
        currentY += (cursorY - currentY) * ease;

        cursor.style.left = `${currentX - 10}px`;
        cursor.style.top = `${currentY - 10}px`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .play-button, .cv-card, .tab-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
}

/**
 * Parallax effects
 */
function initParallax() {
    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;

        if (hero) {
            hero.style.backgroundPositionY = `${rate}px`;
        }
    });

    // Mouse parallax for hero content
    const heroContent = document.querySelector('.hero-content');

    if (heroContent && matchMedia('(hover: hover)').matches) {
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.clientX) / 50;
            const y = (window.innerHeight / 2 - e.clientY) / 50;

            heroContent.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
}

/**
 * Typewriter effect for hero (optional enhancement)
 */
function initTypewriter() {
    const tagline = document.querySelector('.hero-tagline');
    if (!tagline) return;

    const text = tagline.textContent;
    const words = ['authentic performance', 'compelling storytelling', 'memorable characters'];
    let wordIndex = 0;

    // Optional: cycle through different taglines
    // Uncomment below to enable rotating taglines
    /*
    setInterval(() => {
        wordIndex = (wordIndex + 1) % words.length;
        tagline.style.opacity = '0';

        setTimeout(() => {
            tagline.textContent = `Bringing stories to life through ${words[wordIndex]}`;
            tagline.style.opacity = '1';
        }, 300);
    }, 4000);
    */
}

/**
 * Photo lightbox
 */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxOverlay = lightbox.querySelector('.lightbox-overlay');

    document.querySelectorAll('.lightbox-trigger').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    [lightboxClose, lightboxOverlay].forEach(el => {
        el.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Lazy loading for images (if you add images later)
 */
function initLazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

/**
 * Page loader
 */
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    }
});

/**
 * Keyboard navigation accessibility
 */
document.addEventListener('keydown', (e) => {
    // Tab focus visible
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add focus-visible styles
const focusStyles = document.createElement('style');
focusStyles.textContent = `
    body.keyboard-nav *:focus {
        outline: 2px solid #c9a227 !important;
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyles);
