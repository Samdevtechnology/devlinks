"use server";

import { resend } from "@/lib/resend";
import Email from "./Template";

interface SendOTPEmailProps {
  otp?: string;
  email: string;
  name?: string;
}

export async function sendOTPEmail({
  otp = "****",
  email,
  name = "Dev",
}: SendOTPEmailProps) {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Password Reset Security Code",
      react: Email({ name, otp }),
    });

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}
