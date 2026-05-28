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

    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply })
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
};
