import { DashboardLayout } from "@/components/layout/dashboard-layout";
import DashboardClient from "@/components/dashboard/dashboard-client";
import { getDashboardStats } from "@/app/actions/dashboard";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <DashboardLayout>
      <DashboardClient
        stats={{
          streak: stats?.streak ?? 0,
          xp: stats?.xp ?? 0,
          vocabulary: stats?.vocabulary ?? 0,
          kanji: stats?.kanji ?? 0,
          due: stats?.due ?? 0,
        }}
      />
    </DashboardLayout>
  );
}
