"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent, EmptyState, Badge } from "@/components/ui";
import { InterestCard } from "@/components/domain";
import { Heart, Send, Handshake, Inbox } from "lucide-react";
import type { Interest, MatchCard } from "@/types";
import { useTranslation } from "@/lib/i18n";

const mockProfile: MatchCard = {
  id: "p1",
  profileId: "TM10001",
  fullName: "Priya Venkatesh",
  age: 25,
  height: "5'4\"",
  occupation: "Software Engineer",
  location: "Chennai",
  community: "Brahmin - Iyer",
  primaryPhotoUrl: "",
  isVerified: true,
  isPremium: false,
  isOnline: true,
  isShortlisted: false,
};

const MOCK_RECEIVED: Interest[] = [
  {
    id: "int-1",
    fromProfileId: "TM10001",
    toProfileId: "me",
    status: "pending",
    note: "Hi, I found your profile interesting. Our families seem to share similar values.",
    sentAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    profile: mockProfile,
  },
  {
    id: "int-2",
    fromProfileId: "TM10002",
    toProfileId: "me",
    status: "pending",
    sentAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    profile: { ...mockProfile, id: "p2", profileId: "TM10002", fullName: "Kavitha Sundaram", age: 27, location: "Bangalore", isOnline: false },
  },
];

const MOCK_SENT: Interest[] = [
  {
    id: "int-3",
    fromProfileId: "me",
    toProfileId: "TM10003",
    status: "pending",
    note: "Your profile and horoscope details match really well. Would love to connect!",
    sentAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    profile: { ...mockProfile, id: "p3", profileId: "TM10003", fullName: "Deepa Raman", age: 26, location: "Coimbatore", occupation: "Doctor", community: "Mudaliar" },
  },
  {
    id: "int-4",
    fromProfileId: "me",
    toProfileId: "TM10004",
    status: "pending",
    sentAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    profile: { ...mockProfile, id: "p4", profileId: "TM10004", fullName: "Meera Sundar", age: 24, location: "Trichy", occupation: "Teacher", community: "Pillai", isVerified: true, isOnline: false },
  },
];

const MOCK_ACCEPTED: Interest[] = [
  {
    id: "int-5",
    fromProfileId: "TM10005",
    toProfileId: "me",
    status: "accepted",
    note: "We share the same community and our stars match perfectly!",
    sentAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    respondedAt: new Date(Date.now() - 8 * 86400000).toISOString(),
    profile: { ...mockProfile, id: "p5", profileId: "TM10005", fullName: "Lakshmi Narayanan", age: 25, location: "Salem", occupation: "Software Engineer", community: "Chettiar", isVerified: true, isPremium: true, isOnline: true },
  },
  {
    id: "int-6",
    fromProfileId: "me",
    toProfileId: "TM10006",
    status: "accepted",
    sentAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    respondedAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    profile: { ...mockProfile, id: "p6", profileId: "TM10006", fullName: "Sangeetha Ravi", age: 26, location: "Erode", occupation: "Banking Professional", community: "Gounder", isVerified: true, isOnline: false },
  },
];

export default function InterestsPage() {
  return (
    <Suspense>
      <InterestsPageInner />
    </Suspense>
  );
}

function InterestsPageInner() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "received";
  const [received, setReceived] = useState(MOCK_RECEIVED);
  const [sent, setSent] = useState(MOCK_SENT);
  const [accepted, setAccepted] = useState(MOCK_ACCEPTED);

  const handleAccept = (id: string) => {
    const item = received.find((i) => i.id === id);
    if (item) {
      setReceived((prev) => prev.filter((i) => i.id !== id));
      setAccepted((prev) => [...prev, { ...item, status: "accepted" as const, respondedAt: new Date().toISOString() }]);
    }
  };

  const handleDecline = (id: string) => {
    setReceived((prev) => prev.filter((i) => i.id !== id));
  };

  const handleWithdraw = (id: string) => {
    setSent((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-neutral-900">{t.interests.title}</h1>

      <Tabs value={activeTab} onValueChange={(val) => router.replace(`/interests?tab=${val}`)}>
        <TabsList>
          <TabsTrigger value="received">
            <Inbox className="h-4 w-4" />
            {t.nav.received}
            <Badge variant="primary" size="sm">{MOCK_RECEIVED.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="sent">
            <Send className="h-4 w-4" />
            {t.nav.sent}
            <Badge variant="default" size="sm">{MOCK_SENT.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="accepted">
            <Handshake className="h-4 w-4" />
            {t.nav.accepted}
            <Badge variant="success" size="sm">{MOCK_ACCEPTED.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="received">
          <div className="space-y-3">
            {received.length === 0 && <p className="text-sm text-neutral-500 text-center py-8">No pending interests.</p>}
            {received.map((interest) => (
              <InterestCard
                key={interest.id}
                interest={interest}
                type="received"
                onAccept={() => handleAccept(interest.id)}
                onDecline={() => handleDecline(interest.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sent">
          <div className="space-y-3">
            {sent.length === 0 && <p className="text-sm text-neutral-500 text-center py-8">No sent interests.</p>}
            {sent.map((interest) => (
              <InterestCard
                key={interest.id}
                interest={interest}
                type="sent"
                onWithdraw={() => handleWithdraw(interest.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="accepted">
          <div className="space-y-3">
            {accepted.length === 0 && <p className="text-sm text-neutral-500 text-center py-8">No accepted interests yet.</p>}
            {accepted.map((interest) => (
              <InterestCard
                key={interest.id}
                interest={interest}
                type="accepted"
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
