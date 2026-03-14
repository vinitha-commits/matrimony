"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button, Input } from "@/components/ui";
import { useTranslation } from "@/lib/i18n";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpStep, setOtpStep] = useState<"phone" | "verify">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  // Send OTP for login
  const handleSendOtp = useCallback(async () => {
    if (!phone || phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");

      setOtpStep("verify");
      setCountdown(30);
      setOtp(["", "", "", "", "", ""]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [phone]);

  // Verify OTP and login
  const handleVerify = useCallback(async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp: code, context: "login" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Verification failed");

      // Sign in via NextAuth with the verified userId
      const signInRes = await signIn("otp", {
        userId: data.userId,
        redirect: false,
      });
      if (signInRes?.error) throw new Error("Session creation failed");

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [otp, phone, router]);

  // Resend
  const handleResend = useCallback(async () => {
    if (countdown > 0) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/otp/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to resend");
      setCountdown(30);
      setOtp(["", "", "", "", "", ""]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [phone, countdown]);

  // Forgot password via OTP
  const handleForgotPassword = useCallback(async () => {
    setForgotSent(true);
    // In production, trigger OTP or email reset flow here
  }, []);

  // OTP input handlers
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) newOtp[i] = pasted[i];
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  return (
    <div className="w-full max-w-[520px]">
      <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-neutral-900">{t.auth.loginTitle}</h1>
        <p className="mt-1 text-sm text-neutral-500">{t.auth.loginSubtitle}</p>

        {/* Password login */}
        {!showOtp && (
          <>
            <div className="mt-6 space-y-4">
              <Input
                label={t.auth.phoneOrEmail}
                placeholder={t.auth.phoneOrEmail}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
              <Input
                label={t.auth.passwordLabel}
                type="password"
                placeholder={t.auth.passwordLabel}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mt-3 text-right">
              <button
                onClick={handleForgotPassword}
                className="text-sm font-medium text-primary-600 hover:underline"
              >
                {t.auth.forgotPassword}
              </button>
            </div>

            {forgotSent && (
              <p className="mt-2 text-sm text-success font-medium">
                Password reset link sent to your registered email/phone.
              </p>
            )}

            {error && !showOtp && (
              <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>
            )}

            <Button
              variant="primary"
              size="lg"
              fullWidth
              className="mt-6"
              disabled={loading}
              onClick={async () => {
                if (!identifier || !password) {
                  setError("Please enter your phone/email and password");
                  return;
                }
                setLoading(true);
                setError("");
                const res = await signIn("credentials", {
                  identifier,
                  password,
                  redirect: false,
                });
                if (res?.error) {
                  setError("Invalid credentials. Please try again.");
                  setLoading(false);
                } else {
                  router.push("/dashboard");
                }
              }}
            >
              {loading && !showOtp ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Logging in...
                </span>
              ) : (
                t.auth.loginButton
              )}
            </Button>
          </>
        )}

        {/* OTP login */}
        {showOtp && otpStep === "phone" && (
          <div className="mt-6 space-y-4">
            <Input
              label="Phone number"
              type="tel"
              placeholder="98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

            <Button
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading}
              onClick={handleSendOtp}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending OTP...
                </span>
              ) : (
                "Send OTP"
              )}
            </Button>
          </div>
        )}

        {showOtp && otpStep === "verify" && (
          <div className="mt-6">
            <p className="text-sm text-neutral-500 mb-4">
              Enter the 6-digit code sent to +91 XXXXX{phone.replace(/\D/g, "").slice(-2)}
            </p>

            <div className="flex justify-center gap-3" onPaste={handleOtpPaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  className="h-12 w-12 rounded-[var(--radius-md)] border-[1.5px] border-neutral-300 bg-white text-center text-xl font-bold text-neutral-800 focus:border-primary-500 focus:ring-[3px] focus:ring-primary-100 focus:outline-none"
                  aria-label={`Digit ${i + 1}`}
                />
              ))}
            </div>

            {error && <p className="mt-3 text-center text-sm text-red-600 font-medium">{error}</p>}

            <div className="mt-4 flex items-center justify-between text-sm">
              {countdown > 0 ? (
                <span className="text-neutral-400">Resend in 0:{countdown.toString().padStart(2, "0")}</span>
              ) : (
                <button
                  onClick={handleResend}
                  disabled={loading}
                  className="text-primary-600 font-medium hover:underline disabled:opacity-50"
                >
                  {t.auth.resendOtp}
                </button>
              )}
              <button
                onClick={() => { setOtpStep("phone"); setError(""); }}
                className="text-primary-600 font-medium hover:underline"
              >
                Change number
              </button>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              className="mt-6"
              disabled={loading || otp.join("").length !== 6}
              onClick={handleVerify}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verifying...
                </span>
              ) : (
                "Verify & Login"
              )}
            </Button>
          </div>
        )}

        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1 border-t border-neutral-200" />
          <span className="text-xs text-neutral-400">{t.common.or}</span>
          <div className="flex-1 border-t border-neutral-200" />
        </div>

        <Button
          variant="ghost"
          size="md"
          fullWidth
          className="mt-4"
          onClick={() => {
            setShowOtp(!showOtp);
            setOtpStep("phone");
            setError("");
          }}
        >
          {showOtp ? "Login with Password" : t.auth.otpLogin}
        </Button>

        <p className="mt-6 text-center text-sm text-neutral-500">
          {t.auth.noAccount}{" "}
          <Link href="/register" className="font-medium text-primary-600 hover:underline">
            {t.auth.registerNow}
          </Link>
        </p>
      </div>
    </div>
  );
}
