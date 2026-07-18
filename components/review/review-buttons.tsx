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
      <Button
        variant="destructive"
        disabled={loading}
        onClick={() => onRate("Again")}
      >
        1️⃣ Again
      </Button>

      <Button
        variant="secondary"
        disabled={loading}
        onClick={() => onRate("Hard")}
      >
        2️⃣ Hard
      </Button>

      <Button
        disabled={loading}
        className="bg-green-600 hover:bg-green-700"
        onClick={() => onRate("Good")}
      >
        3️⃣ Good
      </Button>

      <Button
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700"
        onClick={() => onRate("Easy")}
      >
        4️⃣ Easy
      </Button>
    </div>
  );
}