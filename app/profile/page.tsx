import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { getProfile } from "@/app/actions/profile";

export default async function ProfilePage() {
  const profile = await getProfile();

  return (
    <DashboardLayout>
      <div className="mx-auto flex max-w-5xl flex-col gap-6 py-4 md:py-6">
        <div className="glass-panel rounded-[32px] p-8 md:p-10">
          <div className="glass-pill mb-4">Profile</div>
          <h1 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Your learning profile</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">A calm overview of who you are in the system and how your study journey is progressing.</p>
        </div>

        <div className="glass-panel rounded-[32px] p-8">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Display name</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{profile?.display_name ?? 'Not set'}</h2>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Email</p>
              <h2 className="mt-2 text-xl text-slate-200">{profile?.email ?? 'Unknown'}</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-white/8 p-6">
                <p className="text-sm text-slate-400">Total XP</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">{profile?.total_xp ?? 0}</h2>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/8 p-6">
                <p className="text-sm text-slate-400">Current streak</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">{profile?.streak_count ?? 0}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}