// Hackathon module
class Hackathon {
    constructor() {
        this.hackathons = [];
        this.registeredHackathons = [];
        this.submissions = [];
        this.currentView = 'upcoming';
    }

    render() {
        return `
            <div class="space-y-6">
                <!-- Hackathon Header -->
                <div class="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg text-white p-8">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 class="text-3xl font-bold mb-2">Hackathons & Challenges</h2>
                            <p class="text-blue-100 text-lg">Compete, learn, and showcase your skills</p>
                        </div>
                        <div class="mt-4 md:mt-0 flex space-x-3">
                            <button onclick="app.modules.hackathon.createTeam()" class="bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                                <i data-feather="users" class="w-4 h-4 mr-2 inline"></i>
                                Create Team
                            </button>
                            <button onclick="app.modules.hackathon.viewMySubmissions()" class="bg-purple-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                                <i data-feather="file-text" class="w-4 h-4 mr-2 inline"></i>
                                My Submissions
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Navigation Tabs -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="border-b border-gray-200">
                        <nav class="-mb-px flex space-x-8 px-6">
                            ${this.renderTabs()}
                        </nav>
                    </div>
                    <div class="p-6">
                        ${this.renderTabContent()}
                    </div>
                </div>

                <!-- Quick Stats -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    ${this.renderHackathonStats()}
                </div>

                <!-- Featured Hackathon -->
                ${this.renderFeaturedHackathon()}
            </div>
        `;
    }

    renderTabs() {
        const tabs = [
            { id: 'upcoming', label: 'Upcoming', icon: 'calendar' },
            { id: 'ongoing', label: 'Ongoing', icon: 'play-circle' },
            { id: 'completed', label: 'Completed', icon: 'check-circle' },
            { id: 'my-hackathons', label: 'My Hackathons', icon: 'user' }
        ];

        return tabs.map(tab => `
            <button onclick="app.modules.hackathon.switchTab('${tab.id}')"
                    class="tab-button flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                        this.currentView === tab.id 
                            ? 'border-purple-500 text-purple-600' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }">
                <i data-feather="${tab.icon}" class="w-4 h-4 mr-2"></i>
                ${tab.label}
            </button>
        `).join('');
    }

    renderTabContent() {
        switch (this.currentView) {
            case 'upcoming':
                return this.renderUpcomingHackathons();
            case 'ongoing':
                return this.renderOngoingHackathons();
            case 'completed':
                return this.renderCompletedHackathons();
            case 'my-hackathons':
                return this.renderMyHackathons();
            default:
                return this.renderUpcomingHackathons();
        }
    }

    renderHackathonStats() {
        const stats = [
            {
                title: 'Participated',
                value: '12',
                icon: 'users',
                color: 'blue',
                change: '+3 this month'
            },
            {
                title: 'Won',
                value: '3',
                icon: 'trophy',
                color: 'yellow',
                change: '+1 this month'
            },
            {
                title: 'Projects',
                value: '15',
                icon: 'code',
                color: 'green',
                change: '+5 this month'
            },
            {
                title: 'Team Score',
                value: '1,245',
                icon: 'zap',
                color: 'purple',
                change: '+120 this week'
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
                <div class="mt-4">
                    <span class="text-sm font-medium text-green-600">${stat.change}</span>
                </div>
            </div>
        `).join('');
    }

    renderUpcomingHackathons() {
        const upcomingHackathons = [
            {
                id: 1,
                title: 'AI Innovation Challenge',
                description: 'Build innovative AI solutions for real-world problems',
                startDate: '2024-08-15',
                endDate: '2024-08-17',
                prize: '$10,000',
                participants: 1250,
                difficulty: 'Advanced',
                tags: ['AI', 'Machine Learning', 'Innovation'],
                organizer: 'TechCorp',
                teamSize: '2-4 members'
            },
            {
                id: 2,
                title: 'Web3 DApp Challenge',
                description: 'Create decentralized applications on blockchain',
                startDate: '2024-08-20',
                endDate: '2024-08-22',
                prize: '$5,000',
                participants: 890,
                difficulty: 'Intermediate',
                tags: ['Blockchain', 'Web3', 'DApp'],
                organizer: 'CryptoTech',
                teamSize: '1-3 members'
            },
            {
                id: 3,
                title: 'Mobile App Innovation',
                description: 'Develop mobile apps that solve everyday problems',
                startDate: '2024-08-25',
                endDate: '2024-08-27',
                prize: '$7,500',
                participants: 1500,
                difficulty: 'Beginner',
                tags: ['Mobile', 'iOS', 'Android'],
                organizer: 'MobileFirst',
                teamSize: '2-5 members'
            }
        ];

        return `
            <div class="space-y-6">
                ${upcomingHackathons.map(hackathon => `
                    <div class="border border-gray-200 rounded-lg p-6 hover:border-purple-300 hover:shadow-md transition-all">
                        <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                            <div class="flex-1">
                                <div class="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 class="text-xl font-semibold text-gray-900">${hackathon.title}</h3>
                                        <p class="text-sm text-gray-600 mt-1">by ${hackathon.organizer}</p>
                                    </div>
                                    <span class="px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 rounded-full">
                                        ${hackathon.difficulty}
                                    </span>
                                </div>
                                
                                <p class="text-gray-700 mb-4">${hackathon.description}</p>
                                
                                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    <div class="flex items-center text-sm text-gray-600">
                                        <i data-feather="calendar" class="w-4 h-4 mr-2"></i>
                                        ${App.formatDate(hackathon.startDate)}
                                    </div>
                                    <div class="flex items-center text-sm text-gray-600">
                                        <i data-feather="users" class="w-4 h-4 mr-2"></i>
                                        ${hackathon.participants.toLocaleString()} registered
                                    </div>
                                    <div class="flex items-center text-sm text-gray-600">
                                        <i data-feather="award" class="w-4 h-4 mr-2"></i>
                                        ${hackathon.prize} prize
                                    </div>
                                    <div class="flex items-center text-sm text-gray-600">
                                        <i data-feather="team" class="w-4 h-4 mr-2"></i>
                                        ${hackathon.teamSize}
                                    </div>
                                </div>
                                
                                <div class="flex flex-wrap gap-2 mb-4">
                                    ${hackathon.tags.map(tag => `
                                        <span class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                                            ${tag}
                                        </span>
                                    `).join('')}
                                </div>
                            </div>
                            
                            <div class="mt-4 lg:mt-0 lg:ml-6 flex flex-col space-y-2">
                                <button onclick="app.modules.hackathon.registerHackathon(${hackathon.id})" 
                                        class="btn-primary">
                                    Register Now
                                </button>
                                <button onclick="app.modules.hackathon.viewDetails(${hackathon.id})" 
                                        class="btn-secondary">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderOngoingHackathons() {
        const ongoingHackathons = [
            {
                id: 4,
                title: 'Climate Tech Solutions',
                timeLeft: '2 days 14 hours',
                progress: 65,
                submissions: 342,
                myTeam: 'EcoInnovators',
                status: 'Submitted'
            }
        ];

        if (ongoingHackathons.length === 0) {
            return `
                <div class="text-center py-12">
                    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i data-feather="play-circle" class="w-8 h-8 text-gray-400"></i>
                    </div>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">No ongoing hackathons</h3>
                    <p class="text-gray-600">Register for upcoming hackathons to participate</p>
                </div>
            `;
        }

        return `
            <div class="space-y-6">
                ${ongoingHackathons.map(hackathon => `
                    <div class="border border-orange-200 bg-orange-50 rounded-lg p-6">
                        <div class="flex items-start justify-between mb-4">
                            <div>
                                <h3 class="text-xl font-semibold text-gray-900">${hackathon.title}</h3>
                                <p class="text-sm text-orange-600 font-medium">Time left: ${hackathon.timeLeft}</p>
                            </div>
                            <span class="px-3 py-1 text-sm font-medium bg-orange-100 text-orange-800 rounded-full">
                                ${hackathon.status}
                            </span>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <p class="text-sm text-gray-600">My Team</p>
                                <p class="font-medium text-gray-900">${hackathon.myTeam}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Total Submissions</p>
                                <p class="font-medium text-gray-900">${hackathon.submissions}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Progress</p>
                                <div class="flex items-center">
                                    <div class="w-full bg-gray-200 rounded-full h-2 mr-2">
                                        <div class="bg-orange-600 h-2 rounded-full" style="width: ${hackathon.progress}%"></div>
                                    </div>
                                    <span class="text-sm font-medium text-gray-900">${hackathon.progress}%</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex space-x-3">
                            <button onclick="app.modules.hackathon.continueWork(${hackathon.id})" 
                                    class="btn-primary">
                                Continue Working
                            </button>
                            <button onclick="app.modules.hackathon.viewSubmission(${hackathon.id})" 
                                    class="btn-secondary">
                                View Submission
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderCompletedHackathons() {
        const completedHackathons = [
            {
                id: 5,
                title: 'Frontend Masters Challenge',
                completedDate: '2024-07-30',
                rank: 3,
                totalParticipants: 456,
                prize: '$1,000',
                project: 'React Dashboard',
                team: 'CodeCrafters'
            },
            {
                id: 6,
                title: 'API Design Contest',
                completedDate: '2024-07-15',
                rank: 8,
                totalParticipants: 234,
                prize: 'Certificate',
                project: 'GraphQL API',
                team: 'Solo'
            }
        ];

        return `
            <div class="space-y-4">
                ${completedHackathons.map(hackathon => `
                    <div class="border border-gray-200 rounded-lg p-4">
                        <div class="flex items-center justify-between">
                            <div class="flex-1">
                                <h3 class="text-lg font-semibold text-gray-900">${hackathon.title}</h3>
                                <p class="text-sm text-gray-600">Completed ${App.formatDate(hackathon.completedDate)}</p>
                                <p class="text-sm text-gray-600">Project: ${hackathon.project} | Team: ${hackathon.team}</p>
                            </div>
                            <div class="text-right">
                                <div class="text-lg font-bold text-gray-900">Rank #${hackathon.rank}</div>
                                <div class="text-sm text-gray-600">of ${hackathon.totalParticipants} participants</div>
                                <div class="text-sm font-medium text-green-600">${hackathon.prize}</div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderMyHackathons() {
        return `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 class="text-lg font-semibold text-blue-900 mb-3">Upcoming Registrations</h4>
                    <div class="space-y-2">
                        <div class="text-sm text-blue-800">AI Innovation Challenge - Aug 15</div>
                        <div class="text-sm text-blue-800">Mobile App Innovation - Aug 25</div>
                    </div>
                </div>
                
                <div class="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 class="text-lg font-semibold text-green-900 mb-3">Achievements</h4>
                    <div class="space-y-2">
                        <div class="flex items-center text-sm text-green-800">
                            <i data-feather="award" class="w-4 h-4 mr-2"></i>
                            3 Hackathons Won
                        </div>
                        <div class="flex items-center text-sm text-green-800">
                            <i data-feather="star" class="w-4 h-4 mr-2"></i>
                            12 Hackathons Completed
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderFeaturedHackathon() {
        return `
            <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg text-white p-8">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div class="mb-4 md:mb-0">
                        <h3 class="text-2xl font-bold mb-2">🚀 Featured: Global Innovation Summit</h3>
                        <p class="text-indigo-100 mb-4">Join the biggest hackathon of the year with $50,000 in prizes!</p>
                        <div class="flex flex-wrap gap-4 text-sm">
                            <span class="flex items-center">
                                <i data-feather="calendar" class="w-4 h-4 mr-1"></i>
                                Sept 1-3, 2024
                            </span>
                            <span class="flex items-center">
                                <i data-feather="users" class="w-4 h-4 mr-1"></i>
                                5,000+ participants
                            </span>
                            <span class="flex items-center">
                                <i data-feather="globe" class="w-4 h-4 mr-1"></i>
                                Virtual & Global
                            </span>
                        </div>
                    </div>
                    <button onclick="app.modules.hackathon.registerFeatured()" 
                            class="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Register Now
                    </button>
                </div>
            </div>
        `;
    }

    switchTab(tabId) {
        this.currentView = tabId;
        
        // Re-render the tab content
        const contentArea = document.querySelector('.bg-white.rounded-lg.shadow-sm.border.border-gray-200 .p-6');
        if (contentArea) {
            contentArea.innerHTML = this.renderTabContent();
            feather.replace();
        }
        
        // Update tab styling
        document.querySelectorAll('.tab-button').forEach(tab => {
            tab.className = tab.className.replace(
                'border-purple-500 text-purple-600',
                'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            );
        });
        
        event.target.className = event.target.className.replace(
            'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'border-purple-500 text-purple-600'
        );
    }

    registerHackathon(hackathonId) {
        app.showNotification(`Registration for hackathon ${hackathonId} successful!`, 'success');
    }

    viewDetails(hackathonId) {
        app.showNotification(`Loading hackathon ${hackathonId} details...`, 'info');
    }

    createTeam() {
        app.showNotification('Team creation feature coming soon!', 'info');
    }

    viewMySubmissions() {
        app.showNotification('Loading your submissions...', 'info');
    }

    continueWork(hackathonId) {
        app.showNotification(`Continuing work on hackathon ${hackathonId}...`, 'info');
    }

    viewSubmission(hackathonId) {
        app.showNotification(`Loading submission for hackathon ${hackathonId}...`, 'info');
    }

    registerFeatured() {
        app.showNotification('Registering for Global Innovation Summit...', 'success');
    }

    init() {
        feather.replace();
        this.loadHackathonData();
    }

    loadHackathonData() {
        // Load hackathon data and user's participation history
        // In a real application, this would fetch from an API
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Hackathon;
}
