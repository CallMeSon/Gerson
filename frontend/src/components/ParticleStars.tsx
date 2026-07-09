import { useRef } from 'react';

export default function ParticleStars({ count = 60 }: { count?: number }) {
  const particles = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 5,
      driftDuration: 10 + Math.random() * 10,
      driftDelay: Math.random() * 8,
    }))
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {particles.current.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            '--duration': `${p.duration}s`,
            '--delay': `${p.delay}s`,
            '--drift-duration': `${p.driftDuration}s`,
            '--drift-delay': `${p.driftDelay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
