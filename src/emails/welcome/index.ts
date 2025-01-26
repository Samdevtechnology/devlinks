"use server";

import { resend } from "@/lib/resend";
import Email from "./Template";
import { mailDomain } from "../common";

export async function sendWelcomeEmail(formData: FormData) {
  const email = formData.get("email") as string;
  const name = (formData.get("name") as string) || "Dev";

  try {
    const data = await resend.emails.send({
      from: mailDomain,
      to: email,
      subject: "Welcome to Devlinks!",
      react: Email({ name }),
    });

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}
console.log(
  "🚀 ~ sendWelcomeEmail ~ process.env.RESEND_EMAIL_DOMAIN:",
  process.env.RESEND_EMAIL_DOMAIN
);
