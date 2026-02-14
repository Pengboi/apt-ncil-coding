'use client';

import React, { useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import greyPigeon from '../images/grey-pigeon.png';
import pinkPigeon from '../images/pink-pigeon.jpeg';
import sunburstPigeon from '../images/sunburst-pigeon.jpg';
import bluePigeon from '../images/blue-pigeon.jpg.webp';
import blackPigeon from '../images/black-pigeon.jpg.webp';
import crimsonRed from '../images/crimson-red.webp';
import purplePigeon from '../images/purple-pigeon.webp';
import rainbowPigeon from '../images/rainbow-pigeon.jpg.avif';
import tealPigeon from '../images/teal-life-pigeons-secret-mechanisms-exposed_1274913-36027.jpg.avif';
import specialCustom from '../images/specialcustom.jpeg';

type Pigeon = { id: string; name: string; src: string | StaticImageData; desc: string; price?: string };

const PIGEONS: Pigeon[] = [
  { id: 'classic', name: 'Classic Grey', src: greyPigeon, desc: 'Friendly, dependable companion', price: '$79' },
  { id: 'sunburst', name: 'Sunburst', src: sunburstPigeon, desc: 'Bright and cheerful — stands out on any desk', price: '$129' },
  { id: 'midnight', name: 'Midnight (Blue)', src: bluePigeon, desc: 'Sleek blue collector edition (saved as Midnight)', price: '$199' },
  { id: 'pink', name: 'Pink Blossom', src: pinkPigeon, desc: 'Soft pink finish — adorable and playful', price: '$89' },
  { id: 'rainbow', name: 'Rainbow', src: rainbowPigeon, desc: 'Vibrant multi-color finish', price: '$149' },
  { id: 'custom', name: 'Special Custom', src: specialCustom, desc: 'One‑of‑a‑kind custom paint — showpiece edition', price: '$179' },
  { id: 'teal', name: 'Teal', src: tealPigeon, desc: 'Calm teal sheen — stylish and modern', price: '$129' },
  { id: 'purple', name: 'Royal Purple', src: purplePigeon, desc: 'Rich purple finish — elegant and playful', price: '$119' },
  { id: 'red', name: 'Crimson Red', src: crimsonRed, desc: 'Bold red finish — eye-catching and energetic', price: '$99' },
  { id: 'black', name: 'Midnight Black', src: blackPigeon, desc: 'Glossy black collector model (midnight black image)', price: '$199' },
];

export default function PigeonGallery() {
  const [selected, setSelected] = useState<Pigeon>(PIGEONS[0]);
  const [suggest, setSuggest] = useState('');
  const [suggested, setSuggested] = useState<string | null>(null);

  function handleSuggest(e: React.FormEvent) {
    e.preventDefault();
    const s = suggest.trim();
    if (!s) return;
    setSuggested(s);
    setSuggest('');
    // future: POST suggestion to an API or prefill contact form
  }

  return (
    <div className="card p-6">
      <div className="section-header flex items-center justify-between mb-6">
        <div>
          <div className="text-xl font-semibold">Selected</div>
          <div className="text-lg font-bold">{selected.name}</div>
          <div className="text-sm text-muted">{selected.desc}</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-extrabold">{selected.price}</div>
          <a href="#contact" className="btn btn-primary mt-3 inline-block">Buy</a>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {PIGEONS.map((p) => (
          <button key={p.id} onClick={() => setSelected(p)} className={`group card p-3 text-center transition-shadow ${p.id === selected.id ? 'ring-2 ring-pink-300' : 'hover:shadow-lg'}`}>
            <div className="relative w-full h-32 flex items-center justify-center">
              <Image src={p.src} alt={p.name} width={140} height={140} className="object-contain" />
            </div>
            <div className="mt-3 font-semibold">{p.name}</div>
            <div className="text-sm text-muted mt-1">{p.price}</div>
          </button>
        ))}
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="text-sm text-muted mb-2">Want another color? Suggest one and we'll add it to the lineup.</div>
        <form onSubmit={handleSuggest} className="flex gap-2">
          <input value={suggest} onChange={(e) => setSuggest(e.target.value)} placeholder="e.g. Pink, Rainbow, Teal, Black, Purple, Red" className="form-input flex-1" />
          <button type="submit" className="btn btn-outline">Suggest</button>
        </form>
        {suggested && <div className="mt-3 text-sm text-success">Thanks — we'll consider adding “{suggested}”.</div>}
      </div>
    </div>
  );
}
