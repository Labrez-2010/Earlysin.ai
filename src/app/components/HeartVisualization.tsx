import { motion } from "motion/react";
import { Heart } from "lucide-react";

export function HeartVisualization() {
  return (
    <div className="relative w-full max-w-md mx-auto h-[400px] flex items-center justify-center">
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-rose-400/20 rounded-full blur-3xl" />

        <motion.div
          animate={{
            boxShadow: [
              "0 0 60px rgba(59, 130, 246, 0.3)",
              "0 0 100px rgba(244, 63, 94, 0.4)",
              "0 0 60px rgba(59, 130, 246, 0.3)"
            ]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative w-64 h-64 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-rose-500
            flex items-center justify-center"
        >
          <div className="absolute inset-4 rounded-full bg-white/10 backdrop-blur-sm" />

          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-32 h-32 text-white fill-white/90" />
          </motion.div>

          <motion.div
            className="absolute inset-0 rounded-full border-4 border-white/20"
            animate={{
              scale: [1, 1.3],
              opacity: [0.5, 0]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        </motion.div>

        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full
          bg-white/80 backdrop-blur-md border border-slate-200 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-semibold text-slate-700">Live Monitoring</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      >
        <svg className="w-full h-full" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="heartVizWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 50,200 Q 100,150 150,200 T 250,200 T 350,200"
            stroke="url(#heartVizWaveGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
