export function GridBackground() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full" style={{ backgroundColor: '#ffffff' }}>
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.018) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.018) 1px, transparent 1px)
          `,
          backgroundSize: '1rem 1rem',
        }}
      />
      {/* Yellow glow left side */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 50% 70% at 0% 50%, rgba(255, 235, 150, 0.2), transparent 65%)',
        }}
      />
      {/* White fade covering right half */}
      <div className="absolute inset-y-0 right-0 w-2/3 bg-gradient-to-l from-white via-white/90 to-transparent" />
    </div>
  );
}

export function DotBackground() {
  return (
    <div
      className="absolute inset-0 -z-10 h-full w-full"
      style={{
        backgroundColor: '#ffffff',
        backgroundImage:
          'linear-gradient(to right, rgba(128,128,128,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(128,128,128,0.04) 1px, transparent 1px)',
        backgroundSize: '14px 24px',
      }}
    />
  );
}
