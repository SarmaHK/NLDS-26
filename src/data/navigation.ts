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
    { label: "About", href: "/#about" },
    { label: "Team", href: "/#team" },
    { label: "Partners", href: "/partners" },
    { label: "Delegates", href: "/delegates" },
    { label: "Store", href: "/store" },
    { label: "Register", href: "/register", isCTA: true },
];
