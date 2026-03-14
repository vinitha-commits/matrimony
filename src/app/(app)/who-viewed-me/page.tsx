"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, Lock, Crown, MapPin, CheckCircle } from "lucide-react";
import { Button, Card, Badge } from "@/components/ui";

interface Visitor {
  id: string;
  profileId: string;
  name: string;
  age: number;
  occupation: string;
  location: string;
  community: string;
  visitedAt: string;
  isVerified: boolean;
  isBlurred: boolean;
}

const MOCK_VISITORS: Visitor[] = [
  {
    id: "v1",
    profileId: "TM-2001",
    name: "Karthik M.",
    age: 29,
    occupation: "IT Manager",
    location: "Chennai",
    community: "Iyer",
    visitedAt: "2 hours ago",
    isVerified: true,
    isBlurred: false,
  },
  {
    id: "v2",
    profileId: "TM-2002",
    name: "Surya P.",
    age: 31,
    occupation: "Business Owner",
    location: "Coimbatore",
    community: "Gounder",
    visitedAt: "5 hours ago",
    isVerified: true,
    isBlurred: false,
  },
  {
    id: "v3",
    profileId: "TM-2003",
    name: "Arun V.",
    age: 27,
    occupation: "Doctor",
    location: "Madurai",
    community: "Mudaliar",
    visitedAt: "Yesterday",
    isVerified: false,
    isBlurred: true,
  },
  {
    id: "v4",
    profileId: "TM-2004",
    name: "Raj K.",
    age: 30,
    occupation: "Engineer",
    location: "Bangalore",
    community: "Iyengar",
    visitedAt: "Yesterday",
    isVerified: true,
    isBlurred: true,
  },
  {
    id: "v5",
    profileId: "TM-2005",
    name: "Venkat S.",
    age: 28,
    occupation: "Lawyer",
    location: "Trichy",
    community: "Chettiar",
    visitedAt: "2 days ago",
    isVerified: true,
    isBlurred: true,
  },
  {
    id: "v6",
    profileId: "TM-2006",
    name: "Prakash R.",
    age: 32,
    occupation: "Architect",
    location: "Salem",
    community: "Nadar",
    visitedAt: "3 days ago",
    isVerified: false,
    isBlurred: true,
  },
];

export default function WhoViewedMePage() {
  const [visitors] = useState(MOCK_VISITORS);
  const visibleCount = visitors.filter((v) => !v.isBlurred).length;
  const blurredCount = visitors.filter((v) => v.isBlurred).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Who Viewed Me</h1>
        <p className="text-sm text-neutral-500 mt-1">
          {visitors.length} people viewed your profile recently
        </p>
      </div>

      {/* Premium upsell */}
      {blurredCount > 0 && (
        <Card variant="flat" padding="md" className="bg-primary-50 border-primary-200">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600 shrink-0">
              <Crown className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-primary-900">
                {blurredCount} more profile{blurredCount !== 1 ? "s" : ""} viewed you
              </p>
              <p className="text-xs text-primary-700">
                Upgrade to Premium to see all visitors with full details
              </p>
            </div>
            <Button size="sm" asChild>
              <Link href="/premium">Upgrade</Link>
            </Button>
          </div>
        </Card>
      )}

      {/* Visitor list */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visitors.map((v) => (
          <Card key={v.id} variant="flat" padding="md" className="relative">
            {v.isBlurred && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-[var(--radius-lg)]">
                <Lock className="h-6 w-6 text-neutral-400 mb-2" />
                <p className="text-sm font-medium text-neutral-600">Premium Only</p>
                <Button size="sm" variant="secondary" className="mt-2" asChild>
                  <Link href="/premium">Unlock</Link>
                </Button>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-lg font-bold shrink-0">
                {v.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-neutral-900 truncate">
                    {v.name}, {v.age}
                  </h3>
                  {v.isVerified && <CheckCircle className="h-4 w-4 text-success shrink-0" />}
                </div>
                <p className="text-sm text-neutral-600 truncate">{v.occupation}</p>
                <div className="flex items-center gap-1 text-xs text-neutral-500">
                  <MapPin className="h-3 w-3" />
                  {v.location} &middot; {v.community}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="flex items-center gap-1 text-xs text-neutral-400">
                <Eye className="h-3 w-3" />
                {v.visitedAt}
              </span>
              <Button variant="secondary" size="sm" asChild>
                <Link href={`/profile/${v.profileId}`}>View Profile</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
