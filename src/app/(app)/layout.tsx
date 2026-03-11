"use client";

import { AppHeader, Sidebar, MobileNav, MinimalFooter } from "@/components/layout";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // In production, these would come from auth state
  const mockUser = {
    name: "Priya S.",
    isPremium: false,
  };

  return (
    <div className="flex min-h-dvh flex-col bg-bg-secondary">
      <AppHeader
        user={mockUser}
        unreadMessages={2}
        unreadNotifications={5}
      />

      <div className="flex flex-1">
        <Sidebar profileCompletion={75} isPremium={false} />

        <main id="main-content" className="flex-1 min-w-0">
          <div className="mx-auto max-w-[1120px] px-4 py-6 md:px-6 lg:px-8 pb-20 lg:pb-6">
            {children}
          </div>
        </main>
      </div>

      <MobileNav unreadMessages={2} unreadInterests={3} />
    </div>
  );
}
