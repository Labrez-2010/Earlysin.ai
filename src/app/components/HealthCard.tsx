import { motion } from "motion/react";
import { ReactNode } from "react";

interface HealthCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: ReactNode;
  status?: "normal" | "warning" | "critical";
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}

export function HealthCard({
  title,
  value,
  unit,
  icon,
  status = "normal",
  subtitle,
  children,
  className = ""
}: HealthCardProps) {
  const statusColors = {
    normal: "from-emerald-500/20 to-green-500/20 border-emerald-500/30",
    warning: "from-yellow-500/20 to-amber-500/20 border-yellow-500/30",
    critical: "from-red-500/20 to-rose-500/20 border-red-500/30"
  };

  const glowColors = {
    normal: "shadow-emerald-500/20",
    warning: "shadow-yellow-500/20",
    critical: "shadow-red-500/20"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${statusColors[status]}
        backdrop-blur-xl border border-white/10 p-6 shadow-2xl ${glowColors[status]} ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="text-cyan-400/80 text-sm font-medium tracking-wide uppercase">
            {title}
          </div>
          <div className="text-cyan-300/60">{icon}</div>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <div className="text-5xl font-bold text-white tracking-tight">{value}</div>
          {unit && <div className="text-2xl text-white/60 font-light">{unit}</div>}
        </div>

        {subtitle && (
          <div className="text-sm text-white/50 mb-4">{subtitle}</div>
        )}

        {children}
      </div>
    </motion.div>
  );
}
