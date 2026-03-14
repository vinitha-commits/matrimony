"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, Badge, Progress, Tabs, TabsList, TabsTrigger, TabsContent, Input, Select, Checkbox } from "@/components/ui";
import { Textarea } from "@/components/ui";
import { VerifiedBadge, PhotoUploadZone } from "@/components/domain";
import { Edit3, Eye } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import {
  MOTHER_TONGUES,
  COMMUNITIES,
  NAKSHATRAS,
  RASHIS,
  EDUCATION_LEVELS,
  OCCUPATIONS,
  INCOME_RANGES,
  HEIGHT_OPTIONS,
  HOBBIES,
  STATES,
  STATE_CITIES,
  FAMILY_TYPE_OPTIONS,
  FAMILY_STATUS_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  DOSHAM_OPTIONS,
  DIET_OPTIONS,
  SMOKING_OPTIONS,
  DRINKING_OPTIONS,
  STAR_COMPATIBILITY_OPTIONS,
  DOSHAM_PREF_OPTIONS,
  DIET_PREF_OPTIONS,
} from "@/lib/constants";

export default function MyProfilePage() {
  const { t } = useTranslation();
  const [saved, setSaved] = useState<string | null>(null);

  // Basic Info
  const [height, setHeight] = useState("5'4\"");
  const [motherTongue, setMotherTongue] = useState("Tamil");
  const [community, setCommunity] = useState("Brahmin - Iyer");
  const [maritalStatus, setMaritalStatus] = useState("never_married");

  // Family
  const [star, setStar] = useState("Ashwini");
  const [rashi, setRashi] = useState("Mesha (Aries)");
  const [dosham, setDosham] = useState("No Dosham");
  const [familyType, setFamilyType] = useState("Nuclear Family");
  const [familyStatus, setFamilyStatus] = useState("Upper Middle Class");

  // Career
  const [highestDegree, setHighestDegree] = useState("B.E./B.Tech");
  const [occupation, setOccupation] = useState("Software Professional");
  const [annualIncome, setAnnualIncome] = useState("8-10 Lakhs");
  const [state, setState] = useState("Tamil Nadu");
  const [city, setCity] = useState("Chennai");

  // About
  const [diet, setDiet] = useState("vegetarian");
  const [smoking, setSmoking] = useState("no");
  const [drinking, setDrinking] = useState("no");
  const [selectedHobbies, setSelectedHobbies] = useState<Set<string>>(
    new Set(["Music", "Reading", "Travel", "Yoga", "Cooking"])
  );

  // Partner Preferences
  const [prefAgeMin, setPrefAgeMin] = useState("26");
  const [prefAgeMax, setPrefAgeMax] = useState("32");
  const [prefHeightMin, setPrefHeightMin] = useState("5'6\"");
  const [prefHeightMax, setPrefHeightMax] = useState("6'0\"");
  const [prefEducation, setPrefEducation] = useState("");
  const [prefOccupation, setPrefOccupation] = useState("");
  const [prefCommunities, setPrefCommunities] = useState<Set<string>>(new Set(["Brahmin - Iyer", "Brahmin - Iyengar"]));
  const [prefState, setPrefState] = useState("Tamil Nadu");
  const [prefCity, setPrefCity] = useState("");
  const [prefStarCompat, setPrefStarCompat] = useState("preferred");
  const [prefDosham, setPrefDosham] = useState("doesnt_matter");
  const [prefDiet, setPrefDiet] = useState("doesnt_matter");
  const [prefMaritalStatus, setPrefMaritalStatus] = useState<Set<string>>(new Set(["never_married"]));

  const handleSave = (section: string) => {
    setSaved(section);
    setTimeout(() => setSaved(null), 2000);
  };

  const toggleHobby = (hobby: string) => {
    setSelectedHobbies((prev) => {
      const next = new Set(prev);
      if (next.has(hobby)) next.delete(hobby);
      else next.add(hobby);
      return next;
    });
  };

  const togglePrefCommunity = (c: string) => {
    setPrefCommunities((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };

  const togglePrefMarital = (s: string) => {
    setPrefMaritalStatus((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
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

        {/* ─── Photos ─── */}
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

        {/* ─── Basic Info ─── */}
        <TabsContent value="basic">
          <Card variant="flat" padding="lg" className="space-y-5">
            <Input label={t.profile.fullName} defaultValue="Priya Shankar" />
            <Input label={t.profile.dateOfBirth} type="date" defaultValue="1999-03-15" />
            <Select
              label={t.profile.height}
              value={height}
              onValueChange={setHeight}
              options={HEIGHT_OPTIONS.map((h) => ({ value: h, label: h }))}
            />
            <Select
              label={t.profile.motherTongue}
              value={motherTongue}
              onValueChange={setMotherTongue}
              options={MOTHER_TONGUES.map((l) => ({ value: l, label: l }))}
            />
            <Select
              label={t.profile.communityLabel}
              value={community}
              onValueChange={setCommunity}
              options={COMMUNITIES.map((c) => ({ value: c, label: c }))}
            />
            <Select
              label={t.profile.maritalStatus}
              value={maritalStatus}
              onValueChange={setMaritalStatus}
              options={MARITAL_STATUS_OPTIONS.map((s) => ({ value: s.value, label: s.label }))}
            />
            {saved === "basic" && <p className="text-sm text-success font-medium">Basic info saved successfully!</p>}
            <Button variant="primary" size="md" onClick={() => handleSave("basic")}>{t.common.save}</Button>
          </Card>
        </TabsContent>

        {/* ─── Family ─── */}
        <TabsContent value="family">
          <Card variant="flat" padding="lg" className="space-y-5">
            <Input label={t.profile.religion} defaultValue="Hindu" disabled />
            <Input label={t.profile.gothra} defaultValue="Bharadwaj" placeholder="e.g., Bharadwaj" />
            <Select
              label={t.profile.starNakshatra}
              value={star}
              onValueChange={setStar}
              options={NAKSHATRAS.map((n) => ({ value: n, label: n }))}
            />
            <Select
              label={t.profile.rashi}
              value={rashi}
              onValueChange={setRashi}
              options={RASHIS.map((r) => ({ value: r, label: r }))}
            />
            <Select
              label="Dosham"
              value={dosham}
              onValueChange={setDosham}
              options={DOSHAM_OPTIONS.map((d) => ({ value: d, label: d }))}
            />
            <Select
              label={t.profile.familyType}
              value={familyType}
              onValueChange={setFamilyType}
              options={FAMILY_TYPE_OPTIONS.map((f) => ({ value: f, label: f }))}
            />
            <Select
              label={t.profile.familyStatus}
              value={familyStatus}
              onValueChange={setFamilyStatus}
              options={FAMILY_STATUS_OPTIONS.map((s) => ({ value: s, label: s }))}
            />
            <Input label={t.profile.fatherOccupation} defaultValue="Retired Government Officer" placeholder="e.g., Retired Government Officer" />
            <Input label={t.profile.motherOccupation} defaultValue="Homemaker" placeholder="e.g., Homemaker" />
            {saved === "family" && <p className="text-sm text-success font-medium">Family details saved successfully!</p>}
            <Button variant="primary" size="md" onClick={() => handleSave("family")}>{t.common.save}</Button>
          </Card>
        </TabsContent>

        {/* ─── Career ─── */}
        <TabsContent value="career">
          <Card variant="flat" padding="lg" className="space-y-5">
            <Select
              label={t.profile.highestDegree}
              value={highestDegree}
              onValueChange={setHighestDegree}
              options={EDUCATION_LEVELS.flatMap((g) =>
                g.options.map((o) => ({ value: o, label: o, group: g.group }))
              )}
            />
            <Input label={t.profile.institution} defaultValue="Anna University" placeholder="e.g., Anna University" />
            <Select
              label={t.profile.occupationLabel}
              value={occupation}
              onValueChange={setOccupation}
              options={OCCUPATIONS.map((o) => ({ value: o, label: o }))}
            />
            <Input label={t.profile.employer} defaultValue="Infosys" placeholder="e.g., Infosys" />
            <Select
              label={t.profile.annualIncome}
              value={annualIncome}
              onValueChange={setAnnualIncome}
              options={INCOME_RANGES.map((r) => ({ value: r, label: r }))}
            />

            {/* Location */}
            <div className="border-t border-neutral-200 pt-5">
              <p className="text-sm font-medium text-neutral-700 mb-3">Location</p>
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="State"
                  value={state}
                  onValueChange={(v) => { setState(v); setCity(""); }}
                  options={STATES.map((s) => ({ value: s, label: s }))}
                />
                <Select
                  label="City"
                  value={city || undefined}
                  onValueChange={setCity}
                  placeholder="Select city"
                  options={
                    state && STATE_CITIES[state]
                      ? STATE_CITIES[state].map((c) => ({ value: c, label: c }))
                      : []
                  }
                  disabled={!state}
                />
              </div>
            </div>

            {/* WhatsApp */}
            <div className="border-t border-neutral-200 pt-5">
              <Input
                label="WhatsApp Number"
                placeholder="+91 98765 43210"
                defaultValue=""
              />
              <p className="mt-1 text-xs text-neutral-500">Premium members can connect with you via WhatsApp. Leave blank to hide.</p>
            </div>
            {saved === "career" && <p className="text-sm text-success font-medium">Career details saved successfully!</p>}
            <Button variant="primary" size="md" onClick={() => handleSave("career")}>{t.common.save}</Button>
          </Card>
        </TabsContent>

        {/* ─── About ─── */}
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
            <Select
              label={t.profile.diet}
              value={diet}
              onValueChange={setDiet}
              options={DIET_OPTIONS.map((d) => ({ value: d.value, label: d.label }))}
            />
            <Select
              label={t.profile.smoking}
              value={smoking}
              onValueChange={setSmoking}
              options={SMOKING_OPTIONS.map((s) => ({ value: s.value, label: s.label }))}
            />
            <Select
              label={t.profile.drinking}
              value={drinking}
              onValueChange={setDrinking}
              options={DRINKING_OPTIONS.map((d) => ({ value: d.value, label: d.label }))}
            />

            {/* Hobbies */}
            <div>
              <span className="text-sm font-medium text-neutral-600 mb-3 block">{t.profile.hobbies}</span>
              <div className="flex flex-wrap gap-2">
                {HOBBIES.map((h) => (
                  <button
                    key={h}
                    onClick={() => toggleHobby(h)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium border transition-colors ${
                      selectedHobbies.has(h)
                        ? "bg-primary-50 border-primary-500 text-primary-700"
                        : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300"
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
            {saved === "about" && <p className="text-sm text-success font-medium">About section saved successfully!</p>}
            <Button variant="primary" size="md" onClick={() => handleSave("about")}>{t.common.save}</Button>
          </Card>
        </TabsContent>

        {/* ─── Partner Preferences ─── */}
        <TabsContent value="preferences">
          <Card variant="flat" padding="lg" className="space-y-5">
            {/* Age Range */}
            <div>
              <p className="text-sm font-medium text-neutral-600 mb-2">{t.profile.ageRangeLabel}</p>
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label={t.profile.ageMin}
                  value={prefAgeMin}
                  onValueChange={(v) => { setPrefAgeMin(v); if (Number(v) > Number(prefAgeMax)) setPrefAgeMax(v); }}
                  options={Array.from({ length: 43 }, (_, i) => ({ value: String(18 + i), label: `${18 + i} yrs` }))}
                />
                <Select
                  label={t.profile.ageMax}
                  value={prefAgeMax}
                  onValueChange={(v) => { setPrefAgeMax(v); if (Number(v) < Number(prefAgeMin)) setPrefAgeMin(v); }}
                  options={Array.from({ length: 43 }, (_, i) => ({ value: String(18 + i), label: `${18 + i} yrs` }))}
                />
              </div>
            </div>

            {/* Height Range */}
            <div>
              <p className="text-sm font-medium text-neutral-600 mb-2">{t.profile.heightRange}</p>
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Min Height"
                  value={prefHeightMin}
                  onValueChange={setPrefHeightMin}
                  options={HEIGHT_OPTIONS.map((h) => ({ value: h, label: h }))}
                />
                <Select
                  label="Max Height"
                  value={prefHeightMax}
                  onValueChange={setPrefHeightMax}
                  options={HEIGHT_OPTIONS.map((h) => ({ value: h, label: h }))}
                />
              </div>
            </div>

            {/* Education */}
            <Select
              label={t.profile.educationLabel}
              value={prefEducation || undefined}
              onValueChange={setPrefEducation}
              placeholder="Any education"
              options={EDUCATION_LEVELS.flatMap((g) =>
                g.options.map((o) => ({ value: o, label: o, group: g.group }))
              )}
            />

            {/* Occupation */}
            <Select
              label={t.profile.occupationLabel}
              value={prefOccupation || undefined}
              onValueChange={setPrefOccupation}
              placeholder="Any occupation"
              options={OCCUPATIONS.map((o) => ({ value: o, label: o }))}
            />

            {/* Preferred Communities */}
            <div>
              <p className="text-sm font-medium text-neutral-600 mb-2">{t.profile.communities}</p>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto rounded-lg border border-neutral-200 p-3">
                {COMMUNITIES.map((c) => (
                  <Checkbox
                    key={c}
                    label={c}
                    checked={prefCommunities.has(c)}
                    onCheckedChange={() => togglePrefCommunity(c)}
                  />
                ))}
              </div>
              {prefCommunities.size > 0 && (
                <p className="mt-1.5 text-xs text-neutral-500">{prefCommunities.size} selected</p>
              )}
            </div>

            {/* Preferred Location */}
            <div>
              <p className="text-sm font-medium text-neutral-600 mb-2">{t.profile.locations}</p>
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="State"
                  value={prefState || undefined}
                  onValueChange={(v) => { setPrefState(v); setPrefCity(""); }}
                  placeholder="Any state"
                  options={STATES.map((s) => ({ value: s, label: s }))}
                />
                <Select
                  label="City"
                  value={prefCity || undefined}
                  onValueChange={setPrefCity}
                  placeholder={prefState ? "Select city" : "Select state first"}
                  options={
                    prefState && STATE_CITIES[prefState]
                      ? STATE_CITIES[prefState].map((c) => ({ value: c, label: c }))
                      : []
                  }
                  disabled={!prefState}
                />
              </div>
            </div>

            {/* Marital Status */}
            <div>
              <p className="text-sm font-medium text-neutral-600 mb-2">{t.profile.maritalStatus}</p>
              <div className="space-y-2">
                {MARITAL_STATUS_OPTIONS.map((s) => (
                  <Checkbox
                    key={s.value}
                    label={s.label}
                    checked={prefMaritalStatus.has(s.value)}
                    onCheckedChange={() => togglePrefMarital(s.value)}
                  />
                ))}
              </div>
            </div>

            {/* Star Compatibility */}
            <Select
              label={t.profile.starCompatibility}
              value={prefStarCompat}
              onValueChange={setPrefStarCompat}
              options={STAR_COMPATIBILITY_OPTIONS.map((s) => ({ value: s.value, label: s.label }))}
            />

            {/* Dosham Preference */}
            <Select
              label={t.profile.dosham}
              value={prefDosham}
              onValueChange={setPrefDosham}
              options={DOSHAM_PREF_OPTIONS.map((d) => ({ value: d.value, label: d.label }))}
            />

            {/* Diet Preference */}
            <Select
              label={t.profile.diet}
              value={prefDiet}
              onValueChange={setPrefDiet}
              options={DIET_PREF_OPTIONS.map((d) => ({ value: d.value, label: d.label }))}
            />

            {saved === "preferences" && <p className="text-sm text-success font-medium">Preferences saved successfully!</p>}
            <Button variant="primary" size="md" onClick={() => handleSave("preferences")}>{t.profile.savePreferences}</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
