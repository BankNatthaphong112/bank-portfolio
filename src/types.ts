export interface Project {
  id: string;
  name: string;
  type: string;
  description: string;
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  badge?: string;
  imageUrl?: string;
  images?: string[];
  previewType?: 'shopfloor' | 'ai-skin' | 'ecommerce' | 'portfolio' | 'dashboard' | 'custom';
}

export interface SkillCategory {
  id: string;
  title: string;
  thaiTitle: string;
  iconName: string;
  skills: {
    name: string;
    level?: string;
    description: string;
  }[];
}

export interface EducationItem {
  degree: string;
  major?: string;
  faculty?: string;
  institution: string;
  location?: string;
  period: string;
  gpa?: string;
  status?: string;
  highlights: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  companyType?: string;
  period: string;
  responsibilities: string[];
  skills: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  category: string;
  status: string;
}
