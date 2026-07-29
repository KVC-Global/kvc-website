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

// --- Dich Vu Page (3 sections only) ---

export type DichVuHero = {
  backgroundImage?: SanityImage;
  backgroundImageAlt?: string;
  eyebrow?: string;
  title?: string;
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

export type DichVuServiceCategories = {
  eyebrow?: string;
  title?: string;
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
  seo?: PageSeo;
};
