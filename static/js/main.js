document.addEventListener('DOMContentLoaded', function() {
    // Navigation menu functionality
    initNavigation();
    
    // Smooth scrolling
    initSmoothScrolling();
    
    // Scroll to top button
    initScrollTopButton();
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    // Initialize sortable tables
    initSortableTables();
    
    // Initialize expandable sections
    initExpandableSections();
    
    // Initialize count-up animation
    initCountUpAnimation();
});

function initNavigation() {
    // Toggle sidebar on mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            this.setAttribute('aria-expanded', sidebar.classList.contains('open'));
        });
    }
    
    // Handle navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        // Set active class based on current section
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                // Close sidebar on mobile when link is clicked
                if (window.innerWidth < 992) {
                    sidebar.classList.remove('open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 20,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without reload
                    history.pushState(null, null, targetId);
                    
                    // Set active class
                    navLinks.forEach(el => el.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Handle submenu toggles
    const submenuToggles = document.querySelectorAll('.submenu-toggle');
    
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const submenu = this.nextElementSibling;
            submenu.classList.toggle('open');
            this.setAttribute('aria-expanded', submenu.classList.contains('open'));
        });
    });
    
    // Set active link based on scroll position
    window.addEventListener('scroll', debounce(function() {
        const scrollPosition = window.scrollY;
        
        // Get all sections
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const targetLink = document.querySelector(`.nav-menu a[href="#${section.id}"]`);
                
                if (targetLink) {
                    navLinks.forEach(el => el.classList.remove('active'));
                    targetLink.classList.add('active');
                }
            }
        });
    }, 100));
}

function initSmoothScrolling() {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 20,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without reload
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
}

function initScrollTopButton() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    if (scrollTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', debounce(function() {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }, 100));
        
        // Scroll to top when button is clicked
        scrollTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function initSortableTables() {
    const sortableTables = document.querySelectorAll('table.sortable');
    
    sortableTables.forEach(table => {
        const headers = table.querySelectorAll('th');
        
        headers.forEach(header => {
            header.addEventListener('click', function() {
                const index = Array.from(headers).indexOf(this);
                const currentIsAscending = this.classList.contains('sort-asc');
                
                // Remove sorting classes from all headers
                headers.forEach(h => {
                    h.classList.remove('sort-asc', 'sort-desc');
                });
                
                // Add appropriate sorting class to current header
                this.classList.add(currentIsAscending ? 'sort-desc' : 'sort-asc');
                
                // Sort the table
                sortTable(table, index, !currentIsAscending);
            });
        });
    });
}

function sortTable(table, column, asc) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Sort rows
    const sortedRows = rows.sort((a, b) => {
        const aValue = a.cells[column].textContent.trim();
        const bValue = b.cells[column].textContent.trim();
        
        // Check if values are numbers
        const aNum = parseFloat(aValue.replace(/[^\d.-]/g, ''));
        const bNum = parseFloat(bValue.replace(/[^\d.-]/g, ''));
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return asc ? aNum - bNum : bNum - aNum;
        }
        
        // Sort as strings
        return asc
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
    });
    
    // Remove existing rows
    rows.forEach(row => tbody.removeChild(row));
    
    // Add sorted rows
    sortedRows.forEach(row => tbody.appendChild(row));
}

function initExpandableSections() {
    const expandableHeaders = document.querySelectorAll('.expandable-header');
    
    expandableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            content.classList.toggle('expanded');
            
            const icon = this.querySelector('.expand-icon');
            if (icon) {
                icon.textContent = content.classList.contains('expanded') ? '−' : '+';
            }
            
            this.setAttribute('aria-expanded', content.classList.contains('expanded'));
        });
    });
}

// Initialize count-up animation for numbers
function initCountUpAnimation() {
    const countElements = document.querySelectorAll('.count-up');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const finalValue = parseInt(element.textContent, 10);
                    let currentValue = 0;
                    
                    const duration = 1500; // ms
                    const frameDuration = 1000 / 60; // 60 fps
                    const totalFrames = Math.round(duration / frameDuration);
                    let frame = 0;
                    
                    // Easing function for smoother animation
                    function easeOutQuad(t) {
                        return t * (2 - t);
                    }
                    
                    function updateCounter() {
                        frame++;
                        const progress = easeOutQuad(frame / totalFrames);
                        currentValue = Math.floor(finalValue * progress);
                        
                        element.textContent = currentValue;
                        
                        if (frame < totalFrames) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            element.textContent = finalValue; // Ensure exact final value
                        }
                    }
                    
                    requestAnimationFrame(updateCounter);
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
        
        countElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Utility function to debounce events
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}
