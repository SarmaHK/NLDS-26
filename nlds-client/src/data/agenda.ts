/**
 * Agenda data for NLDS 2026.
 * Populate when the schedule is finalized.
 */

export type AgendaItemType =
  | "keynote"
  | "workshop"
  | "networking"
  | "social"
  | "break"
  | "ceremony"
  | "panel";

export interface AgendaItem {
  id: string;
  day: 1 | 2 | 3;
  time: string; // e.g. "09:00 AM"
  endTime?: string; // e.g. "10:00 AM"
  title: string;
  description?: string;
  type: AgendaItemType;
  speakerId?: string; // Ref to Speaker.id
  location?: string; // Room/hall within venue
}

/** Day labels — update dates when finalized */
export const agendaDays = [
  { day: 1 as const, label: "Day 1", date: "October 1, 2026" },
  { day: 2 as const, label: "Day 2", date: "October 2, 2026" },
  { day: 3 as const, label: "Day 3", date: "October 3, 2026" },
];

/** Placeholder agenda — populate when schedule confirmed */
export const agendaItems: AgendaItem[] = [
  // {
  //   id: "d1-01",
  //   day: 1,
  //   time: "08:00 AM",
  //   endTime: "09:00 AM",
  //   title: "Registration & Welcome",
  //   type: "ceremony",
  // },
];
