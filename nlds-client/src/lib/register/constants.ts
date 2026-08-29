/**
 * Registration-specific constants.
 * Dropdown options, validation limits, and field configurations.
 */

export const UNIVERSITIES = [
  "University of Colombo",
  "University of Peradeniya",
  "University of Sri Jayewardenepura",
  "University of Kelaniya",
  "University of Moratuwa",
  "University of Jaffna",
  "University of Ruhuna",
  "Eastern University, Sri Lanka",
  "South Eastern University of Sri Lanka",
  "Rajarata University of Sri Lanka",
  "Sabaragamuwa University of Sri Lanka",
  "Wayamba University of Sri Lanka",
  "Uva Wellassa University",
  "University of the Visual & Performing Arts",
  "General Sir John Kotelawala Defence University",
  "NSBM Green University",
  "SLIIT",
  "IIT Sri Lanka",
  "NIBM",
  "Other",
] as const;

export const AIESEC_ENTITIES = [
  "CC",
  "CN",
  "CS",
  "Kandy",
  "NIBM",
  "NSBM",
  "Rajarata",
  "Ruhuna",
  "SLIIT",
  "USJ",
  "Wayamba",
  "Other",
] as const;

export const ENTITY_IG_MAPPING: Record<string, string[]> = {
  CC: ["SKU", "KIU"],
  CN: ["IIT"],
  CS: ["Horizon", "SLTC", "KDU"],
  Kandy: ["Jaffna", "Vauniya"],
  SLIIT: ["CINEC"],
  USJ: ["Sagies"],
  NIBM: [],
  NSBM: [],
  Rajarata: [],
  Ruhuna: [],
  Wayamba: [],
};

export const OTHER_ENTITY_IGS = [
  "SKU",
  "KIU",
  "IIT",
  "Horizon",
  "SLTC",
  "KDU",
  "Jaffna",
  "Vauniya",
  "CINEC",
  "Sagies",
  "Other IG",
] as const;

export const GENDERS = [
  "Male",
  "Female",
  "Non-binary",
  "Prefer not to say",
] as const;

export const T_SHIRT_SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export const ACCOMMODATION_OPTIONS = [
  "Full accommodation (3 nights)",
  "Partial accommodation (2 nights)",
  "Partial accommodation (1 night)",
  "No accommodation needed",
] as const;

export const DIETARY_OPTIONS = [
  "No restrictions",
  "Vegetarian",
  "Vegan",
  "Halal",
  "Gluten-free",
  "Other",
] as const;

export const AIESEC_POSITIONS = [
  "LCPe",
  "Specialist",
  "Manager",
  "Team Leader",
  "Member",
] as const;

export const FOOD_PREFERENCES = ["Non-veg", "Veg"] as const;

export const CONSENT_OPTIONS = ["Yes", "No"] as const;

export const READINESS_OPTIONS = [
  {
    level: "1",
    title: "Mission Briefing",
    description: "I'm curious… let's see what this is about. 🤔",
  },
  {
    level: "2",
    title: "Getting Equipped",
    description: "I'm interested and starting to get ready. 👀",
  },
  {
    level: "3",
    title: "Mission Ready",
    description: "I'm excited and ready to take on the challenge! 😎",
  },
  {
    level: "4",
    title: "Fully Activated",
    description: "I'm ready. Give me the mission! 🔥",
  },
  {
    level: "5",
    title: "Impossible? Not for Me",
    description: "I'm ALL IN! 🕶️",
  },
] as const;
