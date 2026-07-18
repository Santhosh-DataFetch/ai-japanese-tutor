"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Props {
  loading?: boolean;

  onRate: (
    rating: "Again" | "Hard" | "Good" | "Easy"
  ) => void;
}

export default function ReviewButtons({
  loading,
  onRate,
}: Props) {
  const buttons = [
    { label: "Again", rating: "Again" as const, color: "destructive", emoji: "🔄" },
    { label: "Hard", rating: "Hard" as const, color: "secondary", emoji: "😰" },
    { label: "Good", rating: "Good" as const, color: "default", emoji: "✅" },
    { label: "Easy", rating: "Easy" as const, color: "default", emoji: "🔥" },
  ];

  return (
    <motion.div 
      className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ staggerChildren: 0.05, delayChildren: 0.1 }}
    >
      {buttons.map((btn, idx) => (
        <motion.div
          key={btn.rating}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant={btn.rating === "Again" ? "destructive" : btn.rating === "Hard" ? "secondary" : "default"}
            disabled={loading}
            onClick={() => onRate(btn.rating)}
            className={`w-full font-semibold smooth-transition ${
              btn.rating === "Good" 
                ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-600/20"
                : btn.rating === "Easy"
                ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-600/20"
                : ""
            }`}
          >
            {btn.emoji} {btn.label}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
}
