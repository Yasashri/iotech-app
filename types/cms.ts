export interface StrapiImage {
  data?: {
    url: string;
  };
}

export type HeroSlide = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;

  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaLink?: string;

  backgroundImage?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    url: string;
    formats?: {
      thumbnail?: { url: string; width: number; height: number };
      small?: { url: string; width: number; height: number };
      medium?: { url: string; width: number; height: number };
      large?: { url: string; width: number; height: number };
    };
  };
  person?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    url: string;
    formats?: {
      thumbnail?: { url: string; width: number; height: number };
      small?: { url: string; width: number; height: number };
      medium?: { url: string; width: number; height: number };
      large?: { url: string; width: number; height: number };
    };
  };
};


export interface TeamMember {
  id: number;
  name: string;
  role: string;
  Image?: {
    id: number;
    url: string;
  };
}

export interface Client {
  id: number;
  name: string;
  testimonial: string;
  logo?: StrapiImage;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  shortDescription?: string;
  content?: string;
  heroImage?: {
    id: number;
    url: string;
  };
}
