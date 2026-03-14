"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Trash2, MapPin, CheckCircle } from "lucide-react";
import { Button, Card, Badge } from "@/components/ui";
import type { MatchCard } from "@/types";

const MOCK_SHORTLISTED: MatchCard[] = [
  {
    id: "s1",
    profileId: "TM-1001",
    fullName: "Ananya R.",
    age: 26,
    height: "5'4\"",
    occupation: "Software Engineer",
    location: "Chennai",
    community: "Iyer",
    primaryPhotoUrl: "",
    compatibilityScore: 87,
    isVerified: true,
    isPremium: false,
    isOnline: true,
    isShortlisted: true,
  },
  {
    id: "s2",
    profileId: "TM-1002",
    fullName: "Divya K.",
    age: 24,
    height: "5'3\"",
    occupation: "Doctor (MBBS)",
    location: "Coimbatore",
    community: "Mudaliar",
    primaryPhotoUrl: "",
    compatibilityScore: 82,
    isVerified: true,
    isPremium: true,
    isOnline: false,
    isShortlisted: true,
  },
  {
    id: "s3",
    profileId: "TM-1003",
    fullName: "Meenakshi S.",
    age: 27,
    height: "5'5\"",
    occupation: "CA",
    location: "Madurai",
    community: "Chettiar",
    primaryPhotoUrl: "",
    compatibilityScore: 79,
    isVerified: false,
    isPremium: false,
    isOnline: false,
    isShortlisted: true,
  },
  {
    id: "s4",
    profileId: "TM-1004",
    fullName: "Preethi V.",
    age: 25,
    height: "5'2\"",
    occupation: "Teacher",
    location: "Trichy",
    community: "Gounder",
    primaryPhotoUrl: "",
    compatibilityScore: 91,
    isVerified: true,
    isPremium: false,
    isOnline: true,
    isShortlisted: true,
  },
  {
    id: "s5",
    profileId: "TM-1005",
    fullName: "Sangeetha M.",
    age: 28,
    height: "5'6\"",
    occupation: "Architect",
    location: "Bangalore",
    community: "Iyengar",
    primaryPhotoUrl: "",
    compatibilityScore: 85,
    isVerified: true,
    isPremium: true,
    isOnline: false,
    isShortlisted: true,
  },
];

export default function ShortlistPage() {
  const [profiles, setProfiles] = useState(MOCK_SHORTLISTED);

  const removeFromShortlist = (id: string) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">My Shortlist</h1>
        <p className="text-sm text-neutral-500 mt-1">
          {profiles.length} profile{profiles.length !== 1 ? "s" : ""} saved
        </p>
      </div>

      {profiles.length === 0 ? (
        <Card variant="flat" padding="lg" className="text-center py-16">
          <Heart className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-neutral-700">No saved profiles</h2>
          <p className="text-sm text-neutral-500 mt-1 mb-4">
            Browse matches and tap the heart icon to save profiles here.
          </p>
          <Button asChild>
            <Link href="/search">Browse Profiles</Link>
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profiles.map((p) => (
            <Card key={p.id} variant="flat" padding="md" className="flex flex-col">
              {/* Avatar */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-lg font-bold shrink-0">
                  {p.fullName.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-neutral-900 truncate">
                      {p.fullName}, {p.age}
                    </h3>
                    {p.isVerified && <CheckCircle className="h-4 w-4 text-success shrink-0" />}
                  </div>
                  <p className="text-sm text-neutral-600 truncate">{p.occupation}</p>
                  <div className="flex items-center gap-1 text-xs text-neutral-500">
                    <MapPin className="h-3 w-3" />
                    {p.location} &middot; {p.community}
                  </div>
                </div>
              </div>

              {/* Compatibility */}
              {p.compatibilityScore !== undefined && (
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-1.5 flex-1 rounded-full bg-neutral-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        p.compatibilityScore >= 80
                          ? "bg-success"
                          : p.compatibilityScore >= 60
                          ? "bg-secondary-500"
                          : "bg-warning"
                      }`}
                      style={{ width: `${p.compatibilityScore}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-neutral-600">
                    {p.compatibilityScore}% match
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 mt-auto">
                <Button variant="secondary" size="sm" className="flex-1" asChild>
                  <Link href={`/profile/${p.profileId}`}>View Profile</Link>
                </Button>
                <button
                  onClick={() => removeFromShortlist(p.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
                  aria-label="Remove from shortlist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
