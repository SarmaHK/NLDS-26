import { SITE_URL, SITE_NAME } from "@/lib/constants";

/**
 * Navigation links shown in Navbar and MobileMenu.
 */
export interface NavLink {
    label: string;
    href: string;
    isExternal?: boolean;
    /** Highlight as primary CTA button in navbar */
    isCTA?: boolean;
}

export const navLinks: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#mission" },
    { label: "Conference Team", href: "/team" },
    { label: "Partners", href: "/partners" },
    { label: "Store", href: "/store" },
    { label: "Room Allocation", href: "/delegates" },
    { label: "Register", href: "/register", isCTA: true },
];
