export function GradientBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-20 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(201,162,75,0.16),transparent)]" />
      <div className="animate-gradient-drift absolute left-[-10%] top-[-10%] h-[60vmax] w-[60vmax] rounded-full bg-accent/15 blur-[120px]" />
      <div className="animate-gradient-drift-slow absolute bottom-[-15%] right-[-10%] h-[55vmax] w-[55vmax] rounded-full bg-teal/15 blur-[140px]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,var(--background)_92%)]" />
    </div>
  );
}
