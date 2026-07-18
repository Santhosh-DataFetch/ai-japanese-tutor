"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { saveSettings } from "@/app/actions/settings";

export default function SettingsForm({
  settings,
}: any) {
  const [goal, setGoal] = useState(settings.daily_goal);

  const [model, setModel] = useState(settings.ai_model);

  const [temperature, setTemperature] =
    useState(settings.temperature);

  const [pending, startTransition] =
    useTransition();

  return (
    <div className="premium-card mt-8 space-y-8">

      <div>

        <label>Daily Goal</label>

        <input
          className="mt-2 w-full rounded-lg bg-muted p-3"
          value={goal}
          type="number"
          onChange={(e) =>
            setGoal(Number(e.target.value))
          }
        />

      </div>

      <div>

        <label>AI Model</label>

        <input
          className="mt-2 w-full rounded-lg bg-muted p-3"
          value={model}
          onChange={(e) =>
            setModel(e.target.value)
          }
        />

      </div>

      <div>

        <label>Temperature</label>

        <input
          className="mt-2 w-full rounded-lg bg-muted p-3"
          value={temperature}
          type="number"
          step="0.1"
          min="0"
          max="2"
          onChange={(e) =>
            setTemperature(Number(e.target.value))
          }
        />

      </div>

      <Button
        disabled={pending}
        onClick={() =>
          startTransition(() =>
            saveSettings(
              goal,
              model,
              temperature
            )
          )
        }
      >
        Save Settings
      </Button>

    </div>
  );
}