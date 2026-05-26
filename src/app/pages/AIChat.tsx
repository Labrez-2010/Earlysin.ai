import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  Heart, Send, ChevronLeft, Sparkles, User,
  Plus, Trash2, Clock, Activity, Wind, Thermometer, Droplets, Shield
} from "lucide-react";

/* ─── Types ─── */
interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  time: Date;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

/* ─── AI response engine ─── */
const healthContext = {
  heartRate: 72,
  spo2: 98,
  temp: 36.7,
  bp: "120/80",
  steps: 8432,
  sleep: 7.5,
  hydration: "2.1L / 3L",
  score: 87,
};

const responses: Record<string, string> = {
  default: "Based on your current vitals — heart rate 72 BPM, SpO₂ 98%, temperature 36.7°C — everything looks excellent! Is there something specific you'd like to know about your health data?",
};

function getAIReply(input: string): string {
  const q = input.toLowerCase();

  if (q.match(/heart|bpm|pulse|cardiac/))
    return `Your current heart rate is **${healthContext.heartRate} BPM** — perfectly normal for a resting adult. Your HRV has improved 12% this week, which indicates excellent cardiovascular recovery. Keep maintaining your current activity level! 💓`;

  if (q.match(/oxygen|spo2|o2|breathing|lung/))
    return `Your SpO₂ is **${healthContext.spo2}%** — excellent oxygen saturation! Anything above 95% is healthy. Your readings have been consistently high this week, suggesting great lung function and circulation. Keep breathing those deep breaths! 🫁`;

  if (q.match(/temp|temperature|fever|hot/))
    return `Your body temperature is **${healthContext.temp}°C** — right in the normal range (36.1–37.2°C). I noticed a slight elevation to 37.0°C around 3pm yesterday, likely post-exercise. No fever detected. Stay hydrated! 🌡️`;

  if (q.match(/blood pressure|bp|hypert/))
    return `Your blood pressure reading is **${healthContext.bp} mmHg** — a textbook perfect reading! Systolic 120 is the upper threshold for "normal", and diastolic 80 is ideal. No hypertensive patterns detected this week. 🩸`;

  if (q.match(/step|walk|activity|exercise|workout|move/))
    return `You've taken **${healthContext.steps.toLocaleString()} steps** today — 84% of your 10,000 goal! A 30-minute evening walk would complete your target and add about 3,500 more steps. You've had 42 active minutes/day this week, which exceeds the WHO recommendation of 30 min. 🏃`;

  if (q.match(/sleep|rest|tired|fatigue|insomnia/))
    return `Last night you got **${healthContext.sleep} hours** of sleep with 3 deep sleep cycles and 94 minutes of REM — above average! Your sleep consistency this week is excellent (only 18-minute variance in bedtime). However, you have a cumulative sleep debt of 42 minutes — try for 8 hours tonight. 😴`;

  if (q.match(/water|hydrat|drink/))
    return `⚠️ **Hydration alert!** You've consumed **${healthContext.hydration}** today. You still need 0.9L more to hit your daily target. I recommend drinking a glass of water right now, and setting a reminder for every 90 minutes. Dehydration affects cognitive performance and heart rate! 💧`;

  if (q.match(/score|health score|rating|overall/))
    return `Your current health score is **${healthContext.score}/100 — Excellent!** ⭐⭐⭐⭐⭐\n\nThis is calculated from:\n• Heart rate & HRV: 92/100\n• SpO₂ levels: 98/100\n• Activity: 84/100\n• Sleep quality: 88/100\n• Hydration: 70/100 (needs improvement)\n\nFocus on hydration to push your score above 90!`;

  if (q.match(/risk|danger|emergency|warning|alert/))
    return `Your risk analysis for the next 7 days:\n\n🟢 **Cardiovascular Risk: 4%** — Very Low\n🟡 **Stress Indicator: 23/100** — Low\n🟢 **Overexertion Risk: 12%** — Very Low\n\nNo emergency patterns detected. Your fall detection sensor shows no events. All vitals within safe ranges. You're in great shape! 🛡️`;

  if (q.match(/sos|emergency|help|accident|fall/))
    return `🚨 **Emergency Features Active:**\n\n• SOS button triggers instant alert to all 4 guardians\n• Fall detection monitors via accelerometer 24/7\n• GPS location shared in real-time during emergencies\n• Emergency contacts: Mom (+91 98765 43210 — Primary), Dad, Dr. Patel\n\nIf you're having a medical emergency right now, please call 112 immediately or hold the SOS button for 3 seconds.`;

  if (q.match(/stress|anxiety|mental|mood|worry/))
    return `Your HRV-derived stress indicator is **23/100 — Low stress** this week. I noticed a mild stress spike Wednesday afternoon (elevated heart rate + reduced HRV). \n\nAI recommendations:\n• 5-minute deep breathing exercises daily\n• Maintain your sleep schedule\n• The 42-minute sleep debt from this week may be a contributing factor\n\nWould you like me to guide you through a breathing exercise? 🧘`;

  if (q.match(/diet|food|eat|nutrition|calorie/))
    return `Based on your activity data:\n\n• **Caloric burn today:** 420 active kcal + ~1,650 basal = ~2,070 total\n• **Post-workout nutrition window:** Open for ~35 min after your last activity session\n• **Protein recommendation:** 1.6-2.0g per kg bodyweight for your activity level\n\nYour hydration is the most urgent nutritional priority right now — only 70% of daily water goal achieved! 🥗`;

  if (q.match(/guardian|parent|family|monitor/))
    return `Your **Guardian Network** has 4 active members:\n\n👩 Mom — Active (Last seen: 2 min ago)\n👨 Dad — Away (Last seen: 3h ago)\n👩‍⚕️ Dr. Patel — Active (Physician)\n👩 Priya — Active (Sister)\n\nThey can see your real-time vitals, location, and receive emergency alerts. All sharing permissions are under your control in the Guardian tab. 🛡️`;

  if (q.match(/hi|hello|hey|good morning|good evening|namaste/))
    return `Hello, Aryan! 👋 I'm your Earlysin AI health assistant — your personal bodyguard powered by AI.\n\nRight now your health looks **excellent** (Score: 87/100). Heart rate is steady at 72 BPM, SpO₂ at 98%, and temperature normal at 36.7°C.\n\nWhat would you like to know about your health today?`;

  if (q.match(/thank|thanks|great|awesome|good job/))
    return `You're welcome! 😊 Remember, I'm here 24/7 to help you monitor and understand your health. Your body is sending me data every second — I'll alert you if anything needs attention.\n\nIs there anything else you'd like to know?`;

  if (q.match(/device|band|sensor|bluetooth|battery/))
    return `Your **Earlysin Band v2.1** is connected and all 6 sensors are active:\n\n✅ MAX30102 (Heart Rate + SpO₂)\n✅ Temperature Sensor\n✅ Accelerometer (Fall Detection)\n✅ GPS Module (Location Active)\n✅ Vibration Motor\n✅ Bluetooth LE\n\n**Battery: 82%** · **Signal: Strong** · **Uptime: 6h 22m**\nEstimated remaining charge: ~14 hours. ⌚`;

  return `That's a great question! Based on your current health data (HR: ${healthContext.heartRate} BPM, SpO₂: ${healthContext.spo2}%, Temp: ${healthContext.temp}°C, Score: ${healthContext.score}/100), your overall health is excellent.\n\nCould you be more specific about what you'd like to know? I can help with:\n• Vital signs interpretation\n• Activity & exercise guidance\n• Sleep analysis\n• Hydration reminders\n• Risk assessment\n• Emergency features`;
}

/* ─── Preset quick questions ─── */
const PRESETS = [
  { icon: Heart, label: "Heart status", q: "What is my heart rate and is it normal?" },
  { icon: Activity, label: "Activity today", q: "How active have I been today?" },
  { icon: Wind, label: "Oxygen levels", q: "What is my SpO₂ and oxygen level?" },
  { icon: Droplets, label: "Hydration", q: "Am I drinking enough water today?" },
  { icon: Shield, label: "Risk check", q: "What are my current health risks?" },
  { icon: Thermometer, label: "Temperature", q: "Is my body temperature normal?" },
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-0.5">
      {[0, 1, 2].map(i => (
        <motion.div key={i}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          className="w-2 h-2 rounded-full bg-purple-400"
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isAI = msg.role === "ai";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25 }}
      className={`flex items-end gap-2.5 ${isAI ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* avatar */}
      {isAI ? (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600
          flex items-center justify-center flex-shrink-0 shadow-md">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500
          flex items-center justify-center flex-shrink-0 shadow-md">
          <User className="w-4 h-4 text-white" />
        </div>
      )}

      <div className={`max-w-[75%] ${isAI ? "items-start" : "items-end"} flex flex-col gap-1`}>
        <div className={`px-4 py-3 rounded-[20px] text-sm leading-relaxed shadow-sm
          ${isAI
            ? "bg-white border border-slate-200 text-slate-700 rounded-bl-md"
            : "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-br-md"
          }`}
          style={{ whiteSpace: "pre-wrap" }}
        >
          {msg.text}
        </div>
        <span className="text-xs text-slate-400 px-1">
          {msg.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </motion.div>
  );
}

let chatIdCounter = 1;

function makeChat(firstMsg?: string): Chat {
  const id = `chat-${Date.now()}-${chatIdCounter++}`;
  const aiGreeting: Message = {
    id: `${id}-0`,
    role: "ai",
    text: "Hello, Aryan! 👋 I'm your Earlysin AI — your 24/7 health bodyguard.\n\nYour health score is 87/100 — Excellent! Heart rate 72 BPM · SpO₂ 98% · Temp 36.7°C\n\nHow can I help you today?",
    time: new Date(),
  };
  return { id, title: firstMsg ?? "New conversation", messages: [aiGreeting], createdAt: new Date() };
}

export default function AIChat() {
  const [chats, setChats] = useState<Chat[]>(() => [makeChat()]);
  const [activeChatId, setActiveChatId] = useState<string>(() => chats[0]?.id ?? "");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeChat = chats.find(c => c.id === activeChatId) ?? chats[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages, isTyping]);

  function send(text: string) {
    if (!text.trim() || isTyping) return;
    const userMsg: Message = { id: `${Date.now()}-u`, role: "user", text: text.trim(), time: new Date() };

    setChats(prev => prev.map(c => {
      if (c.id !== activeChatId) return c;
      const isFirst = c.messages.length === 1;
      return {
        ...c,
        title: isFirst ? text.trim().slice(0, 40) : c.title,
        messages: [...c.messages, userMsg],
      };
    }));
    setInput("");
    setIsTyping(true);

    const delay = 800 + Math.random() * 800;
    setTimeout(() => {
      const reply = getAIReply(text);
      const aiMsg: Message = { id: `${Date.now()}-a`, role: "ai", text: reply, time: new Date() };
      setChats(prev => prev.map(c =>
        c.id !== activeChatId ? c : { ...c, messages: [...c.messages, aiMsg] }
      ));
      setIsTyping(false);
    }, delay);
  }

  function newChat() {
    const chat = makeChat();
    setChats(prev => [chat, ...prev]);
    setActiveChatId(chat.id);
    setSidebarOpen(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  function deleteChat(id: string) {
    setChats(prev => {
      const next = prev.filter(c => c.id !== id);
      if (next.length === 0) {
        const fresh = makeChat();
        setActiveChatId(fresh.id);
        return [fresh];
      }
      if (id === activeChatId) setActiveChatId(next[0].id);
      return next;
    });
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-50"
      style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Top bar ── */}
      <div className="flex-shrink-0 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm z-20">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link to="/dashboard"
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-600 flex-shrink-0">
            <ChevronLeft className="w-5 h-5" />
          </Link>

          {/* hamburger — mobile sidebar */}
          <button onClick={() => setSidebarOpen(v => !v)}
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-600 flex-shrink-0 lg:hidden">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-md flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base font-bold text-slate-800 leading-tight">Earlysin AI</h1>
              <p className="text-xs text-slate-500 truncate">
                {activeChat?.title ?? "Chat"} · {activeChat?.messages.length ?? 0} messages
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* live vitals pill */}
            <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200">
              <div className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span className="text-xs font-semibold text-slate-700">72</span>
              </div>
              <div className="flex items-center gap-1">
                <Wind className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-xs font-semibold text-slate-700">98%</span>
              </div>
            </div>

            <button onClick={newChat}
              className="p-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition-colors shadow-md">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* Sidebar overlay on mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/30 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* ── Chat history sidebar ── */}
        <div className={`
          absolute lg:relative inset-y-0 left-0 z-30 lg:z-auto
          w-72 bg-white border-r border-slate-200 flex flex-col flex-shrink-0
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          <div className="p-4 border-b border-slate-100">
            <button onClick={newChat}
              className="w-full flex items-center gap-2 px-4 py-2.5 rounded-2xl
                bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold
                hover:opacity-90 transition-opacity shadow-md">
              <Plus className="w-4 h-4" />
              New conversation
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">
              Recent chats
            </p>
            {chats.map(chat => (
              <div key={chat.id}
                className={`group flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer
                  transition-colors ${chat.id === activeChatId
                    ? "bg-purple-50 border border-purple-200"
                    : "hover:bg-slate-50 border border-transparent"}`}
                onClick={() => { setActiveChatId(chat.id); setSidebarOpen(false); }}
              >
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${chat.id === activeChatId ? "bg-purple-500" : "bg-slate-300"}`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm truncate font-medium
                    ${chat.id === activeChatId ? "text-purple-700" : "text-slate-700"}`}>
                    {chat.title}
                  </p>
                  <p className="text-xs text-slate-400">
                    {chat.messages.length} msgs
                  </p>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); deleteChat(chat.id); }}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded-lg
                    hover:bg-rose-100 text-slate-400 hover:text-rose-500 transition-all">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Context strip */}
          <div className="p-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Live Context</p>
            <div className="space-y-1.5">
              {[
                { icon: Heart, label: "Heart Rate", val: "72 BPM", col: "text-rose-500" },
                { icon: Wind, label: "SpO₂", val: "98%", col: "text-blue-500" },
                { icon: Activity, label: "Steps", val: "8,432", col: "text-emerald-500" },
                { icon: Clock, label: "Sleep", val: "7.5h", col: "text-purple-500" },
              ].map(({ icon: Icon, label, val, col }, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <Icon className={`w-3.5 h-3.5 ${col}`} />
                    <span className="text-slate-500">{label}</span>
                  </div>
                  <span className="font-semibold text-slate-700">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main chat area ── */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

            {/* Preset questions — shown when only greeting */}
            {activeChat?.messages.length === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-2"
              >
                <p className="text-xs text-slate-400 text-center mb-3 font-medium">
                  Quick questions about your health
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PRESETS.map(({ icon: Icon, label, q }) => (
                    <button key={label}
                      onClick={() => send(q)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-2xl bg-white border border-slate-200
                        hover:border-purple-300 hover:bg-purple-50 transition-all text-left group shadow-sm"
                    >
                      <Icon className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-500 flex-shrink-0" />
                      <span className="text-xs text-slate-600 group-hover:text-purple-700 font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {activeChat?.messages.map(msg => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-end gap-2.5"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600
                  flex items-center justify-center flex-shrink-0 shadow-md">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="px-4 py-3 rounded-[20px] rounded-bl-md bg-white border border-slate-200 shadow-sm">
                  <TypingDots />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div className="flex-shrink-0 px-4 py-3 bg-white/80 backdrop-blur-sm border-t border-slate-200">
            <div className="flex items-center gap-2 max-w-3xl mx-auto">
              <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-100
                border border-slate-200 focus-within:border-purple-400 focus-within:ring-2
                focus-within:ring-purple-400/20 transition-all">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask about your health, vitals, risks…"
                  className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400
                    outline-none min-w-0"
                />
              </div>
              <motion.button
                onClick={() => send(input)}
                disabled={!input.trim() || isTyping}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600
                  flex items-center justify-center text-white shadow-lg shadow-purple-500/30
                  disabled:opacity-40 disabled:cursor-not-allowed transition-opacity flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
            <p className="text-center text-xs text-slate-400 mt-2">
              Earlysin AI · Responses based on your live sensor data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
