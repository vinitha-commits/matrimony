"use client";

import Link from "next/link";
import { Button, Card, Progress, Badge, EmptyState } from "@/components/ui";
import { ProfileCard, PremiumUpsell } from "@/components/domain";
import { ArrowRight, Sparkles, MapPin, Star, Clock } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import type { MatchCard } from "@/types";

// Mock data for scaffolding
const MOCK_MATCHES: MatchCard[] = [
  {
    id: "match-0",
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
    compatibilityScore: 95,
    isShortlisted: true,
  },
  {
    id: "match-1",
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
    isOnline: true,
    compatibilityScore: 90,
    isShortlisted: false,
  },
  {
    id: "match-2",
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
    compatibilityScore: 87,
    isShortlisted: false,
  },
  {
    id: "match-3",
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
    compatibilityScore: 83,
    isShortlisted: false,
  },
  {
    id: "match-4",
    profileId: "TM10005",
    fullName: "Lakshmi Narayanan",
    age: 23,
    height: "5'6\"",
    occupation: "Banking Professional",
    location: "Salem",
    community: "Chettiar",
    primaryPhotoUrl: "/profiles/bride4.jpg",
    isVerified: true,
    isPremium: false,
    isOnline: false,
    compatibilityScore: 80,
    isShortlisted: true,
  },
  {
    id: "match-5",
    profileId: "TM10006",
    fullName: "Preethi Murugan",
    age: 28,
    height: "5'3\"",
    occupation: "Scientist/Researcher",
    location: "Madurai",
    community: "Nadar",
    primaryPhotoUrl: "/profiles/bride5.jpg",
    isVerified: false,
    isPremium: false,
    isOnline: false,
    compatibilityScore: 76,
    isShortlisted: false,
  },
];

export default function DashboardPage() {
  const { t } = useTranslation();

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
          {MOCK_MATCHES.map((match) => (
            <ProfileCard
              key={match.id}
              profile={match}
              onShortlist={() => {}}
              onSkip={() => {}}
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
          <Button variant="text" size="sm">{t.common.viewAll} <ArrowRight className="h-4 w-4" /></Button>
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
