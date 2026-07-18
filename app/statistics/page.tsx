import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { getStatistics } from "@/app/actions/statistics";

export default async function StatisticsPage() {
  const stats = await getStatistics();

  return (
    <DashboardLayout>
      <div className="mx-auto flex max-w-7xl flex-col gap-6 py-4 md:py-6">
        <div className="glass-panel rounded-[32px] p-8 md:p-10">
          <div className="glass-pill mb-4">Statistics</div>
          <h1 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Your growth, beautifully summarized</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">Track your Japanese learning progress in a smoother, more focused workspace.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="stat-card">
            <p className="text-sm text-slate-400">Total XP</p>
            <h2 className="mt-3 text-4xl font-semibold text-white">{stats?.xp ?? 0}</h2>
          </div>
          <div className="stat-card">
            <p className="text-sm text-slate-400">Current streak</p>
            <h2 className="mt-3 text-4xl font-semibold text-white">{stats?.streak ?? 0}</h2>
          </div>
          <div className="stat-card">
            <p className="text-sm text-slate-400">Vocabulary</p>
            <h2 className="mt-3 text-4xl font-semibold text-white">{stats?.vocabulary ?? 0}</h2>
          </div>
          <div className="stat-card">
            <p className="text-sm text-slate-400">Kanji dictionary</p>
            <h2 className="mt-3 text-4xl font-semibold text-white">{stats?.kanji ?? 0}</h2>
          </div>
          <div className="stat-card">
            <p className="text-sm text-slate-400">Reviewed cards</p>
            <h2 className="mt-3 text-4xl font-semibold text-white">{stats?.reviewed ?? 0}</h2>
          </div>
          <div className="stat-card">
            <p className="text-sm text-slate-400">Due today</p>
            <h2 className="mt-3 text-4xl font-semibold text-teal-300">{stats?.due ?? 0}</h2>
          </div>
        </div>

        <div className="glass-panel rounded-[32px] p-8">
          <h2 className="text-2xl font-semibold text-white">Learning progress</h2>
          <p className="mt-3 text-slate-300">Charts and deeper analytics will appear here as your practice grows.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}