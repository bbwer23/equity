import OpenAI from "openai";

// Initialize the OpenAI client once per Lambda.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { niche, contentType } = await request.json();

    if (!niche || !contentType) {
      return Response.json(
        { error: "Niche and content type are required." },
        { status: 400 }
      );
    }

    // Prompt follows the requested format from the product spec.
    const prompt = `Generate a professional, ready-to-post ${contentType} for a business in the niche: ${niche}.`;

    // gpt-4o-mini returns concise, professional copy quickly.
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content?.trim();

    return Response.json({ content: content || "" });
  } catch (error) {
    return Response.json(
      { error: "Unable to generate content right now." },
      { status: 500 }
    );
  }
}
