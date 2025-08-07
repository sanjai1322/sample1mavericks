// Learning module
class Learning {
    constructor() {
        this.currentCourse = null;
        this.courses = [];
        this.categories = [];
        this.searchQuery = '';
        this.selectedCategory = 'all';
    }

    render() {
        return `
            <div class="space-y-6">
                <!-- Learning Header -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div class="mb-4 md:mb-0">
                            <h2 class="text-2xl font-bold text-gray-900">Learning Center</h2>
                            <p class="text-gray-600 mt-1">Explore courses and expand your knowledge</p>
                        </div>
                        <div class="flex space-x-3">
                            <button class="btn-secondary">
                                <i data-feather="bookmark" class="w-4 h-4 mr-2 inline"></i>
                                My Bookmarks
                            </button>
                            <button onclick="app.loadSection('progress')" class="btn-primary">
                                <i data-feather="trending-up" class="w-4 h-4 mr-2 inline"></i>
                                View Progress
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Search and Filters -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    ${this.renderSearchAndFilters()}
                </div>

                <!-- Continue Learning Section -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">Continue Learning</h3>
                    ${this.renderContinueLearning()}
                </div>

                <!-- Featured Courses -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">Featured Courses</h3>
                    ${this.renderFeaturedCourses()}
                </div>

                <!-- Course Categories -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">Browse by Category</h3>
                    ${this.renderCourseCategories()}
                </div>

                <!-- All Courses -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">All Courses</h3>
                    ${this.renderAllCourses()}
                </div>
            </div>
        `;
    }

    renderSearchAndFilters() {
        return `
            <div class="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                <!-- Search Bar -->
                <div class="flex-1 relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i data-feather="search" class="w-5 h-5 text-gray-400"></i>
                    </div>
                    <input type="text" 
                           id="course-search"
                           placeholder="Search courses..." 
                           class="form-input pl-10 w-full"
                           value="${this.searchQuery}">
                </div>

                <!-- Category Filter -->
                <div class="flex space-x-3">
                    <select id="category-filter" class="form-input">
                        <option value="all">All Categories</option>
                        <option value="programming">Programming</option>
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="database">Database</option>
                        <option value="devops">DevOps</option>
                        <option value="design">Design</option>
                    </select>

                    <!-- Sort Options -->
                    <select id="sort-filter" class="form-input">
                        <option value="newest">Newest</option>
                        <option value="popular">Most Popular</option>
                        <option value="rating">Highest Rated</option>
                        <option value="duration">Shortest</option>
                    </select>
                </div>
            </div>
        `;
    }

    renderContinueLearning() {
        const continueCourses = [
            {
                title: 'JavaScript Fundamentals',
                progress: 75,
                lastAccessed: '2024-08-06',
                nextLesson: 'Async/Await Patterns',
                timeLeft: '2 hours left'
            },
            {
                title: 'React Development',
                progress: 45,
                lastAccessed: '2024-08-05',
                nextLesson: 'State Management',
                timeLeft: '4 hours left'
            }
        ];

        if (continueCourses.length === 0) {
            return `
                <div class="text-center py-8">
                    <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <i data-feather="book-open" class="w-6 h-6 text-gray-400"></i>
                    </div>
                    <p class="text-gray-500">No courses in progress</p>
                    <p class="text-sm text-gray-400">Start a new course to continue your learning journey</p>
                </div>
            `;
        }

        return `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${continueCourses.map(course => `
                    <div class="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all">
                        <div class="flex items-start justify-between mb-3">
                            <h4 class="text-lg font-semibold text-gray-900">${course.title}</h4>
                            <span class="text-xs text-gray-500">${course.timeLeft}</span>
                        </div>
                        
                        <div class="mb-3">
                            <div class="flex items-center justify-between mb-1">
                                <span class="text-sm text-gray-600">Progress</span>
                                <span class="text-sm font-medium text-gray-900">${course.progress}%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-blue-600 h-2 rounded-full" style="width: ${course.progress}%"></div>
                            </div>
                        </div>
                        
                        <div class="mb-4">
                            <p class="text-sm text-gray-600">Next: <span class="font-medium">${course.nextLesson}</span></p>
                            <p class="text-xs text-gray-500">Last accessed ${App.formatDate(course.lastAccessed)}</p>
                        </div>
                        
                        <button onclick="app.modules.learning.continueCourse('${course.title}')" 
                                class="w-full btn-primary">
                            Continue Learning
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderFeaturedCourses() {
        const featuredCourses = [
            {
                id: 1,
                title: 'Full Stack JavaScript',
                instructor: 'Dr. Sarah Johnson',
                rating: 4.9,
                students: 15420,
                duration: '42 hours',
                level: 'Intermediate',
                price: 'Free',
                image: 'javascript',
                description: 'Master modern JavaScript development from frontend to backend'
            },
            {
                id: 2,
                title: 'React Masterclass',
                instructor: 'Mike Chen',
                rating: 4.8,
                students: 12350,
                duration: '38 hours',
                level: 'Advanced',
                price: 'Free',
                image: 'react',
                description: 'Build scalable React applications with modern best practices'
            },
            {
                id: 3,
                title: 'Database Design',
                instructor: 'Prof. Maria Garcia',
                rating: 4.7,
                students: 8920,
                duration: '24 hours',
                level: 'Beginner',
                price: 'Free',
                image: 'database',
                description: 'Learn database design principles and SQL optimization'
            }
        ];

        return `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${featuredCourses.map(course => `
                    <div class="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all">
                        <!-- Course Image Placeholder -->
                        <div class="h-40 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <i data-feather="${course.image === 'javascript' ? 'code' : course.image === 'react' ? 'layers' : 'database'}" 
                               class="w-12 h-12 text-white"></i>
                        </div>
                        
                        <div class="p-4">
                            <div class="flex items-start justify-between mb-2">
                                <h4 class="text-lg font-semibold text-gray-900 line-clamp-2">${course.title}</h4>
                                <span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                    ${course.price}
                                </span>
                            </div>
                            
                            <p class="text-sm text-gray-600 mb-3 line-clamp-2">${course.description}</p>
                            
                            <div class="flex items-center space-x-1 mb-2">
                                <div class="flex items-center">
                                    ${[...Array(5)].map((_, i) => `
                                        <i data-feather="star" class="w-4 h-4 ${i < Math.floor(course.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}"></i>
                                    `).join('')}
                                </div>
                                <span class="text-sm text-gray-600">${course.rating}</span>
                                <span class="text-sm text-gray-500">(${course.students.toLocaleString()})</span>
                            </div>
                            
                            <div class="flex items-center justify-between text-sm text-gray-600 mb-4">
                                <span>${course.instructor}</span>
                                <span>${course.duration}</span>
                            </div>
                            
                            <div class="flex items-center justify-between">
                                <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                    ${course.level}
                                </span>
                                <button onclick="app.modules.learning.enrollCourse(${course.id})" 
                                        class="btn-primary text-sm px-4 py-2">
                                    Enroll Now
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderCourseCategories() {
        const categories = [
            { name: 'Programming', icon: 'code', count: 45, color: 'blue' },
            { name: 'Frontend', icon: 'monitor', count: 32, color: 'green' },
            { name: 'Backend', icon: 'server', count: 28, color: 'purple' },
            { name: 'Database', icon: 'database', count: 18, color: 'orange' },
            { name: 'DevOps', icon: 'settings', count: 15, color: 'red' },
            { name: 'Design', icon: 'palette', count: 22, color: 'pink' }
        ];

        return `
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                ${categories.map(category => `
                    <button onclick="app.modules.learning.filterByCategory('${category.name.toLowerCase()}')"
                            class="p-4 border border-gray-200 rounded-lg hover:border-${category.color}-300 hover:bg-${category.color}-50 transition-all text-center">
                        <div class="w-12 h-12 bg-${category.color}-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <i data-feather="${category.icon}" class="w-6 h-6 text-${category.color}-600"></i>
                        </div>
                        <h4 class="text-sm font-medium text-gray-900">${category.name}</h4>
                        <p class="text-xs text-gray-500">${category.count} courses</p>
                    </button>
                `).join('')}
            </div>
        `;
    }

    renderAllCourses() {
        const allCourses = [
            {
                id: 4,
                title: 'Python for Beginners',
                instructor: 'Alex Kumar',
                rating: 4.6,
                students: 9840,
                duration: '28 hours',
                level: 'Beginner',
                category: 'Programming'
            },
            {
                id: 5,
                title: 'Vue.js Complete Guide',
                instructor: 'Emma Wilson',
                rating: 4.5,
                students: 6720,
                duration: '32 hours',
                level: 'Intermediate',
                category: 'Frontend'
            },
            {
                id: 6,
                title: 'Docker & Kubernetes',
                instructor: 'David Park',
                rating: 4.7,
                students: 4560,
                duration: '25 hours',
                level: 'Advanced',
                category: 'DevOps'
            },
            {
                id: 7,
                title: 'UI/UX Design Principles',
                instructor: 'Sophie Turner',
                rating: 4.8,
                students: 7890,
                duration: '20 hours',
                level: 'Beginner',
                category: 'Design'
            }
        ];

        return `
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Course
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Instructor
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Rating
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Duration
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Level
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        ${allCourses.map(course => `
                            <tr class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div class="text-sm font-medium text-gray-900">${course.title}</div>
                                        <div class="text-sm text-gray-500">${course.category}</div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    ${course.instructor}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <i data-feather="star" class="w-4 h-4 text-yellow-400 fill-current mr-1"></i>
                                        <span class="text-sm text-gray-900">${course.rating}</span>
                                        <span class="text-sm text-gray-500 ml-1">(${course.students.toLocaleString()})</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    ${course.duration}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${this.getLevelColor(course.level)}">
                                        ${course.level}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                    <button onclick="app.modules.learning.viewCourse(${course.id})" 
                                            class="text-blue-600 hover:text-blue-900">
                                        View
                                    </button>
                                    <button onclick="app.modules.learning.enrollCourse(${course.id})" 
                                            class="text-green-600 hover:text-green-900">
                                        Enroll
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    getLevelColor(level) {
        const colors = {
            'Beginner': 'bg-green-100 text-green-800',
            'Intermediate': 'bg-yellow-100 text-yellow-800',
            'Advanced': 'bg-red-100 text-red-800'
        };
        return colors[level] || colors['Beginner'];
    }

    continueCourse(courseTitle) {
        app.showNotification(`Continuing "${courseTitle}". Redirecting to course content...`, 'info');
    }

    enrollCourse(courseId) {
        app.showNotification(`Enrollment for course ${courseId} successful! Welcome aboard!`, 'success');
    }

    viewCourse(courseId) {
        app.showNotification(`Loading course ${courseId} details...`, 'info');
    }

    filterByCategory(category) {
        this.selectedCategory = category;
        app.showNotification(`Filtering courses by ${category}...`, 'info');
        // In a real app, this would filter and re-render the course list
    }

    init() {
        feather.replace();
        this.setupSearchAndFilters();
        this.loadLearningData();
    }

    setupSearchAndFilters() {
        const searchInput = document.getElementById('course-search');
        const categoryFilter = document.getElementById('category-filter');
        const sortFilter = document.getElementById('sort-filter');

        if (searchInput) {
            searchInput.addEventListener('input', App.debounce((e) => {
                this.searchQuery = e.target.value;
                this.filterCourses();
            }, 300));
        }

        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.selectedCategory = e.target.value;
                this.filterCourses();
            });
        }

        if (sortFilter) {
            sortFilter.addEventListener('change', (e) => {
                this.sortCourses(e.target.value);
            });
        }
    }

    filterCourses() {
        // Implement course filtering logic
        app.showNotification('Filtering courses...', 'info');
    }

    sortCourses(sortBy) {
        // Implement course sorting logic
        app.showNotification(`Sorting courses by ${sortBy}...`, 'info');
    }

    loadLearningData() {
        // Load courses and user's learning progress
        // In a real application, this would fetch from an API
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Learning;
}
