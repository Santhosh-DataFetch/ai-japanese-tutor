import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { getStatistics } from "@/app/actions/statistics";

export default async function StatisticsPage() {
  const stats = await getStatistics();

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8 p-8">
        <div>
          <h1 className="text-5xl font-bold">
            Statistics 📊
          </h1>

          <p className="mt-2 text-muted-foreground">
            Track your Japanese learning progress.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          <div className="premium-card">
            <p className="text-muted-foreground">
              Total XP
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              {stats?.xp ?? 0}
            </h2>
          </div>

          <div className="premium-card">
            <p className="text-muted-foreground">
              Current Streak
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              {stats?.streak ?? 0}
            </h2>
          </div>

          <div className="premium-card">
            <p className="text-muted-foreground">
              Vocabulary
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              {stats?.vocabulary ?? 0}
            </h2>
          </div>

          <div className="premium-card">
            <p className="text-muted-foreground">
              Kanji Dictionary
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              {stats?.kanji ?? 0}
            </h2>
          </div>

          <div className="premium-card">
            <p className="text-muted-foreground">
              Reviewed Cards
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              {stats?.reviewed ?? 0}
            </h2>
          </div>

          <div className="premium-card">
            <p className="text-muted-foreground">
              Due Today
            </p>

            <h2 className="mt-3 text-4xl font-bold text-accent">
              {stats?.due ?? 0}
            </h2>
          </div>

        </div>

        <div className="premium-card">
          <h2 className="text-2xl font-semibold">
            Learning Progress
          </h2>

          <p className="mt-3 text-muted-foreground">
            Charts and detailed analytics will be displayed here.
          </p>
        </div>

      </div>
    </DashboardLayout>
  );
}