import crypto from "crypto";

function generateOTP(): string {
  const randomBytes = crypto.randomBytes(4);
  const otp = 1000 + (parseInt(randomBytes.toString("hex"), 16) % 9000);

  return otp.toString();
}

export default generateOTP;
