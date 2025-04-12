document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Optional: Change hamburger icon to 'X' when menu is open
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when a link is clicked (optional)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active') && !link.target === '_blank') { // Don't close for external links
                     navMenu.classList.remove('active');
                     menuToggle.querySelector('i').classList.remove('fa-times');
                     menuToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }


    // Animated Counters
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Lower number = faster animation

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target'); // '+' converts string to number
        const updateCount = () => {
            const count = +counter.innerText;
            // Calculate increment step based on target and speed
            // Ensure it increments by at least 1
            const increment = Math.ceil(target / speed);

            if (count < target) {
                counter.innerText = Math.min(count + increment, target); // Ensure it doesn't exceed target
                setTimeout(updateCount, 10); // Adjust timing for smoother/faster animation
            } else {
                counter.innerText = target; // Set final target number precisely
            }
        };
        updateCount();
    };

    // Intersection Observer for Counters
    const observerOptions = {
        root: null, // relative to the viewport
        threshold: 0.3 // Trigger when 30% of the element is visible
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is intersecting (visible)
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                // Stop observing the element once animation has started
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    // Observe each counter element
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    
});