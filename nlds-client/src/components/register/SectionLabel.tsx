export default function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <legend className="flex items-center gap-3 mb-2">
      <div className="h-[1px] w-4" style={{ background: "var(--red)" }} />
      <span className="label-classified">{children}</span>
    </legend>
  );
}
