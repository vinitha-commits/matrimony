const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY!;
const MSG91_TEMPLATE_ID = process.env.MSG91_TEMPLATE_ID!;

const BASE_URL = "https://control.msg91.com/api/v5";

/**
 * Send OTP to a phone number via MSG91
 * Phone must include country code, e.g. "919876543210"
 */
export async function sendOTP(phone: string): Promise<{ success: boolean; message: string }> {
  const url = `${BASE_URL}/otp?template_id=${MSG91_TEMPLATE_ID}&mobile=${phone}&authkey=${MSG91_AUTH_KEY}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (data.type === "success" || data.type === "success") {
    return { success: true, message: "OTP sent successfully" };
  }

  return { success: false, message: data.message || "Failed to send OTP" };
}

/**
 * Verify OTP entered by user
 */
export async function verifyOTP(
  phone: string,
  otp: string
): Promise<{ success: boolean; message: string }> {
  const url = `${BASE_URL}/otp/verify?mobile=${phone}&otp=${otp}&authkey=${MSG91_AUTH_KEY}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (data.type === "success") {
    return { success: true, message: "OTP verified" };
  }

  return { success: false, message: data.message || "Invalid OTP" };
}

/**
 * Resend OTP via MSG91 (retrytype: "text" for SMS, "voice" for call)
 */
export async function resendOTP(
  phone: string,
  retryType: "text" | "voice" = "text"
): Promise<{ success: boolean; message: string }> {
  const url = `${BASE_URL}/otp/retry?mobile=${phone}&retrytype=${retryType}&authkey=${MSG91_AUTH_KEY}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (data.type === "success") {
    return { success: true, message: "OTP resent" };
  }

  return { success: false, message: data.message || "Failed to resend OTP" };
}
