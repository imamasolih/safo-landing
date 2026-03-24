import { NextResponse } from "next/server";
import { getSiteContent } from "@/lib/content";
import {
  createInquiryPayload,
  validateInquiryPayload,
} from "@/lib/form-schema";

export async function POST(request: Request) {
  const content = await getSiteContent();

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const payload = createInquiryPayload(body);
    const errors = validateInquiryPayload(payload);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          message: content.contact.error_message,
          errors,
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: content.contact.success_message,
    });
  } catch {
    return NextResponse.json(
      {
        message: content.contact.error_message,
      },
      { status: 400 },
    );
  }
}
