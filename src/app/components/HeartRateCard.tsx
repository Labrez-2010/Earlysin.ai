import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { HealthCard } from "./HealthCard";

export function HeartRateCard() {
  return (
    <HealthCard
      title="Heart Rate"
      value={72}
      unit="BPM"
      status="normal"
      subtitle="Resting"
      icon={<Heart className="w-6 h-6" />}
      className="col-span-2 row-span-2"
    >
      <div className="mt-6 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30
            flex items-center justify-center border border-cyan-500/50"
            style={{ boxShadow: "0 0 40px rgba(6, 182, 212, 0.4)" }}
          >
            <Heart className="w-16 h-16 text-cyan-400 fill-cyan-400/20" />
          </div>
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        </motion.div>
      </div>
    </HealthCard>
  );
}
