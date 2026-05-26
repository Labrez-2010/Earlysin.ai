import { motion } from "motion/react";
import { Brain, TrendingUp, Shield, Activity } from "lucide-react";

const insights = [
  {
    icon: Brain,
    text: "Your heart rate variability is excellent",
    type: "positive"
  },
  {
    icon: TrendingUp,
    text: "Activity level 15% higher than last week",
    type: "positive"
  },
  {
    icon: Shield,
    text: "All vital signs within optimal range",
    type: "positive"
  },
  {
    icon: Activity,
    text: "Consider 20 min cardio for peak performance",
    type: "suggestion"
  }
];

export function AIInsights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10
        backdrop-blur-xl border border-purple-500/20 p-6 shadow-2xl shadow-purple-500/10"
    >
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Brain className="w-6 h-6 text-purple-400" />
        </motion.div>
        <h3 className="text-lg font-semibold text-white">AI Health Insights</h3>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10
              transition-colors border border-white/5"
          >
            <insight.icon className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-white/80">{insight.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
