import { motion } from "motion/react";
import { AlertCircle, CheckCircle, Bell } from "lucide-react";

const alerts = [
  {
    type: "success",
    message: "All systems operational",
    time: "Just now"
  },
  {
    type: "info",
    message: "Hydration reminder in 30 minutes",
    time: "2 min ago"
  }
];

export function AlertPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-3xl bg-gradient-to-br from-indigo-500/10 to-blue-500/10
        backdrop-blur-xl border border-indigo-500/20 p-6 shadow-2xl shadow-indigo-500/10"
    >
      <div className="flex items-center gap-3 mb-6">
        <Bell className="w-6 h-6 text-indigo-400" />
        <h3 className="text-lg font-semibold text-white">Notifications</h3>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
          >
            {alert.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className="text-sm text-white/90">{alert.message}</p>
              <p className="text-xs text-white/50 mt-1">{alert.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
