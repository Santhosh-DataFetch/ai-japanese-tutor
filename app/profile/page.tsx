import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { getProfile } from "@/app/actions/profile";

export default async function ProfilePage() {
  const profile = await getProfile();

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-8 p-8">

        <div>
          <h1 className="text-5xl font-bold">
            My Profile 👤
          </h1>

          <p className="mt-2 text-muted-foreground">
            Your learning profile.
          </p>
        </div>

        <div className="premium-card">

          <div className="space-y-6">

            <div>
              <p className="text-muted-foreground">
                Display Name
              </p>

              <h2 className="text-2xl font-bold">
                {profile?.display_name ?? "Not set"}
              </h2>
            </div>

            <div>
              <p className="text-muted-foreground">
                Email
              </p>

              <h2 className="text-xl">
                {profile?.email ?? "Unknown"}
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">

              <div className="rounded-xl bg-muted/30 p-6">
                <p className="text-muted-foreground">
                  Total XP
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {profile?.total_xp ?? 0}
                </h2>
              </div>

              <div className="rounded-xl bg-muted/30 p-6">
                <p className="text-muted-foreground">
                  Current Streak
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {profile?.streak_count ?? 0}
                </h2>
              </div>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}