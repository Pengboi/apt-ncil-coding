"use client";
import { useEffect, useState } from "react";

type Stat = { base_stat: number; stat: { name: string } };

export default function SpeakClient({ entry, stats, name, id }: { entry: string; stats: Stat[]; name: string; id: number }) {
  const [speaking, setSpeaking] = useState(false);

  const buildText = () => {
    const statText = (stats || []).map((s) => `${s.stat.name.replace('-', ' ')} ${s.base_stat}`).join(', ');
    const first = entry ? `${entry}. ` : '';
    return `${name}, number ${id}. ${first}Base stats: ${statText}.`;
  };

  const speak = (auto = false) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;
    if (!synth) return;
    const utter = new SpeechSynthesisUtterance(buildText());
    utter.lang = 'en-US';
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    synth.cancel();
    synth.speak(utter);
  };

  useEffect(() => {
    // attempt autoplay once after mount (usually allowed because user clicked link)
    const t = setTimeout(() => {
      try { speak(true); } catch {};
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => speak(false)} className="px-3 py-1 bg-sky-600 text-white rounded hover:bg-sky-700">
        {speaking ? 'Speaking...' : 'Speak Pokédex Entry & Stats'}
      </button>
      <button onClick={() => { if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel(); setSpeaking(false); }} className="px-2 py-1 bg-slate-200 rounded">
        Stop
      </button>
    </div>
  );
}
