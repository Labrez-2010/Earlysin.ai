import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { motion } from "motion/react";
import { TrendingUp } from "lucide-react";

const data = [
  { time: "00:00", bpm: 65 },
  { time: "04:00", bpm: 62 },
  { time: "08:00", bpm: 72 },
  { time: "12:00", bpm: 78 },
  { time: "16:00", bpm: 85 },
  { time: "20:00", bpm: 70 },
  { time: "24:00", bpm: 68 }
];

export function HeartRateChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10
        backdrop-blur-xl border border-cyan-500/20 p-6 shadow-2xl shadow-cyan-500/10"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">Heart Rate Trend</h3>
          <p className="text-sm text-white/60">Last 24 hours</p>
        </div>
        <TrendingUp className="w-6 h-6 text-cyan-400" />
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="time"
            stroke="rgba(255,255,255,0.3)"
            style={{ fontSize: "12px" }}
          />
          <YAxis
            stroke="rgba(255,255,255,0.3)"
            style={{ fontSize: "12px" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0,0,0,0.8)",
              border: "1px solid rgba(6, 182, 212, 0.3)",
              borderRadius: "12px",
              backdropFilter: "blur(10px)"
            }}
            labelStyle={{ color: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="bpm"
            stroke="#06b6d4"
            strokeWidth={3}
            dot={{ fill: "#06b6d4", r: 4 }}
            activeDot={{ r: 6, fill: "#06b6d4", stroke: "#fff", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
