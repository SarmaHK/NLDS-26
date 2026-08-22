import { cn } from "@/lib/utils";

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
}

/**
 * Consistent max-width wrapper with responsive horizontal padding.
 * Use this inside every section to keep content aligned.
 */
export default function Container({
    children,
    className,
    as: Tag = "div",
}: ContainerProps) {
    return (
        <Tag
            className={cn(
                "mx-auto w-full max-w-7xl px-6 lg:px-8",
                className
            )}
        >
            {children}
        </Tag>
    );
}
