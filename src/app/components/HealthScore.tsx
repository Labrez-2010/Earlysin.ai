import { motion } from "motion/react";
import { Star, TrendingUp } from "lucide-react";

interface HealthScoreProps {
  score: number;
}

export function HealthScore({ score }: HealthScoreProps) {
  const rating = (score / 20).toFixed(1);
  const fullStars = Math.floor(Number(rating));
  const hasHalfStar = Number(rating) % 1 >= 0.5;

  const getStatus = () => {
    if (score >= 85) return { label: "Excellent", color: "emerald" };
    if (score >= 70) return { label: "Good", color: "blue" };
    if (score >= 50) return { label: "Fair", color: "amber" };
    return { label: "Needs Attention", color: "rose" };
  };

  const status = getStatus();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-white to-slate-50
        border border-slate-200 p-8 shadow-xl"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100 to-purple-100
        rounded-full blur-3xl opacity-40 -mr-20 -mt-20" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-700">Your Health Score</h3>
          <TrendingUp className="w-5 h-5 text-emerald-500" />
        </div>

        <div className="flex items-center gap-6 mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="relative"
          >
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#e2e8f0"
                strokeWidth="12"
                fill="none"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="56"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 56}
                initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - score / 100) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{
                  stroke: status.color === "emerald" ? "#10b981" :
                          status.color === "blue" ? "#3b82f6" :
                          status.color === "amber" ? "#f59e0b" : "#f43f5e"
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-slate-800">{score}</span>
              <span className="text-sm text-slate-500">/ 100</span>
            </div>
          </motion.div>

          <div>
            <div className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold mb-3
              ${status.color === "emerald" ? "bg-emerald-100 text-emerald-700" :
                status.color === "blue" ? "bg-blue-100 text-blue-700" :
                status.color === "amber" ? "bg-amber-100 text-amber-700" :
                "bg-rose-100 text-rose-700"}`}>
              {status.label}
            </div>

            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < fullStars
                      ? "text-amber-400 fill-amber-400"
                      : i === fullStars && hasHalfStar
                      ? "text-amber-400 fill-amber-400"
                      : "text-slate-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-slate-600">{rating} / 5.0</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <p className="text-sm text-slate-600">
            Based on heart rate, activity, sleep quality, and stress levels
          </p>
        </div>
      </div>
    </motion.div>
  );
}
