import * as React from 'react';

import AnimatedGridBackground from '@/components/ui-layouts/backgrounds/animated-grid-background';
import { cn } from '@/lib/utils';

import { Button } from './button';
import { Card } from './card';

type GlassCardProps = React.ComponentPropsWithoutRef<'div'>;

type GlassPanelProps = React.ComponentPropsWithoutRef<'section'> & {
  decorative?: boolean;
};

type PremiumButtonProps = React.ComponentPropsWithoutRef<typeof Button>;

type PremiumInputProps = React.ComponentPropsWithoutRef<'input'> & {
  label?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
};

type PageHeaderProps = React.ComponentPropsWithoutRef<'header'> & {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
};

type StatCardProps = React.ComponentPropsWithoutRef<'div'> & {
  label: React.ReactNode;
  value: React.ReactNode;
  change?: React.ReactNode;
};

type SectionTitleProps = React.ComponentPropsWithoutRef<'div'> & {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
};

export function GlassCard({ className, ...props }: GlassCardProps) {
  return (
    <Card
      className={cn(
        'border-white/12 bg-white/8 shadow-[0_24px_80px_-36px_rgba(0,0,0,0.8)] backdrop-blur-xl',
        className,
      )}
      {...props}
    />
  );
}

export function GlassPanel({ className, decorative = true, children, ...props }: GlassPanelProps) {
  return (
    <section
      className={cn(
        'relative isolate overflow-hidden rounded-[32px] border border-white/12 bg-slate-950/75 p-6 shadow-[0_30px_90px_-38px_rgba(0,0,0,0.85)] backdrop-blur-2xl',
        className,
      )}
      {...props}
    >
      {decorative ? (
        <>
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <AnimatedGridBackground width={38} height={38} className="h-full w-full" />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(45,212,191,0.18),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.16),_transparent_38%)]" />
        </>
      ) : null}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

export function PremiumButton({ className, ...props }: PremiumButtonProps) {
  return (
    <Button
      className={cn(
        'h-11 px-4 text-[0.95rem] shadow-[0_24px_46px_-18px_rgba(45,212,191,0.45)]',
        className,
      )}
      {...props}
    />
  );
}

export function PremiumInput({ className, label, description, icon, id, ...props }: PremiumInputProps) {
  const inputId = id ?? React.useId();

  return (
    <div className="space-y-2">
      {label ? (
        <label htmlFor={inputId} className="text-sm font-medium text-white/80">
          {label}
        </label>
      ) : null}
      <div className="relative">
        {icon ? <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/60">{icon}</span> : null}
        <input
          id={inputId}
          className={cn(
            'h-11 w-full rounded-2xl border border-white/12 bg-white/8 px-3 text-sm text-foreground placeholder:text-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] outline-none backdrop-blur-xl transition focus:border-teal-400/40 focus:ring-3 focus:ring-teal-400/20',
            icon ? 'pl-10' : '',
            className,
          )}
          {...props}
        />
      </div>
      {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
    </div>
  );
}

export function PageHeader({ className, eyebrow, title, description, actions, ...props }: PageHeaderProps) {
  return (
    <header
      className={cn(
        'flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/6 px-6 py-6 backdrop-blur-xl',
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <SectionTitle eyebrow={eyebrow} title={title} description={description} />
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
    </header>
  );
}

export function StatCard({ className, label, value, change, ...props }: StatCardProps) {
  return (
    <GlassCard className={cn('p-5', className)} {...props}>
      <p className="text-sm text-white/60">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-2">
        <span className="text-2xl font-semibold text-white">{value}</span>
        {change ? <span className="text-sm text-teal-300">{change}</span> : null}
      </div>
    </GlassCard>
  );
}

export function SectionTitle({ className, eyebrow, title, description, ...props }: SectionTitleProps) {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {eyebrow ? <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-teal-300/80">{eyebrow}</p> : null}
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      {description ? <p className="max-w-2xl text-sm text-muted-foreground">{description}</p> : null}
    </div>
  );
}
