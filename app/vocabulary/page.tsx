import { DashboardLayout } from "@/components/layout/dashboard-layout";
import VocabularyList from "@/components/vocabulary/vocabulary-list";
import { getVocabulary } from "@/app/actions/vocabulary";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Plus } from "lucide-react";

export default async function VocabularyPage() {
  const words = await getVocabulary();

  return (
    <DashboardLayout>
      <div className="mx-auto flex max-w-7xl flex-col gap-6 py-4 md:py-6">
        <div className="glass-panel rounded-[32px] p-8 md:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="glass-pill mb-4">Vocabulary studio</div>
              <h1 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Your vocabulary, refined.</h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-300">{words.length} words are in your library, ready to be reviewed with calm, focused clarity.</p>
            </div>
            <div className="glass-sm rounded-[24px] p-4 text-sm text-slate-300">
              <div className="flex items-center gap-2 text-white">
                <Sparkles className="h-4 w-4 text-teal-300" />
                <span className="font-medium">Add new cards</span>
              </div>
              <Link href="/vocabulary/add" className="mt-4 inline-flex w-full">
                <Button className="w-full justify-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Vocabulary
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <VocabularyList words={words} />
      </div>
    </DashboardLayout>
  );
}