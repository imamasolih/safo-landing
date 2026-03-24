"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  createInquiryPayload,
  type InquiryErrors,
  validateInquiryPayload,
} from "@/lib/form-schema";
import {
  hasExternalInquiryEndpoint,
  submitInquiry,
} from "@/lib/inquiry-submit";
import type { ContactContent } from "@/types/content";
import { ConsentField } from "./consent-field";
import { SelectField } from "./select-field";
import { TextField } from "./text-field";
import { TextareaField } from "./textarea-field";

type InquiryFormProps = {
  contact: ContactContent;
  deviceNames: string[];
};

type FormStatus =
  | {
      state: "idle";
      message: string;
    }
  | {
      state: "notice" | "success" | "error";
      message: string;
    };

export function InquiryForm({ contact, deviceNames }: InquiryFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<FormStatus>({ state: "idle", message: "" });
  const [contextFields, setContextFields] = useState({
    selected_device: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    referrer: "",
    landing_page: "/",
  });

  useEffect(() => {
    function syncFromLocation() {
      const params = new URLSearchParams(window.location.search);
      setContextFields((current) => ({
        ...current,
        utm_source: params.get("utm_source") ?? "",
        utm_medium: params.get("utm_medium") ?? "",
        utm_campaign: params.get("utm_campaign") ?? "",
        utm_content: params.get("utm_content") ?? "",
        referrer: document.referrer,
        landing_page: `${window.location.pathname}${window.location.search}`,
      }));
    }

    function handleSelectedDevice(event: Event) {
      const customEvent = event as CustomEvent<{ deviceName?: string }>;
      const nextSelectedDevice = deviceNames.includes(
        customEvent.detail?.deviceName ?? "",
      )
        ? (customEvent.detail?.deviceName ?? "")
        : "";

      setSelectedDevice(nextSelectedDevice);
    }

    syncFromLocation();
    window.addEventListener("popstate", syncFromLocation);
    window.addEventListener(
      "safo:selected-device",
      handleSelectedDevice as EventListener,
    );

    return () => {
      window.removeEventListener("popstate", syncFromLocation);
      window.removeEventListener(
        "safo:selected-device",
        handleSelectedDevice as EventListener,
      );
    };
  }, [deviceNames]);

  useEffect(() => {
    setContextFields((current) => ({
      ...current,
      selected_device: selectedDevice,
    }));
  }, [selectedDevice]);

  useEffect(() => {
    const treatmentInterestField = formRef.current?.elements.namedItem(
      "treatment_interest",
    );

    if (!(treatmentInterestField instanceof HTMLSelectElement)) {
      return;
    }

    if (selectedDevice) {
      treatmentInterestField.value = "Specific Device";
    }
  }, [selectedDevice]);

  function getFirstErrorMessage(
    nextErrors: InquiryErrors | undefined,
    fallback: string,
  ) {
    if (!nextErrors) {
      return fallback;
    }

    const fieldMessage = Object.entries(nextErrors).find(
      ([field, message]) => field !== "form" && message,
    )?.[1];

    return fieldMessage ?? nextErrors.form ?? fallback;
  }

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
      setStatus({
        state: "error",
        message: getFirstErrorMessage(nextErrors, contact.error_message),
      });
      focusFirstError(nextErrors);
      return;
    }

    setIsPending(true);
    setErrors({});

    try {
      const result = await submitInquiry(payload, {
        success: contact.success_message,
        error: contact.error_message,
        integrationPending: contact.integration_pending_message,
      });

      if (result.state === "error") {
        setErrors(result.errors ?? {});
        setStatus({
          state: "error",
          message: getFirstErrorMessage(
            result.errors,
            result.message,
          ),
        });
        if (result.errors) {
          focusFirstError(result.errors);
        }
        return;
      }

      if (result.state === "notice") {
        setStatus(result);
        return;
      }

      setStatus({
        state: "success",
        message: result.message,
      });
      formRef.current.reset();
      if (selectedDevice) {
        const treatmentInterestField = formRef.current.elements.namedItem(
          "treatment_interest",
        );

        if (treatmentInterestField instanceof HTMLSelectElement) {
          treatmentInterestField.value = "Specific Device";
        }
      }
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Card className="rounded-[2rem] border-[color:rgba(15,29,47,0.08)] bg-white/92 p-6 sm:p-8">
      <p className="medical-kicker">{contact.kicker}</p>
      <h3 className="mt-5 font-display text-3xl leading-tight text-[color:var(--color-ink)] sm:text-[2.6rem]">
        {contact.title}
      </h3>
      <p className="mt-4 max-w-2xl text-base leading-8 text-[color:var(--color-ink-soft)]">
        {contact.intro}
      </p>

      {selectedDevice ? (
        <div className="mt-6 rounded-[1.5rem] border border-[color:rgba(20,127,146,0.16)] bg-[linear-gradient(180deg,rgba(228,241,247,0.88),rgba(235,246,250,0.68))] px-5 py-5">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-accent-strong)]">
            {contact.fields.treatment_interest.label}
          </p>
          <div className="mt-3">
            <span className="inline-flex min-h-10 items-center rounded-full border border-[color:rgba(20,127,146,0.16)] bg-white px-4 py-2 text-[0.95rem] font-semibold leading-none text-[color:var(--color-ink)] shadow-[0_8px_20px_rgba(15,29,47,0.05)]">
              {selectedDevice}
            </span>
          </div>
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
            defaultValue={selectedDevice ? "Specific Device" : ""}
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

        {!hasExternalInquiryEndpoint ? (
          <div className="rounded-[1.35rem] border border-[color:rgba(15,29,47,0.08)] bg-[color:var(--color-surface-muted)] px-4 py-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-accent-strong)]">
              Static Frontend Preview
            </p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--color-ink-soft)]">
              {contact.integration_pending_message}
            </p>
          </div>
        ) : null}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" disabled={isPending} className="sm:min-w-[13rem]">
            {isPending ? "Submitting\u2026" : contact.submit_cta}
          </Button>
          <div
            role={status.state === "error" ? "alert" : "status"}
            aria-live={status.state === "error" ? "assertive" : "polite"}
            aria-atomic="true"
            className="min-h-[1.5rem] text-sm text-[color:var(--color-ink-soft)]"
          >
            {status.message ? (
              <span
                className={
                  status.state === "success"
                    ? "text-[color:var(--color-accent-strong)]"
                    : status.state === "notice"
                      ? "text-[color:var(--color-ink)]"
                    : "text-[color:var(--color-ink)]"
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
