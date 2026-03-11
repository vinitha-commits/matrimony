"use client";

import Link from "next/link";
import { Button, Input } from "@/components/ui";

export default function AdminLoginPage() {
    return (
        <div className="w-full max-w-[520px]">
            <div className="rounded-[var(--radius-xl)] border-2 border-rose-100 bg-white p-6 shadow-md sm:p-8">
                <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-rose-100 p-4 text-rose-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-3 5.92-5.46a1 1 0 0 1 1.5 0C18 3 20 4 22 5a1 1 0 0 1 1 1z" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-center text-neutral-900">Admin Login</h1>
                <p className="mt-2 text-sm text-center text-rose-600 font-medium">
                    Restricted area. Authorized personnel only.
                </p>

                <div className="mt-8 space-y-5">
                    <Input
                        label="Administrator ID"
                        placeholder="Enter your admin ID"
                        defaultValue="admin@example.com"
                    />
                    <Input
                        label="Secure Password"
                        type="password"
                        placeholder="••••••••••••"
                        defaultValue="admin123"
                    />
                    <Input
                        label="Authentication Code (2FA)"
                        type="text"
                        placeholder="6-digit code from authenticator app"
                        defaultValue="123456"
                    />
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="remember" className="h-4 w-4 rounded border-neutral-300 text-rose-600 focus:ring-rose-500" />
                        <label htmlFor="remember" className="text-sm font-medium text-neutral-600">Trust this device</label>
                    </div>
                    <Link href="#" className="text-sm font-medium text-rose-600 hover:text-rose-700 hover:underline">
                        Forgot access?
                    </Link>
                </div>

                <Button size="lg" fullWidth className="mt-8 bg-rose-600 text-white hover:bg-rose-700 hover:ring-rose-200" asChild>
                    <Link href="/admin/dashboard">Authenticate Setup</Link>
                </Button>

                <div className="mt-6 rounded-lg bg-rose-50 p-4 border border-rose-100">
                    <div className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-500 mt-0.5"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                        <p className="text-xs text-rose-800 font-medium leading-relaxed">
                            Notice: All access attempts are securely logged. Unauthorized access is strictly prohibited. Session recorded for IP: <span className="font-mono bg-rose-200/50 px-1 rounded">192.168.1.1</span>
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center pt-6 border-t border-neutral-100">
                    <Link href="/login" className="text-sm font-medium text-neutral-500 hover:text-neutral-800 transition-colors">
                        &larr; Return to User Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
