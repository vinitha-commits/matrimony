"use client";

import { useState } from "react";
import { Button, Input, Select, Slider, Card, Badge, EmptyState } from "@/components/ui";
import { ProfileCard } from "@/components/domain";
import { SlidersHorizontal, X, Search } from "lucide-react";
import { COMMUNITIES, OCCUPATIONS, EDUCATION_LEVELS, HEIGHT_OPTIONS } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n";
import type { MatchCard } from "@/types";
import { cn } from "@/lib/utils";

const MOCK_RESULTS: MatchCard[] = [
  {
    id: "search-0",
    profileId: "TM20001",
    fullName: "Swetha Raghavan",
    age: 25,
    height: "5'4\"",
    occupation: "Software Engineer",
    location: "Chennai",
    community: "Brahmin - Iyer",
    primaryPhotoUrl: "/profiles/bride6.jpg",
    isVerified: true,
    isPremium: false,
    isOnline: true,
    compatibilityScore: 92,
    isShortlisted: false,
  },
  {
    id: "search-1",
    profileId: "TM20002",
    fullName: "Ramya Krishnan",
    age: 26,
    height: "5'3\"",
    occupation: "Doctor",
    location: "Bangalore",
    community: "Mudaliar",
    primaryPhotoUrl: "/profiles/bride7.jpg",
    isVerified: false,
    isPremium: false,
    isOnline: true,
    compatibilityScore: 88,
    isShortlisted: true,
  },
  {
    id: "search-2",
    profileId: "TM20003",
    fullName: "Nandini Iyer",
    age: 24,
    height: "5'5\"",
    occupation: "Teacher",
    location: "Coimbatore",
    community: "Brahmin - Iyer",
    primaryPhotoUrl: "/profiles/bride8.jpg",
    isVerified: true,
    isPremium: true,
    isOnline: false,
    compatibilityScore: 85,
    isShortlisted: false,
  },
  {
    id: "search-3",
    profileId: "TM20004",
    fullName: "Dharani Murugan",
    age: 27,
    height: "5'2\"",
    occupation: "Chartered Accountant",
    location: "Madurai",
    community: "Gounder",
    primaryPhotoUrl: "/profiles/bride9.jpg",
    isVerified: true,
    isPremium: false,
    isOnline: true,
    compatibilityScore: 82,
    isShortlisted: false,
  },
  {
    id: "search-4",
    profileId: "TM20005",
    fullName: "Aishwarya Suresh",
    age: 28,
    height: "5'6\"",
    occupation: "Business/Entrepreneur",
    location: "Hyderabad",
    community: "Reddy",
    primaryPhotoUrl: "/profiles/bride10.jpg",
    isVerified: false,
    isPremium: false,
    isOnline: false,
    compatibilityScore: 79,
    isShortlisted: false,
  },
  {
    id: "search-5",
    profileId: "TM20006",
    fullName: "Gayathri Venkat",
    age: 23,
    height: "5'3\"",
    occupation: "Scientist/Researcher",
    location: "Kochi",
    community: "Nair",
    primaryPhotoUrl: "/profiles/bride11.jpg",
    isVerified: true,
    isPremium: false,
    isOnline: false,
    compatibilityScore: 76,
    isShortlisted: true,
  },
  {
    id: "search-6",
    profileId: "TM20007",
    fullName: "Bhuvana Chandran",
    age: 29,
    height: "5'4\"",
    occupation: "Lawyer/Legal",
    location: "Trichy",
    community: "Pillai",
    primaryPhotoUrl: "/profiles/bride12.jpg",
    isVerified: false,
    isPremium: false,
    isOnline: false,
    compatibilityScore: 73,
    isShortlisted: false,
  },
  {
    id: "search-7",
    profileId: "TM20008",
    fullName: "Shalini Natarajan",
    age: 26,
    height: "5'5\"",
    occupation: "Banking Professional",
    location: "Salem",
    community: "Chettiar",
    primaryPhotoUrl: "/profiles/bride13.jpg",
    isVerified: true,
    isPremium: false,
    isOnline: true,
    compatibilityScore: 70,
    isShortlisted: false,
  },
  {
    id: "search-8",
    profileId: "TM20009",
    fullName: "Janani Balaji",
    age: 25,
    height: "5'2\"",
    occupation: "Government Employee",
    location: "Erode",
    community: "Gounder",
    primaryPhotoUrl: "/profiles/bride14.jpg",
    isVerified: false,
    isPremium: false,
    isOnline: false,
    compatibilityScore: 67,
    isShortlisted: false,
  },
];

export default function SearchPage() {
  const [showFilters, setShowFilters] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">{t.search.title}</h1>
        <Badge variant="outline">{MOCK_RESULTS.length} {t.common.results}</Badge>
      </div>

      <div className="flex gap-6">
        {/* Filter sidebar — desktop */}
        <aside className="hidden lg:block lg:w-64 lg:shrink-0">
          <FilterPanel />
        </aside>

        {/* Mobile filter toggle */}
        <div className="lg:hidden fixed bottom-16 left-4 right-4 z-50">
          <Button
            variant="primary"
            fullWidth
            onClick={() => setShowFilters(true)}
          >
            <SlidersHorizontal className="h-4 w-4" /> {t.search.filters}
          </Button>
        </div>

        {/* Mobile filter sheet */}
        {showFilters && (
          <div className="fixed inset-0 z-[400] lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
            <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-[var(--radius-xl)] bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-neutral-900">{t.search.filters}</h2>
                <button onClick={() => setShowFilters(false)}>
                  <X className="h-5 w-5 text-neutral-500" />
                </button>
              </div>
              <FilterPanel />
              <Button variant="primary" fullWidth className="mt-6" onClick={() => setShowFilters(false)}>
                {t.search.applyFilters}
              </Button>
            </div>
          </div>
        )}

        {/* Results grid */}
        <div className="flex-1 min-w-0">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Select
                options={[
                  { value: "relevance", label: t.search.relevance },
                  { value: "newest", label: t.search.newestFirst },
                  { value: "last_active", label: t.search.recentlyActive },
                  { value: "compatibility", label: t.search.compatibility },
                ]}
                placeholder={t.search.sortBy}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {MOCK_RESULTS.map((match) => (
              <ProfileCard key={match.id} profile={match} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="secondary">{t.common.loadMore}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterPanel() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <Input label={t.search.searchByNameId} placeholder="e.g., TM12345" />
      </div>
      <div>
        <Slider label={t.search.ageRange} min={18} max={60} step={1} defaultValue={[22, 32]} formatValue={(v) => `${v}`} />
      </div>
      <Select
        label={t.search.communityLabel}
        placeholder={t.search.anyCommunity}
        options={[{ value: "any", label: "Any" }, ...COMMUNITIES.map((c) => ({ value: c, label: c }))]}
      />
      <Select
        label={t.search.educationLabel}
        placeholder={t.search.anyEducation}
        options={EDUCATION_LEVELS.flatMap((g) => g.options.map((o) => ({ value: o, label: o, group: g.group })))}
      />
      <Select
        label={t.search.occupationLabel}
        placeholder={t.search.anyOccupation}
        options={OCCUPATIONS.map((o) => ({ value: o, label: o }))}
      />
      <Input label={t.search.locationLabel} placeholder={t.search.cityOrState} />
      <div className="grid grid-cols-2 gap-3">
        <Select label={t.search.heightMin} placeholder={"4'0\""} options={HEIGHT_OPTIONS.map((h) => ({ value: h, label: h }))} />
        <Select label={t.search.heightMax} placeholder={"6'6\""} options={HEIGHT_OPTIONS.map((h) => ({ value: h, label: h }))} />
      </div>

      <div className="hidden lg:flex gap-2">
        <Button variant="ghost" size="sm" fullWidth>{t.common.clear}</Button>
        <Button variant="primary" size="sm" fullWidth>{t.common.apply}</Button>
      </div>
    </div>
  );
}
