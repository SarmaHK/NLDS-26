import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    external?: boolean;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    "aria-label"?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        "bg-white text-black hover:bg-[var(--color-accent)] hover:text-white font-semibold",
    secondary:
        "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] font-semibold",
    ghost:
        "bg-transparent text-white hover:bg-white/10 border border-white/20 hover:border-white/40",
    outline:
        "bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/5",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-sm rounded-full",
    lg: "px-8 py-4 text-base rounded-full",
};

/**
 * Polymorphic Button — renders as <a> when href is provided, else <button>.
 */
export default function Button({
    children,
    href,
    onClick,
    variant = "primary",
    size = "md",
    className,
    external,
    disabled,
    type = "button",
    "aria-label": ariaLabel,
}: ButtonProps) {
    const baseStyles = cn(
        "inline-flex items-center justify-center gap-2 transition-all duration-300 select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
        "disabled:opacity-50 disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className
    );

    if (href) {
        return (
            <Link
                href={href}
                className={baseStyles}
                aria-label={ariaLabel}
                {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={baseStyles}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    );
}
