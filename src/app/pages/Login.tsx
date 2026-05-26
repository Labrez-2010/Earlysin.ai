import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Heart, EyeOff, Eye, Mail, Lock, Bluetooth, Shield } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate("/dashboard"), 1200);
  }

  return (
    <div className="min-h-screen w-full flex overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Left panel — brand */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-800
          flex-col items-center justify-center p-12 relative overflow-hidden"
      >
        {/* decorative blobs */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10 max-w-sm text-center">
          {/* animated heart */}
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 rounded-3xl bg-white/15 backdrop-blur-sm border border-white/20
              flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <Heart className="w-12 h-12 text-white fill-white/90" />
          </motion.div>

          <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Earlysin<span className="text-blue-200">.ai</span>
          </h1>
          <p className="text-blue-200 text-base mb-10">Your AI Health Bodyguard</p>

          <div className="space-y-4 text-left">
            {[
              { icon: Shield, text: "24/7 vital sign monitoring" },
              { icon: Bluetooth, text: "Smart wearable integration" },
              { icon: Heart, text: "Early risk detection & alerts" },
            ].map(({ icon: Icon, text }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.12 }}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/10 border border-white/10"
              >
                <Icon className="w-5 h-5 text-blue-200 flex-shrink-0" />
                <span className="text-white/90 text-sm font-medium">{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right panel — form */}
      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1 flex items-center justify-center bg-slate-50 px-6 py-12"
      >
        <div className="w-full max-w-sm">
          {/* mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-bold text-slate-800" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Earlysin<span className="text-blue-600">.ai</span>
            </span>
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-1">Welcome back</h2>
          <p className="text-slate-500 text-sm mb-8">Sign in to your health dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-white
                    text-slate-800 placeholder-slate-400 text-sm outline-none
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-2xl border border-slate-200 bg-white
                    text-slate-800 placeholder-slate-400 text-sm outline-none
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember */}
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input type="checkbox" className="w-4 h-4 rounded-md accent-blue-600" />
              <span className="text-sm text-slate-600">Remember me for 30 days</span>
            </label>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600
                text-white font-semibold text-sm shadow-lg shadow-blue-500/30
                hover:shadow-blue-500/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                  />
                  Signing in…
                </span>
              ) : "Sign in"}
            </motion.button>
          </form>

          {/* divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-medium">or continue with</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* social */}
          <div className="grid grid-cols-2 gap-3">
            {["Google", "Apple"].map(provider => (
              <motion.button
                key={provider}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-slate-200
                  bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"
              >
                {provider === "Google" ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.39.07 2.35.74 3.16.73.97-.02 1.85-.77 3.14-.83 1.37.07 2.41.56 3.11 1.41-2.85 1.7-2.38 5.49.62 6.57-.44 1.06-.93 2.1-2.03 3zm-3.14-17c.17 1.6-.43 3.2-1.47 4.34-1.03 1.15-2.52 2.06-4.08 1.96-.19-1.56.5-3.15 1.53-4.27C10.88 4.1 12.5 3.26 13.91 3.28z"/>
                  </svg>
                )}
                {provider}
              </motion.button>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
              Create one free
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
