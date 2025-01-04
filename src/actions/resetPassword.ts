"use server";
import { getAdminDb } from "@/stores/firebase/adminConfig";
import { getAuth } from "firebase-admin/auth";

const resetPassword = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const newPassword = formData.get("password") as string;
  const resetToken = formData.get("token") as string;

  if (!resetToken) {
    return {
      success: false,
      message: "Reset token is required.",
    };
  }

  if (!email || !newPassword) {
    return {
      success: false,
      message: "Email and new password are required.",
    };
  }

  if (newPassword.length < 8) {
    return {
      success: false,
      message: "Password must be at least 8 characters long.",
    };
  }

  const adminDb = getAdminDb();

  // Verify reset token
  const tokenDoc = await adminDb.collection("passwordResets").doc(email).get();

  if (!tokenDoc.exists) {
    return {
      success: false,
      message: "Reset token not found. Please request a new one.",
    };
  }

  const tokenData = tokenDoc.data();

  if (!tokenData) {
    return {
      success: false,
      message: "Invalid reset token. Please request a new one.",
    };
  }

  const now = Date.now();

  if (now > tokenData.expiration) {
    return {
      success: false,
      message: "Reset token has expired. Please request a new one.",
    };
  }

  if (tokenData.resetToken !== resetToken) {
    return {
      success: false,
      message: "Token is invalid.",
    };
  }

  // Update password in Firebase Auth
  const auth = getAuth();
  const user = await auth.getUserByEmail(email);
  if (!user) {
    return { success: false, message: "User not found." };
  }

  await auth.updateUser(user.uid, { password: newPassword });

  // Clear the reset token
  await adminDb.collection("passwordResets").doc(email).delete();

  return { success: true, message: "Password reset successful." };
};

export default resetPassword;
