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