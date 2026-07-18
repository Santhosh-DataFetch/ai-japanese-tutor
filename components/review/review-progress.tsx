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
    <div className="mb-8 space-y-2">

      <div className="flex justify-between text-sm text-muted-foreground">

        <div>
  <h2 className="text-xl font-bold">
    Review Session
  </h2>

  <p className="text-sm text-muted-foreground">
    {current} / {total} Cards
  </p>
</div>

        <span>
          {current} / {total}
        </span>

      </div>

      <Progress value={value} />

    </div>
  );
}