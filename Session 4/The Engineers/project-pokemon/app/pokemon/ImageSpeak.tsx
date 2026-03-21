"use client";
import React from "react";

type Stat = { base_stat: number; stat: { name: string } };

export default function ImageSpeak({ src, alt, stats, abilities, name, id }: { src: string; alt: string; stats: Stat[]; abilities?: any[]; name: string; id: number }) {
  const speakTotal = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const total = (stats || []).reduce((s, it) => s + (it?.base_stat || 0), 0);
    const statText = (stats || []).map((s) => `${s.stat.name.replace('-', ' ')} ${s.base_stat}`).join(', ');
    const abilitiesText = (abilities || []).map((a) => `${a.ability?.name || a.name}${a.is_hidden ? ' (hidden)' : ''}`).join(', ');
    const parts = [`The base stat total for ${name} is ${total}.`];
    if (statText) parts.push(`Base stats: ${statText}.`);
    if (abilitiesText) parts.push(`Abilities: ${abilitiesText}.`);
    const text = parts.join(' ');
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <img
      src={src}
      alt={alt}
      className="w-48 h-48 object-contain cursor-pointer"
      onClick={speakTotal}
      title="Click image to speak base stat total"
    />
  );
}
