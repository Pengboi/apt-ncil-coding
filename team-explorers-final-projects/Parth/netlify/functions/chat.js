const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = 'gemma-4-26b-a4b-it';

exports.handler = async function(event) {
  try {
    const { message } = JSON.parse(event.body);
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: 'Answer directly and concisely. Do not show your reasoning or thought process. Just give the final answer.' }] },
        contents: [{ parts: [{ text: message }] }]
      })
    });

    if (!res.ok) {
      const err = await res.json();
      return {
        statusCode: res.status,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: err.error?.message || 'Gemini API error' })
      };
    }

    const data = await res.json();
    const candidates = data.candidates || [];
    const parts = candidates[0]?.content?.parts || [];
    const textPart = parts.find(p => p.text && !p.thought);
    const reply = textPart?.text || '';

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply })
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: e.message })
    };
  }
};
