import { motion } from "motion/react";
import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: ReactNode;
  status?: "normal" | "warning" | "critical";
  trend?: "up" | "down" | "stable";
  subtitle?: string;
  size?: "small" | "medium" | "large";
}

export function MetricCard({
  title,
  value,
  unit,
  icon,
  status = "normal",
  trend,
  subtitle,
  size = "medium"
}: MetricCardProps) {
  const statusColors = {
    normal: "from-emerald-50 to-green-50 border-emerald-200",
    warning: "from-amber-50 to-yellow-50 border-amber-200",
    critical: "from-rose-50 to-red-50 border-red-200"
  };

  const iconColors = {
    normal: "text-emerald-500 bg-emerald-100",
    warning: "text-amber-500 bg-amber-100",
    critical: "text-rose-500 bg-rose-100"
  };

  const sizeClasses = {
    small: "p-4",
    medium: "p-6",
    large: "p-8"
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-[24px] bg-gradient-to-br ${statusColors[status]}
        backdrop-blur-lg border shadow-lg hover:shadow-xl ${sizeClasses[size]} transition-shadow`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full blur-3xl -mr-16 -mt-16" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-slate-600 uppercase tracking-wide">
            {title}
          </span>
          <div className={`p-2 rounded-xl ${iconColors[status]}`}>
            {icon}
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-4xl font-bold text-slate-800">{value}</span>
          {unit && <span className="text-xl text-slate-500 font-light">{unit}</span>}
        </div>

        {subtitle && (
          <p className="text-sm text-slate-500">{subtitle}</p>
        )}

        {trend && (
          <div className="mt-3 flex items-center gap-1 text-sm">
            {trend === "up" && <span className="text-emerald-600">↑ Improving</span>}
            {trend === "down" && <span className="text-rose-600">↓ Declining</span>}
            {trend === "stable" && <span className="text-slate-600">→ Stable</span>}
          </div>
        )}
      </div>
    </motion.div>
  );
}
