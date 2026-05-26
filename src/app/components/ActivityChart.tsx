import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { motion } from "motion/react";
import { Activity } from "lucide-react";

const data = [
  { day: "Mon", value: 65 },
  { day: "Tue", value: 80 },
  { day: "Wed", value: 72 },
  { day: "Thu", value: 90 },
  { day: "Fri", value: 85 },
  { day: "Sat", value: 95 },
  { day: "Sun", value: 70 }
];

export function ActivityChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-[24px] bg-gradient-to-br from-white to-blue-50/30
        border border-slate-200 p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-700 mb-1">Weekly Activity</h3>
          <p className="text-sm text-slate-500">Last 7 days performance</p>
        </div>
        <div className="p-3 rounded-xl bg-blue-100">
          <Activity className="w-5 h-5 text-blue-600" />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data}>
          <XAxis
            dataKey="day"
            stroke="#94a3b8"
            style={{ fontSize: "12px" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#94a3b8"
            style={{ fontSize: "12px" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
            cursor={{ fill: "rgba(59, 130, 246, 0.05)" }}
          />
          <defs>
            <linearGradient id="activityBarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <Bar
            dataKey="value"
            fill="url(#activityBarGradient)"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
