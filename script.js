// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initWorkFilters();
    initLightbox();
    initContactForm();
    initAnimations();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Scroll effects and animations
function initScrollEffects() {
    // Smooth scroll for CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector('#work');
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Hide scroll indicator on scroll
    window.addEventListener('scroll', function() {
        if (scrollIndicator) {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        }
    });
}

// Work section filters
function initWorkFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            workItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    item.classList.add('fade-in');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('fade-in');
                }
            });
        });
    });
}

// Lightbox functionality
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxClose = document.querySelector('.lightbox-close');
    const viewButtons = document.querySelectorAll('.view-btn');

    let currentIndex = 0;
    let mediaItems = [];

    // Collect all media items
    viewButtons.forEach((button, index) => {
        const mediaType = button.getAttribute('data-type');
        const mediaSrc = button.getAttribute('data-src');
        const workItem = button.closest('.work-item');
        const title = workItem.querySelector('h3').textContent;

        mediaItems.push({
            type: mediaType,
            src: mediaSrc,
            title: title,
            element: button
        });

        button.addEventListener('click', function() {
            currentIndex = index;
            openLightbox(mediaItems[currentIndex]);
        });
    });

    function openLightbox(item) {
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';

        if (item.type === 'image') {
            lightboxImage.src = item.src;
            lightboxImage.style.display = 'block';
            lightboxVideo.style.display = 'none';
        } else if (item.type === 'video') {
            lightboxVideo.src = item.src;
            lightboxVideo.style.display = 'block';
            lightboxImage.style.display = 'none';
        }
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
        lightboxVideo.pause();
        lightboxVideo.src = '';
        lightboxImage.src = '';
    }

    // Close lightbox events
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navigation
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
        openLightbox(mediaItems[currentIndex]);
    });

    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % mediaItems.length;
        openLightbox(mediaItems[currentIndex]);
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
                openLightbox(mediaItems[currentIndex]);
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % mediaItems.length;
                openLightbox(mediaItems[currentIndex]);
            }
        }
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Always prevent default submission

            // Get form data for validation
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const budget = formData.get('budget');
            const projectDetails = formData.get('project-details');

            // Basic validation
            if (!name || !email || !budget || !projectDetails) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Check if we're on localhost/development
            const isLocalhost = window.location.hostname === 'localhost' ||
                               window.location.hostname === '127.0.0.1' ||
                               window.location.hostname === '' ||
                               window.location.protocol === 'file:';

            if (isLocalhost) {
                // For local development, simulate form submission
                setTimeout(() => {
                    // Reset button
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;

                    // Show success message
                    showNotification('Message sent successfully! (Development mode)', 'success');

                    // Reset form
                    contactForm.reset();

                    // Log form data to console for development
                    console.log('Form submitted in development mode:', {
                        name: name,
                        email: email,
                        budget: budget,
                        projectDetails: projectDetails
                    });
                }, 1500);
            } else {
                // For production (Netlify), submit via fetch to handle properly
                fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                })
                    .then(() => {
                    // Reset button
                        submitBtn.innerHTML = originalHTML;
                        submitBtn.disabled = false;

                        // Show success message
                        showNotification('Message sent successfully!', 'success');

                        // Reset form
                        contactForm.reset();
                    })
                    .catch((error) => {
                        console.error('Error:', error);

                        // Reset button
                        submitBtn.innerHTML = originalHTML;
                        submitBtn.disabled = false;

                        // Show error message
                        showNotification('There was an error sending your message. Please try again.', 'error');
                    });
            }
            showNotification('Sending your message...', 'info');

            // Note: Netlify will handle the actual form submission
            // The form will redirect to a success page or show Netlify's default success message
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#fff' : type === 'error' ? '#d32f2f' : '#fff'};
        color: ${type === 'error' ? 'white' : 'black'};
        padding: 1rem 1.5rem;
        border-radius: 0;
        z-index: 10000;
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;

    // Close button styles
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: ${type === 'error' ? 'white' : 'black'};
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    `;

    // Add to DOM
    document.body.appendChild(notification);

    // Close functionality
    closeBtn.addEventListener('click', () => notification.remove());

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Animation on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.work-item, .pricing-card, .brand-item, .stat');
    animateElements.forEach(el => observer.observe(el));
}

// Pricing button functionality
document.addEventListener('DOMContentLoaded', function() {
    const pricingButtons = document.querySelectorAll('.pricing-btn');

    pricingButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Pre-fill the contact form with package info
                const packageName = this.closest('.pricing-card').querySelector('h3').textContent;
                const messageField = document.querySelector('#message');
                if (messageField) {
                    messageField.value = `Hi Gyles, I'm interested in the ${packageName}. Could you provide more details?`;
                }
            }
        });
    });
});

// Performance optimization
window.addEventListener('load', function() {
    // Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
});

// Error handling for missing assets
document.addEventListener('DOMContentLoaded', function() {
    // Handle missing logo
    const navLogo = document.querySelector('#nav-logo');
    if (navLogo) {
        navLogo.addEventListener('error', function() {
            this.style.display = 'none';
            // Create text logo fallback
            const textLogo = document.createElement('span');
            textLogo.textContent = 'SOWHATVISUALS';
            textLogo.style.cssText = `
                font-family: 'Montserrat', sans-serif;
                font-weight: 800;
                font-size: 1.2rem;
                letter-spacing: 1px;
                color: #fff;
            `;
            this.parentNode.appendChild(textLogo);
        });
    }

    // Handle missing brand images
    const brandImages = document.querySelectorAll('.brand-item img');
    brandImages.forEach(img => {
        img.addEventListener('error', function() {
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                background-color: #1a1a1a;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Montserrat', sans-serif;
                font-weight: 700;
                color: #ccc;
                font-size: 0.9rem;
            `;
            placeholder.textContent = 'Brand Logo';
            this.parentNode.replaceChild(placeholder, this);
        });
    });
});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification {
        animation: slideInRight 0.3s ease-out;
    }
`;
document.head.appendChild(style);
