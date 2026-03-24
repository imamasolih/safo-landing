import type { InquiryErrors, InquiryPayload } from "@/lib/form-schema";

export type InquirySubmitResult =
  | {
      state: "success";
      message: string;
    }
  | {
      state: "error";
      message: string;
      errors?: InquiryErrors;
    }
  | {
      state: "notice";
      message: string;
    };

const externalFormEndpoint = "";
// TODO: Insert the external form service endpoint here for a fetch-based integration.
// If you choose a native form POST action or an embedded provider instead, replace
// submitInquiry() and keep the existing field names as the integration contract.

export const hasExternalInquiryEndpoint = externalFormEndpoint.length > 0;

export async function submitInquiry(
  payload: InquiryPayload,
  messages: {
    success: string;
    error: string;
    integrationPending: string;
  },
): Promise<InquirySubmitResult> {
  if (!hasExternalInquiryEndpoint) {
    return {
      state: "notice",
      message: messages.integrationPending,
    };
  }

  try {
    const response = await fetch(externalFormEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get("content-type") ?? "";
    const result = contentType.includes("application/json")
      ? ((await response.json()) as {
          errors?: InquiryErrors;
          message?: string;
        })
      : undefined;

    if (!response.ok) {
      return {
        state: "error",
        errors: result?.errors,
        message: result?.message ?? messages.error,
      };
    }

    return {
      state: "success",
      message: result?.message ?? messages.success,
    };
  } catch {
    return {
      state: "error",
      message: messages.error,
    };
  }
}
