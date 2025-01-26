"use server";
import { getAdminDb } from "@/stores/firebase/adminConfig";
import generateOTP from "@/lib/generateOTP";
import { sendOTPEmail } from "@/emails/verifyOTP";

const genOTP = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;

    if (!email) {
      return {
        success: false,
        message: "Email is required.",
      };
    }

    const adminDb = getAdminDb();
    const snapshot = await adminDb
      .collection("users")
      .where("email", "==", email)
      .get();

    if (snapshot.empty) {
      return { success: false, message: "No user found" };
    }

    const otpDoc = await adminDb.collection("passwordResets").doc(email).get();
    if (otpDoc.exists) {
      const otpData = otpDoc.data();
      const now = Date.now();
      if (otpData && now - otpData.createdAt < 60 * 1000) {
        return {
          success: false,
          message: "Please hold on a min before requesting another OTP.",
        };
      }
    }

    const otp = generateOTP();
    console.log("🚀 ~ genOTP ~ otp:", otp);
    const otpExpiration = new Date().getTime() + 10 * 60 * 1000;

    sendOTPEmail({ otp, email });

    await adminDb.collection("passwordResets").doc(email).set({
      otp,
      expiration: otpExpiration,
      createdAt: Date.now(),
    });

    return {
      success: true,
      message: "OTP sent. Please check your mail",
    };
  } catch (error) {
    let errorMessage = "An unexpected error occurred.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      success: false,
      message: `Failed to send OTP: ${errorMessage}`,
    };
  }
};

export default genOTP;
