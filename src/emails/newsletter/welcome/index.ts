"use server";

import { resend } from "@/lib/resend";
import Email from "./Template";

const domain = process.env.RESEND_EMAIL_DOMAIN || "";

export async function sendNewsletterWelcomeEmail(formData: FormData) {
  const email = formData.get("email") as string;
  const name = (formData.get("name") as string) || "Dev";

  try {
    const data = await resend.emails.send({
      from: domain,
      to: email,
      subject: "Welcome to Our Newsletter!",
      react: Email({ name }),
    });

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}
