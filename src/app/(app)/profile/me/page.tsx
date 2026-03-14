"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, Badge, Progress, Tabs, TabsList, TabsTrigger, TabsContent, Input } from "@/components/ui";
import { Textarea } from "@/components/ui";
import { VerifiedBadge, PhotoUploadZone } from "@/components/domain";
import { Edit3, Eye } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function MyProfilePage() {
  const { t } = useTranslation();
  const [saved, setSaved] = useState<string | null>(null);

  const handleSave = (section: string) => {
    setSaved(section);
    setTimeout(() => setSaved(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">{t.profile.myProfile}</h1>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" /> {t.profile.preview}
          </Button>
        </div>
      </div>

      {/* Completion card */}
      <Card variant="alert" padding="lg" className="border-l-primary-600 bg-primary-50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-neutral-900">{t.profile.profileCompletion}</h2>
            <p className="text-sm text-neutral-500 mt-0.5">
              {t.profile.completeProfileHint}
            </p>
            <Progress value={75} showPercentage size="md" className="mt-3 max-w-xs" />
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <span className="text-error font-medium">{t.profile.missing}: {t.profile.horoscope}, {t.profile.idVerification}</span>
          </div>
        </div>
      </Card>

      {/* Profile sections */}
      <Tabs defaultValue="photos">
        <TabsList>
          <TabsTrigger value="photos">{t.profile.photos}</TabsTrigger>
          <TabsTrigger value="basic">{t.profile.basicInfo}</TabsTrigger>
          <TabsTrigger value="family">{t.profile.family}</TabsTrigger>
          <TabsTrigger value="career">{t.profile.career}</TabsTrigger>
          <TabsTrigger value="about">{t.profile.about}</TabsTrigger>
          <TabsTrigger value="preferences">{t.profile.partnerPrefs}</TabsTrigger>
        </TabsList>

        <TabsContent value="photos">
          <Card variant="flat" padding="lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-neutral-900">{t.profile.profilePhotos}</h3>
                <p className="text-xs text-neutral-500">{t.profile.uploadPhotos}</p>
              </div>
              <VerifiedBadge status="verified" />
            </div>
            <PhotoUploadZone
              photos={[
                { id: "1", preview: "", isPrimary: true },
              ]}
              onAdd={() => {}}
              onRemove={() => {}}
              onSetPrimary={() => {}}
            />
          </Card>
        </TabsContent>

        <TabsContent value="basic">
          <Card variant="flat" padding="lg" className="space-y-5">
            <Input label={t.profile.fullName} defaultValue="Priya Shankar" />
            <Input label={t.profile.dateOfBirth} type="date" defaultValue="1999-03-15" />
            <Input label={t.profile.height} defaultValue={"5'4\""} disabled />
            <Input label={t.profile.motherTongue} defaultValue="Tamil" disabled />
            <Input label={t.profile.communityLabel} defaultValue="Brahmin - Iyer" disabled />
            <Input label={t.profile.maritalStatus} defaultValue={t.profile.neverMarried} disabled hint={t.profile.contactSupport} />
            {saved === "basic" && <p className="text-sm text-success font-medium">Basic info saved successfully!</p>}
            <Button variant="primary" size="md" onClick={() => handleSave("basic")}>{t.common.save}</Button>
          </Card>
        </TabsContent>

        <TabsContent value="family">
          <Card variant="flat" padding="lg" className="space-y-5">
            <Input label={t.profile.religion} defaultValue="Hindu" />
            <Input label={t.profile.gothra} defaultValue="Bharadwaj" />
            <Input label={t.profile.starNakshatra} defaultValue="Ashwini" />
            <Input label={t.profile.rashi} defaultValue="Mesha" />
            <Input label={t.profile.familyType} defaultValue="Nuclear" />
            <Input label={t.profile.fatherOccupation} defaultValue="Retired Government Officer" />
            <Input label={t.profile.motherOccupation} defaultValue="Homemaker" />
            {saved === "family" && <p className="text-sm text-success font-medium">Family details saved successfully!</p>}
            <Button variant="primary" size="md" onClick={() => handleSave("family")}>{t.common.save}</Button>
          </Card>
        </TabsContent>

        <TabsContent value="career">
          <Card variant="flat" padding="lg" className="space-y-5">
            <Input label={t.profile.highestDegree} defaultValue="B.E./B.Tech" />
            <Input label={t.profile.institution} defaultValue="Anna University" />
            <Input label={t.profile.occupationLabel} defaultValue="Software Engineer" />
            <Input label={t.profile.employer} defaultValue="Infosys" />
            <Input label={t.profile.annualIncome} defaultValue="8-10 Lakhs" />
            <Input label={t.profile.workLocation} defaultValue="Chennai" />
            {saved === "career" && <p className="text-sm text-success font-medium">Career details saved successfully!</p>}
            <Button variant="primary" size="md" onClick={() => handleSave("career")}>{t.common.save}</Button>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card variant="flat" padding="lg" className="space-y-5">
            <Textarea
              label={t.profile.aboutMe}
              defaultValue="I am a cheerful and grounded person who values family traditions while embracing modern perspectives."
              maxLength={500}
              charCount
            />
            <Textarea
              label={t.profile.lookingFor}
              defaultValue="Looking for someone who shares similar values and has a positive outlook on life."
              maxLength={300}
              charCount
            />
            <div>
              <span className="text-sm font-medium text-neutral-600 mb-2 block">{t.profile.hobbies}</span>
              <div className="flex flex-wrap gap-2">
                {["Music", "Reading", "Travel", "Yoga", "Cooking"].map((h) => (
                  <Badge key={h} variant="primary" size="md">{h}</Badge>
                ))}
              </div>
            </div>
            {saved === "about" && <p className="text-sm text-success font-medium">About section saved successfully!</p>}
            <Button variant="primary" size="md" onClick={() => handleSave("about")}>{t.common.save}</Button>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card variant="flat" padding="lg" className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Input label={t.profile.ageMin} type="number" defaultValue="26" />
              <Input label={t.profile.ageMax} type="number" defaultValue="32" />
            </div>
            <Input label={t.profile.heightRange} defaultValue={"5'6\" - 6'0\""} />
            <Input label={t.profile.educationLabel} defaultValue="Any Graduate" />
            <Input label={t.profile.communities} defaultValue="Brahmin" />
            <Input label={t.profile.locations} defaultValue="Chennai, Bangalore" />
            <Input label={t.profile.starCompatibility} defaultValue="Preferred" />
            <Input label={t.profile.diet} defaultValue="Vegetarian" />
            {saved === "preferences" && <p className="text-sm text-success font-medium">Preferences saved successfully!</p>}
            <Button variant="primary" size="md" onClick={() => handleSave("preferences")}>{t.profile.savePreferences}</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
