"use client";

import Link from "next/link";
import { Button, Card, Progress, Badge, Tabs, TabsList, TabsTrigger, TabsContent, EmptyState } from "@/components/ui";
import { ProfileCard, InterestCard } from "@/components/domain";
import { Avatar } from "@/components/ui";
import { Users, Heart, Bookmark, Activity, Eye, Settings } from "lucide-react";
import type { MatchCard, Interest } from "@/types";
import { useTranslation } from "@/lib/i18n";

const MOCK_MATCHES: MatchCard[] = [
  {
    id: "parent-match-0",
    profileId: "TM30001",
    fullName: "Arun Kumar",
    age: 27,
    height: "5'9\"",
    occupation: "Software Engineer",
    location: "Chennai",
    community: "Brahmin - Iyer",
    primaryPhotoUrl: "",
    isVerified: true,
    isPremium: false,
    isOnline: true,
    compatibilityScore: 92,
    isShortlisted: false,
  },
  {
    id: "parent-match-1",
    profileId: "TM30002",
    fullName: "Vijay Rajan",
    age: 29,
    height: "5'10\"",
    occupation: "Doctor",
    location: "Bangalore",
    community: "Mudaliar",
    primaryPhotoUrl: "",
    isVerified: true,
    isPremium: true,
    isOnline: false,
    compatibilityScore: 87,
    isShortlisted: false,
  },
  {
    id: "parent-match-2",
    profileId: "TM30003",
    fullName: "Karthik Subramanian",
    age: 30,
    height: "5'11\"",
    occupation: "Business/Entrepreneur",
    location: "Coimbatore",
    community: "Gounder",
    primaryPhotoUrl: "",
    isVerified: true,
    isPremium: false,
    isOnline: false,
    compatibilityScore: 83,
    isShortlisted: true,
  },
  {
    id: "parent-match-3",
    profileId: "TM30004",
    fullName: "Suresh Venkatesh",
    age: 28,
    height: "5'8\"",
    occupation: "Chartered Accountant",
    location: "Hyderabad",
    community: "Chettiar",
    primaryPhotoUrl: "",
    isVerified: true,
    isPremium: false,
    isOnline: true,
    compatibilityScore: 79,
    isShortlisted: false,
  },
];

const baseProfile: MatchCard = {
  id: "p0",
  profileId: "TM30010",
  fullName: "Ravi Shankar",
  age: 28,
  height: "5'9\"",
  occupation: "Software Engineer",
  location: "Chennai",
  community: "Brahmin - Iyer",
  primaryPhotoUrl: "",
  isVerified: true,
  isPremium: false,
  isOnline: false,
  isShortlisted: false,
};

const PARENT_INTERESTS: Interest[] = [
  {
    id: "pint-1",
    fromProfileId: "TM30010",
    toProfileId: "me",
    status: "pending",
    note: "Namaskaram! Our family values match well. Our son is an IIT graduate working in Google. We would like to discuss further.",
    sentAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    profile: { ...baseProfile, id: "pi1", profileId: "TM30010", fullName: "Ravi Shankar", age: 28, occupation: "Software Engineer", location: "Chennai", community: "Brahmin - Iyer", isOnline: true, compatibilityScore: 90 },
  },
  {
    id: "pint-2",
    fromProfileId: "TM30011",
    toProfileId: "me",
    status: "pending",
    note: "We noticed your daughter's horoscope matches well with our son. Would love to connect.",
    sentAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    profile: { ...baseProfile, id: "pi2", profileId: "TM30011", fullName: "Mohan Krishnan", age: 30, occupation: "Doctor", location: "Bangalore", community: "Iyengar", isVerified: true, compatibilityScore: 85 },
  },
  {
    id: "pint-3",
    fromProfileId: "TM30012",
    toProfileId: "me",
    status: "pending",
    sentAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    profile: { ...baseProfile, id: "pi3", profileId: "TM30012", fullName: "Ganesh Natarajan", age: 27, occupation: "Business/Entrepreneur", location: "Coimbatore", community: "Chettiar", isVerified: false, compatibilityScore: 78 },
  },
];

const PARENT_SHORTLISTED: MatchCard[] = [
  { ...baseProfile, id: "ps1", profileId: "TM30020", fullName: "Arvind Raman", age: 29, occupation: "Civil Services (IAS/IPS)", location: "Chennai", community: "Brahmin - Iyer", isVerified: true, isPremium: true, isOnline: false, compatibilityScore: 94, isShortlisted: true },
  { ...baseProfile, id: "ps2", profileId: "TM30021", fullName: "Dinesh Kumar", age: 28, occupation: "Doctor", location: "Madurai", community: "Mudaliar", isVerified: true, isOnline: true, compatibilityScore: 88, isShortlisted: true },
];

export default function ParentDashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      {/* Parent header */}
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="primary" size="md" className="mb-2">
            <Users className="h-3 w-3" /> {t.parentDashboard.title}
          </Badge>
          <h1 className="text-2xl font-bold text-neutral-900">
            {t.parentDashboard.managingProfile.replace("{name}", "Priya")}
          </h1>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/settings"><Settings className="h-4 w-4" /> {t.nav.settings}</Link>
        </Button>
      </div>

      {/* Child's profile overview */}
      <Card variant="flat" padding="lg">
        <div className="flex items-center gap-4">
          <Avatar name="Priya S." size="xl" />
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-neutral-900">Priya Shankar, 26</h2>
            <p className="text-sm text-neutral-500">Software Engineer &middot; Chennai &middot; Brahmin - Iyer</p>
            <Progress value={75} showPercentage size="sm" label={t.parentDashboard.profileCompletion} className="mt-3 max-w-xs" />
          </div>
          <Button variant="secondary" size="sm" asChild>
            <Link href="/profile/me"><Eye className="h-4 w-4" /> {t.parentDashboard.viewProfile}</Link>
          </Button>
        </div>
      </Card>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: t.parentDashboard.newMatches, value: "18", icon: Heart, color: "text-primary-600" },
          { label: t.parentDashboard.interestsReceived, value: String(PARENT_INTERESTS.length), icon: Heart, color: "text-secondary-600" },
          { label: t.parentDashboard.shortlisted, value: String(PARENT_SHORTLISTED.length), icon: Bookmark, color: "text-info" },
          { label: t.parentDashboard.profileViews, value: "127", icon: Eye, color: "text-neutral-600" },
        ].map((stat) => (
          <Card key={stat.label} variant="flat" padding="md">
            <div className="flex items-center gap-3">
              <div className={`${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                <p className="text-xs text-neutral-500">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="matches">
        <TabsList>
          <TabsTrigger value="matches">{t.parentDashboard.recommendedMatches}</TabsTrigger>
          <TabsTrigger value="interests">{t.parentDashboard.interestInbox}</TabsTrigger>
          <TabsTrigger value="shortlist">{t.parentDashboard.myShortlist}</TabsTrigger>
          <TabsTrigger value="activity">{t.parentDashboard.activityLog}</TabsTrigger>
        </TabsList>

        <TabsContent value="matches">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {MOCK_MATCHES.map((match) => (
              <ProfileCard key={match.id} profile={match} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="interests">
          <div className="space-y-3">
            {PARENT_INTERESTS.map((interest) => (
              <InterestCard
                key={interest.id}
                interest={interest}
                type="received"
                onAccept={() => {}}
                onDecline={() => {}}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shortlist">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {PARENT_SHORTLISTED.map((match) => (
              <ProfileCard key={match.id} profile={match} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <Card variant="flat" padding="lg">
            <div className="space-y-4">
              {[
                { time: "2 hours ago", action: "Priya viewed a profile (TM10045)" },
                { time: "Yesterday", action: "You shortlisted Arun Kumar (TM30000)" },
                { time: "2 days ago", action: "Priya received interest from Karthik S." },
                { time: "3 days ago", action: "Profile photo updated by Priya" },
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Activity className="h-4 w-4 text-neutral-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-neutral-700">{log.action}</p>
                    <p className="text-xs text-neutral-400">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
