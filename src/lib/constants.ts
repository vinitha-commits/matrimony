/* ============================================================
   Thirumangalyam — App Constants & Dropdown Options
   ============================================================ */

export const APP_NAME = "Thirumangalyam";
export const APP_TAGLINE = "Find Your Life Partner the Traditional Way, Made Simple";

export const MOTHER_TONGUES = [
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Tulu",
  "Konkani",
] as const;

export const COMMUNITIES = [
  "Brahmin - Iyer",
  "Brahmin - Iyengar",
  "Mudaliar",
  "Nadar",
  "Gounder",
  "Chettiar",
  "Pillai",
  "Vanniyar",
  "Thevar",
  "Naidu",
  "Nair",
  "Ezhava",
  "Menon",
  "Reddy",
  "Kamma",
  "Kapu",
  "Lingayat",
  "Vokkaliga",
  "Bunts",
  "Goud Saraswat",
  "Other",
] as const;

export const NAKSHATRAS = [
  "Ashwini",
  "Bharani",
  "Krittika",
  "Rohini",
  "Mrigashira",
  "Ardra",
  "Punarvasu",
  "Pushya",
  "Ashlesha",
  "Magha",
  "Purva Phalguni",
  "Uttara Phalguni",
  "Hasta",
  "Chitra",
  "Swati",
  "Vishakha",
  "Anuradha",
  "Jyeshtha",
  "Mula",
  "Purva Ashadha",
  "Uttara Ashadha",
  "Shravana",
  "Dhanishta",
  "Shatabhisha",
  "Purva Bhadrapada",
  "Uttara Bhadrapada",
  "Revati",
] as const;

export const EDUCATION_LEVELS = [
  { group: "Doctorate", options: ["Ph.D.", "M.D.", "M.Ch."] },
  { group: "Post Graduate", options: ["M.E./M.Tech", "MBA/PGDM", "M.Sc.", "MA", "MCA", "M.Com", "LLM"] },
  { group: "Under Graduate", options: ["B.E./B.Tech", "BBA/BBM", "B.Sc.", "BA", "BCA", "B.Com", "LLB", "MBBS", "BDS"] },
  { group: "Diploma", options: ["Diploma", "ITI"] },
  { group: "Other", options: ["HSC (12th)", "Other"] },
] as const;

export const OCCUPATIONS = [
  "Software Professional",
  "Doctor",
  "Engineer",
  "Business/Entrepreneur",
  "Government Employee",
  "Teacher/Professor",
  "Chartered Accountant",
  "Lawyer/Legal",
  "Banking Professional",
  "Scientist/Researcher",
  "Defence/Armed Forces",
  "Civil Services (IAS/IPS)",
  "Architect",
  "Pilot",
  "Others",
] as const;

export const INCOME_RANGES = [
  "Below 2 Lakhs",
  "2-4 Lakhs",
  "4-6 Lakhs",
  "6-8 Lakhs",
  "8-10 Lakhs",
  "10-15 Lakhs",
  "15-20 Lakhs",
  "20-30 Lakhs",
  "30-50 Lakhs",
  "50 Lakhs - 1 Crore",
  "Above 1 Crore",
  "Prefer not to say",
] as const;

export const HOBBIES = [
  "Music",
  "Dance",
  "Reading",
  "Travel",
  "Cooking",
  "Sports",
  "Yoga",
  "Photography",
  "Painting",
  "Movies",
  "Gaming",
  "Gardening",
  "Volunteering",
  "Writing",
] as const;

export const HEIGHT_OPTIONS = (() => {
  const heights: string[] = [];
  for (let ft = 4; ft <= 6; ft++) {
    for (let inch = 0; inch <= 11; inch++) {
      heights.push(`${ft}'${inch}"`);
      if (ft === 6 && inch === 6) break;
    }
  }
  return heights;
})();

export const PORUTHAMS = [
  { name: "Dina Porutham", tamilName: "தின பொருத்தம்" },
  { name: "Gana Porutham", tamilName: "கண பொருத்தம்" },
  { name: "Mahendra Porutham", tamilName: "மகேந்திர பொருத்தம்" },
  { name: "Stree Deergha", tamilName: "ஸ்திரீ தீர்க்கம்" },
  { name: "Yoni Porutham", tamilName: "யோனி பொருத்தம்" },
  { name: "Rasi Porutham", tamilName: "ராசி பொருத்தம்" },
  { name: "Rasiyathipathi", tamilName: "ராசியாதிபதி" },
  { name: "Vasya Porutham", tamilName: "வசிய பொருத்தம்" },
  { name: "Rajju Porutham", tamilName: "ரஜ்ஜு பொருத்தம்" },
  { name: "Vedha Porutham", tamilName: "வேதை பொருத்தம்" },
] as const;

export const PREMIUM_PLANS = [
  {
    id: "premium_3" as const,
    label: "3 Months",
    months: 3,
    totalPrice: 2999,
    monthlyPrice: 999,
    isPopular: false,
  },
  {
    id: "premium_6" as const,
    label: "6 Months",
    months: 6,
    totalPrice: 4999,
    monthlyPrice: 833,
    savings: "Save 17%",
    isPopular: true,
  },
  {
    id: "premium_12" as const,
    label: "12 Months",
    months: 12,
    totalPrice: 7999,
    monthlyPrice: 666,
    savings: "Save 33%",
    isPopular: false,
  },
] as const;

export const WIZARD_STEPS = [
  { step: 1, label: "Basic Info", description: "Tell us about yourself" },
  { step: 2, label: "Religion & Family", description: "Family background details" },
  { step: 3, label: "Career", description: "Education & professional details" },
  { step: 4, label: "About & Life", description: "Lifestyle and personality" },
  { step: 5, label: "Photos", description: "Add photos and verification" },
  { step: 6, label: "Partner Prefs", description: "What you're looking for" },
] as const;
