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
    <div className="glass-panel rounded-[32px] p-8 space-y-8">
      <div>
        <label className="text-sm uppercase tracking-[0.24em] text-slate-400">Daily goal</label>
        <input className="glass-input mt-3" value={goal} type="number" onChange={(e) => setGoal(Number(e.target.value))} />
      </div>

      <div>
        <label className="text-sm uppercase tracking-[0.24em] text-slate-400">AI model</label>
        <input className="glass-input mt-3" value={model} onChange={(e) => setModel(e.target.value)} />
      </div>

      <div>
        <label className="text-sm uppercase tracking-[0.24em] text-slate-400">Temperature</label>
        <input className="glass-input mt-3" value={temperature} type="number" step="0.1" min="0" max="2" onChange={(e) => setTemperature(Number(e.target.value))} />
      </div>

      <Button disabled={pending} onClick={() => startTransition(() => saveSettings(goal, model, temperature))} className="w-full justify-center">
        Save Settings
      </Button>
    </div>
  );
}