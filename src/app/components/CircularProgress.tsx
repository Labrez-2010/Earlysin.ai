import { motion } from "motion/react";

interface CircularProgressProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label: string;
  unit?: string;
}

export function CircularProgress({
  value,
  max,
  size = 120,
  strokeWidth = 8,
  color = "#06b6d4",
  label,
  unit = ""
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = (value / max) * 100;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-white">{value}</div>
          {unit && <div className="text-xs text-white/60">{unit}</div>}
        </div>
      </div>
      <div className="text-sm text-white/70">{label}</div>
    </div>
  );
}
