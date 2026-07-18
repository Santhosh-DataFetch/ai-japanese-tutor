"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Props {
  loading?: boolean;
  onRate: (rating: "Again" | "Hard" | "Good" | "Easy") => void;
}

export default function ReviewButtons({ loading, onRate }: Props) {
  const buttons = [
    {
      label: "Again",
      rating: "Again" as const,
      color: "from-red-600 to-pink-600",
      icon: "↻",
      description: "1",
    },
    {
      label: "Hard",
      rating: "Hard" as const,
      color: "from-orange-600 to-red-600",
      icon: "⚠",
      description: "2",
    },
    {
      label: "Good",
      rating: "Good" as const,
      color: "from-green-600 to-emerald-600",
      icon: "✓",
      description: "3",
    },
    {
      label: "Easy",
      rating: "Easy" as const,
      color: "from-blue-600 to-cyan-600",
      icon: "★",
      description: "4",
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ staggerChildren: 0.08, delayChildren: 0 }}
    >
      {buttons.map((btn, idx) => (
        <motion.button
          key={btn.rating}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.08 }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => !loading && onRate(btn.rating)}
          disabled={loading}
          className="group relative px-4 py-4 rounded-2xl font-semibold text-white overflow-hidden disabled:opacity-50 transition-all"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${btn.color} shadow-lg transition-all group-hover:shadow-xl group-hover:shadow-current/50`} />
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative z-10 flex flex-col items-center gap-1">
            <span className="text-2xl">{btn.icon}</span>
            <span className="text-sm">{btn.label}</span>
            <span className="text-xs opacity-70">({btn.description})</span>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}
