"use client";

import { use } from "react";
import Link from "next/link";
import { Button, Card, Badge } from "@/components/ui";
import { Avatar } from "@/components/ui";
import { HoroscopeGrid, MatchScore, PremiumUpsell } from "@/components/domain";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import type { Porutham } from "@/types";
import { PORUTHAMS } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n";

const MOCK_PORUTHAMS: Porutham[] = PORUTHAMS.map((p, i) => ({
  name: p.name,
  tamilName: p.tamilName,
  isCompatible: i === 4 ? "partial" : i === 6 ? false : true,
  description: "",
}));

export default function HoroscopeMatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <Button variant="text" size="sm" asChild>
        <Link href={`/profile/${id}`}><ArrowLeft className="h-4 w-4" /> {t.horoscope.backToProfile}</Link>
      </Button>

      <h1 className="text-2xl font-bold text-neutral-900">{t.horoscope.title}</h1>

      {/* Profiles compared */}
      <Card variant="flat" padding="lg">
        <div className="flex items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <Avatar name={t.horoscope.you} size="xl" />
            <div className="text-center">
              <p className="text-sm font-semibold text-neutral-900">{t.horoscope.you}</p>
              <p className="text-xs text-neutral-500">Ashwini &middot; Mesha</p>
            </div>
          </div>

          <MatchScore
            score={70}
            size="lg"
            factors={[
              { label: "Star", matched: true },
              { label: "Rashi", matched: true },
              { label: "Dosham", matched: true },
            ]}
          />

          <div className="flex flex-col items-center gap-2">
            <Avatar name="Anjali R." size="xl" />
            <div className="text-center">
              <p className="text-sm font-semibold text-neutral-900">Anjali R.</p>
              <p className="text-xs text-neutral-500">Rohini &middot; Vrishabha</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Porutham analysis */}
      <section>
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">
          {t.horoscope.poruthamAnalysis}
        </h2>
        <HoroscopeGrid poruthams={MOCK_PORUTHAMS} />
      </section>

      {/* Dosham status */}
      <Card variant="flat" padding="lg">
        <h2 className="text-lg font-semibold text-neutral-900 mb-3">{t.horoscope.doshamStatus}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-neutral-500">{t.horoscope.you}</p>
            <p className="text-sm font-medium text-neutral-800">{t.horoscope.noDosham}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500">Anjali R.</p>
            <p className="text-sm font-medium text-neutral-800">{t.horoscope.noDosham}</p>
          </div>
        </div>
        <Badge variant="success" size="lg" className="mt-3">{t.horoscope.noDoshamConcerns}</Badge>
      </Card>

      {/* Premium detailed report */}
      <PremiumUpsell feature="horoscope" />

      {/* Actions */}
      <div className="flex justify-center gap-3">
        <Button variant="ghost" onClick={() => alert("Horoscope PDF download started!")}>
          <Download className="h-4 w-4" /> {t.horoscope.downloadPdf}
        </Button>
        <Button variant="ghost" onClick={() => {
          if (navigator.share) {
            navigator.share({ title: "Horoscope Match Report", url: window.location.href });
          } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
          }
        }}>
          <Share2 className="h-4 w-4" /> {t.horoscope.share}
        </Button>
        <Button variant="secondary" asChild>
          <Link href={`/profile/${id}`}>{t.horoscope.backToProfile}</Link>
        </Button>
      </div>
    </div>
  );
}
