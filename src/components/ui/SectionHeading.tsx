import { cn } from "@/lib/utils";

interface SectionHeadingProps {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    align?: "left" | "center" | "right";
    className?: string;
    titleClassName?: string;
}

/**
 * Consistent section heading with optional eyebrow label and subtitle.
 * Used across all major sections for visual hierarchy.
 */
export default function SectionHeading({
    eyebrow,
    title,
    subtitle,
    align = "center",
    className,
    titleClassName,
}: SectionHeadingProps) {
    const alignClass = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
    }[align];

    return (
        <div className={cn("space-y-3", alignClass, className)}>
            {eyebrow && (
                <p className="text-[var(--color-accent)] text-xs uppercase tracking-[0.2em] font-semibold">
                    {eyebrow}
                </p>
            )}
            <h2
                className={cn(
                    "text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight",
                    titleClassName
                )}
            >
                {title}
            </h2>
            {subtitle && (
                <p className="text-white/50 text-base md:text-lg max-w-2xl leading-relaxed mx-auto">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
