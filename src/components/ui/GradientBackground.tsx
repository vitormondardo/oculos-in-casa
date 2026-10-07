/*
 * Manchas de cor feitas com radial-gradient (e não com filter: blur): blur de
 * 120px+ em elementos de 60vmax, animados, é refeito pela GPU a cada frame e
 * trava o scroll junto com o canvas 3D.
 */
export function GradientBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-20 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(201,162,75,0.16),transparent)]" />
      <div className="animate-gradient-drift absolute left-[-10%] top-[-10%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgba(201,162,75,0.16),transparent)] will-change-transform" />
      <div className="animate-gradient-drift-slow absolute bottom-[-15%] right-[-10%] h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(closest-side,rgba(43,181,166,0.16),transparent)] will-change-transform" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,var(--background)_92%)]" />
    </div>
  );
}
