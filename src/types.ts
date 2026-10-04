export type Platform = 'Claude' | 'ChatGPT' | 'Gemini' | 'Universal Prompt';

export interface RoadmapFormData {
  skill: string;
  primaryGoal: string;
  targetOutcome: string;
  education: string;
  currentYear: string;
  knowledgeLevel: string;
  relatedSkills: string;
  dailyTime: string;
  customDailyTime: string;
  studyDays: string;
  deadline: string;
  customDeadline: string;
  resourcePreference: string;
  learningFormats: string[];
  teachingLanguage: string;
  learningApproach: string;
}

export type StepNumber = 1 | 2 | 3 | 4 | 5;

export interface StepDefinition {
  number: StepNumber;
  label: string;
  description: string;
  eyebrow: string;
}

export const steps: StepDefinition[] = [
  { number: 1, label: 'Learning goal', description: 'Set your direction', eyebrow: '01 / START' },
  { number: 2, label: 'Background', description: 'Map your baseline', eyebrow: '02 / CONTEXT' },
  { number: 3, label: 'Availability', description: 'Make it realistic', eyebrow: '03 / TIME' },
  { number: 4, label: 'Preferences', description: 'Shape the method', eyebrow: '04 / STYLE' },
  { number: 5, label: 'Review & build', description: 'Choose your AI', eyebrow: '05 / OUTPUT' },
];

export const defaultFormData: RoadmapFormData = {
  skill: '',
  primaryGoal: '',
  targetOutcome: '',
  education: '',
  currentYear: '',
  knowledgeLevel: '',
  relatedSkills: '',
  dailyTime: '',
  customDailyTime: '',
  studyDays: '',
  deadline: '',
  customDeadline: '',
  resourcePreference: '',
  learningFormats: [],
  teachingLanguage: '',
  learningApproach: '',
};

export const skillSuggestions = [
  // Software, web, and mobile
  'Software Engineering',
  'Frontend Development',
  'Backend Development',
  'Full-Stack Web Development',
  'HTML / CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Vue.js',
  'Angular',
  'Node.js',
  'Python',
  'Java',
  'C',
  'C++',
  'C# / .NET',
  'Go',
  'Rust',
  'PHP',
  'Ruby on Rails',
  'Swift / iOS Development',
  'Kotlin / Android Development',
  'Flutter / Cross-Platform Apps',
  'Game Development',
  'Unity',
  'Unreal Engine',
  'Blockchain Development',
  'Smart Contract Development',
  'API Development',
  'System Design',
  'Software Architecture',
  'Algorithms and Data Structures',
  'Competitive Programming',
  'Open Source Contribution',

  // Data, AI, and emerging technology
  'Data Analysis',
  'Data Analytics',
  'Data Science',
  'Business Intelligence',
  'SQL',
  'Excel / Advanced Excel',
  'Power BI',
  'Tableau',
  'Looker Studio',
  'Data Engineering',
  'ETL / Data Pipelines',
  'Database Administration',
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'Artificial Intelligence',
  'Machine Learning',
  'Deep Learning',
  'Natural Language Processing',
  'Computer Vision',
  'Generative AI',
  'Large Language Models',
  'Prompt Engineering',
  'AI Agents',
  'MLOps',
  'Robotics',
  'Internet of Things',

  // Cloud, infrastructure, and security
  'Cloud Computing',
  'Amazon Web Services (AWS)',
  'Microsoft Azure',
  'Google Cloud Platform (GCP)',
  'DevOps',
  'Site Reliability Engineering',
  'Docker',
  'Kubernetes',
  'Terraform / Infrastructure as Code',
  'Linux System Administration',
  'Networking',
  'Cybersecurity',
  'Ethical Hacking',
  'Penetration Testing',
  'Application Security',
  'Cloud Security',
  'Digital Forensics',
  'Privacy and Data Protection',

  // Design and creative work
  'UI / UX Design',
  'Product Design',
  'Interaction Design',
  'User Research',
  'Design Systems',
  'Graphic Design',
  'Visual Design',
  'Brand Identity Design',
  'Figma',
  'Motion Graphics',
  '3D Modeling',
  'Animation',
  'Video Editing',
  'Photography',
  'Music Production',
  'Content Creation',

  // Business, marketing, and professional skills
  'Digital Marketing',
  'Search Engine Optimization (SEO)',
  'Social Media Marketing',
  'Content Marketing',
  'Email Marketing',
  'Performance Marketing',
  'Google Ads',
  'Marketing Analytics',
  'Sales',
  'Business Development',
  'Product Management',
  'Project Management',
  'Agile and Scrum',
  'Entrepreneurship',
  'Business Analysis',
  'Operations Management',
  'Supply Chain Management',
  'Human Resources',
  'Recruitment',
  'Customer Success',
  'Public Speaking',
  'Leadership',
  'Communication Skills',
  'Negotiation',
  'Time Management',
  'Critical Thinking',

  // Finance, writing, languages, and education
  'Accounting',
  'Financial Analysis',
  'Financial Modeling',
  'Investment Analysis',
  'Personal Finance',
  'Stock Market Investing',
  'Economics',
  'Technical Writing',
  'Creative Writing',
  'Copywriting',
  'Blogging',
  'Journalism',
  'English Language',
  'Hindi Language',
  'Spanish Language',
  'French Language',
  'German Language',
  'Japanese Language',
  'Public Policy',
  'Research Methods',
  'Teaching and Instructional Design',

  // Health, science, and practical skills
  'Biology',
  'Chemistry',
  'Physics',
  'Mathematics',
  'Psychology',
  'Healthcare Administration',
  'Nutrition',
  'Fitness Training',
  'Mental Health Education',
  'Cooking',
  'Baking',
  'Interior Design',
  'Fashion Design',
  'Architecture',
  'AutoCAD',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Renewable Energy',
  'Agriculture and Gardening',
];

export const goalOptions = ['Internship', 'Job preparation', 'Freelancing', 'Building projects', 'Academic knowledge', 'Personal interest', 'Other'];
export const educationOptions = ['BCA', 'B.Tech', 'B.Sc', 'B.Com', 'BA', 'Diploma', 'School student', 'Graduate', 'Other'];
export const yearOptions = ['1st year', '2nd year', '3rd year', '4th year', 'Final year', 'Graduated', 'Other'];
export const knowledgeOptions = ['Complete beginner', 'Basic knowledge', 'Intermediate', 'Advanced'];
export const dailyTimeOptions = ['30 minutes', '1 hour', '2 hours', '3 hours', '4+ hours', 'Custom'];
export const studyDayOptions = ['3 days', '4 days', '5 days', '6 days', '7 days'];
export const deadlineOptions = ['No specific deadline', '1 month', '2 months', '3 months', '6 months', 'Custom'];
export const resourceOptions = ['Completely free', 'Paid', 'Mix of free and paid'];
export const formatOptions = ['YouTube videos', 'Documentation', 'Online courses', 'Books', 'Hands-on projects', 'Interactive platforms'];
export const languageOptions = ['English', 'Hindi', 'Hinglish', 'No preference'];
export const approachOptions = ['Theory first', 'Project based', 'Balanced learning', 'Practice first'];
