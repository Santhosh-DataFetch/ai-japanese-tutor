import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { getSettings } from "@/app/actions/settings";
import SettingsContent from "@/components/settings/settings-content";

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <DashboardLayout>
      <SettingsContent settings={settings} />
    </DashboardLayout>
  );
}
