import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { getStatistics } from "@/app/actions/statistics";
import StatisticsContent from "@/components/statistics/statistics-content";

export default async function StatisticsPage() {
  const stats = await getStatistics();

  return (
    <DashboardLayout>
      <StatisticsContent stats={stats} />
    </DashboardLayout>
  );
}
