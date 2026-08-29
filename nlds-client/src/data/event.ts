/**
 * Core event data for NLDS 2026.
 * Update these values when finalized — they propagate across the entire site.
 */

export interface VenueData {
  name: string;
  city: string;
  country: string;
  address: string;
  mapUrl: string;
  image: string;
}

export interface StatItem {
  label: string;
  value: string;
  description?: string;
}

export interface EventData {
  name: string;
  fullName: string;
  year: number;
  edition: string;
  theme: string;
  tagline: string;
  description: string;
  startDate: string; // ISO 8601
  endDate: string; // ISO 8601
  registrationDeadline: string;
  venue: VenueData;
  stats: StatItem[];
  registrationUrl: string;
  trailerUrl?: string;
  afterMovieUrl?: string;
  lastYearAfterMovieUrl?: string;
  merchandiseUrl: string;
}

export const eventData: EventData = {
  name: "NLDS 2026",
  fullName: "National Leadership Development Seminar 2026",
  year: 2026,
  edition: "NLDS",
  theme: "MISSION IMPOSSIBLE",
  tagline: "THE IMPOSSIBLE IS YOURS TO DEFINE.",
  description:
    "The National Leadership Development Seminar (NLDS) is one of the largest conferences organized by AIESEC in Sri Lanka, bringing together over 250 delegates from more than 11 prestigious universities across the country.",
  startDate: "2026-10-09T08:00:00+05:30",
  endDate: "2026-10-11T20:00:00+05:30",
  registrationDeadline: "2026-09-30T23:59:00+05:30",
  venue: {
    name: "TBA", // ← Update when announced
    city: "Sri Lanka",
    country: "Sri Lanka",
    address: "TBA",
    mapUrl: "",
    image: "/images/venue/venue-main.jpg",
  },
  stats: [
    { label: "Universities", value: "11+", description: "Across Sri Lanka" },
    { label: "Delegates", value: "250+", description: "Future leaders" },
    { label: "Days", value: "3", description: "Of transformation" },
    { label: "Sessions", value: "20+", description: "Keynotes & workshops" },
  ],
  registrationUrl: "/register",
  trailerUrl: undefined, // ← Add YouTube embed URL when ready
  afterMovieUrl: undefined, // ← NLDS 2026 after movie
  lastYearAfterMovieUrl: undefined, // ← NLDS 2025 after movie (for Home showcase)
  merchandiseUrl: "/store",
};
