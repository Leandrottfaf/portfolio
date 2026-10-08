import type { RouteId } from '../data/routes';
import type { TestimonialId } from '../data/testimonials';

export type ServiceContent = {
  seo: { title: string; description: string };
  serviceType: string;
  hero: { eyebrow: string; h1: string; lead: string; image: string; chips?: string[]; position?: string; fit?: 'cover' | 'contain' };
  intro: {
    h2: string;
    lead: string; // HTML allowed (<strong>); main term in the first sentence
    body: string[];
    glance?: { k: string; v: string }[];
  };
  features?: { eyebrow: string; title: string; intro?: string; cols?: number; items: { title: string; text: string; image?: string }[] };
  deliverables?: {
    title: string;
    intro?: string;
    items: { title: string; text: string; formats?: string[] }[];
    visuals: { image: string; caption: string; fit?: 'cover' | 'contain' }[];
  };
  compare?: { eyebrow: string; title: string; intro: string; before: string; after: string; beforeLabel: string; afterLabel: string; sliderLabel: string; caption: string };
  process?: { title: string; steps: { title: string; text: string }[] };
  cases?: { title: string; ids: string[] };
  testimonial?: TestimonialId;
  faq?: { title: string; items: { q: string; a: string }[] };
  related?: RouteId[];
  reading?: { title: string; href: string; meta: string }[];
  cta: { title: string; text: string };
};

export type Bilingual<T> = { fr: T; en: T };
