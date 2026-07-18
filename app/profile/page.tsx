import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { getProfile } from "@/app/actions/profile";
import ProfileContent from "@/components/profile/profile-content";

export default async function ProfilePage() {
  const profile = await getProfile()

  return (
    <DashboardLayout>
      <ProfileContent profile={profile} />
    </DashboardLayout>
  );
}
