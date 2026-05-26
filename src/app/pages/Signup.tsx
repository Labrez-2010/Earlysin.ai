import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Heart, Eye, EyeOff, Mail, Lock, User, Phone, Shield, Activity, Bluetooth } from "lucide-react";

const STEPS = ["Account", "Profile", "Device"] as const;

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: "",
    age: "", gender: "", condition: "none"
  });

  function update(k: keyof typeof form, v: string) {
    setForm(f => ({ ...f, [k]: v }));
  }

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (step < STEPS.length - 1) { setStep(s => s + 1); return; }
    setLoading(true);
    setTimeout(() => navigate("/dashboard"), 1400);
  }

  return (
    <div className="min-h-screen w-full flex overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Left brand panel */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-rose-500 via-pink-600 to-purple-700
          flex-col items-center justify-center p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2" />

        <div className="relative z-10 max-w-sm text-center">
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 rounded-3xl bg-white/15 border border-white/20
              flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <Heart className="w-12 h-12 text-white fill-white/90" />
          </motion.div>

          <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Join Earlysin<span className="text-rose-200">.ai</span>
          </h1>
          <p className="text-rose-100 text-base mb-10">Get your AI health bodyguard in 3 steps</p>

          <div className="space-y-3 text-left">
            {[
              { icon: User, text: "Create your health profile" },
              { icon: Activity, text: "Sync with your wearable band" },
              { icon: Shield, text: "Connect family guardians" },
            ].map(({ icon: Icon, text }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.12 }}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/10 border border-white/10"
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center
                  ${step >= i ? "bg-white/30" : "bg-white/10"} transition-colors`}>
                  <Icon className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-white/90 text-sm font-medium">{text}</span>
                {step > i && <span className="ml-auto text-rose-200 text-xs font-semibold">✓</span>}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right form panel */}
      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex items-center justify-center bg-slate-50 px-6 py-12"
      >
        <div className="w-full max-w-sm">
          {/* mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-rose-500 to-purple-600 shadow-md">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-bold text-slate-800" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Earlysin<span className="text-rose-500">.ai</span>
            </span>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                  transition-all duration-300 flex-shrink-0
                  ${i < step ? "bg-emerald-500 text-white" :
                    i === step ? "bg-rose-500 text-white shadow-lg shadow-rose-500/40" :
                    "bg-slate-200 text-slate-500"}`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block
                  ${i === step ? "text-slate-700" : "text-slate-400"}`}>{s}</span>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 rounded transition-all duration-300
                    ${i < step ? "bg-emerald-400" : "bg-slate-200"}`} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleNext} className="space-y-5">
            {/* Step 0: Account */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-0.5">Create account</h2>
                  <p className="text-sm text-slate-500">Start your health monitoring journey</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text" required value={form.name}
                      onChange={e => update("name", e.target.value)}
                      placeholder="Aryan Sharma"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-white
                        text-slate-800 placeholder-slate-400 text-sm outline-none
                        focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email" required value={form.email}
                      onChange={e => update("email", e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-white
                        text-slate-800 placeholder-slate-400 text-sm outline-none
                        focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPass ? "text" : "password"} required value={form.password}
                      onChange={e => update("password", e.target.value)}
                      placeholder="Min. 8 characters"
                      className="w-full pl-10 pr-11 py-3 rounded-2xl border border-slate-200 bg-white
                        text-slate-800 placeholder-slate-400 text-sm outline-none
                        focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 transition-all"
                    />
                    <button type="button" onClick={() => setShowPass(v => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {/* Password strength */}
                  {form.password && (
                    <div className="mt-2 flex gap-1">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-300
                            ${form.password.length >= i * 3
                              ? i <= 1 ? "bg-rose-400"
                              : i <= 2 ? "bg-amber-400"
                              : i <= 3 ? "bg-blue-400"
                              : "bg-emerald-400"
                            : "bg-slate-200"}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel" value={form.phone}
                      onChange={e => update("phone", e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-white
                        text-slate-800 placeholder-slate-400 text-sm outline-none
                        focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 transition-all"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 1: Profile */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-0.5">Health profile</h2>
                  <p className="text-sm text-slate-500">Help the AI personalize your monitoring</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Age</label>
                    <input
                      type="number" min="1" max="120" value={form.age}
                      onChange={e => update("age", e.target.value)}
                      placeholder="22"
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white
                        text-slate-800 placeholder-slate-400 text-sm outline-none
                        focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Gender</label>
                    <select
                      value={form.gender}
                      onChange={e => update("gender", e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white
                        text-slate-700 text-sm outline-none
                        focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 transition-all"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Any health conditions?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["none", "diabetes", "hypertension", "heart disease", "asthma", "other"].map(c => (
                      <label key={c}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border cursor-pointer
                          transition-all text-sm capitalize
                          ${form.condition === c
                            ? "border-rose-400 bg-rose-50 text-rose-700 font-medium"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}
                      >
                        <input type="radio" name="condition" value={c} className="sr-only"
                          checked={form.condition === c}
                          onChange={() => update("condition", c)} />
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                          ${form.condition === c ? "border-rose-500" : "border-slate-300"}`}>
                          {form.condition === c && (
                            <div className="w-2 h-2 rounded-full bg-rose-500" />
                          )}
                        </div>
                        {c === "none" ? "None" : c}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                  <p className="text-xs text-blue-700 leading-relaxed">
                    <span className="font-semibold">Privacy first:</span> Your health data is encrypted
                    end-to-end and never shared without your explicit consent.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 2: Device */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-0.5">Connect device</h2>
                  <p className="text-sm text-slate-500">Pair your Earlysin wearable band</p>
                </div>

                {/* Scanning animation */}
                <div className="flex flex-col items-center py-6">
                  <div className="relative w-32 h-32 mb-4">
                    <motion.div
                      animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                      className="absolute inset-0 rounded-full border-2 border-blue-400"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, delay: 0.4 }}
                      className="absolute inset-0 rounded-full border-2 border-blue-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600
                        flex items-center justify-center shadow-xl shadow-blue-500/30">
                        <Bluetooth className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-slate-700">Scanning for devices…</p>
                  <p className="text-xs text-slate-500 mt-1">Make sure Bluetooth is enabled</p>
                </div>

                {/* Found device */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-4 p-4 rounded-2xl border-2 border-blue-400
                    bg-blue-50 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600
                    flex items-center justify-center shadow-md">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 text-sm">Earlysin Band v2.1</p>
                    <p className="text-xs text-slate-500">Signal: Strong · Battery: 94%</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 border border-blue-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-xs text-blue-700 font-semibold">Found</span>
                  </div>
                </motion.div>

                <button type="button"
                  className="w-full py-2.5 rounded-2xl border border-slate-200 bg-white
                    text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
                  Skip for now — connect later
                </button>
              </motion.div>
            )}

            {/* CTA */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600
                text-white font-semibold text-sm shadow-lg shadow-rose-500/30
                hover:shadow-rose-500/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                  />
                  Setting up your dashboard…
                </span>
              ) : step < STEPS.length - 1 ? "Continue →" : "Launch My Dashboard"}
            </motion.button>
          </form>

          {step === 0 && (
            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link to="/login" className="text-rose-500 font-semibold hover:underline">Sign in</Link>
            </p>
          )}
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)}
              className="mt-4 w-full text-center text-sm text-slate-500 hover:text-slate-700 transition-colors">
              ← Back
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
