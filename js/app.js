// Main application controller
class App {
    constructor() {
        this.currentSection = 'dashboard';
        this.isAdmin = false;
        this.modules = {};
        this.init();
    }

    init() {
        this.initializeModules();
        this.setupEventListeners();
        this.setupMobileMenu();
        this.setupRoleToggle();
        this.loadSection('dashboard');
    }

    initializeModules() {
        // Initialize all module instances
        this.modules = {
            dashboard: new Dashboard(),
            assessment: new Assessment(),
            progress: new Progress(),
            learning: new Learning(),
            hackathon: new Hackathon(),
            leaderboard: new Leaderboard(),
            admin: new Admin(),
            analytics: new Analytics()
        };
    }

    setupEventListeners() {
        // Navigation event listeners
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.currentTarget.getAttribute('data-section');
                this.loadSection(section);
            });
        });

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.section) {
                this.loadSection(e.state.section, false);
            }
        });
    }

    setupMobileMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const sidebar = document.getElementById('sidebar');
        const closeSidebar = document.getElementById('close-sidebar');
        const mobileOverlay = document.getElementById('mobile-overlay');

        const openSidebar = () => {
            sidebar.classList.remove('-translate-x-full');
            mobileOverlay.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        };

        const closeSidebarFn = () => {
            sidebar.classList.add('-translate-x-full');
            mobileOverlay.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        };

        menuToggle.addEventListener('click', openSidebar);
        closeSidebar.addEventListener('click', closeSidebarFn);
        mobileOverlay.addEventListener('click', closeSidebarFn);

        // Close sidebar when clicking on nav items on mobile
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth < 1024) {
                    closeSidebarFn();
                }
            });
        });
    }

    setupRoleToggle() {
        const roleToggle = document.getElementById('role-toggle');
        const roleToggleButton = document.getElementById('role-toggle-button');
        const roleLabel = document.getElementById('role-label');
        const adminSections = document.getElementById('admin-sections');

        roleToggle.addEventListener('click', () => {
            this.isAdmin = !this.isAdmin;
            
            if (this.isAdmin) {
                roleToggle.classList.add('bg-blue-600');
                roleToggle.classList.remove('bg-gray-200');
                roleToggleButton.classList.add('translate-x-6');
                roleToggleButton.classList.remove('translate-x-1');
                roleLabel.textContent = 'Admin';
                adminSections.classList.remove('hidden');
                roleToggle.setAttribute('aria-checked', 'true');
            } else {
                roleToggle.classList.remove('bg-blue-600');
                roleToggle.classList.add('bg-gray-200');
                roleToggleButton.classList.remove('translate-x-6');
                roleToggleButton.classList.add('translate-x-1');
                roleLabel.textContent = 'User';
                adminSections.classList.add('hidden');
                roleToggle.setAttribute('aria-checked', 'false');
                
                // If currently viewing admin section, switch to dashboard
                if (this.currentSection === 'admin' || this.currentSection === 'analytics') {
                    this.loadSection('dashboard');
                }
            }
        });
    }

    loadSection(sectionName, updateHistory = true) {
        // Validate section access
        if ((sectionName === 'admin' || sectionName === 'analytics') && !this.isAdmin) {
            this.showNotification('Access denied. Admin privileges required.', 'error');
            return;
        }

        // Update current section
        this.currentSection = sectionName;

        // Update navigation active state
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeNavItem = document.querySelector(`[data-section="${sectionName}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }

        // Update page title
        const pageTitle = document.getElementById('page-title');
        pageTitle.textContent = this.capitalizeFirst(sectionName);

        // Update browser history
        if (updateHistory) {
            history.pushState({ section: sectionName }, '', `#${sectionName}`);
        }

        // Load section content
        this.renderSection(sectionName);
    }

    renderSection(sectionName) {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = '<div class="loading-spinner">Loading...</div>';

        // Simulate loading delay for better UX
        setTimeout(() => {
            if (this.modules[sectionName] && typeof this.modules[sectionName].render === 'function') {
                const content = this.modules[sectionName].render();
                contentArea.innerHTML = content;
                
                // Initialize section-specific functionality
                if (typeof this.modules[sectionName].init === 'function') {
                    this.modules[sectionName].init();
                }
            } else {
                contentArea.innerHTML = this.renderNotFound(sectionName);
            }
        }, 200);
    }

    renderNotFound(sectionName) {
        return `
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i data-feather="alert-circle" class="w-8 h-8 text-red-600"></i>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">Section Not Found</h2>
                <p class="text-gray-600 mb-6">The requested section "${sectionName}" could not be loaded.</p>
                <button onclick="app.loadSection('dashboard')" class="btn-primary">
                    Return to Dashboard
                </button>
            </div>
        `;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md ${this.getNotificationClasses(type)}`;
        notification.innerHTML = `
            <div class="flex items-center">
                <i data-feather="${this.getNotificationIcon(type)}" class="w-5 h-5 mr-3"></i>
                <span class="flex-1">${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-gray-400 hover:text-gray-600">
                    <i data-feather="x" class="w-4 h-4"></i>
                </button>
            </div>
        `;

        document.body.appendChild(notification);
        feather.replace();

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    getNotificationClasses(type) {
        const classes = {
            info: 'bg-blue-50 border border-blue-200 text-blue-800',
            success: 'bg-green-50 border border-green-200 text-green-800',
            warning: 'bg-yellow-50 border border-yellow-200 text-yellow-800',
            error: 'bg-red-50 border border-red-200 text-red-800'
        };
        return classes[type] || classes.info;
    }

    getNotificationIcon(type) {
        const icons = {
            info: 'info',
            success: 'check-circle',
            warning: 'alert-triangle',
            error: 'alert-circle'
        };
        return icons[type] || icons.info;
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Utility methods for modules to use
    static formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    }

    static formatTime(date) {
        return new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(date));
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new App();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}
