// Learning module
class Learning {
    constructor() {
        this.currentCourse = null;
        this.courses = [];
        this.categories = [];
        this.searchQuery = '';
        this.selectedCategory = 'all';
        this.learningPathData = this.initializeLearningPathData();
        this.expandedRows = new Set();
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

                <!-- Learning Path Table -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <i data-feather="map" class="w-5 h-5 mr-2"></i>
                        Your Personalized Learning Path
                    </h3>
                    <p class="text-gray-600 mb-6">AI-curated modules based on your assessment results and learning goals</p>
                    ${this.renderLearningPathTable()}
                </div>

                <!-- Learning Path -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <i data-feather="map" class="w-5 h-5 mr-2"></i>
                        Your Learning Path
                    </h3>
                    ${this.renderLearningPath()}
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

    initializeLearningPathData() {
        return [
            {
                id: 1,
                moduleName: "JavaScript Fundamentals",
                estimatedTime: "8 hours",
                completed: true,
                description: "Master the core concepts of JavaScript including variables, functions, objects, and control structures.",
                aiRationale: "Recommended because your JavaScript basics score was 45%. This will strengthen your foundation.",
                difficulty: "Beginner",
                prerequisites: [],
                learningObjectives: ["Variables and data types", "Functions and scope", "DOM manipulation"]
            },
            {
                id: 2,
                moduleName: "React Components & Props",
                estimatedTime: "12 hours",
                completed: false,
                description: "Learn to build reusable React components and manage data flow with props and state.",
                aiRationale: "Based on your React score of 30%, this module will help you understand component architecture.",
                difficulty: "Intermediate",
                prerequisites: ["JavaScript Fundamentals"],
                learningObjectives: ["Component creation", "Props and state", "Event handling"]
            },
            {
                id: 3,
                moduleName: "State Management with Redux",
                estimatedTime: "15 hours",
                completed: false,
                description: "Master centralized state management using Redux for complex React applications.",
                aiRationale: "Your state management assessment showed gaps. Redux will help you manage complex application state.",
                difficulty: "Advanced",
                prerequisites: ["React Components & Props"],
                learningObjectives: ["Redux store setup", "Actions and reducers", "Middleware integration"]
            },
            {
                id: 4,
                moduleName: "API Integration & Async Operations",
                estimatedTime: "10 hours",
                completed: false,
                description: "Learn to integrate external APIs and handle asynchronous operations effectively.",
                aiRationale: "Your async programming score was 25%. This module will improve your API handling skills.",
                difficulty: "Intermediate",
                prerequisites: ["JavaScript Fundamentals"],
                learningObjectives: ["Fetch API", "Promise handling", "Error management"]
            },
            {
                id: 5,
                moduleName: "Testing React Applications",
                estimatedTime: "8 hours",
                completed: false,
                description: "Write comprehensive tests for React components using Jest and React Testing Library.",
                aiRationale: "Testing wasn't covered in your assessment. This essential skill will improve code quality.",
                difficulty: "Intermediate",
                prerequisites: ["React Components & Props"],
                learningObjectives: ["Unit testing", "Component testing", "Integration testing"]
            }
        ];
    }

    renderLearningPathTable() {
        return `
            <div class="overflow-hidden border border-gray-200 rounded-lg">
                <table class="min-w-full divide-y divide-gray-200 learning-path-table">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Module Name
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Estimated Time
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Completion Status
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        ${this.learningPathData.map((module, index) => this.renderTableRow(module, index)).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    loadLearningPathData() {
        // Mock JSON data for learning path modules
        return [
            {
                id: 1,
                moduleName: "JavaScript Fundamentals",
                estimatedTime: "8 hours",
                completionStatus: "completed",
                description: "Master the building blocks of JavaScript including variables, functions, and control structures.",
                aiRationale: "Because your initial assessment showed strong logical thinking but limited JavaScript syntax knowledge.",
                prerequisites: [],
                completedDate: "2024-08-01"
            },
            {
                id: 2,
                moduleName: "DOM Manipulation",
                estimatedTime: "6 hours",
                completionStatus: "completed",
                description: "Learn to interact with web pages dynamically using JavaScript DOM methods.",
                aiRationale: "Essential foundation before moving to React, based on your frontend development goals.",
                prerequisites: ["JavaScript Fundamentals"],
                completedDate: "2024-08-03"
            },
            {
                id: 3,
                moduleName: "React Basics",
                estimatedTime: "12 hours",
                completionStatus: "in-progress",
                description: "Build interactive user interfaces with React components, props, and state management.",
                aiRationale: "Because your React assessment score was 50% and this is crucial for your career goals.",
                prerequisites: ["JavaScript Fundamentals", "DOM Manipulation"],
                progress: 65
            },
            {
                id: 4,
                moduleName: "State Management",
                estimatedTime: "10 hours",
                completionStatus: "locked",
                description: "Advanced state management patterns using Context API and Redux for complex applications.",
                aiRationale: "Your project portfolio will greatly benefit from understanding professional state management.",
                prerequisites: ["React Basics"]
            },
            {
                id: 5,
                moduleName: "Testing & Debugging",
                estimatedTime: "8 hours",
                completionStatus: "locked",
                description: "Write robust tests and debug React applications effectively using modern testing frameworks.",
                aiRationale: "Critical skill gap identified in your assessment - employers highly value testing skills.",
                prerequisites: ["React Basics"]
            },
            {
                id: 6,
                moduleName: "Backend Integration",
                estimatedTime: "15 hours",
                completionStatus: "locked",
                description: "Connect your React applications to APIs and handle asynchronous data operations.",
                aiRationale: "Based on your goal to become a full-stack developer, this bridges frontend and backend skills.",
                prerequisites: ["React Basics", "State Management"]
            }
        ];
    }

    renderLearningPath() {
        return `
            <div class="learning-path-container">
                <div class="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div class="flex items-center justify-between">
                        <div>
                            <h4 class="text-lg font-medium text-blue-900">Personalized Learning Journey</h4>
                            <p class="text-sm text-blue-700">AI-curated path based on your assessment and goals</p>
                        </div>
                        <div class="text-right">
                            <div class="text-2xl font-bold text-blue-900">${this.calculateOverallProgress()}%</div>
                            <div class="text-sm text-blue-700">Overall Progress</div>
                        </div>
                    </div>
                    <div class="mt-3">
                        <div class="w-full bg-blue-200 rounded-full h-2">
                            <div class="bg-blue-600 h-2 rounded-full transition-all duration-500" style="width: ${this.calculateOverallProgress()}%"></div>
                        </div>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200 learning-path-table">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Module Name
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estimated Time
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Completion Status
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            ${this.learningPath.map(module => this.renderModuleRow(module)).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    renderModuleRow(module) {
        const isExpanded = this.expandedRows.has(module.id);
        const statusClass = this.getStatusClass(module.completionStatus);
        const canStart = this.canStartModule(module);
        
        return `
            <tr class="${statusClass.rowClass} hover:bg-gray-50 transition-colors cursor-pointer" 
                onclick="app.modules.learning.toggleModuleExpansion(${module.id})">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-8 w-8">
                            <div class="h-8 w-8 rounded-full ${statusClass.iconBg} flex items-center justify-center">
                                <i data-feather="${statusClass.icon}" class="h-4 w-4 ${statusClass.iconColor}"></i>
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${module.moduleName}</div>
                            ${module.prerequisites.length > 0 ? `
                                <div class="text-xs text-gray-500">Requires: ${module.prerequisites.join(', ')}</div>
                            ` : ''}
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${module.estimatedTime}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass.badgeClass}">
                        ${this.formatStatus(module.completionStatus)}
                    </span>
                    ${module.completionStatus === 'in-progress' ? `
                        <div class="mt-1">
                            <div class="w-24 bg-gray-200 rounded-full h-1.5">
                                <div class="bg-blue-600 h-1.5 rounded-full" style="width: ${module.progress}%"></div>
                            </div>
                            <div class="text-xs text-gray-500 mt-1">${module.progress}% complete</div>
                        </div>
                    ` : ''}
                    ${module.completedDate ? `
                        <div class="text-xs text-gray-500 mt-1">Completed: ${App.formatDate(module.completedDate)}</div>
                    ` : ''}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="text-gray-400 hover:text-gray-600 transition-colors" 
                            onclick="event.stopPropagation(); app.modules.learning.toggleModuleExpansion(${module.id})">
                        <i data-feather="${isExpanded ? 'chevron-up' : 'chevron-down'}" class="h-4 w-4"></i>
                    </button>
                </td>
            </tr>
            ${isExpanded ? this.renderExpandedContent(module, canStart) : ''}
        `;
    }

    renderExpandedContent(module, canStart) {
        return `
            <tr class="bg-gray-50">
                <td colspan="4" class="px-6 py-4">
                    <div class="space-y-4">
                        <div>
                            <h4 class="text-sm font-medium text-gray-900 mb-2">Description</h4>
                            <p class="text-sm text-gray-700">${module.description}</p>
                        </div>
                        
                        <div>
                            <h4 class="text-sm font-medium text-gray-900 mb-2">AI Recommendation</h4>
                            <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                <div class="flex items-start">
                                    <i data-feather="brain" class="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0"></i>
                                    <p class="text-sm text-blue-800">${module.aiRationale}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex items-center space-x-3">
                            ${canStart ? `
                                <button onclick="event.stopPropagation(); app.modules.learning.startModule(${module.id})" 
                                        class="btn-primary text-sm px-4 py-2">
                                    <i data-feather="play" class="h-4 w-4 mr-1 inline"></i>
                                    ${module.completionStatus === 'in-progress' ? 'Continue Learning' : 'Start Learning'}
                                </button>
                            ` : `
                                <button disabled class="btn-secondary opacity-50 cursor-not-allowed text-sm px-4 py-2">
                                    <i data-feather="lock" class="h-4 w-4 mr-1 inline"></i>
                                    Locked
                                </button>
                            `}
                            
                            ${module.completionStatus === 'completed' ? `
                                <button onclick="event.stopPropagation(); app.modules.learning.reviewModule(${module.id})" 
                                        class="btn-secondary text-sm px-4 py-2">
                                    <i data-feather="refresh-cw" class="h-4 w-4 mr-1 inline"></i>
                                    Review
                                </button>
                            ` : ''}
                            
                            <button onclick="event.stopPropagation(); app.modules.learning.bookmarkModule(${module.id})" 
                                    class="text-gray-600 hover:text-gray-800 text-sm">
                                <i data-feather="bookmark" class="h-4 w-4 mr-1 inline"></i>
                                Bookmark
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        `;
    }

    getStatusClass(status) {
        const classes = {
            'completed': {
                rowClass: 'bg-green-50',
                iconBg: 'bg-green-100',
                iconColor: 'text-green-600',
                icon: 'check-circle',
                badgeClass: 'bg-green-100 text-green-800'
            },
            'in-progress': {
                rowClass: '',
                iconBg: 'bg-blue-100',
                iconColor: 'text-blue-600',
                icon: 'clock',
                badgeClass: 'bg-blue-100 text-blue-800'
            },
            'locked': {
                rowClass: 'opacity-60',
                iconBg: 'bg-gray-100',
                iconColor: 'text-gray-400',
                icon: 'lock',
                badgeClass: 'bg-gray-100 text-gray-800'
            }
        };
        return classes[status] || classes['locked'];
    }

    formatStatus(status) {
        const formats = {
            'completed': 'Completed',
            'in-progress': 'In Progress',
            'locked': 'Locked'
        };
        return formats[status] || 'Unknown';
    }

    canStartModule(module) {
        if (module.completionStatus === 'completed') return true;
        if (module.completionStatus === 'in-progress') return true;
        
        // Check if all prerequisites are completed
        return module.prerequisites.every(prereq => {
            const prereqModule = this.learningPath.find(m => m.moduleName === prereq);
            return prereqModule && prereqModule.completionStatus === 'completed';
        });
    }

    calculateOverallProgress() {
        const totalModules = this.learningPath.length;
        const completedModules = this.learningPath.filter(m => m.completionStatus === 'completed').length;
        const inProgressModules = this.learningPath.filter(m => m.completionStatus === 'in-progress');
        
        let progressPoints = completedModules * 100;
        inProgressModules.forEach(module => {
            progressPoints += (module.progress || 0);
        });
        
        return Math.round(progressPoints / totalModules);
    }

    toggleModuleExpansion(moduleId) {
        if (this.expandedRows.has(moduleId)) {
            this.expandedRows.delete(moduleId);
        } else {
            this.expandedRows.add(moduleId);
        }
        
        // Re-render the learning path section
        const container = document.querySelector('.learning-path-container');
        if (container) {
            container.innerHTML = this.renderLearningPath().match(/<div class="learning-path-container"[\s\S]*<\/div>$/)[0].replace('<div class="learning-path-container">', '').replace(/<\/div>$/, '');
            feather.replace();
        }
    }

    startModule(moduleId) {
        const module = this.learningPath.find(m => m.id === moduleId);
        if (module) {
            app.showNotification(`Starting "${module.moduleName}". Opening learning content...`, 'success');
            // In a real app, this would navigate to the module content
        }
    }

    reviewModule(moduleId) {
        const module = this.learningPath.find(m => m.id === moduleId);
        if (module) {
            app.showNotification(`Opening review for "${module.moduleName}"...`, 'info');
        }
    }

    bookmarkModule(moduleId) {
        const module = this.learningPath.find(m => m.id === moduleId);
        if (module) {
            app.showNotification(`"${module.moduleName}" added to bookmarks!`, 'success');
        }
    }
    renderTableRow(module, index) {
        const isExpanded = this.expandedRows.has(module.id);
        const isCompleted = module.completed;
        
        return `
            <tr class="hover:bg-gray-50 transition-colors duration-150 ${isCompleted ? 'completed' : ''}" 
                id="row-${module.id}">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <button onclick="app.modules.learning.toggleExpanded(${module.id})" 
                                class="mr-3 p-1 hover:bg-gray-100 rounded transition-colors">
                            <i data-feather="${isExpanded ? 'chevron-down' : 'chevron-right'}" 
                               class="w-4 h-4 text-gray-500 transition-transform duration-200"></i>
                        </button>
                        <div>
                            <div class="text-sm font-medium ${isCompleted ? 'text-green-800' : 'text-gray-900'}">
                                ${module.moduleName}
                            </div>
                            <div class="text-sm text-gray-500">${module.difficulty}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${module.estimatedTime}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        isCompleted 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                    }">
                        <i data-feather="${isCompleted ? 'check-circle' : 'clock'}" 
                           class="w-3 h-3 mr-1"></i>
                        ${isCompleted ? 'Completed' : 'Not Started'}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    ${isCompleted 
                        ? `<span class="text-green-600 flex items-center">
                             <i data-feather="check" class="w-4 h-4 mr-1"></i>
                             Completed
                           </span>`
                        : `<button onclick="app.modules.learning.startModule(${module.id})" 
                                  class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                             <i data-feather="play" class="w-3 h-3 mr-1"></i>
                             Start Learning
                           </button>`
                    }
                </td>
            </tr>
            ${isExpanded ? this.renderExpandedRow(module) : ''}
        `;
    }

    renderExpandedRow(module) {
        return `
            <tr class="bg-gray-25 border-t-0" id="expanded-${module.id}">
                <td colspan="4" class="px-6 py-4">
                    <div class="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                        <!-- Description -->
                        <div>
                            <h4 class="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                                <i data-feather="info" class="w-4 h-4 mr-2"></i>
                                Description
                            </h4>
                            <p class="text-sm text-gray-700">${module.description}</p>
                        </div>

                        <!-- AI Rationale -->
                        <div>
                            <h4 class="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                                <i data-feather="zap" class="w-4 h-4 mr-2 text-purple-500"></i>
                                AI Recommendation
                            </h4>
                            <div class="bg-purple-50 border border-purple-200 rounded-lg p-3">
                                <p class="text-sm text-purple-700">${module.aiRationale}</p>
                            </div>
                        </div>

                        <!-- Learning Objectives -->
                        <div>
                            <h4 class="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                                <i data-feather="target" class="w-4 h-4 mr-2"></i>
                                Learning Objectives
                            </h4>
                            <ul class="text-sm text-gray-700 space-y-1">
                                ${module.learningObjectives.map(objective => 
                                    `<li class="flex items-center">
                                        <i data-feather="chevron-right" class="w-3 h-3 mr-2 text-gray-400"></i>
                                        ${objective}
                                    </li>`
                                ).join('')}
                            </ul>
                        </div>

                        <!-- Prerequisites -->
                        ${module.prerequisites.length > 0 ? `
                            <div>
                                <h4 class="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                                    <i data-feather="layers" class="w-4 h-4 mr-2"></i>
                                    Prerequisites
                                </h4>
                                <div class="flex flex-wrap gap-2">
                                    ${module.prerequisites.map(prereq => 
                                        `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            ${prereq}
                                        </span>`
                                    ).join('')}
                                </div>
                            </div>
                        ` : ''}

                        <!-- Action Buttons -->
                        <div class="flex items-center space-x-3 pt-2 border-t border-gray-200">
                            ${!module.completed ? `
                                <button onclick="app.modules.learning.startModule(${module.id})" 
                                        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                                    <i data-feather="play" class="w-4 h-4 mr-2"></i>
                                    Start Learning
                                </button>
                                <button onclick="app.modules.learning.previewModule(${module.id})" 
                                        class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                                    <i data-feather="eye" class="w-4 h-4 mr-2"></i>
                                    Preview
                                </button>
                            ` : `
                                <button onclick="app.modules.learning.reviewModule(${module.id})" 
                                        class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                                    <i data-feather="refresh-cw" class="w-4 h-4 mr-2"></i>
                                    Review Module
                                </button>
                            `}
                            <button onclick="app.modules.learning.bookmarkModule(${module.id})" 
                                    class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                                <i data-feather="bookmark" class="w-4 h-4 mr-2"></i>
                                Bookmark
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        `;
    }

    toggleExpanded(moduleId) {
        if (this.expandedRows.has(moduleId)) {
            this.expandedRows.delete(moduleId);
        } else {
            this.expandedRows.add(moduleId);
        }
        
        // Re-render the specific module row
        this.updateModuleRow(moduleId);
    }

    updateModuleRow(moduleId) {
        const module = this.learningPathData.find(m => m.id === moduleId);
        const rowIndex = this.learningPathData.findIndex(m => m.id === moduleId);
        
        if (module) {
            const currentRow = document.getElementById(`row-${moduleId}`);
            const expandedRow = document.getElementById(`expanded-${moduleId}`);
            
            // Update the main row
            if (currentRow) {
                const newRowHTML = this.renderTableRow(module, rowIndex);
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = newRowHTML;
                const newRows = tempDiv.querySelectorAll('tr');
                
                // Replace current row
                currentRow.outerHTML = newRows[0].outerHTML;
                
                // Handle expanded row
                if (newRows.length > 1) {
                    // Insert expanded row after the main row
                    const updatedMainRow = document.getElementById(`row-${moduleId}`);
                    updatedMainRow.insertAdjacentHTML('afterend', newRows[1].outerHTML);
                } else if (expandedRow) {
                    // Remove expanded row if it exists
                    expandedRow.remove();
                }
                
                // Re-initialize feather icons
                feather.replace();
            }
        }
    }

    startModule(moduleId) {
        const module = this.learningPathData.find(m => m.id === moduleId);
        if (module) {
            app.showNotification(`Starting "${module.moduleName}". Loading course content...`, 'success');
            // In a real application, this would navigate to the module content
        }
    }

    previewModule(moduleId) {
        const module = this.learningPathData.find(m => m.id === moduleId);
        if (module) {
            app.showNotification(`Loading preview for "${module.moduleName}"...`, 'info');
            // In a real application, this would show a preview modal or page
        }
    }

    reviewModule(moduleId) {
        const module = this.learningPathData.find(m => m.id === moduleId);
        if (module) {
            app.showNotification(`Opening review for "${module.moduleName}"...`, 'info');
            // In a real application, this would open the module for review
        }
    }

    bookmarkModule(moduleId) {
        const module = this.learningPathData.find(m => m.id === moduleId);
        if (module) {
            app.showNotification(`"${module.moduleName}" added to bookmarks!`, 'success');
            // In a real application, this would save to user's bookmarks
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Learning;
}
