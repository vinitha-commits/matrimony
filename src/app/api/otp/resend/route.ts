import { NextRequest, NextResponse } from "next/server";
import { resendOTP } from "@/lib/msg91";

export async function POST(req: NextRequest) {
  try {
    const { phone, retryType } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    const cleaned = phone.replace(/[\s\-()]/g, "");
    const mobile = cleaned.startsWith("+91")
      ? cleaned.replace("+", "")
      : cleaned.startsWith("91")
      ? cleaned
      : `91${cleaned}`;

    const result = await resendOTP(mobile, retryType || "text");

    if (result.success) {
      return NextResponse.json({ success: true, message: result.message });
    }

    return NextResponse.json({ error: result.message }, { status: 400 });
  } catch (error: any) {
    console.error("Resend OTP error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to resend OTP" },
      { status: 500 }
    );
  }
}
