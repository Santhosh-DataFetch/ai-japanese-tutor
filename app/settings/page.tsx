import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { getSettings } from "@/app/actions/settings";
import SettingsForm from "./settings-form";

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl p-8">
        <h1 className="text-5xl font-bold">
          Settings ⚙️
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your preferences.
        </p>

        <SettingsForm settings={settings} />
      </div>
    </DashboardLayout>
  );
}