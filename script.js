// Color Theme Management
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const gradients = [
    { from: 'blue-500', to: 'purple-500' },
    { from: 'purple-500', to: 'pink-500' },
    { from: 'pink-500', to: 'indigo-500' },
    { from: 'indigo-500', to: 'blue-500' }
];
let currentGradientIndex = 0;

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
}

// Theme toggle with color change
themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    
    // Change gradient colors
    currentGradientIndex = (currentGradientIndex + 1) % gradients.length;
    const gradient = gradients[currentGradientIndex];
    
    // Update CSS variables
    document.documentElement.style.setProperty('--gradient-1', `linear-gradient(to right, var(--${gradient.from}), var(--${gradient.to}))`);
    document.documentElement.style.setProperty('--gradient-2', `linear-gradient(to right, var(--${gradient.to}), var(--${gradient.from}))`);
    
    // Add rotation animation to the button
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 500);
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Section Animations
const sections = document.querySelectorAll('section');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add staggered animation to children
            const children = entry.target.querySelectorAll('.animate-on-scroll');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('animate-fade-in');
                }, index * 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Project Cards Data
const projects = [
    {
        title: 'Elder Ease',
        description: 'A comprehensive healthcare management App for elderly care facilities.',
        technologies: ['Python', 'KivyMD', 'SQLite'],
        github: 'https://github.com/ThatFerbGuy/ElderEase/',
        demo: 'https://elder-ease-demo.com',
        image: 'Elderease.jpg'
    },
    {
        title: 'FoodieConnect',
        description: 'A social platform for food enthusiasts to share recipes and connect.',
        technologies: ['PHP', 'HTML,CSS,JS', 'MySQL'],
        github: 'https://github.com/ThatFerbGuy/FoodieConnect',
        demo: 'https://foodie-connect-demo.com',
        image: 'foodieconnect.jpg'
    },
    {
        title: 'TailTrovez',
        description: 'An e-commerce platform for pet supplies and accessories.',
        technologies: ['HTML,CSS,JS', 'Node.js', 'Firebase'],
        github: 'https://github.com/thatferbguy/TailTrovez',
        demo: 'https://tail-trovez-demo.com',
        image: 'tailtrovez.jpg'
    }
];

// Function to create project cards with hover effects
function createProjectCards() {
    const projectsContainer = document.querySelector('#projects .grid');
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 animate-on-scroll';
        
        card.innerHTML = `
            <div class="relative overflow-hidden">
                <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover transition-transform duration-500 hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2 glow-text">${project.title}</h3>
                <p class="text-gray-600 dark:text-gray-300 mb-4">${project.description}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${project.technologies.map(tech => `
                        <span class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm rounded">
                            ${tech}
                        </span>
                    `).join('')}
                </div>
                <div class="flex gap-4">
                    <a href="${project.github}" target="_blank" class="btn-primary">
                        <i class="fab fa-github mr-2"></i>GitHub
                    </a>
                    <button onclick="showDemoMessage()" class="btn-primary">
                        <i class="fas fa-external-link-alt mr-2"></i>Live Demo
                    </button>
                </div>
            </div>
        `;
        
        projectsContainer.appendChild(card);
    });
}

// Function to show demo message
function showDemoMessage() {
    // Create message element
    const message = document.createElement('div');
    message.className = 'fixed top-4 right-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    message.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-info-circle text-blue-500 mr-2"></i>
            <p>A live demo is currently unavailable and we are working on it</p>
        </div>
    `;

    // Add to body
    document.body.appendChild(message);

    // Remove after 3 seconds
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(message);
        }, 300);
    }, 3000);
}

// Initialize project cards when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createProjectCards();
    
    // Add hover effect to skill icons
    document.querySelectorAll('.skill-card i').forEach(icon => {
        icon.addEventListener('mouseover', () => {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
        });
        icon.addEventListener('mouseout', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 transition-all duration-300';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
}); 