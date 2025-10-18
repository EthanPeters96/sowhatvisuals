/* eslint-env browser */
/* global document, window, console, setTimeout, fetch, URLSearchParams, FormData, Image, IntersectionObserver */

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initWorkFilters();
    initLightbox();
    initContactForm();
    initAnimations();
    initImageOptimization(); // Add image optimization
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        const isExpanded = hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
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
            const filterValue = this.getAttribute('data-filter');
            updateActiveFilterButton(filterButtons, this);
            applyFilterToWorkItems(workItems, filterValue);
        });
    });
}

// Helper: Update active state of filter buttons
function updateActiveFilterButton(buttons, activeButton) {
    buttons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
}

// Helper: Apply filter to work items
function applyFilterToWorkItems(items, filterValue) {
    items.forEach(item => {
        const shouldShow = shouldShowWorkItem(item, filterValue);

        if (shouldShow) {
            showWorkItem(item);
        } else {
            hideWorkItem(item);
        }
    });
}

// Helper: Determine if work item should be shown
function shouldShowWorkItem(item, filterValue) {
    if (filterValue === 'all') {
        return true;
    }

    if (item.classList.contains(filterValue)) {
        return true;
    }

    // Photo category includes multiple sub-categories
    const photoCategories = ['sports', 'wedding', 'portrait', 'fitness', 'creative'];
    if (filterValue === 'photo') {
        return photoCategories.some(category => item.classList.contains(category));
    }

    return false;
}

// Helper: Show work item with animation
function showWorkItem(item) {
    item.style.display = 'block';
    item.classList.add('fade-in');

    // Images are already preloaded and cached, ensure they're visible
    const img = item.querySelector('.work-img');
    if (img && !img.hasAttribute('data-cached')) {
        // Fallback: load image if somehow not cached yet
        const container = img.closest('.work-image');
        markImageAsLoaded(img, container);
    }
}

// Helper: Hide work item
function hideWorkItem(item) {
    item.style.display = 'none';
    item.classList.remove('fade-in');
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
                    // Reset button - use textContent for safety
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;

                    // Show success message
                    showNotification('Message sent successfully! (Development mode)', 'success');

                    // Reset form
                    contactForm.reset();
                }, 1500);
            } else {
                // For production (Netlify), submit via fetch to handle properly
                fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                })
                    .then(() => {
                    // Reset button - use textContent for safety
                        submitBtn.textContent = 'Send Message';
                        submitBtn.disabled = false;

                        // Show success message
                        showNotification('Message sent successfully!', 'success');

                        // Reset form
                        contactForm.reset();
                    })
                    .catch((error) => {
                        console.error('Network error:', error);

                        // Reset button - use textContent for safety
                        submitBtn.textContent = 'Send Message';
                        submitBtn.disabled = false;

                        // Show enhanced error message with retry suggestion
                        const errorMessage = error.name === 'TypeError'
                            ? 'Network connection failed. Please check your internet connection and try again.'
                            : 'There was an error sending your message. Please try again or contact us directly.';

                        showNotification(errorMessage, 'error');
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

    // Create notification element safely
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    // Create elements safely without innerHTML
    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'notification-close';
    closeBtn.innerHTML = '&times;';  // Safe - hardcoded HTML entity

    notification.appendChild(messageSpan);
    notification.appendChild(closeBtn);

    // Add styles for notification
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

    // Style close button
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

    // Close functionality - use already created closeBtn element
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
    // Note: Work section images are now preloaded and cached
    // Lazy loading is still used for brand section images
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

// Helper: Development-only console logging
function devLog(...args) {
    const isDevelopment = window.location.hostname === 'localhost' ||
                         window.location.hostname === '127.0.0.1' ||
                         window.location.hostname === '';

    if (isDevelopment) {
        console.log(...args);
    }
}

// Helper: Development-only console warnings
function devWarn(...args) {
    const isDevelopment = window.location.hostname === 'localhost' ||
                         window.location.hostname === '127.0.0.1' ||
                         window.location.hostname === '';

    if (isDevelopment) {
        console.warn(...args);
    }
}

// Advanced Image Preloading and Caching System
function initImageOptimization() {
    // Use a slight delay to allow the page to settle before aggressive preloading
    setTimeout(() => {
        preloadAndCacheAllImages();
    }, 1000);
}

// Image cache to prevent reloading
const imageCache = new Set();

// Preload and cache all work section images
function preloadAndCacheAllImages() {
    const workImages = document.querySelectorAll('.work-item img');
    let loadedCount = 0;
    const totalImages = workImages.length;

    devLog(`Starting preload of ${totalImages} work section images...`);

    workImages.forEach((img) => {
        const container = img.closest('.work-image');
        const imageUrl = img.src;

        // Skip if already cached
        if (imageCache.has(imageUrl)) {
            markImageAsLoaded(img, container);
            return;
        }

        // Show loading state for images that aren't visible yet
        if (!isElementInViewport(img)) {
            if (container) {
                container.classList.add('loading');
            }
            img.style.opacity = '0.3';
        }

        // Create a new Image object to preload
        const preloadImg = new Image();

        preloadImg.onload = () => {
            // Add to cache
            imageCache.add(imageUrl);

            // Update the actual img element
            markImageAsLoaded(img, container);

            loadedCount++;

            // Log progress every 5 images or when complete
            if (loadedCount % 5 === 0 || loadedCount === totalImages) {
                devLog(`Preloaded ${loadedCount}/${totalImages} work images`);
            }
        };

        preloadImg.onerror = () => {
            devWarn('Failed to preload image:', imageUrl);
            // Still mark as loaded to prevent further attempts
            markImageAsLoaded(img, container);
            loadedCount++;
        };

        // Set crossorigin for better caching
        preloadImg.crossOrigin = 'anonymous';
        preloadImg.src = imageUrl;
    });
}

// Mark an image as fully loaded
function markImageAsLoaded(img, container) {
    img.setAttribute('data-loaded', 'true');
    img.setAttribute('data-cached', 'true');
    img.removeAttribute('data-loading');
    img.style.opacity = '1';

    if (container) {
        container.classList.remove('loading');
        container.classList.add('cached');
    }
}

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
