export type NavItem = {
  label: string;
  href: string;
};

export type HeaderContent = {
  nav: NavItem[];
  primary_cta: string;
};

export type HeroContent = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  audience_line: string;
  proof_chips: string[];
  primary_cta: string;
  secondary_cta: string;
  visual_caption: string;
};

export type TrustStripItem = {
  title: string;
  body: string;
};

export type TrustStripContent = {
  items: TrustStripItem[];
};

export type DeviceCardContent = {
  id: string;
  filter: string;
  type: string;
  name: string;
  summary: string;
  bullets: string[];
  cta: string;
};

export type DevicesContent = {
  kicker: string;
  title: string;
  intro: string;
  filters: string[];
  note_for_build_only: string;
  cards: DeviceCardContent[];
};

export type PillarContent = {
  title: string;
  body: string;
};

export type WhySafoContent = {
  kicker: string;
  title: string;
  intro: string;
  pillars: PillarContent[];
};

export type ProofCardContent = {
  title: string;
  body: string;
};

export type ProofContent = {
  kicker: string;
  title: string;
  intro: string;
  cards: ProofCardContent[];
  callout_title: string;
  callout_body: string;
  callout_cta: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqContent = {
  kicker: string;
  title: string;
  items: FaqItem[];
};

export type ContactField = {
  label: string;
  placeholder: string;
  optional?: boolean;
  options?: string[];
};

export type ContactFields = {
  full_name: ContactField;
  business_email: ContactField;
  clinic_company: ContactField;
  country: ContactField;
  business_type: ContactField;
  treatment_interest: ContactField;
  phone: ContactField;
  message: ContactField;
  consent: ContactField;
};

export type ContactHelper = {
  title: string;
  steps: string[];
};

export type ContactContent = {
  kicker: string;
  title: string;
  intro: string;
  integration_pending_message: string;
  fields: ContactFields;
  submit_cta: string;
  success_message: string;
  error_message: string;
  helper: ContactHelper;
};

export type FooterContent = {
  byline: string;
  descriptor: string;
  phone: string;
  email: string;
  address: string;
  copyright: string;
};

export type BrandContent = {
  name: string;
  descriptor: string;
};

export type SiteContent = {
  brand: BrandContent;
  header: HeaderContent;
  hero: HeroContent;
  trust_strip: TrustStripContent;
  devices: DevicesContent;
  why_safo: WhySafoContent;
  proof: ProofContent;
  faq: FaqContent;
  contact: ContactContent;
  footer: FooterContent;
};
