"use server";
import { getAdminDb } from "@/stores/firebase/adminConfig";

import { randomBytes } from "crypto";

const generateResetToken = () => randomBytes(32).toString("hex");

const verifyOTP = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const otp = formData.get("otp") as string;

    if (!email || !otp) {
      return {
        success: false,
        message: "Email and OTP are required.",
      };
    }

    const adminDb = getAdminDb();
    const otpDoc = await adminDb.collection("passwordResets").doc(email).get();

    if (!otpDoc.exists) {
      return {
        success: false,
        message: "No OTP request found. Please request a new OTP.",
      };
    }

    const otpData = otpDoc.data();

    if (!otpData) {
      return {
        success: false,
        message: "Invalid OTP data. Please request a new OTP.",
      };
    }

    const now = Date.now();

    if (now > otpData.expiration) {
      return {
        success: false,
        message: "The OTP has expired. Please request a new one.",
      };
    }

    if (otpData.otp !== otp) {
      return {
        success: false,
        message: "The OTP you entered is invalid.",
      };
    }

    // await adminDb.collection("passwordResets").doc(email).delete();

    // Generate Reset Token
    const resetToken = generateResetToken();
    const tokenExpiration = Date.now() + 15 * 60 * 1000;

    await adminDb.collection("passwordResets").doc(email).set({
      otp: null,
      resetToken,
      expiration: tokenExpiration,
      createdAt: Date.now(),
    });

    return {
      success: true,
      message: "Your OTP has been verified successfully.",
      resetToken,
    };
  } catch (error) {
    let errorMessage = "An unexpected error occurred.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      success: false,
      message: `Failed to verify OTP: ${errorMessage}`,
    };
  }
};

export default verifyOTP;
