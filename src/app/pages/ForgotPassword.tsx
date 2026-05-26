import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Heart, Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br
      from-slate-50 via-blue-50/40 to-indigo-50/30 px-4"
      style={{ fontFamily: "'Inter', sans-serif" }}>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-[32px] border border-slate-200
          shadow-2xl shadow-slate-200/60 p-10"
      >
        <Link to="/login"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700
            transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>

        {!sent ? (
          <>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="text-lg font-bold text-slate-800" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Earlysin<span className="text-blue-600">.ai</span>
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-1">Reset password</h2>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              Enter the email linked to your account and we&apos;ll send a secure reset link.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email" required value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50
                      text-slate-800 placeholder-slate-400 text-sm outline-none
                      focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                  />
                </div>
              </div>

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
                    Sending…
                  </span>
                ) : "Send reset link"}
              </motion.button>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-200
                flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-emerald-500" />
            </motion.div>

            <h2 className="text-xl font-bold text-slate-800 mb-2">Check your inbox</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-2">
              We sent a password reset link to
            </p>
            <p className="font-semibold text-slate-700 mb-8">{email}</p>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-left mb-8">
              <p className="text-xs text-blue-700 leading-relaxed">
                The link expires in <span className="font-semibold">15 minutes</span>.
                Check your spam folder if you don&apos;t see it.
              </p>
            </div>

            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600
                  text-white font-semibold text-sm shadow-lg shadow-blue-500/25"
              >
                Back to Sign In
              </motion.button>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
