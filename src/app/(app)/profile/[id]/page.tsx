"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Badge, Tabs, TabsList, TabsTrigger, TabsContent, Card } from "@/components/ui";
import { MatchScore, VerifiedBadge, ProfileCard, PremiumUpsell } from "@/components/domain";
import {
  Heart,
  Share2,
  Flag,
  Ban,
  MapPin,
  Briefcase,
  GraduationCap,
  Star,
  ArrowLeft,
  Check,
  Lock,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function ProfileViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { t } = useTranslation();
  const [interestSent, setInterestSent] = useState(false);
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [reported, setReported] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const { isPremium } = useCurrentUser();

  return (
    <div className="space-y-6">
      <Button variant="text" size="sm" asChild>
        <Link href="/dashboard"><ArrowLeft className="h-4 w-4" /> {t.profile.backToMatches}</Link>
      </Button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
     
        {/* Photo gallery */}
      <div className="lg:col-span-5">

        {/* Main image */}
        <div className="aspect-[3/4] rounded-[var(--radius-lg)] bg-neutral-200 overflow-hidden relative">

          <Image
            src="/profiles/bride1.jpg"
            alt="Bride"
            fill
            className="object-cover"
          />

          <div className="absolute top-3 right-3">
            <VerifiedBadge status="verified" />
          </div>

          <div className="absolute top-3 left-3">
            <span className="flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-success">
              <span className="h-2 w-2 rounded-full bg-success" />
              {t.common.onlineNow}
            </span>
          </div>

        </div>

        {/* Thumbnails */}
        <div className="mt-3 flex gap-2">
          {[1,2,3].map((i) => (
            <div
              key={i}
              className="h-16 w-16 rounded-[var(--radius-md)] bg-neutral-200 border-2 border-transparent hover:border-primary-400 cursor-pointer transition-colors"
            />
          ))}
        </div>
      </div>
        {/* Quick info + actions */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">
              Anjali Raghavan, 26
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
              <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> Software Engineer</span>
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> Chennai</span>
              <span className="flex items-center gap-1"><GraduationCap className="h-4 w-4" /> B.E./B.Tech</span>
            </div>
            <p className="mt-1 text-sm text-neutral-500">Brahmin - Iyer &middot; Profile ID: {id}</p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant={interestSent ? "secondary" : "primary"}
              size="lg"
              onClick={() => setInterestSent(true)}
              disabled={interestSent}
            >
              {interestSent ? <Check className="h-5 w-5" /> : <Heart className="h-5 w-5" />}
              {interestSent ? "Interest Sent" : t.profile.expressInterest}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setIsShortlisted(!isShortlisted)}
            >
              <Heart className="h-5 w-5" fill={isShortlisted ? "currentColor" : "none"} />
              {isShortlisted ? "Shortlisted" : t.profile.shortlistLabel}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: "Check this profile", url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Profile link copied to clipboard!");
                }
              }}
            >
              <Share2 className="h-5 w-5" /> {t.profile.shareWithParent}
            </Button>
          </div>

          {/* Compatibility score */}
          <Card variant="flat" padding="lg">
            <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
              {t.profile.compatibilityLabel}
            </h3>
            <MatchScore
              score={82}
              size="lg"
              factors={[
                { label: "Star", matched: true },
                { label: "Community", matched: true },
                { label: "Location", matched: true },
                { label: "Age", matched: true },
                { label: "Education", matched: false },
              ]}
            />
          </Card>

          {/* Contact Details — Premium Only */}
          <Card variant="flat" padding="lg">
            <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
              Contact Details
            </h3>
            {isPremium ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50">
                    <Phone className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Phone</p>
                    <p className="text-sm font-medium text-neutral-900">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50">
                    <Mail className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Email</p>
                    <p className="text-sm font-medium text-neutral-900">anjali.r@email.com</p>
                  </div>
                </div>
                <Button variant="primary" size="sm" className="mt-2 w-full" asChild>
                  <Link href="/chat/conv-1">
                    <MessageSquare className="h-4 w-4" /> Chat Now
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="relative">
                <div className="space-y-3 select-none blur-sm pointer-events-none">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100">
                      <Phone className="h-4 w-4 text-neutral-400" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400">Phone</p>
                      <p className="text-sm font-medium text-neutral-400">+91 XXXXX XXXXX</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100">
                      <Mail className="h-4 w-4 text-neutral-400" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400">Email</p>
                      <p className="text-sm font-medium text-neutral-400">xxxxx@email.com</p>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Lock className="h-6 w-6 text-primary-600 mb-2" />
                  <p className="text-sm font-semibold text-neutral-900">Premium Feature</p>
                  <p className="text-xs text-neutral-500 mt-0.5">Upgrade to view contact details & chat</p>
                  <Button variant="premium" size="sm" className="mt-3" asChild>
                    <Link href="/premium">Upgrade to Premium</Link>
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Tabbed details */}
      <Tabs defaultValue="about">
        <TabsList>
          <TabsTrigger value="about">{t.profile.about}</TabsTrigger>
          <TabsTrigger value="family">{t.profile.family}</TabsTrigger>
          <TabsTrigger value="education">{t.profile.career}</TabsTrigger>
          <TabsTrigger value="preferences">{t.profile.partnerPrefs}</TabsTrigger>
          <TabsTrigger value="horoscope">{t.profile.horoscope}</TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <Card variant="flat" padding="lg">
            <p className="text-sm text-neutral-700 leading-relaxed">
              I am a cheerful and grounded person who values family traditions while embracing modern perspectives.
              I enjoy reading, traveling, and Carnatic music. Looking for someone who shares similar values and
              has a positive outlook on life.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4">
              <DetailRow label={t.profile.height} value={"5'5\""} />
              <DetailRow label={t.profile.diet} value="Vegetarian" />
              <DetailRow label={t.profile.motherTongue} value="Tamil" />
              <DetailRow label={t.profile.smoking} value="No" />
              <DetailRow label={t.profile.maritalStatus} value={t.profile.neverMarried} />
              <DetailRow label={t.profile.drinking} value="No" />
            </div>
            <div className="mt-6">
              <p className="text-sm font-medium text-neutral-600 mb-2">{t.profile.hobbies}</p>
              <div className="flex flex-wrap gap-2">
                {["Music", "Reading", "Travel", "Yoga", "Cooking"].map((h) => (
                  <Badge key={h} variant="outline" size="md">{h}</Badge>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="family">
          <Card variant="flat" padding="lg">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <DetailRow label={t.profile.familyType} value="Nuclear" />
              <DetailRow label={t.profile.familyStatus} value="Upper Middle Class" />
              <DetailRow label={t.profile.father} value="Retired Government Officer" />
              <DetailRow label={t.profile.mother} value="Homemaker" />
              <DetailRow label={t.profile.brothers} value="1 (Married)" />
              <DetailRow label={t.profile.sisters} value="1 (Unmarried)" />
              <DetailRow label={t.profile.familyValues} value="Traditional" />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="education">
          <Card variant="flat" padding="lg">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <DetailRow label={t.profile.highestDegree} value="B.E./B.Tech" />
              <DetailRow label={t.profile.institution} value="Anna University" />
              <DetailRow label={t.profile.occupationLabel} value="Software Engineer" />
              <DetailRow label={t.profile.employer} value="Infosys" />
              <DetailRow label={t.profile.annualIncome} value="8-10 Lakhs" />
              <DetailRow label={t.profile.workLocation} value="Chennai" />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card variant="flat" padding="lg">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <DetailRow label={t.profile.ageRangeLabel} value="26-32" />
              <DetailRow label={t.profile.height} value={"5'6\" - 6'0\""} />
              <DetailRow label={t.profile.educationLabel} value="Any Graduate" />
              <DetailRow label={t.profile.occupationLabel} value="Any Professional" />
              <DetailRow label={t.profile.communityLabel} value="Brahmin" />
              <DetailRow label={t.landing.location} value="Chennai, Bangalore" />
              <DetailRow label={t.profile.starMatch} value="Preferred" />
              <DetailRow label={t.profile.diet} value="Vegetarian" />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="horoscope">
          <Card variant="flat" padding="lg">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <DetailRow label={t.profile.star} value="Ashwini" />
              <DetailRow label={t.profile.rashi} value="Mesha" />
              <DetailRow label={t.profile.dosham} value="No" />
            </div>
            <Button variant="premium" asChild>
              <Link href={`/horoscope-match/${id}`}>
                <Star className="h-4 w-4" /> {t.profile.viewHoroscopeMatch}
              </Link>
            </Button>
            <p className="mt-2 text-xs text-neutral-500">
              {t.profile.horoscopeDetail}
            </p>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Report/Block */}
      <div className="flex items-center justify-center gap-6 pt-4 text-sm">
        <button
          onClick={() => { setReported(true); alert("Profile reported. Our team will review it within 24 hours."); }}
          disabled={reported}
          className="flex items-center gap-1 text-neutral-400 hover:text-error transition-colors disabled:opacity-50"
        >
          <Flag className="h-4 w-4" /> {reported ? "Reported" : t.profile.reportProfile}
        </button>
        <button
          onClick={() => { setBlocked(true); alert("User blocked. They can no longer see your profile."); }}
          disabled={blocked}
          className="flex items-center gap-1 text-neutral-400 hover:text-error transition-colors disabled:opacity-50"
        >
          <Ban className="h-4 w-4" /> {blocked ? "Blocked" : t.profile.blockPerson}
        </button>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-neutral-500">{label}</p>
      <p className="text-sm font-medium text-neutral-800">{value}</p>
    </div>
  );
}
