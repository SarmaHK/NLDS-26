/**
 * Organising Committee (OC) and Main Committee (MC) team data.
 * Populate when team details are confirmed.
 */

export type TeamRole = "OC" | "MC";

export interface TeamMember {
    id: string;
    name: string;
    role: string;           // e.g. "Project Manager", "Treasurer"
    committee: TeamRole;
    department?: string;    // e.g. "Finance", "Delegate Experience"
    university?: string;
    image: string;          // Path under /images/team/
    linkedin?: string;
    instagram?: string;
}

/** MC — Main Committee */
export const mainCommittee: TeamMember[] = [
    // {
    //   id: "mc-01",
    //   name: "Name Here",
    //   role: "Local Committee President",
    //   committee: "MC",
    //   university: "University of Moratuwa",
    //   image: "/images/team/mc-01.jpg",
    // },
];

/** OC — Organising Committee */
export const organisingCommittee: TeamMember[] = [
    // {
    //   id: "oc-01",
    //   name: "Name Here",
    //   role: "Organizing Committee President",
    //   committee: "OC",
    //   university: "University of Colombo",
    //   image: "/images/team/oc-01.jpg",
    // },
];
