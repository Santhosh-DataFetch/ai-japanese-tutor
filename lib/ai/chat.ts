import { openrouter } from "./provider";
import { gemini } from "./gemini-provider";

const MODELS = [
    "z-ai/glm-4.5-air",
  "google/gemma-4-26b-a4b-it:free",
  "qwen/qwen3-235b-a22b",
  "deepseek/deepseek-chat-v3-0324",
  "google/gemma-3-27b-it",
  
  
];

export async function generateAI(prompt: string) {
  let lastError: unknown;

  // =====================================
  // Try Google Gemini First
  // =====================================
  try {
    console.log("🤖 Trying Gemini 2.5 Flash");

    const response = await gemini.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const text = response.text;

    if (text && text.trim().length > 0) {
      console.log("✅ Gemini Success");
      return text;
    }

    throw new Error("Gemini returned an empty response.");
  } catch (err) {
    console.error("❌ Gemini failed");
console.error(err);
    lastError = err;
  }

  // =====================================
  // Fallback to OpenRouter Models
  // =====================================
  for (const model of MODELS) {
    try {
      console.log(`🤖 Trying ${model}`);

      const completion = (await Promise.race([
        openrouter.chat.completions.create({
          model,
          stream: false,
          max_tokens: 700,
          temperature: 0.7,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),

        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("Timeout")),
            30000
          )
        ),
      ])) as Awaited<
        ReturnType<typeof openrouter.chat.completions.create>
      >;

      console.log(`✅ ${model}`);

      if ("choices" in completion) {
        return (
          completion.choices[0]?.message?.content ??
          "No response."
        );
      }

      throw new Error("Unexpected streaming response.");
    } catch (err) {
      console.error(`❌ ${model}`, err);
      lastError = err;
    }
  }

  throw lastError;
}