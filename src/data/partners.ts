/**
 * Partners and sponsors data for NLDS 2026.
 * Based on sponsor tiers from NLDS 2025.
 */

export type PartnerTier =
    | "title"
    | "national"
    | "education"
    | "banking"
    | "technology"
    | "leisure"
    | "outbound-training"
    | "clothing"
    | "associate"
    | "student"
    | "photography"
    | "digital"
    | "gift"
    | "banner"
    | "media"
    | "refreshments";

export interface Partner {
    id: string;
    name: string;
    logo: string;           // Path under /logos/partners/
    url: string;
    tier: PartnerTier;
    tierLabel?: string;     // e.g. "National Talent Partner"
}

/** Tier display order and labels */
export const partnerTierConfig: Record<
    PartnerTier,
    { label: string; order: number }
> = {
    title: { label: "Title Partner", order: 1 },
    national: { label: "National Partner", order: 2 },
    education: { label: "Education Partner", order: 3 },
    banking: { label: "Official Banking Partner", order: 4 },
    technology: { label: "Technology Partner", order: 5 },
    leisure: { label: "Leisure Partner", order: 6 },
    "outbound-training": { label: "Outbound Training Partner", order: 7 },
    clothing: { label: "Official Clothing Partner", order: 8 },
    associate: { label: "Associate Partner", order: 9 },
    student: { label: "Student Partner", order: 10 },
    photography: { label: "Photography Partner", order: 11 },
    digital: { label: "Digital Experience Partner", order: 12 },
    banner: { label: "Banner Partner", order: 13 },
    gift: { label: "Gift Partner", order: 14 },
    media: { label: "Media Partner", order: 15 },
    refreshments: { label: "Refreshments Partner", order: 16 },
};

/** Partners list — populate as sponsors are confirmed */
export const partners: Partner[] = [
    // {
    //   id: "mas-holdings",
    //   name: "MAS Holdings",
    //   logo: "/logos/partners/mas-holdings.png",
    //   url: "https://www.masholdings.com",
    //   tier: "national",
    //   tierLabel: "National Talent Partner",
    // },
];
