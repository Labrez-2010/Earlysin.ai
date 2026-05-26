import { motion } from "motion/react";
import { Sparkles, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

const insights = [
  {
    type: "success",
    icon: CheckCircle,
    title: "Excellent Recovery",
    message: "Your heart rate variability improved by 12% this week",
    color: "emerald"
  },
  {
    type: "suggestion",
    icon: TrendingUp,
    title: "Activity Recommendation",
    message: "Consider 30 min of cardio for optimal cardiovascular health",
    color: "blue"
  },
  {
    type: "warning",
    icon: AlertCircle,
    title: "Hydration Alert",
    message: "Water intake is below your daily goal",
    color: "amber"
  }
];

export function AIInsightCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-[24px] bg-gradient-to-br from-white to-purple-50/30
        border border-purple-200/50 p-6 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100"
        >
          <Sparkles className="w-5 h-5 text-purple-600" />
        </motion.div>
        <div>
          <h3 className="text-lg font-semibold text-slate-700">AI Health Insights</h3>
          <p className="text-sm text-slate-500">Personalized recommendations</p>
        </div>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          const colorClasses = {
            emerald: "bg-emerald-50 border-emerald-200 text-emerald-600",
            blue: "bg-blue-50 border-blue-200 text-blue-600",
            amber: "bg-amber-50 border-amber-200 text-amber-600"
          };

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ x: 4 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-white/60 border border-slate-200
                hover:shadow-md transition-all"
            >
              <div className={`p-2 rounded-lg ${colorClasses[insight.color as keyof typeof colorClasses]}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-slate-700 mb-1">{insight.title}</h4>
                <p className="text-xs text-slate-600">{insight.message}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
