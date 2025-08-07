// Dashboard module
class Dashboard {
    constructor() {
        this.data = {
            stats: {
                coursesCompleted: 0,
                totalPoints: 0,
                currentStreak: 0,
                weeklyGoal: 0
            },
            recentActivity: [],
            upcomingDeadlines: []
        };
    }

    render() {
        return `
            <div class="space-y-6">
                <!-- Stats Overview -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    ${this.renderStatsCards()}
                </div>

                <!-- Quick Actions -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 class="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        ${this.renderQuickActions()}
                    </div>
                </div>

                <!-- Recent Activity & Upcoming Deadlines -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 class="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
                        ${this.renderRecentActivity()}
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 class="text-xl font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
                        ${this.renderUpcomingDeadlines()}
                    </div>
                </div>

                <!-- Learning Progress -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 class="text-xl font-semibold text-gray-900 mb-4">Learning Progress</h2>
                    ${this.renderLearningProgress()}
                </div>
            </div>
        `;
    }

    renderStatsCards() {
        const stats = [
            {
                title: 'Courses Completed',
                value: this.data.stats.coursesCompleted,
                icon: 'book',
                color: 'blue',
                trend: '+12%'
            },
            {
                title: 'Total Points',
                value: this.data.stats.totalPoints,
                icon: 'star',
                color: 'yellow',
                trend: '+8%'
            },
            {
                title: 'Current Streak',
                value: `${this.data.stats.currentStreak} days`,
                icon: 'zap',
                color: 'orange',
                trend: '+2 days'
            },
            {
                title: 'Weekly Goal',
                value: `${this.data.stats.weeklyGoal}%`,
                icon: 'target',
                color: 'green',
                trend: '+15%'
            }
        ];

        return stats.map(stat => `
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600">${stat.title}</p>
                        <p class="text-2xl font-bold text-gray-900 mt-1">${stat.value}</p>
                    </div>
                    <div class="w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center">
                        <i data-feather="${stat.icon}" class="w-6 h-6 text-${stat.color}-600"></i>
                    </div>
                </div>
                <div class="mt-4 flex items-center">
                    <span class="text-sm font-medium text-green-600">${stat.trend}</span>
                    <span class="text-sm text-gray-500 ml-1">from last week</span>
                </div>
            </div>
        `).join('');
    }

    renderQuickActions() {
        const actions = [
            {
                title: 'Start New Course',
                description: 'Browse available courses',
                icon: 'play-circle',
                action: 'learning'
            },
            {
                title: 'Take Assessment',
                description: 'Test your knowledge',
                icon: 'clipboard',
                action: 'assessment'
            },
            {
                title: 'Join Hackathon',
                description: 'Participate in challenges',
                icon: 'code',
                action: 'hackathon'
            }
        ];

        return actions.map(action => `
            <button onclick="app.loadSection('${action.action}')" 
                    class="text-left p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200">
                        <i data-feather="${action.icon}" class="w-5 h-5 text-blue-600"></i>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-sm font-medium text-gray-900">${action.title}</h3>
                        <p class="text-sm text-gray-500">${action.description}</p>
                    </div>
                </div>
            </button>
        `).join('');
    }

    renderRecentActivity() {
        if (this.data.recentActivity.length === 0) {
            return `
                <div class="text-center py-8">
                    <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <i data-feather="activity" class="w-6 h-6 text-gray-400"></i>
                    </div>
                    <p class="text-gray-500">No recent activity</p>
                    <p class="text-sm text-gray-400">Start learning to see your activity here</p>
                </div>
            `;
        }

        return `
            <div class="space-y-4">
                ${this.data.recentActivity.map(activity => `
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <i data-feather="${activity.icon}" class="w-4 h-4 text-blue-600"></i>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-900">${activity.title}</p>
                            <p class="text-sm text-gray-500">${activity.time}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderUpcomingDeadlines() {
        if (this.data.upcomingDeadlines.length === 0) {
            return `
                <div class="text-center py-8">
                    <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <i data-feather="calendar" class="w-6 h-6 text-gray-400"></i>
                    </div>
                    <p class="text-gray-500">No upcoming deadlines</p>
                    <p class="text-sm text-gray-400">You're all caught up!</p>
                </div>
            `;
        }

        return `
            <div class="space-y-4">
                ${this.data.upcomingDeadlines.map(deadline => `
                    <div class="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                        <div>
                            <p class="text-sm font-medium text-gray-900">${deadline.title}</p>
                            <p class="text-sm text-gray-500">${deadline.course}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-sm font-medium text-red-600">${deadline.daysLeft} days</p>
                            <p class="text-xs text-gray-500">${deadline.date}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderLearningProgress() {
        return `
            <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="text-center">
                        <div class="relative w-20 h-20 mx-auto mb-3">
                            <svg class="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="16" stroke="currentColor" stroke-width="2" 
                                        fill="none" class="text-gray-200"></circle>
                                <circle cx="18" cy="18" r="16" stroke="currentColor" stroke-width="2" 
                                        fill="none" stroke-dasharray="75 100" class="text-blue-600"></circle>
                            </svg>
                            <div class="absolute inset-0 flex items-center justify-center">
                                <span class="text-sm font-medium text-gray-900">75%</span>
                            </div>
                        </div>
                        <p class="text-sm font-medium text-gray-900">Overall Progress</p>
                        <p class="text-xs text-gray-500">3 of 4 courses</p>
                    </div>
                    
                    <div class="text-center">
                        <div class="relative w-20 h-20 mx-auto mb-3">
                            <svg class="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="16" stroke="currentColor" stroke-width="2" 
                                        fill="none" class="text-gray-200"></circle>
                                <circle cx="18" cy="18" r="16" stroke="currentColor" stroke-width="2" 
                                        fill="none" stroke-dasharray="90 100" class="text-green-600"></circle>
                            </svg>
                            <div class="absolute inset-0 flex items-center justify-center">
                                <span class="text-sm font-medium text-gray-900">90%</span>
                            </div>
                        </div>
                        <p class="text-sm font-medium text-gray-900">This Week</p>
                        <p class="text-xs text-gray-500">9 of 10 hours</p>
                    </div>
                    
                    <div class="text-center">
                        <div class="relative w-20 h-20 mx-auto mb-3">
                            <svg class="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="16" stroke="currentColor" stroke-width="2" 
                                        fill="none" class="text-gray-200"></circle>
                                <circle cx="18" cy="18" r="16" stroke="currentColor" stroke-width="2" 
                                        fill="none" stroke-dasharray="60 100" class="text-purple-600"></circle>
                            </svg>
                            <div class="absolute inset-0 flex items-center justify-center">
                                <span class="text-sm font-medium text-gray-900">60%</span>
                            </div>
                        </div>
                        <p class="text-sm font-medium text-gray-900">Assignments</p>
                        <p class="text-xs text-gray-500">6 of 10 complete</p>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        // Initialize any dashboard-specific functionality
        feather.replace();
        this.loadDashboardData();
    }

    loadDashboardData() {
        // Simulate loading real data
        // In a real application, this would fetch from an API
        setTimeout(() => {
            this.data.stats = {
                coursesCompleted: 12,
                totalPoints: 2450,
                currentStreak: 7,
                weeklyGoal: 85
            };

            // Update the rendered content if needed
            // This is where you would update specific elements rather than re-rendering
        }, 500);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Dashboard;
}
