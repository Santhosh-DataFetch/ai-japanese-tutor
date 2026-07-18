import { NextResponse } from "next/server";
import { generateAI } from "@/lib/ai/chat";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const latestMessage =
      messages?.[messages.length - 1]?.content ??
      messages?.[messages.length - 1]?.parts
        ?.map((p: any) => p.text)
        .join("") ??
      "";

    const prompt =  `
Formatting Rules:

- Never use Markdown tables.
- Never use |, ---, or table formatting.
- Do not use ** for bold.
- Keep responses clean and easy to read.
- Use big and bold headings and bullet points.
- Put a blank line between sections.
- For Japanese lessons, always use this format:

📖 Kanji: 本

Meaning:
Book

Reading:
On'yomi: ホン
Kun'yomi: もと

Example:
日本 (Nihon)

Meaning:
Japan

------------------------

📖 Kanji: 車

Meaning:
Car

Reading:
On'yomi: シャ
Kun'yomi: くるま

Example:
電車 (Densha)

Meaning:
Train

Continue this layout for every kanji.

Avoid markdown syntax like **, ###, |, or --- unless explicitly requested.
User:
${latestMessage}
`;

    const text = await generateAI(prompt);

    return NextResponse.json({
      message: text,
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