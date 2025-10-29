import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  subtitle?: string;
};

export function SectionTitle({ children, className, subtitle }: Props) {
  return (
    <div className={cn("mb-6", className)}>
      {subtitle ? (
        <p className="mb-1 text-xs uppercase tracking-widest text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
      <h2 className="text-balance">
        <span className="bg-gradient-to-r from-[var(--brand-cyan)] via-[var(--brand-magenta)] to-[var(--brand-yellow)] bg-clip-text text-transparent">
          {children}
        </span>
      </h2>
    </div>
  );
}
