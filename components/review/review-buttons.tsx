"use client";

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
  return (
    <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
      <Button variant="secondary" disabled={loading} onClick={() => onRate("Again")} className="justify-center border-rose-400/20 bg-rose-500/10 text-rose-200 hover:bg-rose-500/20">
        1️⃣ Again
      </Button>

      <Button variant="secondary" disabled={loading} onClick={() => onRate("Hard")} className="justify-center border-amber-400/20 bg-amber-500/10 text-amber-200 hover:bg-amber-500/20">
        2️⃣ Hard
      </Button>

      <Button disabled={loading} onClick={() => onRate("Good")} className="justify-center border-emerald-400/20 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20">
        3️⃣ Good
      </Button>

      <Button disabled={loading} onClick={() => onRate("Easy")} className="justify-center border-sky-400/20 bg-sky-500/10 text-sky-200 hover:bg-sky-500/20">
        4️⃣ Easy
      </Button>
    </div>
  );
}