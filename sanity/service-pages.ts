import type { SanityImage } from "./home-page";

// --- Shared types ---

export type SectionHeading = {
  title?: string;
};

export type IconItem = {
  _key?: string;
  icon?: string;
  title?: string;
  description?: string;
};

export type TestimonialItem = {
  _key?: string;
  name?: string;
  role?: string;
  quote?: string;
  rating?: number;
};

export type ServiceCard = {
  title?: string;
  icon?: string;
  href?: string;
  ctaText?: string;
};

export type FaqItem = {
  _key?: string;
  question?: string;
  answer?: string;
};

export type PageSeo = {
  title?: string;
  description?: string;
};

// --- Khoa Hoc Online Page ---

export type KhoaHocOnlineHero = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryButtonLabel?: string;
  primaryButtonHref?: string;
  secondaryButtonLabel?: string;
  secondaryButtonHref?: string;
  stats?: Array<{
    _key?: string;
    icon?: string;
    value?: string;
    label?: string;
  }>;
};

export type KhoaHocOnlineIntro = {
  title?: string;
  highlightText?: string;
  paragraphs?: string[];
  bullets?: string[];
  image?: SanityImage;
  imageAlt?: string;
};

export type KhoaHocOnlineProgram = {
  _key?: string;
  icon?: string;
  name?: string;
  description?: string;
  duration?: string;
  highlights?: string[];
};

export type KhoaHocOnlinePrograms = {
  title?: string;
  items?: KhoaHocOnlineProgram[];
  requirements?: string[];
  prospects?: string[];
  supportSteps?: Array<{ _key?: string; icon?: string; text?: string }>;
};

export type KhoaHocOnlineWhy = {
  eyebrow?: string;
  title?: string;
  items?: IconItem[];
};

export type KhoaHocOnlineCta = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

export type KhoaHocOnlineTestimonials = {
  eyebrow?: string;
  title?: string;
  testimonials?: TestimonialItem[];
};

export type KhoaHocOnlineServices = {
  eyebrow?: string;
  title?: string;
  services?: ServiceCard[];
};

export type KhoaHocOnlineFaqs = {
  eyebrow?: string;
  title?: string;
  faqs?: FaqItem[];
};

export type KhoaHocOnlinePageData = {
  heroSection?: KhoaHocOnlineHero;
  introSection?: KhoaHocOnlineIntro;
  programsSection?: KhoaHocOnlinePrograms;
  whySection?: KhoaHocOnlineWhy;
  ctaSection?: KhoaHocOnlineCta;
  testimonialsSection?: KhoaHocOnlineTestimonials;
  servicesSection?: KhoaHocOnlineServices;
  faqsSection?: KhoaHocOnlineFaqs;
  seo?: PageSeo;
};

// --- Dich Vu Page ---

export type DichVuHero = {
  backgroundImage?: SanityImage;
  backgroundImageAlt?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryButtonLabel?: string;
  primaryButtonHref?: string;
  secondaryButtonLabel?: string;
  secondaryButtonHref?: string;
  stats?: Array<{
    _key?: string;
    icon?: string;
    value?: string;
    label?: string;
  }>;
};

export type DichVuCategory = {
  _key?: string;
  icon?: string;
  title?: string;
  description?: string;
  href?: string;
  image?: SanityImage;
  imageAlt?: string;
};

export type DichVuServiceCategories = {
  eyebrow?: string;
  title?: string;
  categories?: DichVuCategory[];
};

export type DichVuWhy = {
  eyebrow?: string;
  title?: string;
  items?: IconItem[];
};

export type DichVuProcessStep = IconItem;

export type DichVuProcess = {
  eyebrow?: string;
  title?: string;
  steps?: DichVuProcessStep[];
};

export type DichVuTestimonials = {
  eyebrow?: string;
  title?: string;
  testimonials?: TestimonialItem[];
};

export type DichVuPartners = {
  eyebrow?: string;
  title?: string;
  partners?: Array<{
    _id?: string;
    name: string;
    logo?: SanityImage;
    website?: string;
  }>;
};

export type DichVuFaqs = {
  title?: string;
  faqs?: FaqItem[];
};

// --- Dich Vu Intro ---

export type DichVuIntroPillar = {
  icon?: string;
  label?: string;
};

export type DichVuIntro = {
  eyebrow?: string;
  title?: string;
  pillars?: DichVuIntroPillar[];
  paragraph1?: string;
  paragraph2?: string;
};

// --- Dich Vu Service Accordion ---

export type DichVuServiceChecklistGroup = {
  title?: string;
  items?: string[];
};

export type DichVuTagList = {
  label?: string;
  items?: string[];
};

export type DichVuSingaporeSubTab = {
  label?: string;
  icon?: string;
  intro?: string[];
  services?: DichVuServiceChecklistGroup[];
  audience?: DichVuTagList;
  benefits?: DichVuTagList;
};

export type DichVuServiceAccordionSection = {
  _key?: string;
  tag?: string;
  heading?: string;
  headingAccent?: string;
  intro?: string[];
  services?: DichVuServiceChecklistGroup[];
  audience?: DichVuTagList;
  benefits?: DichVuTagList;
  singaporeSubTabs?: DichVuSingaporeSubTab[];
  ctaLabel?: string;
  ctaHref?: string;
  ctaIcon?: string;
  crossLinkText?: string;
  image?: SanityImage;
  imageAlt?: string;
};

export type DichVuServiceAccordion = {
  eyebrow?: string;
  sections?: DichVuServiceAccordionSection[];
};

// --- Online Program Subpage ---

export type OnlineProgramHero = {
  tagline?: string; title?: string; subtitle?: string; description?: string;
  breadcrumb?: string;
  primaryButtonLabel?: string; primaryButtonHref?: string;
};

export type OnlineProgramIntro = { title?: string; paragraphs?: string[]; highlights?: string[] };

export type OnlineProgramItem = { title?: string; description?: string };

export type OnlineProgramWhy = { title?: string; items?: OnlineProgramItem[] };

export type OnlineProgramSection = { title?: string; items?: string[] };

export type OnlineProgramStep = { step?: string };

export type OnlineProgramProcess = { title?: string; steps?: OnlineProgramStep[] };

export type OnlineProgramCta = { title?: string; body?: string; buttonLabel?: string; buttonHref?: string };

export type OnlineProgramCard = {
  name?: string; duration?: string; startDates?: string;
  subjects?: string[]; entryRequirements?: string;
};

export type OnlineProgramPrograms = { title?: string; items?: OnlineProgramCard[] };

export type OnlineProgramPageData = {
  heroSection?: OnlineProgramHero;
  introSection?: OnlineProgramIntro;
  whySection?: OnlineProgramWhy;
  formatSection?: OnlineProgramSection;
  audienceSection?: OnlineProgramSection;
  benefitsSection?: OnlineProgramSection;
  processSection?: OnlineProgramProcess;
  ctaSection?: OnlineProgramCta;
  programsSection?: OnlineProgramPrograms;
  seo?: PageSeo;
};

export type DichVuPageData = {
  heroSection?: DichVuHero;
  introSection?: DichVuIntro;
  serviceCategories?: DichVuServiceCategories;
  accordionSections?: DichVuServiceAccordion;
  whySection?: DichVuWhy;
  processSection?: DichVuProcess;
  testimonialsSection?: DichVuTestimonials;
  partnersSection?: DichVuPartners;
  faqsSection?: DichVuFaqs;
  seo?: PageSeo;
};
