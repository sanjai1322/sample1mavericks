// Assessment module
class Assessment {
    constructor() {
        this.currentAssessment = null;
        this.assessments = [];
        this.userAnswers = {};
        this.timeRemaining = 0;
        this.timer = null;
    }

    render() {
        return `
            <div class="space-y-6">
                <!-- Assessment Header -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h2 class="text-2xl font-bold text-gray-900">Assessments</h2>
                            <p class="text-gray-600 mt-1">Test your knowledge and track your progress</p>
                        </div>
                        <button onclick="this.startNewAssessment()" class="btn-primary">
                            <i data-feather="play-circle" class="w-4 h-4 mr-2 inline"></i>
                            Start Assessment
                        </button>
                    </div>
                </div>

                <!-- Assessment Statistics -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    ${this.renderAssessmentStats()}
                </div>

                <!-- Available Assessments -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">Available Assessments</h3>
                    ${this.renderAvailableAssessments()}
                </div>

                <!-- Recent Results -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">Recent Results</h3>
                    ${this.renderRecentResults()}
                </div>
            </div>
        `;
    }

    renderAssessmentStats() {
        const stats = [
            {
                title: 'Completed',
                value: '24',
                icon: 'check-circle',
                color: 'green'
            },
            {
                title: 'Average Score',
                value: '87%',
                icon: 'trending-up',
                color: 'blue'
            },
            {
                title: 'Best Score',
                value: '98%',
                icon: 'award',
                color: 'yellow'
            },
            {
                title: 'Time Saved',
                value: '2.5h',
                icon: 'clock',
                color: 'purple'
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
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderAvailableAssessments() {
        const assessments = [
            {
                id: 1,
                title: 'JavaScript Fundamentals',
                description: 'Test your knowledge of basic JavaScript concepts',
                duration: '30 minutes',
                questions: 25,
                difficulty: 'Beginner',
                category: 'Programming'
            },
            {
                id: 2,
                title: 'React Components',
                description: 'Assessment on React component lifecycle and state management',
                duration: '45 minutes',
                questions: 30,
                difficulty: 'Intermediate',
                category: 'Frontend'
            },
            {
                id: 3,
                title: 'Database Design',
                description: 'Database normalization and SQL optimization',
                duration: '60 minutes',
                questions: 40,
                difficulty: 'Advanced',
                category: 'Backend'
            }
        ];

        return `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${assessments.map(assessment => `
                    <div class="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <h4 class="text-lg font-semibold text-gray-900">${assessment.title}</h4>
                                <p class="text-sm text-gray-600 mt-1">${assessment.description}</p>
                            </div>
                            <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                ${assessment.category}
                            </span>
                        </div>
                        
                        <div class="space-y-2 mb-4">
                            <div class="flex items-center text-sm text-gray-600">
                                <i data-feather="clock" class="w-4 h-4 mr-2"></i>
                                ${assessment.duration}
                            </div>
                            <div class="flex items-center text-sm text-gray-600">
                                <i data-feather="help-circle" class="w-4 h-4 mr-2"></i>
                                ${assessment.questions} questions
                            </div>
                            <div class="flex items-center text-sm text-gray-600">
                                <i data-feather="bar-chart" class="w-4 h-4 mr-2"></i>
                                ${assessment.difficulty}
                            </div>
                        </div>
                        
                        <button onclick="app.modules.assessment.startAssessment(${assessment.id})" 
                                class="w-full btn-primary">
                            Start Assessment
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderRecentResults() {
        const results = [
            {
                title: 'React Components',
                score: 92,
                date: '2024-08-05',
                status: 'Passed'
            },
            {
                title: 'JavaScript Fundamentals',
                score: 87,
                date: '2024-08-03',
                status: 'Passed'
            },
            {
                title: 'Database Design',
                score: 76,
                date: '2024-08-01',
                status: 'Passed'
            }
        ];

        if (results.length === 0) {
            return `
                <div class="text-center py-8">
                    <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <i data-feather="clipboard" class="w-6 h-6 text-gray-400"></i>
                    </div>
                    <p class="text-gray-500">No assessment results yet</p>
                    <p class="text-sm text-gray-400">Take your first assessment to see results here</p>
                </div>
            `;
        }

        return `
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Assessment
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Score
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        ${results.map(result => `
                            <tr class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900">${result.title}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="text-sm font-medium text-gray-900">${result.score}%</div>
                                        <div class="ml-2 w-16 bg-gray-200 rounded-full h-2">
                                            <div class="bg-blue-600 h-2 rounded-full" style="width: ${result.score}%"></div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    ${App.formatDate(result.date)}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${result.status === 'Passed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                                        ${result.status}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button class="text-blue-600 hover:text-blue-900 mr-3">View Details</button>
                                    <button class="text-green-600 hover:text-green-900">Retake</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    startAssessment(assessmentId) {
        // Show confirmation modal before starting
        const modal = this.createAssessmentModal(assessmentId);
        document.body.appendChild(modal);
    }

    createAssessmentModal(assessmentId) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50';
        modal.innerHTML = `
            <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div class="mt-3 text-center">
                    <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                        <i data-feather="play-circle" class="w-6 h-6 text-blue-600"></i>
                    </div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900 mt-4">Start Assessment</h3>
                    <div class="mt-2 px-7 py-3">
                        <p class="text-sm text-gray-500">
                            You are about to start an assessment. Make sure you have enough time to complete it.
                        </p>
                        <div class="mt-4 space-y-2 text-sm text-gray-600">
                            <div class="flex justify-between">
                                <span>Duration:</span>
                                <span class="font-medium">30 minutes</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Questions:</span>
                                <span class="font-medium">25</span>
                            </div>
                        </div>
                    </div>
                    <div class="items-center px-4 py-3 space-x-3 flex justify-end">
                        <button onclick="this.parentElement.parentElement.parentElement.parentElement.remove()" 
                                class="btn-secondary">
                            Cancel
                        </button>
                        <button onclick="app.modules.assessment.beginAssessment(${assessmentId}); this.parentElement.parentElement.parentElement.parentElement.remove();" 
                                class="btn-primary">
                            Begin
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        feather.replace();
        return modal;
    }

    beginAssessment(assessmentId) {
        // This would typically load the assessment interface
        app.showNotification('Assessment started! This feature will be implemented soon.', 'info');
    }

    init() {
        feather.replace();
        this.loadAssessmentData();
    }

    loadAssessmentData() {
        // Load user's assessment history and available assessments
        // In a real application, this would fetch from an API
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Assessment;
}
