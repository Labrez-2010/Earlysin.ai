import {
  Heart, Activity, Droplets, Flame, Wind, Bluetooth, Bell, User,
  Home, Brain, Shield, MapPin, Thermometer,
  AlertTriangle, Phone, CheckCircle, AlertCircle,
  Sparkles, Users, Zap, Navigation, Clock,
  Wifi, Battery, Radio, Eye, LogOut, MessageCircle
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { MetricCard } from "./components/MetricCard";
import { HeartVisualization } from "./components/HeartVisualization";
import { HealthScore } from "./components/HealthScore";
import { MiniWaveform } from "./components/MiniWaveform";
import { ActivityChart } from "./components/ActivityChart";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import {
  LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area
} from "recharts";

/* ─── temperature sparkline data ─── */
const tempData = [
  { t: "6am", v: 36.4 }, { t: "9am", v: 36.6 }, { t: "12pm", v: 36.8 },
  { t: "3pm", v: 37.0 }, { t: "6pm", v: 36.9 }, { t: "9pm", v: 36.7 }
];

/* ─── heart-rate trend ─── */
const hrTrend = [
  { t: "00", v: 62 }, { t: "04", v: 58 }, { t: "08", v: 75 },
  { t: "12", v: 82 }, { t: "16", v: 90 }, { t: "20", v: 72 }, { t: "24", v: 65 }
];

/* ─── oxygen trend ─── */
const spo2Trend = [
  { t: "Mon", v: 98 }, { t: "Tue", v: 97 }, { t: "Wed", v: 99 },
  { t: "Thu", v: 98 }, { t: "Fri", v: 97 }, { t: "Sat", v: 99 }, { t: "Sun", v: 98 }
];

/* ────────────────────────────────────────────── */
/* SOS Button                                     */
/* ────────────────────────────────────────────── */
function SOSButton() {
  const [pressed, setPressed] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!pressed) { setCountdown(3); return; }
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [pressed, countdown]);

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.button
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onTouchStart={() => setPressed(true)}
        onTouchEnd={() => setPressed(false)}
        animate={pressed ? { scale: 0.92 } : { scale: 1 }}
        className="relative w-32 h-32 rounded-full flex items-center justify-center
          bg-gradient-to-br from-rose-500 to-red-600 shadow-2xl shadow-rose-500/40
          cursor-pointer select-none"
      >
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-rose-400"
          animate={{ scale: [1, 1.25], opacity: [0.8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-rose-300"
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
        />
        <span className="text-white font-bold text-2xl tracking-widest z-10">SOS</span>
      </motion.button>
      {pressed && countdown > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-rose-600 font-semibold text-sm"
        >
          Hold to send… {countdown}s
        </motion.p>
      )}
      {!pressed && (
        <p className="text-slate-500 text-xs text-center">Hold 3s to send emergency alert</p>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────── */
/* Live ECG                                       */
/* ────────────────────────────────────────────── */
function LiveECG() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 80);
    return () => clearInterval(id);
  }, []);

  const ecg = Array.from({ length: 60 }, (_, i) => {
    const x = i;
    const phase = (i + tick) % 20;
    let y = 50;
    if (phase === 8) y = 20;
    else if (phase === 9) y = 70;
    else if (phase === 10) y = 15;
    else if (phase === 11) y = 35;
    else if (phase === 12) y = 50;
    return { x, y };
  });

  const d = ecg.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x * 5} ${p.y}`).join(" ");

  return (
    <svg viewBox="0 0 300 80" className="w-full h-16">
      <defs>
        <linearGradient id="ecgLiveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <path d={d} stroke="url(#ecgLiveGrad)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ────────────────────────────────────────────── */
/* Guardians Panel                                */
/* ────────────────────────────────────────────── */
const guardians = [
  { name: "Mom", relation: "Parent", status: "Active", avatar: "M", color: "rose", lastSeen: "2 min ago" },
  { name: "Dr. Patel", relation: "Physician", status: "Active", avatar: "D", color: "blue", lastSeen: "1h ago" },
  { name: "Dad", relation: "Parent", status: "Away", avatar: "F", color: "purple", lastSeen: "3h ago" },
  { name: "Priya", relation: "Sister", status: "Active", avatar: "P", color: "emerald", lastSeen: "5 min ago" }
];

function GuardianCard({ g }: { g: typeof guardians[0] }) {
  const colors: Record<string, string> = {
    rose: "from-rose-400 to-pink-500",
    blue: "from-blue-400 to-indigo-500",
    purple: "from-purple-400 to-violet-500",
    emerald: "from-emerald-400 to-teal-500"
  };
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200
        hover:shadow-md transition-all"
    >
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colors[g.color]}
        flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
        {g.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-800 text-sm">{g.name}</p>
        <p className="text-xs text-slate-500">{g.relation}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <div className={`flex items-center gap-1.5 justify-end mb-1`}>
          <div className={`w-2 h-2 rounded-full ${g.status === "Active" ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`} />
          <span className={`text-xs font-medium ${g.status === "Active" ? "text-emerald-600" : "text-slate-500"}`}>{g.status}</span>
        </div>
        <p className="text-xs text-slate-400">{g.lastSeen}</p>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────── */
/* Emergency Alerts                               */
/* ────────────────────────────────────────────── */
const emergencyAlerts = [
  { icon: CheckCircle, type: "success", title: "All Vitals Normal", desc: "Heart rate, SpO₂, temp all within safe range", time: "Just now", bg: "bg-emerald-50", border: "border-emerald-200", iconCol: "text-emerald-500" },
  { icon: AlertTriangle, type: "warning", title: "Hydration Low", desc: "Water intake is 45% below daily target", time: "8 min ago", bg: "bg-amber-50", border: "border-amber-200", iconCol: "text-amber-500" },
  { icon: AlertCircle, type: "info", title: "Activity Reminder", desc: "No movement detected for 90 minutes", time: "22 min ago", bg: "bg-blue-50", border: "border-blue-200", iconCol: "text-blue-500" },
  { icon: CheckCircle, type: "success", title: "Fall Detection OK", desc: "Accelerometer normal — no fall events", time: "1h ago", bg: "bg-emerald-50", border: "border-emerald-200", iconCol: "text-emerald-500" }
];

/* ────────────────────────────────────────────── */
/* ────────────────────────────────────────────── */
/* System Architecture                            */
/* ────────────────────────────────────────────── */
function SystemArchCard() {
  const nodes = [
    { label: "Wearable Device", icon: Bluetooth, color: "from-blue-500 to-cyan-500", desc: "ESP32 + Sensors" },
    { label: "Mobile App", icon: Wifi, color: "from-purple-500 to-violet-500", desc: "Real-time sync" },
    { label: "AI Cloud Engine", icon: Brain, color: "from-indigo-500 to-blue-500", desc: "Pattern analysis" },
    { label: "Alert Network", icon: Bell, color: "from-rose-500 to-pink-500", desc: "Guardians + Docs" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[24px] bg-gradient-to-br from-slate-900 to-indigo-950 p-6 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-white/10">
          <Radio className="w-5 h-5 text-cyan-400" />
        </div>
        <h3 className="text-base font-semibold text-white">System Architecture</h3>
      </div>

      <div className="flex items-center justify-between gap-2">
        {nodes.map((n, i) => {
          const Icon = n.icon;
          return (
            <div key={i} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${n.color}
                    flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </motion.div>
                <p className="text-white/80 text-xs font-medium text-center leading-tight w-16">{n.label}</p>
                <p className="text-white/40 text-xs text-center">{n.desc}</p>
              </div>
              {i < nodes.length - 1 && (
                <div className="flex flex-col items-center gap-1 mb-8">
                  <motion.div
                    animate={{ opacity: [0.2, 1, 0.2], x: [-2, 2, -2] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                    className="text-cyan-400 text-lg"
                  >
                    →
                  </motion.div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {[
          { label: "Data Encrypted", icon: Shield, col: "text-emerald-400" },
          { label: "User-Controlled", icon: User, col: "text-blue-400" },
          { label: "Emergency-Only Access", icon: Zap, col: "text-amber-400" }
        ].map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-white/5">
              <Icon className={`w-3.5 h-3.5 ${f.col} flex-shrink-0`} />
              <span className="text-white/60 text-xs">{f.label}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────── */
/* GPS Location Card                              */
/* ────────────────────────────────────────────── */
function LocationCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[24px] bg-gradient-to-br from-white to-emerald-50/40 border border-emerald-200/50 p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-100">
            <MapPin className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-700">Live Location</h3>
            <p className="text-xs text-slate-500">Shared with guardians</p>
          </div>
        </div>
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-200"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-emerald-700 font-medium">GPS Active</span>
        </motion.div>
      </div>

      <div className="relative h-36 rounded-2xl bg-gradient-to-br from-slate-100 to-blue-50 overflow-hidden border border-slate-200 mb-4">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
              <Navigation className="w-4 h-4 text-white" />
            </div>
            <motion.div
              animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-blue-400"
            />
          </motion.div>
        </div>
        <div className="absolute bottom-2 left-2 px-2 py-1 rounded-lg bg-white/80 backdrop-blur-sm">
          <p className="text-xs font-medium text-slate-700">12.9716° N, 77.5946° E</p>
        </div>
      </div>

      <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
        <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-slate-700">Koramangala, Bengaluru</p>
          <p className="text-xs text-slate-500">Updated 30s ago · Battery: 82%</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────── */
/* Device Status                                  */
/* ────────────────────────────────────────────── */
function DeviceStatusCard() {
  const sensors = [
    { label: "MAX30102 (HR+SpO₂)", status: true },
    { label: "Temp Sensor", status: true },
    { label: "Accelerometer", status: true },
    { label: "GPS Module", status: true },
    { label: "Vibration Motor", status: true },
    { label: "Bluetooth LE", status: true }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[24px] bg-gradient-to-br from-white to-slate-50 border border-slate-200 p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-100">
            <Bluetooth className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-700">Device Status</h3>
            <p className="text-xs text-slate-500">Earlysin Band v2.1</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-200">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-emerald-700 font-semibold">Connected</span>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-5 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
        <div className="flex items-center gap-2">
          <Battery className="w-5 h-5 text-emerald-600" />
          <div>
            <p className="text-xs text-slate-500">Battery</p>
            <p className="text-base font-bold text-slate-800">82%</p>
          </div>
        </div>
        <div className="h-8 w-px bg-slate-200" />
        <div className="flex items-center gap-2">
          <Wifi className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-xs text-slate-500">Signal</p>
            <p className="text-base font-bold text-slate-800">Strong</p>
          </div>
        </div>
        <div className="h-8 w-px bg-slate-200" />
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-600" />
          <div>
            <p className="text-xs text-slate-500">Uptime</p>
            <p className="text-base font-bold text-slate-800">6h 22m</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {sensors.map((s, i) => (
          <div key={i} className="flex items-center justify-between py-2 px-3 rounded-xl
            hover:bg-slate-50 transition-colors">
            <span className="text-sm text-slate-600">{s.label}</span>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-emerald-600 font-medium">OK</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────── */
/* TABS                                           */
/* ────────────────────────────────────────────── */
const TABS = [
  { id: "home", icon: Home, label: "Home" },
  { id: "monitor", icon: Activity, label: "Monitor" },
  { id: "guardian", icon: Shield, label: "Guardian" },
  { id: "alerts", icon: Bell, label: "Alerts" }
];

/* ────────────────────────────────────────────── */
/* APP                                            */
/* ────────────────────────────────────────────── */
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 overflow-auto"
      style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-32">

        {/* ── Header ── */}
        <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-rose-500 shadow-lg">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  <span className="bg-gradient-to-r from-blue-600 to-rose-500 bg-clip-text text-transparent">
                    Earlysin
                  </span>
                  <span className="text-slate-800">.ai</span>
                </h1>
                <p className="text-xs text-slate-500">AI Health Bodyguard · Live Monitoring</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full
                  bg-emerald-100 border border-emerald-300"
              >
                <Bluetooth className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-xs text-emerald-700 font-medium">Band Connected</span>
              </motion.div>

              {/* AI Insights quick-link */}
              <Link to="/insights"
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl
                  bg-purple-50 border border-purple-200 hover:bg-purple-100 transition-colors">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span className="text-xs text-purple-700 font-medium">AI Insights</span>
              </Link>

              {/* AI Chat quick-link */}
              <Link to="/chat"
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl
                  bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors">
                <MessageCircle className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-xs text-indigo-700 font-medium">AI Chat</span>
              </Link>

              <button
                onClick={() => setActiveTab("alerts")}
                className="relative p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
                <Bell className="w-4 h-4 text-slate-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
              </button>

              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
                <User className="w-4 h-4 text-white" />
              </div>

              {/* Logout */}
              <button
                onClick={() => navigate("/login")}
                className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-rose-50
                  hover:border-rose-200 transition-colors shadow-sm"
                title="Sign out"
              >
                <LogOut className="w-4 h-4 text-slate-500 hover:text-rose-500" />
              </button>
            </div>
          </div>

          {/* greeting strip */}
          <div className="mt-5 flex items-center justify-between px-5 py-3 rounded-2xl
            bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
            <div>
              <p className="text-xs text-blue-200">Good morning, Aryan</p>
              <p className="font-semibold text-sm">Your health looks great today ✦</p>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
              <Zap className="w-3.5 h-3.5 text-yellow-300" />
              <span className="text-xs font-medium">Score: 87/100</span>
            </div>
          </div>
        </motion.header>

        {/* ── Home Tab ── */}
        {activeTab === "home" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Heart + metrics */}
              <div className="lg:col-span-2 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="rounded-[28px] bg-gradient-to-br from-white to-blue-50/30 border border-blue-100 p-6 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-base font-semibold text-slate-700">Heart Visualization</h2>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Live Monitoring
                    </div>
                  </div>
                  <HeartVisualization />
                </motion.div>

                {/* 6-metric grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <MetricCard title="Heart Rate" value={72} unit="BPM" icon={<Heart className="w-5 h-5" />} status="normal" trend="stable" size="small" />
                  <MetricCard title="Blood Pressure" value="120/80" icon={<Activity className="w-5 h-5" />} status="normal" size="small" />
                  <MetricCard title="SpO₂" value={98} unit="%" icon={<Wind className="w-5 h-5" />} status="normal" size="small" />
                  <MetricCard title="Body Temp" value="36.7" unit="°C" icon={<Thermometer className="w-5 h-5" />} status="normal" size="small" />
                  <MetricCard title="Calories" value={420} unit="kcal" icon={<Flame className="w-5 h-5" />} status="normal" trend="up" size="small" />
                  <MetricCard title="Steps" value="8,432" icon={<Activity className="w-5 h-5" />} status="normal" trend="up" size="small" />
                </div>

                {/* Fall Detection strip */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-4 p-5 rounded-[20px] bg-gradient-to-r
                    from-emerald-50 to-teal-50 border border-emerald-200"
                >
                  <div className="p-3 rounded-xl bg-emerald-100">
                    <Shield className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-700 text-sm">Fall Detection</p>
                    <p className="text-xs text-slate-500">Accelerometer active · No events today</p>
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">Safe</div>
                </motion.div>
              </div>

              {/* Right column */}
              <div className="space-y-6">
                <HealthScore score={87} />

                {/* Daily summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="rounded-[24px] bg-white border border-slate-200 p-5 shadow-lg"
                >
                  <h3 className="text-base font-semibold text-slate-700 mb-4">Daily Summary</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Steps", sub: "Goal: 10,000", value: "8,432", note: "84%", icon: Activity, bg: "blue" },
                      { label: "Hydration", sub: "Water intake", value: "2.1L", note: "Need 0.9L", icon: Droplets, bg: "rose" },
                      { label: "Sleep", sub: "Last night", value: "7.5h", note: "Good quality", icon: Heart, bg: "purple" }
                    ].map((item, i) => {
                      const Icon = item.icon;
                      const bgs: Record<string, string> = { blue: "bg-blue-50", rose: "bg-rose-50", purple: "bg-purple-50" };
                      const iconBgs: Record<string, string> = { blue: "bg-blue-100 text-blue-600", rose: "bg-rose-100 text-rose-600", purple: "bg-purple-100 text-purple-600" };
                      return (
                        <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${bgs[item.bg]}`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBgs[item.bg]}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-700">{item.label}</p>
                              <p className="text-xs text-slate-500">{item.sub}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-base font-bold text-slate-800">{item.value}</p>
                            <p className="text-xs text-slate-500">{item.note}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                <LocationCard />
              </div>
            </div>

            <SystemArchCard />
          </div>
        )}

        {/* ── Monitor Tab ── */}
        {activeTab === "monitor" && (
          <div className="space-y-6">
            {/* Live ECG */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-[24px] bg-gradient-to-br from-white to-emerald-50/30
                border border-emerald-200/50 p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-700">Real-time ECG Monitor</h3>
                  <p className="text-xs text-slate-500">Continuous electrocardiogram waveform</p>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-red-500"
                  />
                  <span className="text-xs font-semibold text-red-600">LIVE</span>
                  <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold ml-2">72 BPM</div>
                </div>
              </div>
              <LiveECG />
              <div className="mt-2">
                <MiniWaveform />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Heart Rate Trend */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-[24px] bg-white border border-slate-200 p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-slate-700">Heart Rate — 24h</h3>
                  <Heart className="w-4 h-4 text-rose-500" />
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={hrTrend}>
                    <defs>
                      <linearGradient id="hrAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="t" stroke="#94a3b8" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[50, 100]} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
                    <Area type="monotone" dataKey="v" stroke="#f43f5e" fill="url(#hrAreaGrad)" strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>

              {/* SpO2 Trend */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="rounded-[24px] bg-white border border-slate-200 p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-slate-700">SpO₂ — Weekly</h3>
                  <Wind className="w-4 h-4 text-blue-500" />
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={spo2Trend}>
                    <XAxis dataKey="t" stroke="#94a3b8" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[95, 100]} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
                    <Line type="monotone" dataKey="v" stroke="#3b82f6" strokeWidth={2.5} dot={{ fill: "#3b82f6", r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ActivityChart />

              {/* Body Temperature */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="rounded-[24px] bg-white border border-slate-200 p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-slate-700">Body Temperature</h3>
                  <Thermometer className="w-4 h-4 text-amber-500" />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl font-bold text-slate-800">36.7<span className="text-xl text-slate-400">°C</span></div>
                  <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">Normal</div>
                </div>
                <ResponsiveContainer width="100%" height={100}>
                  <AreaChart data={tempData}>
                    <defs>
                      <linearGradient id="tempAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="t" stroke="#94a3b8" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
                    <Area type="monotone" dataKey="v" stroke="#f59e0b" fill="url(#tempAreaGrad)" strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HealthScore score={87} />
              <DeviceStatusCard />
            </div>
          </div>
        )}

        {/* ── Guardian Tab ── */}
        {activeTab === "guardian" && (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-[28px] bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-6 h-6 text-blue-200" />
                <h2 className="text-lg font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>Guardian Network</h2>
              </div>
              <p className="text-blue-200 text-sm leading-relaxed">
                Your health is monitored by trusted guardians 24/7. They receive instant alerts when
                anomalies are detected — acting as your AI bodyguard.
              </p>
              <div className="mt-4 flex gap-3">
                <div className="px-4 py-2 rounded-xl bg-white/15 text-sm font-medium">4 Guardians Active</div>
                <div className="px-4 py-2 rounded-xl bg-white/15 text-sm font-medium">Location Shared</div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-[24px] bg-white border border-slate-200 p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-base font-semibold text-slate-700">Connected Guardians</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50
                      border border-blue-200 text-blue-600 text-xs font-semibold"
                  >
                    <Users className="w-3.5 h-3.5" />
                    Add Guardian
                  </motion.button>
                </div>
                <div className="space-y-3">
                  {guardians.map((g, i) => <GuardianCard key={i} g={g} />)}
                </div>
              </motion.div>

              <div className="space-y-6">
                <LocationCard />

                {/* What guardians can see */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="rounded-[24px] bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-5 shadow-lg"
                >
                  <h3 className="text-base font-semibold text-slate-700 mb-4 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-slate-500" />
                    Guardian Access Permissions
                  </h3>
                  {[
                    { label: "Real-time vitals", enabled: true },
                    { label: "Live location", enabled: true },
                    { label: "Emergency alerts", enabled: true },
                    { label: "Weekly health reports", enabled: true },
                    { label: "Historical data (30 days)", enabled: false }
                  ].map((p, i) => (
                    <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
                      <span className="text-sm text-slate-600">{p.label}</span>
                      <div className={`px-2.5 py-1 rounded-full text-xs font-semibold
                        ${p.enabled ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                        {p.enabled ? "Enabled" : "Disabled"}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        )}

        {/* ── Alerts Tab ── */}
        {activeTab === "alerts" && (
          <div className="space-y-6">
            {/* SOS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-[28px] bg-gradient-to-br from-rose-50 to-red-50 border-2 border-rose-200 p-8 shadow-xl"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <SOSButton />
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-800 mb-2">Emergency SOS</h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    Instantly alerts all your guardians with your current location, heart rate,
                    and health status. Also calls your emergency contact.
                  </p>
                  <div className="space-y-2">
                    {[
                      "Sends GPS coordinates to all guardians",
                      "Calls emergency contact automatically",
                      "Notifies nearest medical facility",
                      "Logs health data at time of alert"
                    ].map((s, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Emergency detection list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-[24px] bg-white border border-slate-200 p-6 shadow-lg"
            >
              <h3 className="text-base font-semibold text-slate-700 mb-5">Detection Capabilities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { label: "Abnormal Heart Rate", desc: "Tachycardia / Bradycardia detection", icon: Heart, status: "Monitoring", col: "rose" },
                  { label: "Fall Detection", desc: "Sudden impact via accelerometer", icon: AlertTriangle, status: "Monitoring", col: "amber" },
                  { label: "Low Oxygen (SpO₂)", desc: "Below 94% triggers alert", icon: Wind, status: "Monitoring", col: "blue" },
                  { label: "High Fever", desc: "Body temp above 38.5°C", icon: Thermometer, status: "Monitoring", col: "rose" },
                  { label: "No Movement", desc: "Extended inactivity detection", icon: Activity, status: "Monitoring", col: "purple" },
                  { label: "Geo-fence Exit", desc: "Alert when leaving safe zones", icon: MapPin, status: "Active", col: "emerald" }
                ].map((d, i) => {
                  const Icon = d.icon;
                  const bgMap: Record<string, string> = {
                    rose: "bg-rose-50 text-rose-600 border-rose-200",
                    amber: "bg-amber-50 text-amber-600 border-amber-200",
                    blue: "bg-blue-50 text-blue-600 border-blue-200",
                    purple: "bg-purple-50 text-purple-600 border-purple-200",
                    emerald: "bg-emerald-50 text-emerald-600 border-emerald-200"
                  };
                  return (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className={`p-2.5 rounded-xl border ${bgMap[d.col]}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-700">{d.label}</p>
                        <p className="text-xs text-slate-500 truncate">{d.desc}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs text-emerald-600 font-medium">{d.status}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Notification feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-[24px] bg-white border border-slate-200 p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-semibold text-slate-700">Notification Feed</h3>
                <button className="text-xs text-blue-600 font-medium hover:underline">Mark all read</button>
              </div>
              <div className="space-y-3">
                {emergencyAlerts.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 * i }}
                      className={`flex items-start gap-3 p-4 rounded-2xl border ${a.bg} ${a.border}`}
                    >
                      <Icon className={`w-5 h-5 ${a.iconCol} flex-shrink-0 mt-0.5`} />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-700">{a.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{a.desc}</p>
                      </div>
                      <span className="text-xs text-slate-400 flex-shrink-0">{a.time}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Emergency contacts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-[24px] bg-white border border-slate-200 p-6 shadow-lg"
            >
              <h3 className="text-base font-semibold text-slate-700 mb-4">Emergency Contacts</h3>
              <div className="space-y-3">
                {[
                  { name: "Mom", number: "+91 98765 43210", primary: true },
                  { name: "Dad", number: "+91 98765 43211", primary: false },
                  { name: "Dr. Patel", number: "+91 91234 56789", primary: false }
                ].map((c, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50
                    border border-slate-100 hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500
                        flex items-center justify-center text-white font-bold text-sm">
                        {c.name[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-slate-700">{c.name}</p>
                          {c.primary && (
                            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 text-xs font-semibold">Primary</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">{c.number}</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      className="p-2.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-emerald-600" />
                    </motion.button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* ── Bottom Nav ── */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 px-3 py-3 rounded-[28px]
          bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl"
        style={{ width: "min(98vw, 580px)" }}
      >
        <div className="flex items-center justify-around gap-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all
                  ${active ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "text-slate-500 hover:bg-slate-100"}`}
              >
                {tab.id === "alerts" && !active && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-500" />
                )}
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium leading-none">{tab.label}</span>
              </button>
            );
          })}

          {/* divider */}
          <div className="w-px h-8 bg-slate-200 mx-1" />

          {/* AI Insights page link */}
          <Link to="/insights"
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-2xl
              text-purple-600 hover:bg-purple-50 transition-all">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-medium leading-none">Insights</span>
          </Link>

          {/* AI Chat page link */}
          <Link to="/chat"
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-2xl
              text-indigo-600 hover:bg-indigo-50 transition-all">
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs font-medium leading-none">AI Chat</span>
          </Link>
        </div>
      </motion.nav>
    </div>
  );
}
