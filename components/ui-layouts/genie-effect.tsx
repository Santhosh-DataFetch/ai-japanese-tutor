'use client';

import { motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';

type AppItem = {
  id: string;
  label: string;
  accent: string;
  icon: string;
  description: string;
};

const apps: AppItem[] = [
  { id: 'safari', label: 'Safari', accent: '#1f86f9', icon: '🧭', description: 'Browse the web with a polished, floating window experience.' },
  { id: 'arc', label: 'Arc', accent: '#ff536a', icon: '✦', description: 'Switch between ideas and projects in a vivid canvas.' },
  { id: 'trello', label: 'Trello', accent: '#0052cc', icon: '▣', description: 'Keep your plan visible in a board-style preview.' },
  { id: 'dribbble', label: 'Dribbble', accent: '#ea4c89', icon: '◉', description: 'Showcase your visual work with a sharp, card-based layout.' },
  { id: 'command', label: 'Command', accent: '#ffffff', icon: '⌘', description: 'Pull up a terminal inspired surface for developer flair.' },
  { id: 'layouts', label: 'Layouts', accent: '#1d04ff', icon: '◫', description: 'Prototype multiple patterns from one compact panel.' },
];

export default function GenieEffect() {
  const [activeApp, setActiveApp] = useState<AppItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const panel = useMemo(() => {
    if (!activeApp) {
      return null;
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-x-6 top-10 bottom-24 rounded-[24px] border border-white/15 bg-slate-950/85 p-6 shadow-2xl shadow-black/40"
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/45">{activeApp.label}</p>
            <h3 className="text-xl font-semibold text-white">{activeApp.description}</h3>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl text-2xl" style={{ backgroundColor: `${activeApp.accent}22`, color: activeApp.accent }}>
            {activeApp.icon}
          </div>
        </div>
        <div className="grid h-[calc(100%-4rem)] gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-white/70">This panel was extracted from the UI Layouts inspiration snippet and kept isolated for later integration.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-4">
            <p className="text-sm font-medium text-white">Usage</p>
            <p className="mt-2 text-sm text-white/60">Swap the content area with your own layout once you are ready to place it in an app page.</p>
          </div>
        </div>
      </motion.div>
    );
  }, [activeApp]);

  return (
    <div className="relative flex h-[560px] w-full items-center justify-center overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),transparent_28%),linear-gradient(135deg,_#020617,_#0f172a)] p-6 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.06)_45%,transparent_100%)]" />
      <div className="absolute left-7 top-7 h-20 w-20 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute bottom-24 right-8 h-28 w-28 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="relative flex h-full w-full max-w-5xl flex-col">
        <div className="mb-6 flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
          <div className="text-sm font-medium">Genie Effect Dock</div>
          <div className="text-xs uppercase tracking-[0.3em] text-white/45">ui-layouts</div>
        </div>

        {mounted ? (
          <div className="relative flex-1 rounded-[28px] border border-white/10 bg-slate-950/50 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl">
            {panel}
            <div className="absolute inset-x-4 bottom-4 flex items-end justify-center gap-2 rounded-[24px] border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-xl">
              {apps.map((app) => (
                <motion.button
                  key={app.id}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => setActiveApp(app)}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl text-xl transition-all"
                  style={{ backgroundColor: activeApp?.id === app.id ? `${app.accent}26` : 'rgba(255,255,255,0.06)' }}
                  aria-label={app.label}
                >
                  {app.icon}
                </motion.button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
