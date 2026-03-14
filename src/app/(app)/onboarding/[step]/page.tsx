"use client";

import { use } from "react";
import Link from "next/link";
import { Button, Input, RadioGroup, Select } from "@/components/ui";
import { Textarea } from "@/components/ui";
import { StepIndicator } from "@/components/layout";
import { PhotoUploadZone } from "@/components/domain";
import { MOTHER_TONGUES, COMMUNITIES, NAKSHATRAS, EDUCATION_LEVELS, OCCUPATIONS, INCOME_RANGES, HOBBIES, HEIGHT_OPTIONS, WIZARD_STEPS } from "@/lib/constants";
import { Shield } from "lucide-react";

export default function OnboardingStepPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step: stepParam } = use(params);
  const step = parseInt(stepParam, 10);
  const stepConfig = WIZARD_STEPS.find((s) => s.step === step);
  const isFirst = step === 1;
  const isLast = step === 6;

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6 md:px-8 lg:px-20">
      {/* Step indicator */}
      <div className="mb-8">
        <StepIndicator currentStep={step} />
      </div>

      {/* Step content */}
      <div className="mx-auto max-w-[640px]">
        <h1 className="text-2xl font-bold text-neutral-900">
          {stepConfig?.description || "Complete Your Profile"}
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          {step <= 3
            ? "This information helps us find the right matches for you."
            : "This is optional but greatly improves your match quality."}
        </p>

        <div className="mt-8 space-y-5">
          {step === 1 && <Step1Fields />}
          {step === 2 && <Step2Fields />}
          {step === 3 && <Step3Fields />}
          {step === 4 && <Step4Fields />}
          {step === 5 && <Step5Fields />}
          {step === 6 && <Step6Fields />}
        </div>

        {/* Bottom action bar */}
        <div className="mt-10 flex items-center justify-between border-t border-neutral-200 pt-6">
          <div>
            {!isFirst && (
              <Button variant="text" asChild>
                <Link href={`/onboarding/${step - 1}`}>&larr; Back</Link>
              </Button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => alert("Draft saved successfully!")}>Save Draft</Button>
            <Button variant="primary" size="md" asChild>
              <Link href={isLast ? "/dashboard" : `/onboarding/${step + 1}`}>
                {isLast ? "Complete Profile" : "Save & Continue \u2192"}
              </Link>
            </Button>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-neutral-400 flex items-center justify-center gap-1">
          <Shield className="h-3.5 w-3.5" />
          Your information is private and secure
        </p>
      </div>
    </div>
  );
}

function Step1Fields() {
  return (
    <>
      <Input label="Full Name" placeholder="Enter your full name" />
      <Input label="Date of Birth" type="date" />
      <Select
        label="Height"
        placeholder="Select height"
        options={HEIGHT_OPTIONS.map((h) => ({ value: h, label: h }))}
      />
      <Select
        label="Mother Tongue"
        placeholder="Select language"
        options={MOTHER_TONGUES.map((l) => ({ value: l, label: l }))}
      />
      <Select
        label="Community / Sub-caste"
        placeholder="Select community"
        options={COMMUNITIES.map((c) => ({ value: c, label: c }))}
      />
      <RadioGroup
        label="Marital Status"
        options={[
          { value: "never_married", label: "Never Married" },
          { value: "divorced", label: "Divorced" },
          { value: "widowed", label: "Widowed" },
          { value: "awaiting_divorce", label: "Awaiting Divorce" },
        ]}
        layout="horizontal"
      />
    </>
  );
}

function Step2Fields() {
  return (
    <>
      <Input label="Religion" placeholder="e.g., Hindu" />
      <Input label="Gothra" placeholder="Enter gothra (optional)" />
      <Select
        label="Star / Nakshatra"
        placeholder="Select nakshatra"
        options={NAKSHATRAS.map((n) => ({ value: n, label: n }))}
      />
      <Input label="Rashi" placeholder="Auto-calculated or enter manually" />
      <RadioGroup
        label="Dosham (Chevvai / Manglik)"
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "dont_know", label: "Don't Know" },
        ]}
        layout="horizontal"
      />
      <RadioGroup
        label="Family Type"
        options={[
          { value: "joint", label: "Joint Family" },
          { value: "nuclear", label: "Nuclear Family" },
        ]}
        layout="horizontal"
      />
      <Select
        label="Family Status"
        placeholder="Select status"
        options={[
          { value: "middle", label: "Middle Class" },
          { value: "upper_middle", label: "Upper Middle Class" },
          { value: "rich", label: "Rich" },
          { value: "affluent", label: "Affluent" },
        ]}
      />
      <Input label="Father's Occupation" placeholder="e.g., Retired Government Officer" />
      <Input label="Mother's Occupation" placeholder="e.g., Homemaker" />
    </>
  );
}

function Step3Fields() {
  const allEducation = EDUCATION_LEVELS.flatMap((g) =>
    g.options.map((o) => ({ value: o, label: o, group: g.group }))
  );

  return (
    <>
      <Select label="Highest Degree" placeholder="Select degree" options={allEducation} />
      <Input label="Institution / University" placeholder="e.g., IIT Madras" />
      <Select
        label="Occupation"
        placeholder="Select occupation"
        options={OCCUPATIONS.map((o) => ({ value: o, label: o }))}
      />
      <Input label="Employer Name" placeholder="e.g., Infosys (optional)" />
      <Select
        label="Annual Income"
        placeholder="Select range"
        options={INCOME_RANGES.map((r) => ({ value: r, label: r }))}
      />
      <Input label="Work Location" placeholder="e.g., Chennai" />
      <Input label="WhatsApp Number (Optional)" placeholder="+91 98765 43210" />
      <p className="text-xs text-neutral-500 -mt-3">Premium members can reach you on WhatsApp for faster communication.</p>
    </>
  );
}

function Step4Fields() {
  return (
    <>
      <RadioGroup
        label="Diet"
        options={[
          { value: "vegetarian", label: "Vegetarian" },
          { value: "non_vegetarian", label: "Non-Vegetarian" },
          { value: "eggetarian", label: "Eggetarian" },
        ]}
        layout="horizontal"
      />
      <RadioGroup
        label="Smoking"
        options={[
          { value: "no", label: "No" },
          { value: "occasionally", label: "Occasionally" },
          { value: "yes", label: "Yes" },
        ]}
        layout="horizontal"
      />
      <RadioGroup
        label="Drinking"
        options={[
          { value: "no", label: "No" },
          { value: "occasionally", label: "Occasionally" },
          { value: "yes", label: "Yes" },
        ]}
        layout="horizontal"
      />
      <div>
        <span className="text-sm font-medium text-neutral-600 mb-2 block">Hobbies</span>
        <div className="flex flex-wrap gap-2">
          {HOBBIES.map((hobby) => (
            <button
              key={hobby}
              className="rounded-full border border-neutral-200 px-3 py-1.5 text-sm text-neutral-700 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 transition-colors"
            >
              {hobby}
            </button>
          ))}
        </div>
      </div>
      <Textarea
        label="About Me"
        placeholder="Tell potential matches about yourself, your values, and what makes you unique..."
        maxLength={500}
        charCount
        hint="50-500 characters"
      />
      <Textarea
        label="What I'm Looking For"
        placeholder="Describe the qualities you value in a life partner..."
        maxLength={300}
        charCount
        hint="50-300 characters"
      />
    </>
  );
}

function Step5Fields() {
  return (
    <>
      <div>
        <span className="text-sm font-medium text-neutral-600 mb-3 block">Profile Photos</span>
        <PhotoUploadZone
          photos={[]}
          onAdd={() => {}}
          onRemove={() => {}}
          onSetPrimary={() => {}}
        />
      </div>

      <div className="rounded-[var(--radius-lg)] border border-neutral-200 bg-neutral-50 p-4">
        <h3 className="text-sm font-semibold text-neutral-800">Upload Horoscope (Optional)</h3>
        <p className="text-xs text-neutral-500 mt-0.5">
          Your horoscope enables star-based matching with other profiles.
        </p>
        <div className="mt-3 flex items-center justify-center rounded-[var(--radius-md)] border-2 border-dashed border-neutral-300 bg-white p-6">
          <div className="text-center">
            <p className="text-sm text-neutral-500">Drop JPG or PDF here</p>
            <Button variant="ghost" size="sm" className="mt-2">Browse Files</Button>
          </div>
        </div>
      </div>

      <div className="rounded-[var(--radius-lg)] border border-primary-200 bg-primary-50 p-4">
        <h3 className="text-sm font-semibold text-primary-800">ID Verification</h3>
        <p className="text-xs text-primary-700 mt-0.5">
          Verified profiles get 40% more responses. Upload Aadhaar, Passport, or Voter ID.
        </p>
        <Button variant="secondary" size="sm" className="mt-3">Verify Now</Button>
      </div>
    </>
  );
}

function Step6Fields() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Age (Min)" type="number" placeholder="21" />
        <Input label="Age (Max)" type="number" placeholder="30" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Height (Min)"
          placeholder={"4'10\""}
          options={HEIGHT_OPTIONS.map((h) => ({ value: h, label: h }))}
        />
        <Select
          label="Height (Max)"
          placeholder={"6'0\""}
          options={HEIGHT_OPTIONS.map((h) => ({ value: h, label: h }))}
        />
      </div>
      <Select
        label="Education"
        placeholder="Select preferred education"
        options={EDUCATION_LEVELS.flatMap((g) =>
          g.options.map((o) => ({ value: o, label: o, group: g.group }))
        )}
      />
      <Select
        label="Occupation"
        placeholder="Select preferred occupation"
        options={OCCUPATIONS.map((o) => ({ value: o, label: o }))}
      />
      <Select
        label="Community"
        placeholder="Any community or select specific"
        options={[
          { value: "any", label: "Any Community" },
          ...COMMUNITIES.map((c) => ({ value: c, label: c })),
        ]}
      />
      <Input label="Preferred Location" placeholder="e.g., Chennai, Bangalore" />
      <RadioGroup
        label="Star Compatibility"
        options={[
          { value: "must", label: "Must Match" },
          { value: "preferred", label: "Preferred" },
          { value: "not_important", label: "Not Important" },
        ]}
        layout="horizontal"
      />
      <RadioGroup
        label="Dosham"
        options={[
          { value: "must_not", label: "Must Not Have" },
          { value: "doesnt_matter", label: "Doesn't Matter" },
        ]}
        layout="horizontal"
      />
      <RadioGroup
        label="Diet Preference"
        options={[
          { value: "must_veg", label: "Must Be Vegetarian" },
          { value: "doesnt_matter", label: "Doesn't Matter" },
        ]}
        layout="horizontal"
      />
    </>
  );
}
