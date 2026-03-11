"use client";

import Link from "next/link";
import { Button, Input } from "@/components/ui";
import { useTranslation } from "@/lib/i18n";

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-[520px]">
      <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-neutral-900">{t.auth.loginTitle}</h1>
        <p className="mt-1 text-sm text-neutral-500">
          {t.auth.loginSubtitle}
        </p>

        <div className="mt-6 space-y-4">
          <Input
            label={t.auth.phoneOrEmail}
            placeholder={t.auth.phoneOrEmail}
          />
          <Input
            label={t.auth.passwordLabel}
            type="password"
            placeholder={t.auth.passwordLabel}
          />
        </div>

        <div className="mt-3 text-right">
          <Link href="#" className="text-sm font-medium text-primary-600 hover:underline">
            {t.auth.forgotPassword}
          </Link>
        </div>

        <Button variant="primary" size="lg" fullWidth className="mt-6" asChild>
          <Link href="/dashboard">{t.auth.loginButton}</Link>
        </Button>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1 border-t border-neutral-200" />
          <span className="text-xs text-neutral-400">{t.common.or}</span>
          <div className="flex-1 border-t border-neutral-200" />
        </div>

        <Button variant="ghost" size="md" fullWidth className="mt-4">
          {t.auth.otpLogin}
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
