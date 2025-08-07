// Leaderboard module
class Leaderboard {
    constructor() {
        this.currentView = 'overall';
        this.timeframe = 'monthly';
        this.leaderboardData = {
            overall: [],
            courses: [],
            hackathons: [],
            weekly: [],
            monthly: [],
            allTime: []
        };
        this.userRank = null;
        this.badges = [];
        this.userBadges = [];
        this.loadBadgeData();
    }

    render() {
        return `
            <div class="space-y-6">
                <!-- Leaderboard Header -->
                <div class="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg shadow-lg text-white p-8">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 class="text-3xl font-bold mb-2">🏆 Leaderboard</h2>
                            <p class="text-yellow-100 text-lg">Compete with learners worldwide and climb the ranks</p>
                        </div>
                        <div class="mt-4 md:mt-0 flex space-x-3">
                            <button onclick="app.modules.leaderboard.shareAchievement()" class="bg-white text-orange-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                                <i data-feather="share-2" class="w-4 h-4 mr-2 inline"></i>
                                Share Achievement
                            </button>
                            <button onclick="app.loadSection('progress')" class="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                                <i data-feather="trending-up" class="w-4 h-4 mr-2 inline"></i>
                                My Progress
                            </button>
                        </div>
                    </div>
                </div>

                <!-- My Rank Card -->
                ${this.renderMyRankCard()}

                <!-- Leaderboard Navigation -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="border-b border-gray-200">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between p-6">
                            <nav class="flex space-x-8">
                                ${this.renderLeaderboardTabs()}
                            </nav>
                            <div class="mt-4 md:mt-0">
                                <select id="timeframe-filter" class="form-input">
                                    <option value="weekly">This Week</option>
                                    <option value="monthly" selected>This Month</option>
                                    <option value="allTime">All Time</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="p-6">
                        ${this.renderLeaderboardContent()}
                    </div>
                </div>

                <!-- Top 5 Users Section -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">🏆 Top 5 Users This Month</h3>
                    ${this.renderTop5Users()}
                </div>

                <!-- Badge Collection -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">🏅 Your Badge Collection</h3>
                    ${this.renderUserBadges()}
                </div>

                <!-- Leaderboard Stats -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    ${this.renderLeaderboardStats()}
                </div>
            </div>
        `;
    }

    renderMyRankCard() {
        return `
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Your Current Standing</h3>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div class="text-center p-4 bg-blue-50 rounded-lg">
                        <div class="text-2xl font-bold text-blue-600">#12</div>
                        <div class="text-sm text-gray-600">Overall Rank</div>
                        <div class="text-xs text-green-600 mt-1">↑ 3 positions</div>
                    </div>
                    <div class="text-center p-4 bg-purple-50 rounded-lg">
                        <div class="text-2xl font-bold text-purple-600">2,450</div>
                        <div class="text-sm text-gray-600">Total Points</div>
                        <div class="text-xs text-green-600 mt-1">+125 this week</div>
                    </div>
                    <div class="text-center p-4 bg-green-50 rounded-lg">
                        <div class="text-2xl font-bold text-green-600">87%</div>
                        <div class="text-sm text-gray-600">Avg Score</div>
                        <div class="text-xs text-gray-600 mt-1">Top 15%</div>
                    </div>
                    <div class="text-center p-4 bg-orange-50 rounded-lg">
                        <div class="text-2xl font-bold text-orange-600">7</div>
                        <div class="text-sm text-gray-600">Day Streak</div>
                        <div class="text-xs text-blue-600 mt-1">Personal best: 21</div>
                    </div>
                </div>
            </div>
        `;
    }

    renderLeaderboardTabs() {
        const tabs = [
            { id: 'overall', label: 'Overall', icon: 'trending-up' },
            { id: 'courses', label: 'Courses', icon: 'book-open' },
            { id: 'hackathons', label: 'Hackathons', icon: 'code' },
            { id: 'streaks', label: 'Streaks', icon: 'zap' }
        ];

        return tabs.map(tab => `
            <button onclick="app.modules.leaderboard.switchView('${tab.id}')"
                    class="leaderboard-tab flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                        this.currentView === tab.id 
                            ? 'border-orange-500 text-orange-600' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }">
                <i data-feather="${tab.icon}" class="w-4 h-4 mr-2"></i>
                ${tab.label}
            </button>
        `).join('');
    }

    renderLeaderboardContent() {
        switch (this.currentView) {
            case 'overall':
                return this.renderOverallLeaderboard();
            case 'courses':
                return this.renderCoursesLeaderboard();
            case 'hackathons':
                return this.renderHackathonsLeaderboard();
            case 'streaks':
                return this.renderStreaksLeaderboard();
            default:
                return this.renderOverallLeaderboard();
        }
    }

    renderOverallLeaderboard() {
        const topUsers = [
            {
                rank: 1,
                name: 'Sarah Chen',
                points: 4850,
                coursesCompleted: 25,
                avgScore: 96,
                streak: 28,
                change: 'same',
                avatar: 'SC'
            },
            {
                rank: 2,
                name: 'Mike Rodriguez',
                points: 4720,
                coursesCompleted: 23,
                avgScore: 94,
                streak: 15,
                change: 'up',
                avatar: 'MR'
            },
            {
                rank: 3,
                name: 'Emily Watson',
                points: 4680,
                coursesCompleted: 22,
                avgScore: 95,
                streak: 12,
                change: 'down',
                avatar: 'EW'
            },
            {
                rank: 4,
                name: 'David Kim',
                points: 4520,
                coursesCompleted: 24,
                avgScore: 91,
                streak: 9,
                change: 'up',
                avatar: 'DK'
            },
            {
                rank: 5,
                name: 'Alex Thompson',
                points: 4350,
                coursesCompleted: 20,
                avgScore: 93,
                streak: 18,
                change: 'same',
                avatar: 'AT'
            }
        ];

        return `
            <div class="space-y-4">
                <!-- Top 3 Podium -->
                <div class="grid grid-cols-3 gap-4 mb-8">
                    ${[1, 0, 2].map(index => {
                        const user = topUsers[index];
                        const heights = ['h-32', 'h-40', 'h-28'];
                        const colors = ['bg-yellow-400', 'bg-yellow-500', 'bg-yellow-300'];
                        return `
                            <div class="text-center">
                                <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                                    ${user.avatar}
                                </div>
                                <h4 class="font-semibold text-gray-900">${user.name}</h4>
                                <p class="text-sm text-gray-600">${user.points.toLocaleString()} points</p>
                                <div class="${heights[index === 0 ? 1 : index === 1 ? 0 : 2]} ${colors[index === 0 ? 1 : index === 1 ? 0 : 2]} rounded-t-lg mt-4 flex items-end justify-center pb-2">
                                    <span class="text-white font-bold text-2xl">${user.rank}</span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>

                <!-- Full Leaderboard Table -->
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rank
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Points
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Courses
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Avg Score
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Streak
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            ${topUsers.map(user => `
                                <tr class="hover:bg-gray-50 ${user.rank <= 3 ? 'bg-yellow-50' : ''}">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <span class="text-lg font-bold text-gray-900">#${user.rank}</span>
                                            ${this.getRankChangeIcon(user.change)}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium mr-3">
                                                ${user.avatar}
                                            </div>
                                            <div>
                                                <div class="text-sm font-medium text-gray-900">${user.name}</div>
                                                ${user.rank <= 3 ? '<div class="text-xs text-yellow-600">🏆 Top Performer</div>' : ''}
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        ${user.points.toLocaleString()}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ${user.coursesCompleted}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ${user.avgScore}%
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <i data-feather="zap" class="w-4 h-4 text-orange-500 mr-1"></i>
                                            <span class="text-sm text-gray-900">${user.streak} days</span>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    renderCoursesLeaderboard() {
        const courseLeaders = [
            { rank: 1, name: 'Jennifer Liu', course: 'JavaScript Fundamentals', score: 98, completionTime: '2.5 hours' },
            { rank: 2, name: 'Carlos Santos', course: 'React Development', score: 96, completionTime: '3.2 hours' },
            { rank: 3, name: 'Priya Patel', course: 'Node.js Backend', score: 95, completionTime: '4.1 hours' },
            { rank: 4, name: 'James Wilson', course: 'Database Design', score: 94, completionTime: '3.8 hours' },
            { rank: 5, name: 'Maria Garcia', course: 'DevOps Fundamentals', score: 93, completionTime: '5.2 hours' }
        ];

        return `
            <div class="space-y-4">
                <div class="text-center mb-6">
                    <h4 class="text-lg font-semibold text-gray-900">Top Course Performers</h4>
                    <p class="text-gray-600">Based on completion scores and time efficiency</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${courseLeaders.map(leader => `
                        <div class="border border-gray-200 rounded-lg p-4 ${leader.rank <= 3 ? 'border-yellow-300 bg-yellow-50' : ''}">
                            <div class="flex items-center justify-between mb-3">
                                <span class="text-lg font-bold text-gray-900">#${leader.rank}</span>
                                ${leader.rank <= 3 ? '<i data-feather="award" class="w-5 h-5 text-yellow-600"></i>' : ''}
                            </div>
                            <h5 class="font-semibold text-gray-900 mb-1">${leader.name}</h5>
                            <p class="text-sm text-gray-600 mb-2">${leader.course}</p>
                            <div class="flex justify-between text-sm">
                                <span class="text-green-600 font-medium">${leader.score}% score</span>
                                <span class="text-blue-600">${leader.completionTime}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderHackathonsLeaderboard() {
        const hackathonLeaders = [
            { rank: 1, name: 'Team CodeCrafters', hackathon: 'AI Innovation Challenge', prize: '$10,000', members: 4 },
            { rank: 2, name: 'Team DevMasters', hackathon: 'Web3 DApp Challenge', prize: '$5,000', members: 3 },
            { rank: 3, name: 'Team InnovatorsX', hackathon: 'Mobile App Innovation', prize: '$7,500', members: 5 },
            { rank: 4, name: 'Team TechTitans', hackathon: 'Climate Tech Solutions', prize: '$3,000', members: 4 },
            { rank: 5, name: 'Team FutureBuild', hackathon: 'Frontend Masters Challenge', prize: '$1,000', members: 2 }
        ];

        return `
            <div class="space-y-4">
                <div class="text-center mb-6">
                    <h4 class="text-lg font-semibold text-gray-900">Hackathon Champions</h4>
                    <p class="text-gray-600">Recent hackathon winners and their achievements</p>
                </div>
                
                <div class="space-y-4">
                    ${hackathonLeaders.map(team => `
                        <div class="border border-gray-200 rounded-lg p-6 hover:border-purple-300 hover:shadow-md transition-all ${team.rank <= 3 ? 'border-purple-300 bg-purple-50' : ''}">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <div class="w-12 h-12 ${team.rank <= 3 ? 'bg-purple-600' : 'bg-gray-600'} rounded-lg flex items-center justify-center text-white font-bold mr-4">
                                        #${team.rank}
                                    </div>
                                    <div>
                                        <h5 class="font-semibold text-gray-900">${team.name}</h5>
                                        <p class="text-sm text-gray-600">${team.hackathon}</p>
                                        <p class="text-xs text-gray-500">${team.members} members</p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <div class="text-lg font-bold text-green-600">${team.prize}</div>
                                    ${team.rank <= 3 ? '<i data-feather="trophy" class="w-5 h-5 text-yellow-600 mx-auto"></i>' : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderStreaksLeaderboard() {
        const streakLeaders = [
            { rank: 1, name: 'Maya Johnson', currentStreak: 45, longestStreak: 67, totalDays: 312 },
            { rank: 2, name: 'Ryan O\'Connor', currentStreak: 38, longestStreak: 45, totalDays: 289 },
            { rank: 3, name: 'Zoe Chang', currentStreak: 32, longestStreak: 52, totalDays: 276 },
            { rank: 4, name: 'Omar Hassan', currentStreak: 28, longestStreak: 41, totalDays: 245 },
            { rank: 5, name: 'Lisa Anderson', currentStreak: 25, longestStreak: 38, totalDays: 223 }
        ];

        return `
            <div class="space-y-4">
                <div class="text-center mb-6">
                    <h4 class="text-lg font-semibold text-gray-900">Streak Masters</h4>
                    <p class="text-gray-600">Consistency champions with the longest learning streaks</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${streakLeaders.map(user => `
                        <div class="border border-gray-200 rounded-lg p-4 ${user.rank <= 3 ? 'border-orange-300 bg-orange-50' : ''}">
                            <div class="flex items-center justify-between mb-3">
                                <span class="text-lg font-bold text-gray-900">#${user.rank}</span>
                                <i data-feather="zap" class="w-5 h-5 text-orange-600"></i>
                            </div>
                            <h5 class="font-semibold text-gray-900 mb-3">${user.name}</h5>
                            <div class="space-y-2 text-sm">
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Current Streak:</span>
                                    <span class="font-medium text-orange-600">${user.currentStreak} days</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Longest Streak:</span>
                                    <span class="font-medium text-gray-900">${user.longestStreak} days</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Total Days:</span>
                                    <span class="font-medium text-gray-900">${user.totalDays} days</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderTopAchievers() {
        const achievers = [
            { name: 'Sarah Chen', badge: 'JavaScript Master', icon: 'code', color: 'blue' },
            { name: 'Mike Rodriguez', badge: 'React Expert', icon: 'layers', color: 'green' },
            { name: 'Emily Watson', badge: 'Full Stack Hero', icon: 'server', color: 'purple' },
            { name: 'David Kim', badge: 'Problem Solver', icon: 'puzzle', color: 'red' },
            { name: 'Alex Thompson', badge: 'Team Player', icon: 'users', color: 'yellow' }
        ];

        return `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                ${achievers.map(achiever => `
                    <div class="text-center p-4 border border-gray-200 rounded-lg hover:border-${achiever.color}-300 hover:bg-${achiever.color}-50 transition-all">
                        <div class="w-12 h-12 bg-${achiever.color}-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <i data-feather="${achiever.icon}" class="w-6 h-6 text-${achiever.color}-600"></i>
                        </div>
                        <h5 class="font-medium text-gray-900 text-sm">${achiever.name}</h5>
                        <p class="text-xs text-gray-600">${achiever.badge}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderLeaderboardStats() {
        const stats = [
            {
                title: 'Total Participants',
                value: '15,420',
                icon: 'users',
                color: 'blue',
                description: 'Active learners this month'
            },
            {
                title: 'Points Awarded',
                value: '1.2M',
                icon: 'star',
                color: 'yellow',
                description: 'Total points distributed'
            },
            {
                title: 'Competitions',
                value: '47',
                icon: 'trophy',
                color: 'orange',
                description: 'Active competitions'
            }
        ];

        return stats.map(stat => `
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div class="flex items-center">
                    <div class="w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center">
                        <i data-feather="${stat.icon}" class="w-6 h-6 text-${stat.color}-600"></i>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-600">${stat.title}</p>
                        <p class="text-2xl font-bold text-gray-900">${stat.value}</p>
                        <p class="text-xs text-gray-500">${stat.description}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getRankChangeIcon(change) {
        const icons = {
            'up': '<i data-feather="trending-up" class="w-4 h-4 text-green-600 ml-1"></i>',
            'down': '<i data-feather="trending-down" class="w-4 h-4 text-red-600 ml-1"></i>',
            'same': '<i data-feather="minus" class="w-4 h-4 text-gray-400 ml-1"></i>'
        };
        return icons[change] || '';
    }

    switchView(viewId) {
        this.currentView = viewId;
        
        // Re-render the content
        const contentArea = document.querySelector('.bg-white.rounded-lg.shadow-sm.border.border-gray-200 .p-6');
        if (contentArea) {
            contentArea.innerHTML = this.renderLeaderboardContent();
            feather.replace();
        }
        
        // Update tab styling
        document.querySelectorAll('.leaderboard-tab').forEach(tab => {
            tab.className = tab.className.replace(
                'border-orange-500 text-orange-600',
                'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            );
        });
        
        event.target.className = event.target.className.replace(
            'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'border-orange-500 text-orange-600'
        );
    }

    shareAchievement() {
        app.showNotification('Achievement sharing feature coming soon!', 'info');
    }

    init() {
        feather.replace();
        this.setupTimeframeFilter();
        this.loadLeaderboardData();
        this.loadBadgeData();
    }

    setupTimeframeFilter() {
        const timeframeFilter = document.getElementById('timeframe-filter');
        if (timeframeFilter) {
            timeframeFilter.addEventListener('change', (e) => {
                this.timeframe = e.target.value;
                this.loadLeaderboardData();
                app.showNotification(`Leaderboard updated for ${e.target.value} timeframe`, 'info');
            });
        }
    }

    loadLeaderboardData() {
        // Load leaderboard data based on current view and timeframe
        // In a real application, this would fetch from an API
    }

    async loadBadgeData() {
        try {
            const response = await fetch('data/badges.json');
            const data = await response.json();
            this.badges = data.badges;
            this.userBadges = data.userBadges;
        } catch (error) {
            console.error('Failed to load badge data:', error);
            // Fallback to mock data
            this.badges = [
                { id: 'quick-learner', name: 'Quick Learner', description: 'Completed 10 courses in under 30 days', icon: 'zap', color: 'yellow', earnedOn: '2024-07-22T14:45:00Z' },
                { id: 'team-player', name: 'Team Player', description: 'Participated in 5+ team hackathons', icon: 'users', color: 'blue', earnedOn: '2024-07-28T09:15:00Z' },
                { id: 'code-master', name: 'Code Master', description: 'Achieved 95%+ average score', icon: 'code', color: 'green', earnedOn: '2024-08-01T16:20:00Z' },
                { id: 'streak-warrior', name: 'Streak Warrior', description: 'Maintained 30+ day learning streak', icon: 'fire', color: 'orange', earnedOn: '2024-07-18T08:00:00Z' },
                { id: 'mentor', name: 'Mentor', description: 'Helped 20+ fellow learners', icon: 'heart', color: 'pink', earnedOn: '2024-07-25T13:45:00Z' }
            ];
            this.userBadges = ['quick-learner', 'team-player', 'code-master', 'streak-warrior', 'mentor'];
        }
    }

    renderTop5Users() {
        const topUsers = [
            { rank: 1, name: 'Sarah Chen', points: 4850, avatar: 'SC', change: 'same' },
            { rank: 2, name: 'Mike Rodriguez', points: 4720, avatar: 'MR', change: 'up' },
            { rank: 3, name: 'Emily Watson', points: 4680, avatar: 'EW', change: 'down' },
            { rank: 4, name: 'David Kim', points: 4520, avatar: 'DK', change: 'up' },
            { rank: 5, name: 'Alex Thompson', points: 4350, avatar: 'AT', change: 'same' }
        ];

        return `
            <div class="space-y-4">
                ${topUsers.map((user, index) => `
                    <div class="flex items-center justify-between p-4 ${index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' : 'bg-gray-50 border border-gray-200'} rounded-lg">
                        <div class="flex items-center space-x-4">
                            <div class="relative">
                                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    ${user.avatar}
                                </div>
                                <div class="absolute -top-1 -right-1 w-6 h-6 ${index < 3 ? 'bg-yellow-500' : 'bg-gray-500'} rounded-full flex items-center justify-center">
                                    <span class="text-white text-xs font-bold">${user.rank}</span>
                                </div>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900">${user.name}</h4>
                                <div class="flex items-center space-x-2">
                                    <span class="text-sm text-gray-600">${user.points.toLocaleString()} points</span>
                                    ${this.getRankChangeIcon(user.change)}
                                </div>
                            </div>
                        </div>
                        <div class="text-right">
                            ${index < 3 ? `
                                <div class="flex items-center space-x-1">
                                    <i data-feather="trophy" class="w-5 h-5 text-yellow-600"></i>
                                    <span class="text-sm font-medium text-yellow-700">${index === 0 ? 'Gold' : index === 1 ? 'Silver' : 'Bronze'}</span>
                                </div>
                            ` : `
                                <span class="text-sm text-gray-500">Top 5</span>
                            `}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderUserBadges() {
        const earnedBadges = this.badges.filter(badge => this.userBadges.includes(badge.id));
        const lockedBadges = this.badges.filter(badge => !this.userBadges.includes(badge.id)).slice(0, 3);

        return `
            <div class="space-y-6">
                <!-- Earned Badges -->
                <div>
                    <h4 class="text-lg font-medium text-gray-900 mb-4">Earned Badges (${earnedBadges.length})</h4>
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        ${earnedBadges.map(badge => `
                            <div class="badge-card relative group cursor-pointer" 
                                 onmouseenter="app.modules.leaderboard.showBadgeTooltip(event, '${badge.id}')" 
                                 onmouseleave="app.modules.leaderboard.hideBadgeTooltip()">
                                <div class="text-center p-4 border-2 border-${badge.color}-300 bg-${badge.color}-50 rounded-lg hover:shadow-md transition-all">
                                    <div class="w-12 h-12 bg-${badge.color}-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                                        <i data-feather="${badge.icon}" class="w-6 h-6 text-${badge.color}-600"></i>
                                    </div>
                                    <h5 class="font-medium text-gray-900 text-sm mb-1">${badge.name}</h5>
                                    <p class="text-xs text-gray-600 leading-tight">${badge.description}</p>
                                    <div class="mt-2 text-xs text-${badge.color}-600 font-medium">
                                        Earned ${this.formatEarnedDate(badge.earnedOn)}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Locked Badges Preview -->
                <div>
                    <h4 class="text-lg font-medium text-gray-900 mb-4">Badges to Earn</h4>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                        ${lockedBadges.map(badge => `
                            <div class="badge-card relative group cursor-pointer opacity-60"
                                 onmouseenter="app.modules.leaderboard.showBadgeTooltip(event, '${badge.id}', true)" 
                                 onmouseleave="app.modules.leaderboard.hideBadgeTooltip()">
                                <div class="text-center p-4 border-2 border-gray-300 bg-gray-50 rounded-lg hover:shadow-md transition-all">
                                    <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <i data-feather="${badge.icon}" class="w-6 h-6 text-gray-400"></i>
                                    </div>
                                    <h5 class="font-medium text-gray-600 text-sm mb-1">${badge.name}</h5>
                                    <p class="text-xs text-gray-500 leading-tight">${badge.description}</p>
                                    <div class="mt-2 text-xs text-gray-500 font-medium">
                                        <i data-feather="lock" class="w-3 h-3 inline mr-1"></i>
                                        Locked
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <!-- Badge Tooltip -->
            <div id="badge-tooltip" class="absolute z-50 hidden bg-gray-900 text-white p-3 rounded-lg shadow-lg max-w-xs">
                <div id="tooltip-content"></div>
                <div class="absolute bottom-0 left-1/2 transform translate-y-full -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
        `;
    }

    showBadgeTooltip(event, badgeId, isLocked = false) {
        const badge = this.badges.find(b => b.id === badgeId);
        if (!badge) return;

        const tooltip = document.getElementById('badge-tooltip');
        const content = document.getElementById('tooltip-content');
        
        if (!tooltip || !content) return;

        const earnedDate = isLocked ? null : badge.earnedOn;
        
        content.innerHTML = `
            <div class="space-y-2">
                <div class="flex items-center space-x-2">
                    <i data-feather="${badge.icon}" class="w-4 h-4"></i>
                    <span class="font-semibold">${badge.name}</span>
                </div>
                <p class="text-sm text-gray-300">${badge.description}</p>
                ${earnedDate ? `
                    <div class="text-xs text-gray-400 pt-1 border-t border-gray-700">
                        Earned on ${this.formatEarnedDate(earnedDate)}
                    </div>
                ` : `
                    <div class="text-xs text-gray-400 pt-1 border-t border-gray-700">
                        🔒 Complete the requirements to unlock this badge
                    </div>
                `}
            </div>
        `;

        // Position tooltip
        const rect = event.currentTarget.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - 10}px`;
        tooltip.style.transform = 'translate(-50%, -100%)';
        
        tooltip.classList.remove('hidden');
        feather.replace();
    }

    hideBadgeTooltip() {
        const tooltip = document.getElementById('badge-tooltip');
        if (tooltip) {
            tooltip.classList.add('hidden');
        }
    }

    formatEarnedDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = now - date;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'today';
        if (diffDays === 1) return 'yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Leaderboard;
}
