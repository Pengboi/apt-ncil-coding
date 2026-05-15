import { NextResponse } from 'next/server';

// Server proxy for Pigeon AI chat. If OPENAI_API_KEY is set the route
// forwards the user's message to OpenAI and returns the model reply.
// If no key is configured the client will fallback to the local rule-based replies.

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message) return NextResponse.json({ error: 'No message provided' }, { status: 400 });

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OPENAI_API_KEY not configured' }, { status: 501 });
    }

    const payload = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: "You are PigeonBot — a concise, friendly product assistant for the PigeonBot website. Answer helpfully and keep replies brief." },
        { role: 'user', content: message },
      ],
      max_tokens: 250,
      temperature: 0.7,
    };

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!openaiRes.ok) {
      const text = await openaiRes.text();
      return NextResponse.json({ error: 'OpenAI error', details: text }, { status: 502 });
    }

    const data = await openaiRes.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() ?? 'Sorry — I could not generate a reply.';
    return NextResponse.json({ reply });
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message ?? err) }, { status: 500 });
  }
}
