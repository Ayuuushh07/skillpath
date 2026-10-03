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
  'Web Development',
  'AI / Machine Learning',
  'Python',
  'Data Science',
  'Cybersecurity',
  'UI / UX Design',
  'Digital Marketing',
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
