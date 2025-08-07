// Admin module
class Admin {
    constructor() {
        this.currentView = 'dashboard';
        this.adminData = {
            users: [],
            courses: [],
            hackathons: [],
            analytics: {}
        };
    }

    render() {
        return `
            <div class="space-y-6">
                <!-- Admin Header -->
                <div class="bg-gradient-to-r from-red-600 to-pink-600 rounded-lg shadow-lg text-white p-8">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 class="text-3xl font-bold mb-2">⚙️ Admin Panel</h2>
                            <p class="text-red-100 text-lg">Manage platform, users, and content</p>
                        </div>
                        <div class="mt-4 md:mt-0 flex space-x-3">
                            <button onclick="app.modules.admin.exportData()" class="bg-white text-red-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                                <i data-feather="download" class="w-4 h-4 mr-2 inline"></i>
                                Export Data
                            </button>
                            <button onclick="app.modules.admin.systemSettings()" class="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
                                <i data-feather="settings" class="w-4 h-4 mr-2 inline"></i>
                                System Settings
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Admin Navigation -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="border-b border-gray-200">
                        <nav class="-mb-px flex space-x-8 px-6">
                            ${this.renderAdminTabs()}
                        </nav>
                    </div>
                    <div class="p-6">
                        ${this.renderAdminContent()}
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    ${this.renderQuickActions()}
                </div>

                <!-- System Status -->
                ${this.renderSystemStatus()}
            </div>
        `;
    }

    renderAdminTabs() {
        const tabs = [
            { id: 'dashboard', label: 'Dashboard', icon: 'home' },
            { id: 'users', label: 'Users', icon: 'users' },
            { id: 'courses', label: 'Courses', icon: 'book-open' },
            { id: 'hackathons', label: 'Hackathons', icon: 'code' },
            { id: 'content', label: 'Content', icon: 'file-text' },
            { id: 'reports', label: 'Reports', icon: 'bar-chart-2' }
        ];

        return tabs.map(tab => `
            <button onclick="app.modules.admin.switchView('${tab.id}')"
                    class="admin-tab flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                        this.currentView === tab.id 
                            ? 'border-red-500 text-red-600' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }">
                <i data-feather="${tab.icon}" class="w-4 h-4 mr-2"></i>
                ${tab.label}
            </button>
        `).join('');
    }

    renderAdminContent() {
        switch (this.currentView) {
            case 'dashboard':
                return this.renderAdminDashboard();
            case 'users':
                return this.renderUserManagement();
            case 'courses':
                return this.renderCourseManagement();
            case 'hackathons':
                return this.renderHackathonManagement();
            case 'content':
                return this.renderContentManagement();
            case 'reports':
                return this.renderReports();
            default:
                return this.renderAdminDashboard();
        }
    }

    renderQuickActions() {
        const actions = [
            {
                title: 'Add New User',
                description: 'Create user account',
                icon: 'user-plus',
                color: 'blue',
                action: 'addUser'
            },
            {
                title: 'Create Course',
                description: 'Add new course',
                icon: 'plus-circle',
                color: 'green',
                action: 'createCourse'
            },
            {
                title: 'Send Announcement',
                description: 'Notify all users',
                icon: 'megaphone',
                color: 'yellow',
                action: 'sendAnnouncement'
            },
            {
                title: 'Backup System',
                description: 'Create data backup',
                icon: 'hard-drive',
                color: 'purple',
                action: 'backupSystem'
            }
        ];

        return actions.map(action => `
            <button onclick="app.modules.admin.${action.action}()" 
                    class="text-left p-6 bg-white border border-gray-200 rounded-lg hover:border-${action.color}-300 hover:shadow-md transition-all">
                <div class="w-12 h-12 bg-${action.color}-100 rounded-lg flex items-center justify-center mb-4">
                    <i data-feather="${action.icon}" class="w-6 h-6 text-${action.color}-600"></i>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">${action.title}</h3>
                <p class="text-sm text-gray-600">${action.description}</p>
            </button>
        `).join('');
    }

    renderAdminDashboard() {
        return `
            <div class="space-y-6">
                <!-- Key Metrics -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                                <i data-feather="users" class="w-6 h-6 text-white"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-2xl font-bold text-blue-600">15,420</p>
                                <p class="text-sm text-blue-700">Total Users</p>
                                <p class="text-xs text-blue-600">+127 this week</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-green-50 border border-green-200 rounded-lg p-6">
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                                <i data-feather="book-open" class="w-6 h-6 text-white"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-2xl font-bold text-green-600">247</p>
                                <p class="text-sm text-green-700">Active Courses</p>
                                <p class="text-xs text-green-600">+12 this month</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-purple-50 border border-purple-200 rounded-lg p-6">
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                                <i data-feather="code" class="w-6 h-6 text-white"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-2xl font-bold text-purple-600">23</p>
                                <p class="text-sm text-purple-700">Hackathons</p>
                                <p class="text-xs text-purple-600">8 upcoming</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-orange-50 border border-orange-200 rounded-lg p-6">
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                                <i data-feather="activity" class="w-6 h-6 text-white"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-2xl font-bold text-orange-600">98.5%</p>
                                <p class="text-sm text-orange-700">System Uptime</p>
                                <p class="text-xs text-orange-600">Last 30 days</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent User Activity</h3>
                        <div class="space-y-3">
                            <div class="flex items-center space-x-3">
                                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span class="text-sm text-gray-700">Sarah Chen completed JavaScript Fundamentals</span>
                                <span class="text-xs text-gray-500">2 min ago</span>
                            </div>
                            <div class="flex items-center space-x-3">
                                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span class="text-sm text-gray-700">New user registration: Mike Rodriguez</span>
                                <span class="text-xs text-gray-500">5 min ago</span>
                            </div>
                            <div class="flex items-center space-x-3">
                                <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span class="text-sm text-gray-700">Hackathon submission: AI Innovation Challenge</span>
                                <span class="text-xs text-gray-500">12 min ago</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">System Alerts</h3>
                        <div class="space-y-3">
                            <div class="flex items-start space-x-3">
                                <i data-feather="alert-circle" class="w-5 h-5 text-yellow-500 mt-0.5"></i>
                                <div>
                                    <p class="text-sm text-gray-700">High server load detected</p>
                                    <p class="text-xs text-gray-500">Consider scaling resources</p>
                                </div>
                            </div>
                            <div class="flex items-start space-x-3">
                                <i data-feather="info" class="w-5 h-5 text-blue-500 mt-0.5"></i>
                                <div>
                                    <p class="text-sm text-gray-700">Backup completed successfully</p>
                                    <p class="text-xs text-gray-500">Daily backup at 2:00 AM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderUserManagement() {
        const users = [
            { id: 1, name: 'Sarah Chen', email: 'sarah@example.com', role: 'Student', status: 'Active', joined: '2024-01-15', courses: 12 },
            { id: 2, name: 'Mike Rodriguez', email: 'mike@example.com', role: 'Instructor', status: 'Active', joined: '2024-02-20', courses: 8 },
            { id: 3, name: 'Emily Watson', email: 'emily@example.com', role: 'Student', status: 'Inactive', joined: '2024-03-10', courses: 5 },
            { id: 4, name: 'David Kim', email: 'david@example.com', role: 'Admin', status: 'Active', joined: '2024-01-05', courses: 15 }
        ];

        return `
            <div class="space-y-6">
                <!-- User Filters -->
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div class="flex space-x-4 mb-4 md:mb-0">
                        <input type="text" placeholder="Search users..." class="form-input">
                        <select class="form-input">
                            <option>All Roles</option>
                            <option>Student</option>
                            <option>Instructor</option>
                            <option>Admin</option>
                        </select>
                        <select class="form-input">
                            <option>All Status</option>
                            <option>Active</option>
                            <option>Inactive</option>
                            <option>Suspended</option>
                        </select>
                    </div>
                    <button onclick="app.modules.admin.addUser()" class="btn-primary">
                        <i data-feather="user-plus" class="w-4 h-4 mr-2 inline"></i>
                        Add User
                    </button>
                </div>

                <!-- Users Table -->
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            ${users.map(user => `
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div class="text-sm font-medium text-gray-900">${user.name}</div>
                                            <div class="text-sm text-gray-500">${user.email}</div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${this.getRoleColor(user.role)}">
                                            ${user.role}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${this.getStatusColor(user.status)}">
                                            ${user.status}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ${App.formatDate(user.joined)}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ${user.courses}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <button onclick="app.modules.admin.editUser(${user.id})" class="text-blue-600 hover:text-blue-900">Edit</button>
                                        <button onclick="app.modules.admin.suspendUser(${user.id})" class="text-red-600 hover:text-red-900">Suspend</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    renderCourseManagement() {
        const courses = [
            { id: 1, title: 'JavaScript Fundamentals', instructor: 'Dr. Sarah Johnson', students: 1420, status: 'Published', created: '2024-01-10' },
            { id: 2, title: 'React Masterclass', instructor: 'Mike Chen', students: 1235, status: 'Published', created: '2024-02-15' },
            { id: 3, title: 'Python for AI', instructor: 'Dr. Emily Watson', students: 892, status: 'Draft', created: '2024-03-20' },
            { id: 4, title: 'Database Design', instructor: 'Prof. Maria Garcia', students: 567, status: 'Published', created: '2024-01-25' }
        ];

        return `
            <div class="space-y-6">
                <!-- Course Actions -->
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div class="flex space-x-4 mb-4 md:mb-0">
                        <input type="text" placeholder="Search courses..." class="form-input">
                        <select class="form-input">
                            <option>All Status</option>
                            <option>Published</option>
                            <option>Draft</option>
                            <option>Archived</option>
                        </select>
                    </div>
                    <button onclick="app.modules.admin.createCourse()" class="btn-primary">
                        <i data-feather="plus-circle" class="w-4 h-4 mr-2 inline"></i>
                        Create Course
                    </button>
                </div>

                <!-- Courses Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${courses.map(course => `
                        <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all">
                            <div class="flex items-start justify-between mb-3">
                                <h3 class="text-lg font-semibold text-gray-900">${course.title}</h3>
                                <span class="px-2 py-1 text-xs font-medium rounded-full ${this.getCourseStatusColor(course.status)}">
                                    ${course.status}
                                </span>
                            </div>
                            <p class="text-sm text-gray-600 mb-2">by ${course.instructor}</p>
                            <div class="flex items-center text-sm text-gray-500 mb-4">
                                <i data-feather="users" class="w-4 h-4 mr-1"></i>
                                ${course.students.toLocaleString()} students
                            </div>
                            <div class="flex space-x-2">
                                <button onclick="app.modules.admin.editCourse(${course.id})" class="btn-secondary text-sm px-3 py-1">
                                    Edit
                                </button>
                                <button onclick="app.modules.admin.viewCourseStats(${course.id})" class="btn-primary text-sm px-3 py-1">
                                    Stats
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderHackathonManagement() {
        const hackathons = [
            { id: 1, title: 'AI Innovation Challenge', participants: 1250, status: 'Upcoming', startDate: '2024-08-15', prize: '$10,000' },
            { id: 2, title: 'Web3 DApp Challenge', participants: 890, status: 'Ongoing', startDate: '2024-08-08', prize: '$5,000' },
            { id: 3, title: 'Mobile App Innovation', participants: 1500, status: 'Completed', startDate: '2024-07-20', prize: '$7,500' }
        ];

        return `
            <div class="space-y-6">
                <!-- Hackathon Actions -->
                <div class="flex justify-between items-center">
                    <h3 class="text-lg font-semibold text-gray-900">Hackathon Management</h3>
                    <button onclick="app.modules.admin.createHackathon()" class="btn-primary">
                        <i data-feather="plus-circle" class="w-4 h-4 mr-2 inline"></i>
                        Create Hackathon
                    </button>
                </div>

                <!-- Hackathons List -->
                <div class="space-y-4">
                    ${hackathons.map(hackathon => `
                        <div class="bg-white border border-gray-200 rounded-lg p-6">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <h4 class="text-lg font-semibold text-gray-900">${hackathon.title}</h4>
                                    <div class="mt-2 grid grid-cols-4 gap-4 text-sm text-gray-600">
                                        <div>
                                            <span class="font-medium">Participants:</span> ${hackathon.participants.toLocaleString()}
                                        </div>
                                        <div>
                                            <span class="font-medium">Start Date:</span> ${App.formatDate(hackathon.startDate)}
                                        </div>
                                        <div>
                                            <span class="font-medium">Prize:</span> ${hackathon.prize}
                                        </div>
                                        <div>
                                            <span class="px-2 py-1 text-xs font-medium rounded-full ${this.getHackathonStatusColor(hackathon.status)}">
                                                ${hackathon.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex space-x-2">
                                    <button onclick="app.modules.admin.editHackathon(${hackathon.id})" class="btn-secondary">
                                        Edit
                                    </button>
                                    <button onclick="app.modules.admin.viewSubmissions(${hackathon.id})" class="btn-primary">
                                        Submissions
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderContentManagement() {
        return `
            <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Announcements -->
                    <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Announcements</h3>
                        <div class="space-y-3 mb-4">
                            <div class="text-sm text-gray-700 border-l-4 border-blue-500 pl-3">
                                New React course available - Join now!
                            </div>
                            <div class="text-sm text-gray-700 border-l-4 border-green-500 pl-3">
                                Hackathon registration opens tomorrow
                            </div>
                        </div>
                        <button onclick="app.modules.admin.sendAnnouncement()" class="btn-primary w-full">
                            Send New Announcement
                        </button>
                    </div>

                    <!-- Learning Paths -->
                    <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Learning Paths</h3>
                        <div class="space-y-2 mb-4">
                            <div class="text-sm text-gray-700">• Full Stack Development</div>
                            <div class="text-sm text-gray-700">• Data Science Fundamentals</div>
                            <div class="text-sm text-gray-700">• Mobile App Development</div>
                        </div>
                        <button onclick="app.modules.admin.manageLearningPaths()" class="btn-primary w-full">
                            Manage Paths
                        </button>
                    </div>

                    <!-- Certificates -->
                    <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Certificates</h3>
                        <div class="space-y-2 mb-4">
                            <div class="text-sm text-gray-700">Templates: 12</div>
                            <div class="text-sm text-gray-700">Issued this month: 234</div>
                            <div class="text-sm text-gray-700">Pending approval: 8</div>
                        </div>
                        <button onclick="app.modules.admin.manageCertificates()" class="btn-primary w-full">
                            Manage Certificates
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderReports() {
        return `
            <div class="space-y-6">
                <!-- Report Categories -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <button onclick="app.modules.admin.generateUserReport()" class="text-left p-6 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <i data-feather="users" class="w-6 h-6 text-blue-600"></i>
                        </div>
                        <h3 class="font-semibold text-gray-900 mb-2">User Reports</h3>
                        <p class="text-sm text-gray-600">Registration, engagement, and activity reports</p>
                    </button>

                    <button onclick="app.modules.admin.generateCourseReport()" class="text-left p-6 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-md transition-all">
                        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <i data-feather="book-open" class="w-6 h-6 text-green-600"></i>
                        </div>
                        <h3 class="font-semibold text-gray-900 mb-2">Course Reports</h3>
                        <p class="text-sm text-gray-600">Completion rates, popular courses, and feedback</p>
                    </button>

                    <button onclick="app.modules.admin.generateFinancialReport()" class="text-left p-6 bg-white border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all">
                        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                            <i data-feather="dollar-sign" class="w-6 h-6 text-purple-600"></i>
                        </div>
                        <h3 class="font-semibold text-gray-900 mb-2">Financial Reports</h3>
                        <p class="text-sm text-gray-600">Revenue, subscriptions, and payment analytics</p>
                    </button>

                    <button onclick="app.modules.admin.generateSystemReport()" class="text-left p-6 bg-white border border-gray-200 rounded-lg hover:border-orange-300 hover:shadow-md transition-all">
                        <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                            <i data-feather="activity" class="w-6 h-6 text-orange-600"></i>
                        </div>
                        <h3 class="font-semibold text-gray-900 mb-2">System Reports</h3>
                        <p class="text-sm text-gray-600">Performance, uptime, and technical metrics</p>
                    </button>
                </div>

                <!-- Recent Reports -->
                <div class="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
                    <div class="space-y-3">
                        <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <div>
                                <h4 class="font-medium text-gray-900">Monthly User Activity Report</h4>
                                <p class="text-sm text-gray-600">Generated on ${App.formatDate('2024-08-01')}</p>
                            </div>
                            <button class="btn-secondary">Download</button>
                        </div>
                        <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <div>
                                <h4 class="font-medium text-gray-900">Course Completion Analytics</h4>
                                <p class="text-sm text-gray-600">Generated on ${App.formatDate('2024-07-28')}</p>
                            </div>
                            <button class="btn-secondary">Download</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderSystemStatus() {
        return `
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">System Status</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                            <i data-feather="check" class="w-6 h-6 text-white"></i>
                        </div>
                        <h4 class="font-semibold text-green-900">All Systems Operational</h4>
                        <p class="text-sm text-green-700">99.9% uptime this month</p>
                    </div>
                    
                    <div class="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                            <i data-feather="server" class="w-6 h-6 text-white"></i>
                        </div>
                        <h4 class="font-semibold text-blue-900">Database Health</h4>
                        <p class="text-sm text-blue-700">Optimal performance</p>
                    </div>
                    
                    <div class="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <div class="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                            <i data-feather="shield" class="w-6 h-6 text-white"></i>
                        </div>
                        <h4 class="font-semibold text-purple-900">Security Status</h4>
                        <p class="text-sm text-purple-700">No threats detected</p>
                    </div>
                </div>
            </div>
        `;
    }

    getRoleColor(role) {
        const colors = {
            'Student': 'bg-blue-100 text-blue-800',
            'Instructor': 'bg-green-100 text-green-800',
            'Admin': 'bg-red-100 text-red-800'
        };
        return colors[role] || 'bg-gray-100 text-gray-800';
    }

    getStatusColor(status) {
        const colors = {
            'Active': 'bg-green-100 text-green-800',
            'Inactive': 'bg-yellow-100 text-yellow-800',
            'Suspended': 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    }

    getCourseStatusColor(status) {
        const colors = {
            'Published': 'bg-green-100 text-green-800',
            'Draft': 'bg-yellow-100 text-yellow-800',
            'Archived': 'bg-gray-100 text-gray-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    }

    getHackathonStatusColor(status) {
        const colors = {
            'Upcoming': 'bg-blue-100 text-blue-800',
            'Ongoing': 'bg-orange-100 text-orange-800',
            'Completed': 'bg-green-100 text-green-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    }

    switchView(viewId) {
        this.currentView = viewId;
        
        // Re-render the content
        const contentArea = document.querySelector('.bg-white.rounded-lg.shadow-sm.border.border-gray-200 .p-6');
        if (contentArea) {
            contentArea.innerHTML = this.renderAdminContent();
            feather.replace();
        }
        
        // Update tab styling
        document.querySelectorAll('.admin-tab').forEach(tab => {
            tab.className = tab.className.replace(
                'border-red-500 text-red-600',
                'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            );
        });
        
        event.target.className = event.target.className.replace(
            'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'border-red-500 text-red-600'
        );
    }

    // Action methods
    exportData() {
        app.showNotification('Exporting platform data...', 'info');
    }

    systemSettings() {
        app.showNotification('Opening system settings...', 'info');
    }

    addUser() {
        app.showNotification('Add user form will open here', 'info');
    }

    createCourse() {
        app.showNotification('Course creation wizard will open here', 'info');
    }

    sendAnnouncement() {
        app.showNotification('Announcement composer will open here', 'info');
    }

    backupSystem() {
        app.showNotification('System backup initiated...', 'success');
    }

    editUser(userId) {
        app.showNotification(`Editing user ${userId}...`, 'info');
    }

    suspendUser(userId) {
        app.showNotification(`User ${userId} suspended`, 'warning');
    }

    editCourse(courseId) {
        app.showNotification(`Editing course ${courseId}...`, 'info');
    }

    viewCourseStats(courseId) {
        app.showNotification(`Loading course ${courseId} statistics...`, 'info');
    }

    createHackathon() {
        app.showNotification('Hackathon creation form will open here', 'info');
    }

    editHackathon(hackathonId) {
        app.showNotification(`Editing hackathon ${hackathonId}...`, 'info');
    }

    viewSubmissions(hackathonId) {
        app.showNotification(`Loading submissions for hackathon ${hackathonId}...`, 'info');
    }

    manageLearningPaths() {
        app.showNotification('Learning paths management will open here', 'info');
    }

    manageCertificates() {
        app.showNotification('Certificate management will open here', 'info');
    }

    generateUserReport() {
        app.showNotification('Generating user report...', 'info');
    }

    generateCourseReport() {
        app.showNotification('Generating course report...', 'info');
    }

    generateFinancialReport() {
        app.showNotification('Generating financial report...', 'info');
    }

    generateSystemReport() {
        app.showNotification('Generating system report...', 'info');
    }

    init() {
        feather.replace();
        this.loadAdminData();
    }

    loadAdminData() {
        // Load admin dashboard data
        // In a real application, this would fetch from an API
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Admin;
}
