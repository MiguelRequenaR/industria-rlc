export interface Course {
  id: string;
  title: string;
  slug: string;
  imageCard: string;
  imageDetail: string;
  description: string;
  detailedDescription: string;
  badges: {
    id: string;
    duration: string;
    level: string;
    modality?: string;
  }[];
  objectives: string[];
  requirements: string[];
  duration: string;
  modality: string;
  price: number;
  instructor: {
    name: string;
    bio: string;
    experience: string;
  };
  syllabus: {
    id: string;
    module: string;
    topics: string[];
    duration: string;
  }[];
  certificate: boolean;
  includes: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  author: {
    name: string;
    avatar?: string;
  };
  date: string;
  readTime: string;
  content: {
    type: 'text' | 'image' | 'heading';
    value: string;
  }[];
  featured?: boolean;
}