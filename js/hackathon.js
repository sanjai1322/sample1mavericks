// Hackathon module
class Hackathon {
    constructor() {
        this.hackathons = [];
        this.registeredHackathons = [];
        this.submissions = [];
        this.currentView = 'upcoming';
        this.showCreateForm = false;
        this.showJoinForm = false;
        this.initSubmissions();
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
                        <div class="mt-4 md:mt-0 flex flex-wrap gap-3">
                            <button onclick="app.modules.hackathon.toggleCreateForm()" class="bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                                <i data-feather="plus" class="w-4 h-4 mr-2 inline"></i>
                                Create Hackathon
                            </button>
                            <button onclick="app.modules.hackathon.toggleJoinForm()" class="bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                                <i data-feather="calendar-plus" class="w-4 h-4 mr-2 inline"></i>
                                Join Hackathon
                            </button>
                            <button onclick="app.modules.hackathon.viewMySubmissions()" class="bg-purple-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                                <i data-feather="file-text" class="w-4 h-4 mr-2 inline"></i>
                                My Submissions
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Create Hackathon Form -->
                ${this.showCreateForm ? this.renderCreateForm() : ''}

                <!-- Join Hackathon Form -->
                ${this.showJoinForm ? this.renderJoinForm() : ''}

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
            { id: 'my-hackathons', label: 'My Hackathons', icon: 'user' },
            { id: 'my-submissions', label: 'My Submissions', icon: 'file-text' }
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
            case 'my-submissions':
                return this.renderMySubmissions();
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

    renderCreateForm() {
        return `
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-semibold text-gray-900">
                        <i data-feather="plus" class="w-5 h-5 mr-2 inline"></i>
                        Create New Hackathon
                    </h3>
                    <button onclick="app.modules.hackathon.toggleCreateForm()" class="text-gray-400 hover:text-gray-600">
                        <i data-feather="x" class="w-5 h-5"></i>
                    </button>
                </div>
                <form id="create-hackathon-form" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="hackathon-title" class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input type="text" id="hackathon-title" class="form-input" placeholder="Enter hackathon title" required>
                        </div>
                        <div>
                            <label for="hackathon-deadline" class="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                            <input type="datetime-local" id="hackathon-deadline" class="form-input" required>
                        </div>
                    </div>
                    <div>
                        <label for="hackathon-description" class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea id="hackathon-description" rows="4" class="form-input" placeholder="Describe the hackathon theme, goals, and requirements..." required></textarea>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label for="hackathon-prize" class="block text-sm font-medium text-gray-700 mb-2">Prize</label>
                            <input type="text" id="hackathon-prize" class="form-input" placeholder="e.g., $5,000">
                        </div>
                        <div>
                            <label for="hackathon-difficulty" class="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                            <select id="hackathon-difficulty" class="form-input">
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                        <div>
                            <label for="hackathon-team-size" class="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
                            <input type="text" id="hackathon-team-size" class="form-input" placeholder="e.g., 2-4 members">
                        </div>
                    </div>
                    <div class="flex justify-end space-x-3">
                        <button type="button" onclick="app.modules.hackathon.toggleCreateForm()" class="btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" onclick="app.modules.hackathon.createHackathon(event)" class="btn-primary">
                            <i data-feather="plus" class="w-4 h-4 mr-2 inline"></i>
                            Create Hackathon
                        </button>
                    </div>
                </form>
            </div>
        `;
    }

    renderJoinForm() {
        const availableHackathons = [
            { id: 1, title: 'AI Innovation Challenge', deadline: '2024-08-17' },
            { id: 2, title: 'Web3 DApp Challenge', deadline: '2024-08-22' },
            { id: 3, title: 'Mobile App Innovation', deadline: '2024-08-27' },
            { id: 7, title: 'Global Innovation Summit', deadline: '2024-09-03' }
        ];

        return `
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-semibold text-gray-900">
                        <i data-feather="calendar-plus" class="w-5 h-5 mr-2 inline"></i>
                        Join Hackathon
                    </h3>
                    <button onclick="app.modules.hackathon.toggleJoinForm()" class="text-gray-400 hover:text-gray-600">
                        <i data-feather="x" class="w-5 h-5"></i>
                    </button>
                </div>
                <form id="join-hackathon-form" class="space-y-4">
                    <div>
                        <label for="hackathon-select" class="block text-sm font-medium text-gray-700 mb-2">Select Hackathon</label>
                        <select id="hackathon-select" class="form-input" required>
                            <option value="">Choose a hackathon to join...</option>
                            ${availableHackathons.map(hackathon => `
                                <option value="${hackathon.id}">${hackathon.title} (Deadline: ${App.formatDate(hackathon.deadline)})</option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="team-name" class="block text-sm font-medium text-gray-700 mb-2">Team Name (Optional)</label>
                            <input type="text" id="team-name" class="form-input" placeholder="Enter your team name">
                        </div>
                        <div>
                            <label for="team-members" class="block text-sm font-medium text-gray-700 mb-2">Team Members</label>
                            <input type="text" id="team-members" class="form-input" placeholder="Enter team member emails (comma-separated)">
                        </div>
                    </div>
                    <div>
                        <label for="motivation" class="block text-sm font-medium text-gray-700 mb-2">Why do you want to participate?</label>
                        <textarea id="motivation" rows="3" class="form-input" placeholder="Tell us about your motivation and what you hope to achieve..."></textarea>
                    </div>
                    <div class="flex justify-end space-x-3">
                        <button type="button" onclick="app.modules.hackathon.toggleJoinForm()" class="btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" onclick="app.modules.hackathon.joinHackathon(event)" class="btn-primary">
                            <i data-feather="calendar-plus" class="w-4 h-4 mr-2 inline"></i>
                            Join Hackathon
                        </button>
                    </div>
                </form>
            </div>
        `;
    }

    renderMySubmissions() {
        return `
            <div class="space-y-6">
                <div class="text-center mb-6">
                    <h4 class="text-lg font-semibold text-gray-900">My Hackathon Submissions</h4>
                    <p class="text-gray-600">Track your projects and get feedback from judges</p>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    ${this.submissions.map(submission => `
                        <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                            <div class="flex items-start justify-between mb-4">
                                <div>
                                    <h5 class="text-lg font-semibold text-gray-900">${submission.hackathonName}</h5>
                                    <p class="text-sm text-gray-600">Submitted: ${App.formatDate(submission.submittedAt)}</p>
                                </div>
                                <span class="px-3 py-1 text-sm font-medium rounded-full ${
                                    submission.status === 'winner' ? 'bg-yellow-100 text-yellow-800' :
                                    submission.status === 'finalist' ? 'bg-blue-100 text-blue-800' :
                                    submission.status === 'submitted' ? 'bg-green-100 text-green-800' :
                                    'bg-gray-100 text-gray-800'
                                }">
                                    ${submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                                </span>
                            </div>
                            
                            <div class="space-y-3">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600">GitHub Repository:</span>
                                    <a href="${submission.githubLink}" target="_blank" class="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                                        <i data-feather="github" class="w-4 h-4 mr-1"></i>
                                        View Code
                                    </a>
                                </div>
                                
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600">Score:</span>
                                    <div class="flex items-center">
                                        <span class="text-lg font-bold ${submission.score >= 85 ? 'text-green-600' : submission.score >= 70 ? 'text-yellow-600' : 'text-red-600'}">
                                            ${submission.score}/100
                                        </span>
                                        <div class="ml-2 flex items-center">
                                            ${Array.from({length: 5}, (_, i) => `
                                                <i data-feather="star" class="w-4 h-4 ${
                                                    i < Math.floor(submission.score / 20) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                }"></i>
                                            `).join('')}
                                        </div>
                                    </div>
                                </div>
                                
                                ${submission.feedback ? `
                                    <div class="border-t border-gray-200 pt-3">
                                        <p class="text-sm text-gray-600 mb-2">Judge Feedback:</p>
                                        <p class="text-sm text-gray-800 bg-gray-50 rounded p-3">${submission.feedback}</p>
                                    </div>
                                ` : ''}
                                
                                <div class="flex justify-between items-center pt-3">
                                    <button onclick="app.modules.hackathon.viewSubmissionDetails('${submission.id}')" class="text-sm text-blue-600 hover:text-blue-800 font-medium">
                                        View Details
                                    </button>
                                    ${submission.status === 'draft' ? `
                                        <button onclick="app.modules.hackathon.editSubmission('${submission.id}')" class="btn-primary text-sm py-1 px-3">
                                            Continue Editing
                                        </button>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                ${this.submissions.length === 0 ? `
                    <div class="text-center py-12">
                        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i data-feather="file-text" class="w-8 h-8 text-gray-400"></i>
                        </div>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">No submissions yet</h3>
                        <p class="text-gray-600 mb-4">Join a hackathon to start building and submitting your projects</p>
                        <button onclick="app.modules.hackathon.switchTab('upcoming')" class="btn-primary">
                            Browse Hackathons
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    }

    toggleCreateForm() {
        this.showCreateForm = !this.showCreateForm;
        this.showJoinForm = false;
        this.renderFullSection();
    }

    toggleJoinForm() {
        this.showJoinForm = !this.showJoinForm;
        this.showCreateForm = false;
        this.renderFullSection();
    }

    createHackathon(event) {
        event.preventDefault();
        const formData = new FormData(event.target.form);
        const title = document.getElementById('hackathon-title').value;
        const description = document.getElementById('hackathon-description').value;
        const deadline = document.getElementById('hackathon-deadline').value;
        const prize = document.getElementById('hackathon-prize').value;
        const difficulty = document.getElementById('hackathon-difficulty').value;
        const teamSize = document.getElementById('hackathon-team-size').value;

        // Simulate creating hackathon
        app.showNotification(`Hackathon "${title}" created successfully! It will be reviewed and published soon.`, 'success');
        this.toggleCreateForm();
    }

    joinHackathon(event) {
        event.preventDefault();
        const hackathonId = document.getElementById('hackathon-select').value;
        const teamName = document.getElementById('team-name').value;
        const hackathonTitle = document.getElementById('hackathon-select').selectedOptions[0].text.split(' (')[0];
        
        if (!hackathonId) {
            app.showNotification('Please select a hackathon to join', 'error');
            return;
        }

        app.showNotification(`Successfully joined "${hackathonTitle}"${teamName ? ` as team "${teamName}"` : ''}!`, 'success');
        this.toggleJoinForm();
    }

    initSubmissions() {
        this.submissions = [
            {
                id: 'sub-001',
                hackathonName: 'Frontend Masters Challenge',
                submittedAt: '2024-07-30T18:30:00Z',
                githubLink: 'https://github.com/johndoe/react-dashboard',
                score: 87,
                status: 'winner',
                feedback: 'Excellent use of React hooks and clean component architecture. The UI is intuitive and responsive. Minor improvements could be made to loading states.'
            },
            {
                id: 'sub-002', 
                hackathonName: 'API Design Contest',
                submittedAt: '2024-07-15T16:45:00Z',
                githubLink: 'https://github.com/johndoe/graphql-api',
                score: 73,
                status: 'finalist',
                feedback: 'Good GraphQL schema design and proper error handling. Documentation could be more comprehensive. Performance optimizations needed for large datasets.'
            },
            {
                id: 'sub-003',
                hackathonName: 'Climate Tech Solutions',
                submittedAt: '2024-08-05T12:20:00Z',
                githubLink: 'https://github.com/johndoe/carbon-tracker',
                score: 92,
                status: 'submitted',
                feedback: 'Outstanding project with real-world impact potential. Innovative approach to carbon tracking with excellent data visualization. Well-documented and tested.'
            }
        ];
    }

    viewSubmissionDetails(submissionId) {
        const submission = this.submissions.find(s => s.id === submissionId);
        if (submission) {
            app.showNotification(`Loading details for ${submission.hackathonName} submission...`, 'info');
        }
    }

    editSubmission(submissionId) {
        const submission = this.submissions.find(s => s.id === submissionId);
        if (submission) {
            app.showNotification(`Opening editor for ${submission.hackathonName} submission...`, 'info');
        }
    }

    renderFullSection() {
        const contentArea = document.getElementById('content-area');
        if (contentArea) {
            contentArea.innerHTML = this.render();
            feather.replace();
        }
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
