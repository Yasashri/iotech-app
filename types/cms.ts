export interface StrapiImage {
  data?: {
    attributes?: {
      url: string;
    };
  };
}

export interface HeroSlide {
  id: number;
  attributes: {
    title: string;
    subtitle?: string;
    backgroundImage?: StrapiImage;
    ctaLabel?: string;
    ctaLink?: string;
  };
}

export interface TeamMember {
  id: number;
  attributes: {
    name: string;
    role: string;
    image?: StrapiImage;
  };
}

export interface Client {
  id: number;
  attributes: {
    name: string;
    logo?: StrapiImage;
  };
}

export interface Service {
  id: number;
  attributes: {
    title: string;
    slug: string;
    shortDescription?: string;
    content?: string;
    heroImage?: StrapiImage;
  };
}
