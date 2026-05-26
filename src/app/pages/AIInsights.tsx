import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  Heart, Wind, Thermometer, Activity, Droplets, TrendingUp,
  AlertCircle, CheckCircle, AlertTriangle, Sparkles, RefreshCw,
  Brain, ChevronLeft, Clock, Shield, Zap
} from "lucide-react";

/* ─── Insight data pools — shuffled on each refresh ─── */
const insightPools = {
  vitals: [
    { icon: Heart, color: "rose", title: "Heart Rate Variability", msg: "HRV improved +12% this week. Excellent cardiovascular recovery trend detected.", badge: "Improving", priority: "low" },
    { icon: Heart, color: "rose", title: "Resting Heart Rate", msg: "Resting HR at 62 BPM — optimal range. Consistent with good aerobic fitness.", badge: "Excellent", priority: "low" },
    { icon: Wind, color: "blue", title: "Oxygen Saturation", msg: "SpO₂ consistently above 97% — excellent lung function and perfusion.", badge: "Excellent", priority: "low" },
    { icon: Thermometer, color: "amber", title: "Body Temperature", msg: "Slight elevation to 37.0°C post-exercise at 3pm. Returned to baseline within 45 min.", badge: "Watch", priority: "medium" },
    { icon: Activity, color: "purple", title: "Blood Pressure Trend", msg: "120/80 mmHg — textbook normal. No hypertensive patterns detected this week.", badge: "Normal", priority: "low" },
  ],
  activity: [
    { icon: Activity, color: "blue", title: "Step Goal Progress", msg: "8,432 steps today — 84% of daily goal. 30-min evening walk would complete target.", badge: "Recommended", priority: "medium" },
    { icon: Zap, color: "amber", title: "Caloric Burn", msg: "Active calories: 420 kcal. Basal metabolism tracking normally at ~1,650 kcal/day.", badge: "On Track", priority: "low" },
    { icon: TrendingUp, color: "emerald", title: "Weekly Active Minutes", msg: "42 active minutes/day this week — exceeds WHO guideline of 30 min. Keep it up!", badge: "Excellent", priority: "low" },
    { icon: Shield, color: "emerald", title: "Fall Detection", msg: "No fall events detected in the past 7 days. Accelerometer data shows stable gait.", badge: "Safe", priority: "low" },
  ],
  sleep: [
    { icon: Brain, color: "indigo", title: "Sleep Quality Score", msg: "7.5h average last night. Deep sleep cycles: 3. REM phase: 94 min — above average.", badge: "Good", priority: "low" },
    { icon: Clock, color: "purple", title: "Sleep Consistency", msg: "Bedtime variance only 18 minutes across the week — excellent circadian rhythm consistency.", badge: "Excellent", priority: "low" },
    { icon: AlertTriangle, color: "amber", title: "Sleep Debt", msg: "Cumulative sleep debt this week: 42 minutes. Minor. Recommend 8h sleep tonight.", badge: "Watch", priority: "medium" },
  ],
  nutrition: [
    { icon: Droplets, color: "cyan", title: "Hydration Alert", msg: "Current intake: 2.1L. Daily target: 3.0L. Drink a glass of water now.", badge: "Action", priority: "high" },
    { icon: Sparkles, color: "rose", title: "Nutrition Window", msg: "Optimal post-workout nutrition window open for next 35 minutes. Consider protein intake.", badge: "Action", priority: "medium" },
  ],
  risk: [
    { icon: Shield, color: "emerald", title: "Cardiovascular Risk", msg: "7-day predictive score: 4% — Very Low. Heart health trending positively.", badge: "Very Low", priority: "low" },
    { icon: Brain, color: "amber", title: "Stress Indicator", msg: "HRV-derived stress score: 23/100. Mild stress detected Wednesday afternoon.", badge: "Low", priority: "low" },
    { icon: AlertCircle, color: "blue", title: "Overexertion Risk", msg: "Recovery metrics look good. No signs of overtraining. Ready for moderate workout.", badge: "Very Low", priority: "low" },
  ],
};

const REFRESH_INTERVAL = 30;

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function pickInsights() {
  return {
    vitals: shuffle(insightPools.vitals).slice(0, 3),
    activity: shuffle(insightPools.activity).slice(0, 2),
    sleep: shuffle(insightPools.sleep).slice(0, 2),
    nutrition: shuffle(insightPools.nutrition).slice(0, 2),
    risk: shuffle(insightPools.risk).slice(0, 3),
  };
}

const priorityBg: Record<string, string> = {
  high: "border-l-4 border-rose-400",
  medium: "border-l-4 border-amber-400",
  low: "border-l-4 border-emerald-400",
};

const colorMap: Record<string, string> = {
  rose: "bg-rose-50 border-rose-200 text-rose-600",
  blue: "bg-blue-50 border-blue-200 text-blue-600",
  amber: "bg-amber-50 border-amber-200 text-amber-600",
  emerald: "bg-emerald-50 border-emerald-200 text-emerald-600",
  cyan: "bg-cyan-50 border-cyan-200 text-cyan-600",
  purple: "bg-purple-50 border-purple-200 text-purple-600",
  indigo: "bg-indigo-50 border-indigo-200 text-indigo-600",
};

const badgeMap: Record<string, string> = {
  Improving: "bg-emerald-100 text-emerald-700",
  Excellent: "bg-emerald-100 text-emerald-700",
  "Very Low": "bg-emerald-100 text-emerald-700",
  Good: "bg-emerald-100 text-emerald-700",
  Safe: "bg-emerald-100 text-emerald-700",
  "On Track": "bg-blue-100 text-blue-700",
  Normal: "bg-blue-100 text-blue-700",
  Low: "bg-blue-100 text-blue-700",
  Recommended: "bg-indigo-100 text-indigo-700",
  Watch: "bg-amber-100 text-amber-700",
  Action: "bg-rose-100 text-rose-700",
};

interface Insight {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  title: string;
  msg: string;
  badge: string;
  priority: string;
}

function InsightCard({ insight, index }: { insight: Insight; index: number }) {
  const Icon = insight.icon;
  return (
    <motion.div
      key={insight.title}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ x: 4 }}
      className={`flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200
        hover:shadow-md transition-all cursor-default ${priorityBg[insight.priority]}`}
    >
      <div className={`p-2 rounded-xl border flex-shrink-0 ${colorMap[insight.color]}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h4 className="text-sm font-semibold text-slate-700">{insight.title}</h4>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${badgeMap[insight.badge] ?? "bg-slate-100 text-slate-600"}`}>
            {insight.badge}
          </span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">{insight.msg}</p>
      </div>
    </motion.div>
  );
}

function Section({ title, icon: Icon, iconColor, children }: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[24px] bg-gradient-to-br from-white to-slate-50 border border-slate-200 p-5 shadow-md"
    >
      <div className="flex items-center gap-2 mb-4">
        <Icon className={`w-4 h-4 ${iconColor}`} />
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">{title}</h3>
      </div>
      <div className="space-y-3">{children}</div>
    </motion.div>
  );
}

export default function AIInsights() {
  const [insights, setInsights] = useState(pickInsights);
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [refreshCount, setRefreshCount] = useState(0);

  const doRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setInsights(pickInsights());
      setLastUpdated(new Date());
      setRefreshCount(c => c + 1);
      setCountdown(REFRESH_INTERVAL);
      setRefreshing(false);
    }, 600);
  }, []);

  /* auto-countdown */
  useEffect(() => {
    const id = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { doRefresh(); return REFRESH_INTERVAL; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [doRefresh]);

  const fmt = (d: Date) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const pct = ((REFRESH_INTERVAL - countdown) / REFRESH_INTERVAL) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/20 to-indigo-50/30"
      style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/dashboard"
                className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-600">
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="p-2 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100"
                >
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </motion.div>
                <div>
                  <h1 className="text-base font-bold text-slate-800">AI Health Insights</h1>
                  <p className="text-xs text-slate-500">Auto-refreshes every {REFRESH_INTERVAL}s</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* countdown ring */}
              <div className="relative w-9 h-9 flex-shrink-0">
                <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#8b5cf6" strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 15}`}
                    strokeDashoffset={`${2 * Math.PI * 15 * (1 - pct / 100)}`}
                    style={{ transition: "stroke-dashoffset 0.9s linear" }}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-purple-600">
                  {countdown}
                </span>
              </div>

              <motion.button
                onClick={doRefresh}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold shadow-md"
              >
                <motion.span animate={refreshing ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.6, ease: "linear" }}>
                  <RefreshCw className="w-3.5 h-3.5" />
                </motion.span>
                Refresh
              </motion.button>
            </div>
          </div>

          {/* progress bar */}
          <div className="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-400 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${100 - pct}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 pb-16 space-y-6">

        {/* Status bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between px-4 py-3 rounded-2xl
            bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-green-400"
            />
            <span className="text-sm font-medium">Bodyguard AI Active</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-purple-200">
            <span>Updated: {fmt(lastUpdated)}</span>
            <span>Refresh #{refreshCount + 1}</span>
          </div>
        </motion.div>

        {/* Vitals */}
        <Section title="Vitals Analysis" icon={Heart} iconColor="text-rose-500">
          {insights.vitals.map((ins, i) => <InsightCard key={i} insight={ins} index={i} />)}
        </Section>

        {/* Activity */}
        <Section title="Activity & Movement" icon={Activity} iconColor="text-blue-500">
          {insights.activity.map((ins, i) => <InsightCard key={i} insight={ins} index={i} />)}
        </Section>

        {/* Sleep */}
        <Section title="Sleep Quality" icon={Brain} iconColor="text-purple-500">
          {insights.sleep.map((ins, i) => <InsightCard key={i} insight={ins} index={i} />)}
        </Section>

        {/* Nutrition */}
        <Section title="Nutrition & Hydration" icon={Droplets} iconColor="text-cyan-500">
          {insights.nutrition.map((ins, i) => <InsightCard key={i} insight={ins} index={i} />)}
        </Section>

        {/* Risk */}
        <Section title="Predictive Risk" icon={Shield} iconColor="text-indigo-500">
          {insights.risk.map((ins, i) => <InsightCard key={i} insight={ins} index={i} />)}
        </Section>

        {/* Priority legend */}
        <div className="flex items-center gap-4 justify-center text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-emerald-400" />
            <span>Low priority</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-amber-400" />
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-rose-400" />
            <span>High — action needed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
