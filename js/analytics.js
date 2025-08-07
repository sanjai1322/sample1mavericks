// Analytics module
class Analytics {
    constructor() {
        this.currentView = 'overview';
        this.timeRange = '30days';
        this.analyticsData = {
            overview: {},
            users: {},
            courses: {},
            engagement: {},
            performance: {}
        };
    }

    render() {
        return `
            <div class="space-y-6">
                <!-- Analytics Header -->
                <div class="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg shadow-lg text-white p-8">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 class="text-3xl font-bold mb-2">📊 Analytics Dashboard</h2>
                            <p class="text-indigo-100 text-lg">Insights and data visualization for informed decisions</p>
                        </div>
                        <div class="mt-4 md:mt-0 flex space-x-3">
                            <select id="time-range-filter" class="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium">
                                <option value="7days">Last 7 days</option>
                                <option value="30days" selected>Last 30 days</option>
                                <option value="90days">Last 90 days</option>
                                <option value="1year">Last year</option>
                            </select>
                            <button onclick="app.modules.analytics.exportReport()" class="bg-indigo-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                                <i data-feather="download" class="w-4 h-4 mr-2 inline"></i>
                                Export Report
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Analytics Navigation -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="border-b border-gray-200">
                        <nav class="-mb-px flex space-x-8 px-6">
                            ${this.renderAnalyticsTabs()}
                        </nav>
                    </div>
                    <div class="p-6">
                        ${this.renderAnalyticsContent()}
                    </div>
                </div>

                <!-- Key Metrics Summary -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    ${this.renderKeyMetrics()}
                </div>
            </div>
        `;
    }

    renderAnalyticsTabs() {
        const tabs = [
            { id: 'overview', label: 'Overview', icon: 'pie-chart' },
            { id: 'users', label: 'Users', icon: 'users' },
            { id: 'courses', label: 'Courses', icon: 'book-open' },
            { id: 'engagement', label: 'Engagement', icon: 'activity' },
            { id: 'performance', label: 'Performance', icon: 'trending-up' }
        ];

        return tabs.map(tab => `
            <button onclick="app.modules.analytics.switchView('${tab.id}')"
                    class="analytics-tab flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                        this.currentView === tab.id 
                            ? 'border-indigo-500 text-indigo-600' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }">
                <i data-feather="${tab.icon}" class="w-4 h-4 mr-2"></i>
                ${tab.label}
            </button>
        `).join('');
    }

    renderAnalyticsContent() {
        switch (this.currentView) {
            case 'overview':
                return this.renderOverview();
            case 'users':
                return this.renderUserAnalytics();
            case 'courses':
                return this.renderCourseAnalytics();
            case 'engagement':
                return this.renderEngagementAnalytics();
            case 'performance':
                return this.renderPerformanceAnalytics();
            default:
                return this.renderOverview();
        }
    }

    renderKeyMetrics() {
        const metrics = [
            {
                title: 'Total Revenue',
                value: '$124,580',
                change: '+12.5%',
                trend: 'up',
                icon: 'dollar-sign',
                color: 'green'
            },
            {
                title: 'Active Users',
                value: '15,420',
                change: '+8.2%',
                trend: 'up',
                icon: 'users',
                color: 'blue'
            },
            {
                title: 'Course Completions',
                value: '2,847',
                change: '+15.3%',
                trend: 'up',
                icon: 'award',
                color: 'purple'
            },
            {
                title: 'Avg. Session Time',
                value: '24.5 min',
                change: '-2.1%',
                trend: 'down',
                icon: 'clock',
                color: 'orange'
            }
        ];

        return metrics.map(metric => `
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600">${metric.title}</p>
                        <p class="text-2xl font-bold text-gray-900 mt-1">${metric.value}</p>
                    </div>
                    <div class="w-12 h-12 bg-${metric.color}-100 rounded-lg flex items-center justify-center">
                        <i data-feather="${metric.icon}" class="w-6 h-6 text-${metric.color}-600"></i>
                    </div>
                </div>
                <div class="mt-4 flex items-center">
                    <span class="text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}">
                        <i data-feather="trending-${metric.trend}" class="w-4 h-4 inline mr-1"></i>
                        ${metric.change}
                    </span>
                    <span class="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
            </div>
        `).join('');
    }

    renderOverview() {
        return `
            <div class="space-y-6">
                <!-- Overview Charts -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Skill Performance Bar Chart -->
                    <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-lg font-semibold text-gray-900">Skill Performance Across Users</h3>
                            <button onclick="app.modules.analytics.generateReport('skills')" class="btn-primary text-sm">
                                <i data-feather="download" class="w-4 h-4 mr-1 inline"></i>
                                Export
                            </button>
                        </div>
                        <canvas id="skillPerformanceChart" class="h-64"></canvas>
                    </div>

                    <!-- Module Completion Pie Chart -->
                    <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-lg font-semibold text-gray-900">Module Completion Rates</h3>
                            <button onclick="app.modules.analytics.generateReport('completion')" class="btn-primary text-sm">
                                <i data-feather="download" class="w-4 h-4 mr-1 inline"></i>
                                Export
                            </button>
                        </div>
                        <canvas id="moduleCompletionChart" class="h-64"></canvas>
                    </div>
                </div>

                <!-- Top Performing Content -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Top Courses -->
                    <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Top Performing Courses</h3>
                        <div class="space-y-3">
                            ${this.renderTopCourses()}
                        </div>
                    </div>

                    <!-- Geographic Distribution -->
                    <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Geographic Distribution</h3>
                        <div class="space-y-3">
                            ${this.renderGeographicData()}
                        </div>
                    </div>
                </div>

                <!-- Report Generation -->
                <div class="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Generate Reports</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button onclick="app.modules.analytics.generateReport('complete')" class="btn-primary flex items-center justify-center p-4">
                            <i data-feather="file-text" class="w-5 h-5 mr-2"></i>
                            Complete Analytics Report (JSON)
                        </button>
                        <button onclick="app.modules.analytics.generateCSVReport()" class="btn-secondary flex items-center justify-center p-4">
                            <i data-feather="table" class="w-5 h-5 mr-2"></i>
                            User Data Report (CSV)
                        </button>
                        <button onclick="app.modules.analytics.generatePDFReport()" class="btn-primary flex items-center justify-center p-4">
                            <i data-feather="file" class="w-5 h-5 mr-2"></i>
                            Visual Report (PDF)
                        </button>
                    </div>
                </div>

                <!-- Platform Health -->
                <div class="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Platform Health Indicators</h3>
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                        ${this.renderHealthIndicators()}
                    </div>
                </div>
            </div>
        `;
    }

    renderUserAnalytics() {
        return `
            <div class="space-y-6">
                <!-- User Demographics -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Age Demographics</h3>
                        <div class="space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600">18-24</span>
                                <div class="flex items-center">
                                    <div class="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                        <div class="bg-blue-600 h-2 rounded-full" style="width: 35%"></div>
                                    </div>
                                    <span class="text-sm font-medium text-gray-900">35%</span>
                                </div>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600">25-34</span>
                                <div class="flex items-center">
                                    <div class="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                        <div class="bg-blue-600 h-2 rounded-full" style="width: 42%"></div>
                                    </div>
                                    <span class="text-sm font-medium text-gray-900">42%</span>
                                </div>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600">35-44</span>
                                <div class="flex items-center">
                                    <div class="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                        <div class="bg-blue-600 h-2 rounded-full" style="width: 18%"></div>
                                    </div>
                                    <span class="text-sm font-medium text-gray-900">18%</span>
                                </div>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600">45+</span>
                                <div class="flex items-center">
                                    <div class="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                        <div class="bg-blue-600 h-2 rounded-full" style="width: 5%"></div>
                                    </div>
                                    <span class="text-sm font-medium text-gray-900">5%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">User Segments</h3>
                        <div class="space-y-4">
                            <div class="p-3 bg-blue-50 rounded-lg">
                                <div class="flex items-center justify-between">
                                    <span class="font-medium text-blue-900">Active Learners</span>
                                    <span class="text-blue-600">8,420</span>
                                </div>
                                <p class="text-sm text-blue-700">Daily active users</p>
                            </div>
                            <div class="p-3 bg-green-50 rounded-lg">
                                <div class="flex items-center justify-between">
                                    <span class="font-medium text-green-900">Premium Users</span>
                                    <span class="text-green-600">3,250</span>
                                </div>
                                <p class="text-sm text-green-700">Paid subscribers</p>
                            </div>
                            <div class="p-3 bg-orange-50 rounded-lg">
                                <div class="flex items-center justify-between">
                                    <span class="font-medium text-orange-900">New Users</span>
                                    <span class="text-orange-600">1,890</span>
                                </div>
                                <p class="text-sm text-orange-700">This month</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Retention Metrics</h3>
                        <div class="space-y-4">
                            <div>
                                <div class="flex items-center justify-between mb-1">
                                    <span class="text-sm text-gray-600">Day 1 Retention</span>
                                    <span class="text-sm font-medium text-gray-900">78%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-green-600 h-2 rounded-full" style="width: 78%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex items-center justify-between mb-1">
                                    <span class="text-sm text-gray-600">Day 7 Retention</span>
                                    <span class="text-sm font-medium text-gray-900">45%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-yellow-600 h-2 rounded-full" style="width: 45%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex items-center justify-between mb-1">
                                    <span class="text-sm text-gray-600">Day 30 Retention</span>
                                    <span class="text-sm font-medium text-gray-900">23%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-red-600 h-2 rounded-full" style="width: 23%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- User Behavior -->
                <div class="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">User Behavior Patterns</h3>
                    <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <div class="text-center">
                            <i data-feather="activity" class="w-12 h-12 text-gray-400 mx-auto mb-2"></i>
                            <p class="text-gray-600">User activity heatmap visualization</p>
                            <p class="text-sm text-gray-500">Peak activity: 2-4 PM weekdays</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderCourseAnalytics() {
        return `
            <div class="space-y-6">
                <!-- Course Performance -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Course Completion Rates</h3>
                        <div class="space-y-4">
                            ${this.renderCourseCompletionRates()}
                        </div>
                    </div>

                    <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Popular Learning Paths</h3>
                        <div class="space-y-3">
                            ${this.renderPopularLearningPaths()}
                        </div>
                    </div>
                </div>

                <!-- Course Statistics -->
                <div class="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Course Statistics Overview</h3>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollments</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completions</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Rating</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                ${this.renderCourseStatisticsTable()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    renderEngagementAnalytics() {
        return `
            <div class="space-y-6">
                <!-- Engagement Metrics -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Session Analytics</h3>
                        <div class="space-y-3">
                            <div class="flex justify-between">
                                <span class="text-sm text-gray-600">Avg. Session Duration</span>
                                <span class="font-medium text-gray-900">24.5 min</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm text-gray-600">Pages per Session</span>
                                <span class="font-medium text-gray-900">5.2</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm text-gray-600">Bounce Rate</span>
                                <span class="font-medium text-gray-900">32%</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Content Interaction</h3>
                        <div class="space-y-3">
                            <div class="flex justify-between">
                                <span class="text-sm text-gray-600">Video Completion</span>
                                <span class="font-medium text-gray-900">78%</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm text-gray-600">Quiz Attempts</span>
                                <span class="font-medium text-gray-900">12,450</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm text-gray-600">Discussion Posts</span>
                                <span class="font-medium text-gray-900">3,290</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Social Features</h3>
                        <div class="space-y-3">
                            <div class="flex justify-between">
                                <span class="text-sm text-gray-600">Comments</span>
                                <span class="font-medium text-gray-900">8,920</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm text-gray-600">Shares</span>
                                <span class="font-medium text-gray-900">1,560</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm text-gray-600">Bookmarks</span>
                                <span class="font-medium text-gray-900">4,780</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Engagement Timeline -->
                <div class="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Daily Engagement Timeline</h3>
                    <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <div class="text-center">
                            <i data-feather="bar-chart-2" class="w-12 h-12 text-gray-400 mx-auto mb-2"></i>
                            <p class="text-gray-600">Engagement timeline chart visualization</p>
                            <p class="text-sm text-gray-500">Peak engagement: 2-4 PM and 7-9 PM</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderPerformanceAnalytics() {
        return `
            <div class="space-y-6">
                <!-- Performance Metrics -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="bg-white border border-gray-200 rounded-lg p-6 text-center">
                        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <i data-feather="zap" class="w-6 h-6 text-green-600"></i>
                        </div>
                        <div class="text-2xl font-bold text-gray-900">1.2s</div>
                        <div class="text-sm text-gray-600">Avg. Load Time</div>
                    </div>

                    <div class="bg-white border border-gray-200 rounded-lg p-6 text-center">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <i data-feather="server" class="w-6 h-6 text-blue-600"></i>
                        </div>
                        <div class="text-2xl font-bold text-gray-900">99.9%</div>
                        <div class="text-sm text-gray-600">Uptime</div>
                    </div>

                    <div class="bg-white border border-gray-200 rounded-lg p-6 text-center">
                        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <i data-feather="cpu" class="w-6 h-6 text-purple-600"></i>
                        </div>
                        <div class="text-2xl font-bold text-gray-900">45%</div>
                        <div class="text-sm text-gray-600">CPU Usage</div>
                    </div>

                    <div class="bg-white border border-gray-200 rounded-lg p-6 text-center">
                        <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <i data-feather="hard-drive" class="w-6 h-6 text-orange-600"></i>
                        </div>
                        <div class="text-2xl font-bold text-gray-900">78%</div>
                        <div class="text-sm text-gray-600">Storage Used</div>
                    </div>
                </div>

                <!-- Performance Charts -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Response Time Trends</h3>
                        <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                            <div class="text-center">
                                <i data-feather="activity" class="w-12 h-12 text-gray-400 mx-auto mb-2"></i>
                                <p class="text-gray-600">Response time chart visualization</p>
                                <p class="text-sm text-gray-500">Average: 1.2s</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Error Rate Monitoring</h3>
                        <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                            <div class="text-center">
                                <i data-feather="alert-triangle" class="w-12 h-12 text-gray-400 mx-auto mb-2"></i>
                                <p class="text-gray-600">Error rate chart visualization</p>
                                <p class="text-sm text-gray-500">Current rate: 0.02%</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- System Health -->
                <div class="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">System Health Status</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                            <i data-feather="check-circle" class="w-8 h-8 text-green-600 mx-auto mb-2"></i>
                            <div class="font-semibold text-green-900">Database</div>
                            <div class="text-sm text-green-700">Operational</div>
                        </div>
                        <div class="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                            <i data-feather="check-circle" class="w-8 h-8 text-green-600 mx-auto mb-2"></i>
                            <div class="font-semibold text-green-900">API Services</div>
                            <div class="text-sm text-green-700">Operational</div>
                        </div>
                        <div class="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                            <i data-feather="check-circle" class="w-8 h-8 text-green-600 mx-auto mb-2"></i>
                            <div class="font-semibold text-green-900">CDN</div>
                            <div class="text-sm text-green-700">Operational</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderTopCourses() {
        const courses = [
            { name: 'JavaScript Fundamentals', enrollments: 1420, rating: 4.9 },
            { name: 'React Masterclass', enrollments: 1235, rating: 4.8 },
            { name: 'Python for AI', enrollments: 892, rating: 4.7 },
            { name: 'Database Design', enrollments: 567, rating: 4.6 }
        ];

        return courses.map(course => `
            <div class="flex items-center justify-between">
                <div>
                    <h4 class="font-medium text-gray-900">${course.name}</h4>
                    <p class="text-sm text-gray-600">${course.enrollments.toLocaleString()} enrollments</p>
                </div>
                <div class="flex items-center">
                    <i data-feather="star" class="w-4 h-4 text-yellow-400 mr-1"></i>
                    <span class="text-sm font-medium text-gray-900">${course.rating}</span>
                </div>
            </div>
        `).join('');
    }

    renderGeographicData() {
        const regions = [
            { name: 'North America', percentage: 45, users: 6939 },
            { name: 'Europe', percentage: 32, users: 4934 },
            { name: 'Asia Pacific', percentage: 18, users: 2776 },
            { name: 'Others', percentage: 5, users: 771 }
        ];

        return regions.map(region => `
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <div class="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                    <span class="text-sm text-gray-900">${region.name}</span>
                </div>
                <div class="text-right">
                    <div class="text-sm font-medium text-gray-900">${region.percentage}%</div>
                    <div class="text-xs text-gray-500">${region.users.toLocaleString()} users</div>
                </div>
            </div>
        `).join('');
    }

    renderHealthIndicators() {
        const indicators = [
            { name: 'API Response', value: '99.8%', status: 'good' },
            { name: 'Database', value: '100%', status: 'good' },
            { name: 'CDN', value: '99.9%', status: 'good' },
            { name: 'Storage', value: '78%', status: 'warning' }
        ];

        return indicators.map(indicator => `
            <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center ${
                    indicator.status === 'good' ? 'bg-green-100' : 'bg-yellow-100'
                }">
                    <i data-feather="${indicator.status === 'good' ? 'check' : 'alert-triangle'}" 
                       class="w-8 h-8 ${indicator.status === 'good' ? 'text-green-600' : 'text-yellow-600'}"></i>
                </div>
                <div class="font-semibold text-gray-900">${indicator.value}</div>
                <div class="text-sm text-gray-600">${indicator.name}</div>
            </div>
        `).join('');
    }

    renderCourseCompletionRates() {
        const courses = [
            { name: 'JavaScript Fundamentals', rate: 85 },
            { name: 'React Masterclass', rate: 78 },
            { name: 'Python for AI', rate: 72 },
            { name: 'Database Design', rate: 68 }
        ];

        return courses.map(course => `
            <div>
                <div class="flex items-center justify-between mb-1">
                    <span class="text-sm text-gray-600">${course.name}</span>
                    <span class="text-sm font-medium text-gray-900">${course.rate}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-green-600 h-2 rounded-full" style="width: ${course.rate}%"></div>
                </div>
            </div>
        `).join('');
    }

    renderPopularLearningPaths() {
        const paths = [
            { name: 'Full Stack Development', students: 2340 },
            { name: 'Data Science', students: 1890 },
            { name: 'Mobile Development', students: 1560 },
            { name: 'DevOps Engineering', students: 1230 }
        ];

        return paths.map(path => `
            <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <span class="font-medium text-gray-900">${path.name}</span>
                <span class="text-sm text-gray-600">${path.students.toLocaleString()} students</span>
            </div>
        `).join('');
    }

    renderCourseStatisticsTable() {
        const courseStats = [
            { name: 'JavaScript Fundamentals', enrollments: 1420, completions: 1207, rating: 4.9, revenue: '$42,600' },
            { name: 'React Masterclass', enrollments: 1235, completions: 963, rating: 4.8, revenue: '$37,050' },
            { name: 'Python for AI', enrollments: 892, completions: 642, rating: 4.7, revenue: '$26,760' },
            { name: 'Database Design', enrollments: 567, completions: 386, rating: 4.6, revenue: '$17,010' }
        ];

        return courseStats.map(course => `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${course.name}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${course.enrollments.toLocaleString()}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${course.completions.toLocaleString()}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div class="flex items-center">
                        <i data-feather="star" class="w-4 h-4 text-yellow-400 mr-1"></i>
                        ${course.rating}
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    ${course.revenue}
                </td>
            </tr>
        `).join('');
    }

    switchView(viewId) {
        this.currentView = viewId;
        
        // Re-render the content
        const contentArea = document.querySelector('.bg-white.rounded-lg.shadow-sm.border.border-gray-200 .p-6');
        if (contentArea) {
            contentArea.innerHTML = this.renderAnalyticsContent();
            feather.replace();
            // Re-initialize charts if on overview
            if (viewId === 'overview') {
                this.initializeCharts();
            }
        }
        
        // Update tab styling
        document.querySelectorAll('.analytics-tab').forEach(tab => {
            tab.className = tab.className.replace(
                'border-indigo-500 text-indigo-600',
                'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            );
        });
        
        if (event && event.target) {
            event.target.className = event.target.className.replace(
                'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'border-indigo-500 text-indigo-600'
            );
        }
    }

    exportReport() {
        app.showNotification('Exporting analytics report...', 'info');
    }

    init() {
        feather.replace();
        this.setupTimeRangeFilter();
        this.loadAnalyticsData();
        // Initialize charts after a short delay to ensure DOM is ready
        this.initializeCharts();
    }

    setupTimeRangeFilter() {
        const timeRangeFilter = document.getElementById('time-range-filter');
        if (timeRangeFilter) {
            timeRangeFilter.addEventListener('change', (e) => {
                this.timeRange = e.target.value;
                this.loadAnalyticsData();
                app.showNotification(`Analytics updated for ${e.target.value} timeframe`, 'info');
            });
        }
    }

    loadAnalyticsData() {
        // Load analytics data based on current view and time range
        // In a real application, this would fetch from an API
    }

    initializeCharts() {
        // Initialize Skill Performance Bar Chart
        setTimeout(() => {
            const skillCtx = document.getElementById('skillPerformanceChart');
            if (skillCtx) {
                new Chart(skillCtx, {
                    type: 'bar',
                    data: {
                        labels: ['JavaScript', 'Python', 'React', 'Node.js', 'Data Science', 'Machine Learning', 'UI/UX Design'],
                        datasets: [{
                            label: 'Average Score',
                            data: [78, 85, 72, 68, 91, 82, 75],
                            backgroundColor: [
                                '#3b82f6', '#ef4444', '#10b981', '#f59e0b',
                                '#8b5cf6', '#06b6d4', '#ec4899'
                            ],
                            borderColor: [
                                '#2563eb', '#dc2626', '#059669', '#d97706',
                                '#7c3aed', '#0891b2', '#db2777'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            },
                            title: {
                                display: true,
                                text: 'Average User Scores by Skill'
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 100
                            }
                        }
                    }
                });
            }

            // Initialize Module Completion Pie Chart
            const moduleCtx = document.getElementById('moduleCompletionChart');
            if (moduleCtx) {
                new Chart(moduleCtx, {
                    type: 'pie',
                    data: {
                        labels: ['Completed', 'In Progress', 'Not Started'],
                        datasets: [{
                            data: [65, 25, 10],
                            backgroundColor: [
                                '#10b981',
                                '#f59e0b', 
                                '#ef4444'
                            ],
                            borderColor: [
                                '#059669',
                                '#d97706',
                                '#dc2626'
                            ],
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom'
                            },
                            title: {
                                display: true,
                                text: 'Module Completion Distribution'
                            }
                        }
                    }
                });
            }
        }, 100);
    }
    
    generateReport(type = 'complete') {
        const reportData = {
            timestamp: new Date().toISOString(),
            type: type,
            data: {}
        };

        switch (type) {
            case 'skills':
                reportData.data = {
                    skillPerformance: {
                        'JavaScript': { averageScore: 78, totalUsers: 342 },
                        'Python': { averageScore: 85, totalUsers: 298 },
                        'React': { averageScore: 72, totalUsers: 256 },
                        'Node.js': { averageScore: 68, totalUsers: 189 },
                        'Data Science': { averageScore: 91, totalUsers: 145 },
                        'Machine Learning': { averageScore: 82, totalUsers: 123 },
                        'UI/UX Design': { averageScore: 75, totalUsers: 167 }
                    }
                };
                break;
            case 'completion':
                reportData.data = {
                    moduleCompletion: {
                        completed: 65,
                        inProgress: 25,
                        notStarted: 10,
                        totalModules: 847,
                        completedModules: 551,
                        inProgressModules: 212,
                        notStartedModules: 84
                    }
                };
                break;
            default:
                reportData.data = {
                    overview: {
                        totalUsers: 15420,
                        activeUsers: 8420,
                        totalRevenue: 124580,
                        courseCompletions: 2847,
                        avgSessionTime: 24.5
                    },
                    skillPerformance: {
                        'JavaScript': { averageScore: 78, totalUsers: 342 },
                        'Python': { averageScore: 85, totalUsers: 298 },
                        'React': { averageScore: 72, totalUsers: 256 },
                        'Node.js': { averageScore: 68, totalUsers: 189 },
                        'Data Science': { averageScore: 91, totalUsers: 145 },
                        'Machine Learning': { averageScore: 82, totalUsers: 123 },
                        'UI/UX Design': { averageScore: 75, totalUsers: 167 }
                    },
                    moduleCompletion: {
                        completed: 65,
                        inProgress: 25,
                        notStarted: 10
                    },
                    userSegments: {
                        activeLearners: 8420,
                        premiumUsers: 3250,
                        newUsers: 1890
                    }
                };
        }

        // Create and download JSON file
        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `analytics-report-${type}-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        app.showNotification(`${type.charAt(0).toUpperCase() + type.slice(1)} report generated successfully!`, 'success');
    }
    
    generateCSVReport() {
        // Generate sample user data for CSV
        const userData = app.modules.admin.adminData.users.map(user => {
            return {
                Name: user.name,
                Email: user.email,
                Skills: user.skills.join('; '),
                Score: user.score,
                Status: user.status,
                'Last Updated': user.lastUpdated,
                'Completed Modules': user.progress.completedModules,
                'Total Modules': user.progress.totalModules,
                'Progress Percentage': Math.round((user.progress.completedModules / user.progress.totalModules) * 100),
                'Streak Days': user.progress.streakDays,
                Badges: user.progress.badges
            };
        });

        // Convert to CSV
        const csvContent = this.convertToCSV(userData);
        
        // Create and download CSV file
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `user-data-report-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        app.showNotification('CSV report generated successfully!', 'success');
    }
    
    convertToCSV(data) {
        if (!data.length) return '';
        
        const headers = Object.keys(data[0]);
        const csvRows = [headers.join(',')];
        
        for (const row of data) {
            const values = headers.map(header => {
                const value = row[header];
                return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
            });
            csvRows.push(values.join(','));
        }
        
        return csvRows.join('\n');
    }
    
    generatePDFReport() {
        // This would typically integrate with a PDF library
        alert('PDF report generation would require a PDF library like jsPDF. For now, use the JSON or CSV reports.');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Analytics;
}
