import { NextResponse } from "next/server";
import { generateAI } from "@/lib/ai/chat";

export async function POST(req: Request) {
  try {
    const {
      kanji,
      meaning,
      onyomi,
      kunyomi,
    } = await req.json();

    const prompt = `
Explain this Japanese kanji.

Kanji:
${kanji}

Meaning:
${meaning}

On Reading:
${onyomi}

Kun Reading:
${kunyomi}

Return:

# Meaning

# Memory Trick

# Common Words

# Example Sentence

# English Translation

Keep it beginner friendly.
`;

    const text = await generateAI(prompt);

    return NextResponse.json({
      explanation: text,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}