"use client";
import Link from "next/link";
import { useState } from "react";
import CardGallery from "../CardGallery";

type PokemonForm = {
  id: string;
  name: string;
  img: string;
};

export default function PokemonFamilyCard({ 
  baseName, 
  forms,
  defaultFormId 
}: { 
  baseName: string; 
  forms: PokemonForm[];
  defaultFormId: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedForm, setSelectedForm] = useState<PokemonForm>(forms[0]);
  const [showGallery, setShowGallery] = useState(false);

  const toggle = async () => {
    if (open) {
      setOpen(false);
      return;
    }

    // If we already have stats for the selected form, just open
    if (selectedForm.stats) {
      setOpen(true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedForm.id}`);
      if (!res.ok) throw new Error('fetch failed');
      const data = await res.json();
      
      // Update the selected form with stats
      const updatedForm = { ...selectedForm, stats: data.stats || [] };
      setSelectedForm(updatedForm);
      
      // Update the form in the forms array
      const formIndex = forms.findIndex(f => f.id === selectedForm.id);
      if (formIndex !== -1) {
        forms[formIndex] = updatedForm;
      }
      
      setOpen(true);
    } catch (e) {
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const selectForm = async (form: PokemonForm) => {
    setSelectedForm(form);
    
    // If stats panel is open and we don't have stats for this form, fetch them
    if (open && !form.stats) {
      setLoading(true);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${form.id}`);
        if (!res.ok) throw new Error('fetch failed');
        const data = await res.json();
        
        const updatedForm = { ...form, stats: data.stats || [] };
        setSelectedForm(updatedForm);
        
        const formIndex = forms.findIndex(f => f.id === form.id);
        if (formIndex !== -1) {
          forms[formIndex] = updatedForm;
        }
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    }
  };

  const currentStats = selectedForm.stats;

  const playCry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const pokemonId = selectedForm.id;
    
    // Try multiple sources for the cry
    const sources = [
      `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/${pokemonId}.ogg`,
      `https://pokemoncries.com/cries/${pokemonId}.mp3`,
      `https://veekun.com/dex/media/pokemon/cries/${pokemonId}.wav`,
    ];
    
    let audio = new Audio();
    let currentSource = 0;
    
    const tryPlay = () => {
      if (currentSource >= sources.length) {
        return;
      }
      audio.src = sources[currentSource];
      audio.volume = 0.4;
      audio.play().catch(() => {
        currentSource++;
        tryPlay();
      });
    };
    
    tryPlay();
  };

  return (
    <div className="relative">
      {/* Main Card */}
      <div className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl border border-slate-100 hover:border-slate-200 transition-all duration-300 ease-out flex flex-col items-center text-center">
        {/* Pokemon Image */}
        <Link href={`/pokemon/${defaultFormId}`} className="relative w-24 h-24 mb-3 block">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <img 
            src={selectedForm.img} 
            alt={selectedForm.name} 
            className="w-24 h-24 object-contain grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110 relative z-10 cursor-pointer" 
            loading="lazy"
            onClick={playCry}
          />
        </Link>

        {/* Pokemon Name */}
        <button 
          onClick={(e) => { e.stopPropagation(); toggle(); }} 
          className="capitalize font-semibold text-slate-700 group-hover:text-slate-900 transition-colors"
        >
          {baseName}
        </button>

        {/* Form ID */}
        <div className="text-xs font-medium text-slate-400 mt-1">#{selectedForm.id}</div>

        {/* Form Selector (only show if multiple forms) */}
        {forms.length > 1 && (
          <div className="mt-3 w-full">
            <div className="text-xs text-slate-500 mb-2">Forms:</div>
            <div className="flex flex-wrap justify-center gap-1">
              {forms.map((form) => (
                <button
                  key={form.id}
                  onClick={() => selectForm(form)}
                  className={`px-2 py-1 text-xs rounded-full transition-colors ${
                    selectedForm.id === form.id
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  title={form.name}
                >
                  {form.name.replace(baseName + '-', '').replace(baseName, 'Base')}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Button */}
        <button
          onClick={() => setShowGallery(true)}
          className="mt-2 text-xs text-slate-400 hover:text-slate-600 transition-colors"
        >
          View Cards
        </button>
      </div>

      {/* Stats Panel */}
      {open && (
        <div className="mt-3 w-full bg-gradient-to-br from-slate-50 to-white p-3 rounded-xl text-sm text-slate-700 border border-slate-100 shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold capitalize text-slate-800">{selectedForm.name}</span>
            {forms.length > 1 && (
              <span className="text-xs text-slate-400">{forms.findIndex(f => f.id === selectedForm.id) + 1} of {forms.length}</span>
            )}
          </div>
          
          {loading ? (
            <div className="text-center py-2">
              <div className="inline-block w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
            </div>
          ) : currentStats && currentStats.length > 0 ? (
            <div className="space-y-2">
              {currentStats.map((s: any) => {
                const label = s.stat.name.replace('-', ' ');
                const value = s.base_stat;
                const max = 255;
                const pct = Math.min(100, Math.round((value / max) * 100));
                return (
                  <div key={s.stat.name}>
                    <div className="flex items-center justify-between">
                      <div className="capitalize text-xs text-slate-700">{label}</div>
                      <div className="text-xs font-semibold text-slate-800">{value}</div>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded mt-0.5">
                      <div 
                        className="h-1.5 bg-emerald-500 rounded transition-all duration-300" 
                        style={{ width: `${pct}%` }} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-xs text-slate-500">No stats available.</div>
          )}
          
          {/* Link to detail page */}
          <Link 
            href={`/pokemon/${selectedForm.id}`}
            className="mt-3 block text-center text-xs text-sky-600 hover:text-sky-700 transition-colors"
          >
            View Full Details →
          </Link>
        </div>
      )}

      {showGallery && <CardGallery name={selectedForm.name} onClose={() => setShowGallery(false)} />}
    </div>
  );
}
