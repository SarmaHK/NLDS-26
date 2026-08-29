/**
 * Speaker data for NLDS 2026.
 * Populate when speaker lineup is confirmed.
 */

export interface Speaker {
  id: string;
  name: string;
  title: string;
  organization: string;
  bio: string;
  image: string; // Path under /images/speakers/
  linkedin?: string;
  sessionTitle?: string;
  sessionType?: "keynote" | "workshop" | "panel";
  day?: 1 | 2 | 3;
}

/** Placeholder structure — populate when lineup confirmed */
export const speakers: Speaker[] = [
  // {
  //   id: "speaker-01",
  //   name: "Jane Doe",
  //   title: "CEO",
  //   organization: "Acme Corp",
  //   bio: "...",
  //   image: "/images/speakers/jane-doe.jpg",
  //   linkedin: "https://linkedin.com/in/janedoe",
  //   sessionTitle: "Leading in Uncertainty",
  //   sessionType: "keynote",
  //   day: 1,
  // },
];
