import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { getSettings } from "@/app/actions/settings";
import SettingsForm from "./settings-form";

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <DashboardLayout>
      <div className="mx-auto flex max-w-5xl flex-col gap-6 py-4 md:py-6">
        <div className="glass-panel rounded-[32px] p-8 md:p-10">
          <div className="glass-pill mb-4">Preferences</div>
          <h1 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Settings</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">Adjust the tools around your practice without disrupting the experience.</p>
        </div>

        <SettingsForm settings={settings} />
      </div>
    </DashboardLayout>
  );
}