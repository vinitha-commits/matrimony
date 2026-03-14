"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Button,
  Badge,
  Card,
} from "@/components/ui";
import { PREMIUM_PLANS } from "@/lib/constants";
import {
  createOrder,
  verifyPayment,
  loadRazorpayScript,
} from "@/lib/razorpay";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  Shield,
  CreditCard,
  Smartphone,
  CheckCircle,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Link from "next/link";

type PaymentMethod = "upi" | "card";

const PAYMENT_METHODS: {
  id: PaymentMethod;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "upi",
    label: "UPI",
    description: "Google Pay, PhonePe, Paytm, BHIM",
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    id: "card",
    label: "Credit / Debit Card",
    description: "Visa, Mastercard, Rupay",
    icon: <CreditCard className="h-5 w-5" />,
  },
];

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[40vh] text-neutral-400">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams.get("plan") || "premium_6";

  const plan = PREMIUM_PLANS.find((p) => p.id === planId) || PREMIUM_PLANS[1];

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("upi");
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "failed">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const { userId } = useCurrentUser();

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  async function handlePay() {
    setLoading(true);
    setStatus("processing");
    setErrorMsg("");

    try {
      // 1. Create Razorpay order
      const order = await createOrder(plan.id, userId);

      // 2. Open Razorpay checkout
      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        throw new Error("Failed to load Razorpay. Check your connection.");
      }

      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Thirumangalyam",
        description: `${plan.label} Premium Plan`,
        order_id: order.orderId,
        prefill: {
          method: selectedMethod === "upi" ? "upi" : undefined,
          vpa: selectedMethod === "upi" && upiId ? upiId : undefined,
        },
        config: {
          display: {
            blocks: {
              banks: {
                name: "Payment Method",
                instruments: getInstruments(selectedMethod),
              },
            },
            sequence: ["block.banks"],
            preferences: { show_default_blocks: false },
          },
        },
        theme: {
          color: "#dc2626",
          backdrop_color: "rgba(0,0,0,0.5)",
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setStatus("idle");
          },
        },
        handler: async (response: any) => {
          // 3. Verify payment on server
          try {
            const result = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId,
              planId: plan.id,
              paymentMethod: selectedMethod === "upi" ? "UPI" : "Card",
            });

            if (result.success) {
              setStatus("success");
            } else {
              throw new Error("Verification failed");
            }
          } catch {
            setStatus("failed");
            setErrorMsg("Payment received but verification failed. Contact support.");
          }
          setLoading(false);
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", (response: any) => {
        setStatus("failed");
        setErrorMsg(
          response.error?.description || "Payment failed. Please try again."
        );
        setLoading(false);
      });
      rzp.open();
    } catch (error: any) {
      setStatus("failed");
      setErrorMsg(error.message || "Something went wrong");
      setLoading(false);
    }
  }

  // Success screen
  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900">Payment Successful!</h1>
        <p className="mt-2 text-neutral-500 max-w-sm">
          Your {plan.label} Premium plan is now active. Enjoy unlimited access to all features.
        </p>
        <Button variant="primary" className="mt-6" onClick={() => router.push("/dashboard")}>
          Go to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/premium"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Plans
        </Link>
        <h1 className="text-2xl font-bold text-neutral-900">Checkout</h1>
        <p className="text-neutral-500 mt-1">Complete your payment to activate Premium</p>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        {/* Left — Payment methods */}
        <div className="md:col-span-3 space-y-4">
          <Card variant="flat" padding="lg">
            <h2 className="text-base font-semibold text-neutral-900 mb-4">
              Select Payment Method
            </h2>

            <div className="space-y-2">
              {PAYMENT_METHODS.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center gap-3 rounded-[var(--radius-lg)] border-2 p-4 cursor-pointer transition-all ${
                    selectedMethod === method.id
                      ? "border-primary-500 bg-primary-50"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={selectedMethod === method.id}
                    onChange={() => setSelectedMethod(method.id)}
                    className="sr-only"
                  />
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] ${
                      selectedMethod === method.id
                        ? "bg-primary-100 text-primary-700"
                        : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900">
                      {method.label}
                    </p>
                    <p className="text-xs text-neutral-500">{method.description}</p>
                  </div>
                  <div
                    className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                      selectedMethod === method.id
                        ? "border-primary-500"
                        : "border-neutral-300"
                    }`}
                  >
                    {selectedMethod === method.id && (
                      <div className="h-2.5 w-2.5 rounded-full bg-primary-500" />
                    )}
                  </div>
                </label>
              ))}
            </div>

            {/* UPI ID input */}
            {selectedMethod === "upi" && (
              <div className="mt-4 p-4 rounded-[var(--radius-lg)] bg-neutral-50 border border-neutral-200">
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  UPI ID (optional)
                </label>
                <input
                  type="text"
                  placeholder="yourname@upi / yourname@paytm"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full rounded-[var(--radius-md)] border border-neutral-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
                <p className="text-xs text-neutral-400 mt-1.5">
                  Enter your UPI ID to prefill, or choose from apps in the next screen
                </p>

                {/* Quick UPI app buttons */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {["Google Pay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                    <button
                      key={app}
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-50 transition-colors"
                    >
                      {app}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Error message */}
          {status === "failed" && errorMsg && (
            <div className="rounded-[var(--radius-lg)] bg-red-50 border border-red-200 p-4 text-sm text-red-700">
              {errorMsg}
            </div>
          )}

          {/* Pay button */}
          <Button
            variant="primary"
            fullWidth
            size="lg"
            onClick={handlePay}
            disabled={loading}
            className="text-base"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </span>
            ) : (
              `Pay ₹${plan.totalPrice.toLocaleString("en-IN")}`
            )}
          </Button>

          {/* Trust */}
          <div className="flex items-center justify-center gap-2 text-xs text-neutral-400">
            <Shield className="h-3.5 w-3.5" />
            Secured by Razorpay &middot; 256-bit SSL encryption
          </div>
        </div>

        {/* Right — Order summary */}
        <div className="md:col-span-2">
          <Card variant="flat" padding="lg" className="sticky top-24">
            <h3 className="text-sm font-semibold text-neutral-700 mb-4">
              Order Summary
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Plan</span>
                <Badge variant="premium" size="sm">
                  {plan.label}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Duration</span>
                <span className="text-sm font-medium text-neutral-900">
                  {plan.months} months
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Per month</span>
                <span className="text-sm text-neutral-500">
                  &#8377;{plan.monthlyPrice}/mo
                </span>
              </div>

              {"savings" in plan && plan.savings && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Savings</span>
                  <Badge variant="success" size="sm">
                    {plan.savings}
                  </Badge>
                </div>
              )}

              <div className="border-t border-neutral-200 pt-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-neutral-900">
                  Total
                </span>
                <span className="text-xl font-bold text-neutral-900">
                  &#8377;{plan.totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* What you get */}
            <div className="mt-5 border-t border-neutral-200 pt-4">
              <p className="text-xs font-semibold text-neutral-700 mb-2">
                Premium includes:
              </p>
              <ul className="space-y-1.5">
                {[
                  "Unlimited profile views",
                  "Direct chat with matches",
                  "View contact details",
                  "See who viewed you",
                  "Detailed horoscope matching",
                  "Priority support",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-xs text-neutral-500"
                  >
                    <CheckCircle className="h-3.5 w-3.5 text-green-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-4 text-[10px] text-neutral-400 leading-relaxed">
              By completing this purchase you agree to our{" "}
              <Link href="/terms" className="underline hover:text-neutral-600">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-neutral-600">
                Privacy Policy
              </Link>
              . No auto-renewal. You can cancel anytime.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function getInstruments(method: PaymentMethod) {
  return [{ method: method === "upi" ? "upi" : "card" }];
}
