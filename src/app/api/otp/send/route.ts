import { NextRequest, NextResponse } from "next/server";
import { sendOTP } from "@/lib/msg91";

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    // Normalize: remove spaces, dashes; ensure country code
    const cleaned = phone.replace(/[\s\-()]/g, "");
    const mobile = cleaned.startsWith("+91")
      ? cleaned.replace("+", "")
      : cleaned.startsWith("91")
      ? cleaned
      : `91${cleaned}`;

    if (mobile.length !== 12) {
      return NextResponse.json(
        { error: "Invalid phone number. Use 10-digit Indian number." },
        { status: 400 }
      );
    }

    const result = await sendOTP(mobile);

    if (result.success) {
      return NextResponse.json({ success: true, message: result.message });
    }

    return NextResponse.json({ error: result.message }, { status: 400 });
  } catch (error: any) {
    console.error("Send OTP error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send OTP" },
      { status: 500 }
    );
  }
}
