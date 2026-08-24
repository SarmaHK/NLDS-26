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
    image: string;          // Public URL or path under /images/team/
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

    // ── Conference Managers ───────────────────────────────────────────────────
    {
        id: "oc-cm-1",
        name: "Name Here",
        role: "Conference Manager",
        committee: "OC",
        image: "",
    },
    {
        id: "oc-cm-2",
        name: "Name Here",
        role: "Conference Manager",
        committee: "OC",
        image: "",
    },

    // ── President ────────────────────────────────────────────────────────────
    {
        id: "oc-president",
        name: "Suprajan Jeyapal",
        role: "Organizing Committee President",
        committee: "OC",
        image: "https://res.cloudinary.com/daamlqcer/image/upload/v1787579408/Suprajan_Jeyapal_-_OCP_n4pusn.jpg",
    },

    // ── Vice President — Finance ──────────────────────────────────────────────
    {
        id: "oc-vp-finance",
        name: "Sasin Perera",
        role: "OC Vice President — Finance",
        committee: "OC",
        image: "https://res.cloudinary.com/daamlqcer/image/upload/v1787579436/Sasin_Perera_-_FIN_zo08hz.jpg",
    },

    // ── Vice President — Delegates ────────────────────────────────────────────
    {
        id: "oc-vp-delegates-1",
        name: "Sayuri Pathirana",
        role: "OC Vice President — Delegates",
        committee: "OC",
        image: "https://res.cloudinary.com/daamlqcer/image/upload/v1787579406/Sayuri_Pathirana_-_DEL_ghtuo1.jpg",
    },
    {
        id: "oc-vp-delegates-2",
        name: "Monali Edrisinghe",
        role: "OC Vice President — Delegates",
        committee: "OC",
        image: "https://res.cloudinary.com/daamlqcer/image/upload/v1787579403/Monali_Edrisinghe_-_DEL_oasxft.jpg",
    },
    {
        id: "oc-vp-delegates-3",
        name: "Sayuni Salwathura",
        role: "OC Vice President — Delegates",
        committee: "OC",
        image: "https://res.cloudinary.com/daamlqcer/image/upload/v1787579404/Salwathura_Sayuni_-_DEL_qtamdq.jpg",
    },

    // ── Vice President — Partnership Development ──────────────────────────────
    {
        id: "oc-vp-pd-1",
        name: "Alex Dinith",
        role: "OC Vice President — Partnership Development",
        committee: "OC",
        image: "https://res.cloudinary.com/daamlqcer/image/upload/v1787579403/Alex_Dinith_-_PD_tzswdm.jpg",
    },
    {
        id: "oc-vp-pd-2",
        name: "Binithi Sarithya",
        role: "OC Vice President — Partnership Development",
        committee: "OC",
        image: "https://res.cloudinary.com/daamlqcer/image/upload/v1787579402/Binithi_Sarithya_-_PD_mtfo0e.jpg",
    },
    {
        id: "oc-vp-pd-3",
        name: "Vinuthi Hirimuthugoda",
        role: "OC Vice President — Partnership Development",
        committee: "OC",
        image: "https://res.cloudinary.com/daamlqcer/image/upload/v1787579408/Vinuthi_Hirimuthugoda_-_PD_z58y7q.jpg",
    },

    // ── Vice President — Logistics ────────────────────────────────────────────
    {
        id: "oc-vp-logistics-1",
        name: "Dihan Masinghe",
        role: "OC Vice President — Logistics",
        committee: "OC",
        image: "https://res.cloudinary.com/daamlqcer/image/upload/v1787579403/Dihan_Masinghe_-_LOG_sszmsx.jpg",
    },
    {
        id: "oc-vp-logistics-2",
        name: "Rageeshan Chandrasegaran",
        role: "OC Vice President — Logistics",
        committee: "OC",
        image: "https://res.cloudinary.com/daamlqcer/image/upload/v1787579404/Rageeshan_Chandrasegaran_-_LOG_poeu2i.jpg",
    },
    {
        id: "oc-vp-logistics-3",
        name: "Vidath Amunugama",
        role: "OC Vice President — Logistics",
        committee: "OC",
        image: "https://res.cloudinary.com/daamlqcer/image/upload/v1787579439/Vidath_Amunugama_-_LOG_t48lgb.jpg",
    },
    {
        id: "oc-vp-logistics-4",
        name: "Manuthi Manethmi",
        role: "OC Vice President — Logistics",
        committee: "OC",
        image: "https://res.cloudinary.com/daamlqcer/image/upload/v1787579403/Manuthi_Manethmi_-_LOG_bmrpbj.jpg",
    },

    // ── Vice President — Marketing ────────────────────────────────────────────
    {
        id: "oc-vp-marketing-1",
        name: "Habikugasarma Kuganeshwarasarma",
        role: "OC Vice President — Marketing",
        committee: "OC",
        image: "https://res.cloudinary.com/daamlqcer/image/upload/v1787579403/Habikugasarma_Kuganeshwarasarma_-_MKT_y4uzp6.jpg",
    },
    {
        id: "oc-vp-marketing-2",
        name: "Michelle Warnakulasooriya",
        role: "OC Vice President — Marketing",
        committee: "OC",
        image: "https://res.cloudinary.com/daamlqcer/image/upload/v1787580319/Michelle_Warnakulasooriya-_MKT_fzvfx2.jpg",
    },
    {
        id: "oc-vp-marketing-3",
        name: "Tharinda Dinujaya",
        role: "OC Vice President — Marketing",
        committee: "OC",
        image: "https://res.cloudinary.com/daamlqcer/image/upload/v1787579439/Tharinda_Dinujaya-_MKT_yhcq7v.jpg",
    },
];
