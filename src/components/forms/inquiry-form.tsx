"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import {
  createInquiryPayload,
  type InquiryErrors,
  validateInquiryPayload,
} from "@/lib/form-schema";
import type { ContactContent } from "@/types/content";
import { ConsentField } from "./consent-field";
import { SelectField } from "./select-field";
import { TextField } from "./text-field";
import { TextareaField } from "./textarea-field";

type TrackingFields = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
};

type InquiryFormProps = {
  contact: ContactContent;
  selectedDevice: string;
  trackingFields: TrackingFields;
};

type FormStatus =
  | {
      state: "idle";
      message: string;
    }
  | {
      state: "success" | "error";
      message: string;
    };

export function InquiryForm({
  contact,
  selectedDevice,
  trackingFields,
}: InquiryFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<FormStatus>({ state: "idle", message: "" });
  const [contextFields, setContextFields] = useState({
    selected_device: selectedDevice,
    ...trackingFields,
    referrer: "",
    landing_page: "/",
  });

  useEffect(() => {
    setContextFields({
      selected_device: selectedDevice,
      ...trackingFields,
      referrer: document.referrer,
      landing_page: `${window.location.pathname}${window.location.search}`,
    });
  }, [selectedDevice, trackingFields]);

  function focusFirstError(nextErrors: InquiryErrors) {
    const firstField = Object.keys(nextErrors).find((field) => field !== "form");

    if (!firstField) {
      return;
    }

    requestAnimationFrame(() => {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstField}"]`)
        ?.focus();
    });
  }

  function handleFieldChange(event: FormEvent<HTMLFormElement>) {
    const target = event.target;

    if (
      !(
        target instanceof HTMLInputElement ||
        target instanceof HTMLSelectElement ||
        target instanceof HTMLTextAreaElement
      )
    ) {
      return;
    }

    if (errors[target.name as keyof InquiryErrors]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[target.name as keyof InquiryErrors];
        return next;
      });
    }

    if (status.state !== "idle") {
      setStatus({ state: "idle", message: "" });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);

    for (const [key, value] of Object.entries(contextFields)) {
      formData.set(key, value);
    }

    const payload = createInquiryPayload({
      ...Object.fromEntries(formData.entries()),
      consent: formData.get("consent") === "on",
    });
    const nextErrors = validateInquiryPayload(payload);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus({ state: "error", message: contact.error_message });
      focusFirstError(nextErrors);
      return;
    }

    setIsPending(true);
    setErrors({});

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        errors?: InquiryErrors;
        message?: string;
      };

      if (!response.ok) {
        setErrors(result.errors ?? {});
        setStatus({
          state: "error",
          message: result.message ?? contact.error_message,
        });
        if (result.errors) {
          focusFirstError(result.errors);
        }
        return;
      }

      setStatus({
        state: "success",
        message: result.message ?? contact.success_message,
      });
      formRef.current.reset();
    } catch {
      setStatus({ state: "error", message: contact.error_message });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Card className="rounded-[2rem] p-6 sm:p-8">
      <p className="medical-kicker">{contact.kicker}</p>
      <h3 className="mt-5 font-display text-3xl leading-tight text-[color:var(--color-ink)] sm:text-[2.6rem]">
        {contact.title}
      </h3>
      <p className="mt-4 max-w-2xl text-base leading-8 text-[color:var(--color-ink-soft)]">
        {contact.intro}
      </p>

      {selectedDevice ? (
        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-[1.5rem] border border-[color:rgba(18,146,163,0.18)] bg-[color:var(--color-accent-soft)] px-4 py-4">
          <span className="text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--color-accent-strong)]">
            Selected device
          </span>
          <Chip active className="border-transparent bg-white/85">
            {selectedDevice}
          </Chip>
        </div>
      ) : null}

      <form
        ref={formRef}
        className="mt-8 space-y-5"
        noValidate
        onChange={handleFieldChange}
        onSubmit={handleSubmit}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            name="full_name"
            label={contact.fields.full_name.label}
            placeholder={contact.fields.full_name.placeholder}
            autoComplete="name"
            error={errors.full_name}
            required
          />
          <TextField
            name="business_email"
            type="email"
            label={contact.fields.business_email.label}
            placeholder={contact.fields.business_email.placeholder}
            autoComplete="email"
            spellCheck={false}
            error={errors.business_email}
            required
          />
          <TextField
            name="clinic_company"
            label={contact.fields.clinic_company.label}
            placeholder={contact.fields.clinic_company.placeholder}
            autoComplete="organization"
            error={errors.clinic_company}
            required
          />
          <TextField
            name="country"
            label={contact.fields.country.label}
            placeholder={contact.fields.country.placeholder}
            autoComplete="country-name"
            error={errors.country}
            required
          />
          <SelectField
            name="business_type"
            label={contact.fields.business_type.label}
            placeholder={contact.fields.business_type.placeholder}
            options={contact.fields.business_type.options ?? []}
            error={errors.business_type}
            required
          />
          <SelectField
            name="treatment_interest"
            label={contact.fields.treatment_interest.label}
            placeholder={contact.fields.treatment_interest.placeholder}
            options={contact.fields.treatment_interest.options ?? []}
            error={errors.treatment_interest}
            required
            defaultValue={selectedDevice ? "Specific Device" : undefined}
          />
        </div>

        <TextField
          name="phone"
          type="tel"
          label={contact.fields.phone.label}
          placeholder={contact.fields.phone.placeholder}
          autoComplete="tel"
        />

        <TextareaField
          name="message"
          label={contact.fields.message.label}
          placeholder={contact.fields.message.placeholder}
          error={errors.message}
          required
        />

        <ConsentField label={contact.fields.consent.label} error={errors.consent} />

        <input type="hidden" name="selected_device" value={contextFields.selected_device} readOnly />
        <input type="hidden" name="utm_source" value={contextFields.utm_source} readOnly />
        <input type="hidden" name="utm_medium" value={contextFields.utm_medium} readOnly />
        <input
          type="hidden"
          name="utm_campaign"
          value={contextFields.utm_campaign}
          readOnly
        />
        <input type="hidden" name="utm_content" value={contextFields.utm_content} readOnly />
        <input type="hidden" name="referrer" value={contextFields.referrer} readOnly />
        <input
          type="hidden"
          name="landing_page"
          value={contextFields.landing_page}
          readOnly
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" disabled={isPending} className="sm:min-w-[13rem]">
            {isPending ? "Submitting..." : contact.submit_cta}
          </Button>
          <div aria-live="polite" className="text-sm text-[color:var(--color-ink-soft)]">
            {status.message ? (
              <span
                className={
                  status.state === "success"
                    ? "text-[color:var(--color-accent-strong)]"
                    : "text-[color:var(--color-ink-soft)]"
                }
              >
                {status.message}
              </span>
            ) : null}
          </div>
        </div>
      </form>
    </Card>
  );
}
