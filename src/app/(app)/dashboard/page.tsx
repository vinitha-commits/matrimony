"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, Progress, Badge, EmptyState } from "@/components/ui";
import { ProfileCard, PremiumUpsell } from "@/components/domain";
import { ArrowRight, Sparkles, MapPin, Star, Clock, Crown } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import type { MatchCard } from "@/types";

// Mock data for scaffolding
const MOCK_MATCHES: MatchCard[] = [
  {
    id: "match-0",
    profileId: "TM10051",
    fullName: "Prasanth Thiagarajan",
    age: 27,
    height: "5'10\"",
    occupation: "Software Professional",
    location: "Chennai",
    community: "Brahmin - Iyer",
    primaryPhotoUrl: "/profiles/groom.jpg",
    isVerified: true,
    isPremium: false,
    isOnline: true,
    compatibilityScore: 95,
    isShortlisted: true,
  },
  {
    id: "match-1",
    profileId: "TM10001",
    fullName: "Anjali Raghavan",
    age: 24,
    height: "5'4\"",
    occupation: "Software Engineer",
    location: "Chennai",
    community: "Brahmin - Iyer",
    primaryPhotoUrl: "/profiles/bride1.jpg",
    isVerified: true,
    isPremium: false,
    isOnline: true,
    compatibilityScore: 93,
    isShortlisted: false,
  },
  {
    id: "match-2",
    profileId: "TM10052",
    fullName: "Karthik Subramanian",
    age: 28,
    height: "5'9\"",
    occupation: "Engineer",
    location: "Coimbatore",
    community: "Gounder",
    primaryPhotoUrl: "/profiles/groom2.jpg",
    isVerified: true,
    isPremium: true,
    isOnline: true,
    compatibilityScore: 90,
    isShortlisted: false,
  },
  {
    id: "match-3",
    profileId: "TM10002",
    fullName: "Divya Krishnamurthy",
    age: 26,
    height: "5'3\"",
    occupation: "Doctor",
    location: "Bangalore",
    community: "Iyengar",
    primaryPhotoUrl: "/profiles/bride2.jpg",
    isVerified: false,
    isPremium: true,
    isOnline: false,
    compatibilityScore: 88,
    isShortlisted: false,
  },
  {
    id: "match-4",
    profileId: "TM10053",
    fullName: "Manikandan Murugan",
    age: 29,
    height: "5'11\"",
    occupation: "Business/Entrepreneur",
    location: "Bangalore",
    community: "Mudaliar",
    primaryPhotoUrl: "/profiles/groom3.jpg",
    isVerified: true,
    isPremium: false,
    isOnline: false,
    compatibilityScore: 85,
    isShortlisted: true,
  },
  {
    id: "match-5",
    profileId: "TM10003",
    fullName: "Meena Sundaramoorthy",
    age: 25,
    height: "5'5\"",
    occupation: "Teacher/Professor",
    location: "Coimbatore",
    community: "Gounder",
    primaryPhotoUrl: "/profiles/bride.jpg",
    isVerified: true,
    isPremium: false,
    isOnline: false,
    compatibilityScore: 83,
    isShortlisted: false,
  },
  {
    id: "match-6",
    profileId: "TM10054",
    fullName: "Sibi Rajendran",
    age: 30,
    height: "5'8\"",
    occupation: "Chartered Accountant",
    location: "Madurai",
    community: "Chettiar",
    primaryPhotoUrl: "/profiles/groom4.jpg",
    isVerified: true,
    isPremium: false,
    isOnline: true,
    compatibilityScore: 80,
    isShortlisted: false,
  },
  {
    id: "match-7",
    profileId: "TM10004",
    fullName: "Kavitha Pillai",
    age: 27,
    height: "5'2\"",
    occupation: "Chartered Accountant",
    location: "Hyderabad",
    community: "Pillai",
    primaryPhotoUrl: "/profiles/bride3.jpg",
    isVerified: true,
    isPremium: false,
    isOnline: false,
    compatibilityScore: 78,
    isShortlisted: false,
  },
];

export default function DashboardPage() {
  const { t } = useTranslation();
  const { isPremium } = useCurrentUser();
  const [shortlisted, setShortlisted] = useState<Set<string>>(new Set(["match-0", "match-4"]));
  const [skipped, setSkipped] = useState<Set<string>>(new Set());
  const FREE_DAILY_LIMIT = 10;
  const FREE_INTEREST_LIMIT = 5;

  const handleShortlist = (id: string) => {
    setShortlisted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSkip = (id: string) => {
    setSkipped((prev) => new Set(prev).add(id));
  };

  const visibleMatches = MOCK_MATCHES.filter((m) => !skipped.has(m.id));

  return (
    <div className="space-y-8">
      {/* Profile completion banner */}
      <Card variant="alert" padding="lg" className="border-l-primary-600 bg-primary-50">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <h2 className="text-base font-semibold text-neutral-900">
              {t.dashboard.completeProfileBanner}
            </h2>
            <Progress value={75} showPercentage size="sm" className="mt-2 max-w-xs" />
          </div>
          <Button variant="primary" size="sm" asChild>
            <Link href="/profile/me">{t.dashboard.completeNow}</Link>
          </Button>
        </div>
      </Card>

      {/* Free user limits banner */}
      {!isPremium && (
        <Card variant="flat" padding="md" className="border-amber-200 bg-amber-50">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                <Crown className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-amber-900">Free Plan Limits</p>
                <p className="text-xs text-amber-700">
                  {FREE_DAILY_LIMIT} daily matches &middot; {FREE_INTEREST_LIMIT} interests/day &middot; No chat or contact details
                </p>
              </div>
            </div>
            <Button variant="premium" size="sm" asChild>
              <Link href="/premium">Upgrade for Unlimited</Link>
            </Button>
          </div>
        </Card>
      )}

      {/* Today's Matches */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-secondary-500" />
            <h2 className="text-xl font-bold text-neutral-900">{t.dashboard.todaysMatches}</h2>
            <Badge variant="primary" size="sm">{MOCK_MATCHES.length} {t.common.new}</Badge>
          </div>
          <Button variant="text" size="sm" asChild>
            <Link href="/search">{t.common.viewAll} <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visibleMatches.map((match) => (
            <ProfileCard
              key={match.id}
              profile={{ ...match, isShortlisted: shortlisted.has(match.id) }}
              onShortlist={handleShortlist}
              onSkip={handleSkip}
            />
          ))}
        </div>
      </section>

      {/* New This Week */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-neutral-500" />
            <h2 className="text-xl font-bold text-neutral-900">{t.dashboard.newThisWeek}</h2>
          </div>
          <Button variant="text" size="sm" asChild>
            <Link href="/search">{t.common.viewAll} <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
          {MOCK_MATCHES.slice(0, 4).map((match) => (
            <div key={match.id} className="min-w-[280px] snap-start">
              <ProfileCard profile={match} variant="compact" />
            </div>
          ))}
        </div>
      </section>

      {/* Star Matches */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-secondary-500" />
            <h2 className="text-xl font-bold text-neutral-900">{t.dashboard.mutualStarMatches}</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {MOCK_MATCHES.slice(0, 3).map((match) => (
            <ProfileCard key={match.id} profile={match} />
          ))}
        </div>
      </section>

      {/* Premium upsell */}
      <PremiumUpsell feature="general" />
    </div>
  );
}
