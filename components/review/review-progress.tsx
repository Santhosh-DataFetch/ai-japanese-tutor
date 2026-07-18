"use client";

import { Progress } from "@/components/ui/progress";

interface Props {
  current: number;
  total: number;
}

export default function ReviewProgress({
  current,
  total,
}: Props) {
  const value =
    total === 0
      ? 0
      : (current / total) * 100;

  return (
    <div className="glass-panel rounded-[28px] p-5 md:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Review session</h2>
          <p className="text-sm text-slate-400">{current} / {total} cards</p>
        </div>
        <span className="text-sm text-slate-300">{Math.round(value)}% complete</span>
      </div>
      <div className="mt-4">
        <Progress value={value} />
      </div>
    </div>
  );
}