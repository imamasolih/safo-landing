export type InquiryPayload = {
  full_name: string;
  business_email: string;
  clinic_company: string;
  country: string;
  business_type: string;
  treatment_interest: string;
  phone: string;
  message: string;
  consent: boolean;
  selected_device: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  referrer: string;
  landing_page: string;
};

export type InquiryErrors = Partial<
  Record<
    | "full_name"
    | "business_email"
    | "clinic_company"
    | "country"
    | "business_type"
    | "treatment_interest"
    | "message"
    | "consent"
    | "form",
    string
  >
>;

type InquiryInput = Record<string, unknown>;

function getStringValue(value: unknown) {
  if (typeof value === "string") {
    return value.trim();
  }

  return "";
}

export function createInquiryPayload(source: InquiryInput): InquiryPayload {
  return {
    full_name: getStringValue(source.full_name),
    business_email: getStringValue(source.business_email),
    clinic_company: getStringValue(source.clinic_company),
    country: getStringValue(source.country),
    business_type: getStringValue(source.business_type),
    treatment_interest: getStringValue(source.treatment_interest),
    phone: getStringValue(source.phone),
    message: getStringValue(source.message),
    consent:
      source.consent === true ||
      source.consent === "true" ||
      source.consent === "on",
    selected_device: getStringValue(source.selected_device),
    utm_source: getStringValue(source.utm_source),
    utm_medium: getStringValue(source.utm_medium),
    utm_campaign: getStringValue(source.utm_campaign),
    utm_content: getStringValue(source.utm_content),
    referrer: getStringValue(source.referrer),
    landing_page: getStringValue(source.landing_page),
  };
}

export function validateInquiryPayload(payload: InquiryPayload) {
  const errors: InquiryErrors = {};

  if (!payload.full_name) {
    errors.full_name = "Full name is required.";
  }

  if (!payload.business_email) {
    errors.business_email = "Business email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.business_email)) {
    errors.business_email = "Enter a valid business email.";
  }

  if (!payload.clinic_company) {
    errors.clinic_company = "Clinic or company is required.";
  }

  if (!payload.country) {
    errors.country = "Country is required.";
  }

  if (!payload.business_type) {
    errors.business_type = "Business type is required.";
  }

  if (!payload.treatment_interest) {
    errors.treatment_interest = "Treatment or device interest is required.";
  }

  if (!payload.message) {
    errors.message = "Tell us what you are evaluating.";
  }

  if (!payload.consent) {
    errors.consent = "You must agree to the privacy policy.";
  }

  return errors;
}
