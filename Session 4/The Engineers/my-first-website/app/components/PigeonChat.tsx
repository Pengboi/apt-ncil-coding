'use client';

import React, { useEffect, useRef, useState } from 'react';

type Message = { id: number; sender: 'user' | 'bot'; text: string };

export default function PigeonChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'bot', text: "Hi — I'm PigeonBot! Ask me anything about features, prices, or battery life." },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const idRef = useRef(2);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  function pushMessage(sender: 'user' | 'bot', text: string) {
    setMessages((prev) => [...prev, { id: idRef.current++, sender, text }]);
  }

  async function fetchBotReply(userText: string): Promise<string> {
    // Try server-side LLM proxy first (requires OPENAI_API_KEY). If that fails
    // the client will fall back to the local rule-based reply below.
    const res = await fetch('/api/pigeon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userText }),
    });

    if (!res.ok) {
      throw new Error('server-unavailable');
    }

    const data = await res.json();
    if (data?.reply) return data.reply;
    throw new Error('no-reply');
  }

  function simulateLocalReply(userText: string): Promise<string> {
    return new Promise((resolve) => {
      const normalized = userText.toLowerCase();
      let reply = "Sorry, I don't know that yet — but I'm learning! Try asking about price, battery, features, or warranty.";

      if (/\b(price|cost|how much|buy)\b/.test(normalized)) {
        reply = 'Small: $79 • Medium: $129 • Large: $199. Use the Buy buttons or contact us to purchase.';
      } else if (/\b(battery|hours|battery life)\b/.test(normalized)) {
        reply = 'Battery life varies by model — Small ~12 hrs, Medium ~24 hrs, Large ~48 hrs.';
      } else if (/\b(feature|features|what can you do)\b/.test(normalized)) {
        reply = "PigeonBot answers questions, plays games, and adapts to your preferences. Check the Features section for details.";
      } else if (/\b(warranty|support)\b/.test(normalized)) {
        reply = 'Warranty: Small 1yr, Medium 2yr, Large 3yr. Priority support available for Large.';
      } else if (/\b(hello|hi|hey)\b/.test(normalized)) {
        reply = 'Hello! 👋 How can I help you today?';
      } else if (normalized.trim() === '') {
        reply = "Type a question and press Send — I'm ready!";
      } else {
        const fallbacks = [
          "That's interesting — tell me more!",
          "I don't have that info yet, but I can help with prices, features, and battery.",
          "Good question! Try asking about 'price' or 'battery life'.",
        ];
        reply = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      }

      const delay = 600 + Math.random() * 800;
      setTimeout(() => resolve(reply), delay);
    });
  }

  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;
    pushMessage('user', text);
    setInput('');
    setIsTyping(true);

    try {
      const botText = await fetchBotReply(text);
      setIsTyping(false);
      pushMessage('bot', botText);
    } catch (err) {
      // server unavailable or not configured — use local replies
      const botText = await simulateLocalReply(text);
      setIsTyping(false);
      pushMessage('bot', botText);
    }
  }

  return (
    <div className="card p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="avatar bg-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">PB</div>
        <div>
          <div className="font-semibold">Pigeon AI</div>
          <div className="text-sm text-muted">Ask anything — instant answers</div>
        </div>
      </div>

      <div ref={containerRef} className="border rounded-lg p-4 h-64 overflow-auto bg-white/5 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] ${m.sender === 'user' ? 'bg-pink-500 text-white' : 'bg-gray-800 text-muted'} rounded-xl px-4 py-2`}>
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-800 text-muted rounded-xl px-4 py-2">
              <span className="animate-pulse">PigeonBot is typing…</span>
            </div>
          </div>
        )}
      </div>

      <form className="mt-4 flex gap-3" onSubmit={handleSend}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask PigeonBot a question..." className="form-input flex-1" />
        <button type="submit" className="btn btn-primary">Send</button>
      </form>

      <div className="mt-3 text-sm text-muted">Tip: ask anything — the bot will reply to any question. (Enable full AI replies by setting <code>OPENAI_API_KEY</code> in your environment.)</div>
    </div>
  );
}
