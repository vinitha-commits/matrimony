import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { connectDB } from "@/lib/db/connection";
import { User } from "@/lib/db/models";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const PLAN_AMOUNTS: Record<string, number> = {
  premium_3: 2999,
  premium_6: 4999,
  premium_12: 7999,
};

export async function POST(req: NextRequest) {
  try {
    const { planId, userId } = await req.json();

    if (!planId || !PLAN_AMOUNTS[planId]) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const amount = PLAN_AMOUNTS[planId] * 100; // Razorpay uses paise

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `sub_${userId}_${planId}_${Date.now()}`,
      notes: {
        userId,
        planId,
        userName: user.phone || user.email || "",
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      planId,
    });
  } catch (error: any) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
