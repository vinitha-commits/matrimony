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
  ExternalLink,
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
                <div className="flex gap-2 mt-2">
                  <Button variant="primary" size="sm" className="flex-1" asChild>
                    <Link href="/chat/conv-1">
                      <MessageSquare className="h-4 w-4" /> Chat Now
                    </Link>
                  </Button>
                  <a
                    href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi, I found your profile (${id}) on Thirumangalyam and I'm interested in connecting.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] px-4 py-2 text-sm font-semibold text-white transition-colors"
                    style={{ backgroundColor: "#25D366" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1DA851")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#25D366")}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>
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
                  <p className="text-xs text-neutral-500 mt-0.5 text-center">Upgrade to view contact details, chat & connect via WhatsApp</p>
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
