// Progress tracking module
class Progress {
    constructor() {
        this.progressData = {
            overall: 0,
            courses: [],
            skills: [],
            achievements: [],
            weeklyStats: []
        };
    }

    render() {
        return `
            <div class="space-y-6">
                <!-- Progress Overview -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <h2 class="text-2xl font-bold text-gray-900">Learning Progress</h2>
                            <p class="text-gray-600 mt-1">Track your learning journey and achievements</p>
                        </div>
                        <div class="flex space-x-3">
                            <button class="btn-secondary">
                                <i data-feather="download" class="w-4 h-4 mr-2 inline"></i>
                                Export Report
                            </button>
                            <button onclick="app.loadSection('learning')" class="btn-primary">
                                <i data-feather="play-circle" class="w-4 h-4 mr-2 inline"></i>
                                Continue Learning
                            </button>
                        </div>
                    </div>
                    ${this.renderOverallProgress()}
                </div>

                <!-- Course Progress -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">Course Progress</h3>
                    ${this.renderCourseProgress()}
                </div>

                <!-- Skills & Achievements -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 class="text-xl font-semibold text-gray-900 mb-4">Skills Development</h3>
                        ${this.renderSkillsProgress()}
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 class="text-xl font-semibold text-gray-900 mb-4">Recent Achievements</h3>
                        ${this.renderAchievements()}
                    </div>
                </div>

                <!-- Weekly Activity -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">Weekly Activity</h3>
                    ${this.renderWeeklyActivity()}
                </div>

                <!-- Learning Streaks -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">Learning Streaks</h3>
                    ${this.renderLearningStreaks()}
                </div>
            </div>
        `;
    }

    renderOverallProgress() {
        return `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Overall Progress Circle -->
                <div class="text-center">
                    <div class="relative w-32 h-32 mx-auto mb-4">
                        <svg class="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="16" stroke="currentColor" stroke-width="2" 
                                    fill="none" class="text-gray-200"></circle>
                            <circle cx="18" cy="18" r="16" stroke="currentColor" stroke-width="2" 
                                    fill="none" stroke-dasharray="72 100" class="text-blue-600"></circle>
                        </svg>
                        <div class="absolute inset-0 flex items-center justify-center">
                            <span class="text-2xl font-bold text-gray-900">72%</span>
                        </div>
                    </div>
                    <h4 class="text-lg font-semibold text-gray-900">Overall Progress</h4>
                    <p class="text-sm text-gray-600">18 of 25 modules completed</p>
                </div>

                <!-- Stats Grid -->
                <div class="col-span-2 grid grid-cols-2 gap-4">
                    <div class="text-center p-4 bg-blue-50 rounded-lg">
                        <div class="text-2xl font-bold text-blue-600">156</div>
                        <div class="text-sm text-gray-600">Hours Learned</div>
                    </div>
                    <div class="text-center p-4 bg-green-50 rounded-lg">
                        <div class="text-2xl font-bold text-green-600">23</div>
                        <div class="text-sm text-gray-600">Certificates Earned</div>
                    </div>
                    <div class="text-center p-4 bg-purple-50 rounded-lg">
                        <div class="text-2xl font-bold text-purple-600">7</div>
                        <div class="text-sm text-gray-600">Current Streak</div>
                    </div>
                    <div class="text-center p-4 bg-orange-50 rounded-lg">
                        <div class="text-2xl font-bold text-orange-600">4.8</div>
                        <div class="text-sm text-gray-600">Average Score</div>
                    </div>
                </div>
            </div>
        `;
    }

    renderCourseProgress() {
        const courses = [
            {
                name: 'JavaScript Fundamentals',
                progress: 92,
                completed: 23,
                total: 25,
                status: 'In Progress'
            },
            {
                name: 'React Development',
                progress: 78,
                completed: 18,
                total: 23,
                status: 'In Progress'
            },
            {
                name: 'Node.js Backend',
                progress: 100,
                completed: 20,
                total: 20,
                status: 'Completed'
            },
            {
                name: 'Database Design',
                progress: 45,
                completed: 9,
                total: 20,
                status: 'In Progress'
            },
            {
                name: 'DevOps Fundamentals',
                progress: 15,
                completed: 3,
                total: 20,
                status: 'Started'
            }
        ];

        return `
            <div class="space-y-4">
                ${courses.map(course => `
                    <div class="border border-gray-200 rounded-lg p-4">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="text-lg font-medium text-gray-900">${course.name}</h4>
                            <span class="px-2 py-1 text-xs font-medium rounded-full ${this.getStatusColor(course.status)}">
                                ${course.status}
                            </span>
                        </div>
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-sm text-gray-600">${course.completed} of ${course.total} lessons completed</span>
                            <span class="text-sm font-medium text-gray-900">${course.progress}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                                 style="width: ${course.progress}%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderSkillsProgress() {
        const skills = [
            { name: 'JavaScript', level: 85, category: 'Programming' },
            { name: 'React', level: 78, category: 'Frontend' },
            { name: 'Node.js', level: 72, category: 'Backend' },
            { name: 'SQL', level: 68, category: 'Database' },
            { name: 'Git', level: 90, category: 'Tools' }
        ];

        return `
            <div class="space-y-4">
                ${skills.map(skill => `
                    <div class="flex items-center justify-between">
                        <div class="flex-1">
                            <div class="flex items-center justify-between mb-1">
                                <span class="text-sm font-medium text-gray-900">${skill.name}</span>
                                <span class="text-sm text-gray-600">${skill.level}%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" 
                                     style="width: ${skill.level}%"></div>
                            </div>
                            <span class="text-xs text-gray-500 mt-1">${skill.category}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderAchievements() {
        const achievements = [
            {
                title: 'JavaScript Master',
                description: 'Completed JavaScript Fundamentals',
                date: '2024-08-05',
                icon: 'award',
                color: 'yellow'
            },
            {
                title: '7-Day Streak',
                description: 'Learned for 7 consecutive days',
                date: '2024-08-04',
                icon: 'zap',
                color: 'orange'
            },
            {
                title: 'First Assessment',
                description: 'Completed your first assessment',
                date: '2024-08-02',
                icon: 'check-circle',
                color: 'green'
            }
        ];

        return `
            <div class="space-y-4">
                ${achievements.map(achievement => `
                    <div class="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                        <div class="w-10 h-10 bg-${achievement.color}-100 rounded-full flex items-center justify-center">
                            <i data-feather="${achievement.icon}" class="w-5 h-5 text-${achievement.color}-600"></i>
                        </div>
                        <div class="flex-1">
                            <h4 class="text-sm font-medium text-gray-900">${achievement.title}</h4>
                            <p class="text-sm text-gray-600">${achievement.description}</p>
                            <p class="text-xs text-gray-500">${App.formatDate(achievement.date)}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderWeeklyActivity() {
        const weekData = [
            { day: 'Mon', hours: 2.5, completed: true },
            { day: 'Tue', hours: 1.8, completed: true },
            { day: 'Wed', hours: 3.2, completed: true },
            { day: 'Thu', hours: 2.1, completed: true },
            { day: 'Fri', hours: 1.5, completed: true },
            { day: 'Sat', hours: 4.0, completed: true },
            { day: 'Sun', hours: 0.8, completed: false }
        ];

        const maxHours = Math.max(...weekData.map(d => d.hours));

        return `
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600">This week: <span class="font-medium">16.9 hours</span></p>
                        <p class="text-sm text-gray-600">Goal: <span class="font-medium">15 hours</span></p>
                    </div>
                    <div class="text-green-600 text-sm font-medium">
                        <i data-feather="trending-up" class="w-4 h-4 inline mr-1"></i>
                        Goal exceeded!
                    </div>
                </div>
                
                <div class="flex items-end justify-between space-x-2 h-32">
                    ${weekData.map(day => `
                        <div class="flex-1 flex flex-col items-center">
                            <div class="w-full bg-gray-200 rounded-t flex flex-col justify-end" 
                                 style="height: 100px;">
                                <div class="w-full bg-blue-600 rounded-t transition-all duration-300" 
                                     style="height: ${(day.hours / maxHours) * 80}px;"></div>
                            </div>
                            <div class="mt-2 text-xs text-center">
                                <div class="font-medium text-gray-900">${day.day}</div>
                                <div class="text-gray-600">${day.hours}h</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderLearningStreaks() {
        return `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="text-center p-6 bg-orange-50 rounded-lg">
                    <div class="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i data-feather="zap" class="w-6 h-6 text-white"></i>
                    </div>
                    <div class="text-2xl font-bold text-orange-600">7</div>
                    <div class="text-sm text-gray-600">Current Streak</div>
                    <div class="text-xs text-gray-500 mt-1">Keep it up!</div>
                </div>
                
                <div class="text-center p-6 bg-purple-50 rounded-lg">
                    <div class="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i data-feather="star" class="w-6 h-6 text-white"></i>
                    </div>
                    <div class="text-2xl font-bold text-purple-600">21</div>
                    <div class="text-sm text-gray-600">Longest Streak</div>
                    <div class="text-xs text-gray-500 mt-1">Personal best</div>
                </div>
                
                <div class="text-center p-6 bg-green-50 rounded-lg">
                    <div class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i data-feather="calendar" class="w-6 h-6 text-white"></i>
                    </div>
                    <div class="text-2xl font-bold text-green-600">156</div>
                    <div class="text-sm text-gray-600">Total Days</div>
                    <div class="text-xs text-gray-500 mt-1">Since joining</div>
                </div>
            </div>
        `;
    }

    getStatusColor(status) {
        const colors = {
            'Completed': 'bg-green-100 text-green-800',
            'In Progress': 'bg-blue-100 text-blue-800',
            'Started': 'bg-yellow-100 text-yellow-800',
            'Not Started': 'bg-gray-100 text-gray-800'
        };
        return colors[status] || colors['Not Started'];
    }

    init() {
        feather.replace();
        this.loadProgressData();
    }

    loadProgressData() {
        // Load user's progress data
        // In a real application, this would fetch from an API
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Progress;
}
