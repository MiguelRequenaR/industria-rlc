export interface SubService {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  detailedDescription?: string;
  benefits?: string[];
  applications?: string[];
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  subServices: SubService[];
}

export interface Experience {
  id: string;
  title: string;
  slug: string;
  client: string;
  location: string;
  date: string;
  description: string;
  features: string[];
  image: string[];
}