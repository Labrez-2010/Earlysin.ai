import { motion } from "motion/react";

export function MiniWaveform() {
  const points = [
    { x: 0, y: 50 },
    { x: 10, y: 50 },
    { x: 15, y: 30 },
    { x: 20, y: 20 },
    { x: 25, y: 40 },
    { x: 30, y: 50 },
    { x: 40, y: 50 },
    { x: 45, y: 45 },
    { x: 50, y: 50 },
    { x: 60, y: 50 },
    { x: 65, y: 32 },
    { x: 70, y: 22 },
    { x: 75, y: 38 },
    { x: 80, y: 50 },
    { x: 100, y: 50 }
  ];

  const pathData = points.map((p, i) =>
    i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`
  ).join(" ");

  return (
    <svg viewBox="0 0 100 60" className="w-full h-12">
      <defs>
        <linearGradient id="miniWaveformGlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <motion.path
        d={pathData}
        stroke="#3b82f6"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <motion.path
        d={pathData}
        stroke="url(#miniWaveformGlow)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </svg>
  );
}
