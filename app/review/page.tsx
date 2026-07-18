import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { getDueVocabulary } from "@/app/actions/vocabulary";
import ReviewSession from "@/components/review/review-session";

export default async function ReviewPage() {
  const words = await getDueVocabulary();

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl p-8">
        <ReviewSession words={words} />
      </div>
    </DashboardLayout>
  );
}