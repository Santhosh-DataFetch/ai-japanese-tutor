import { DashboardLayout } from "@/components/layout/dashboard-layout";
import VocabularyList from "@/components/vocabulary/vocabulary-list";

import { getVocabulary } from "@/app/actions/vocabulary";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

export default async function VocabularyPage() {
  const words = await getVocabulary();

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-6 p-8">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-5xl font-bold">
              Vocabulary 📚
            </h1>

            <p className="mt-2 text-muted-foreground">
              {words.length} words in your library
            </p>
          </div>

          <Link href="/vocabulary/add">
            <Button>
              + Add Vocabulary
            </Button>
          </Link>

        </div>

        

        <VocabularyList words={words} />

      </div>
    </DashboardLayout>
  );
}
