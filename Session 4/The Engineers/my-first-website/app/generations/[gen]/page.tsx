import PokemonFamilyCard from "../components/PokemonFamilyCard";
import Link from "next/link";

type PokemonForm = {
  id: string;
  name: string;
  img: string;
};

type PokemonFamily = {
  baseName: string;
  forms: PokemonForm[];
  defaultFormId: string;
};

function getBaseName(name: string): string {
  const baseForms = ['galar', 'alola', 'hisui', 'paldea', 'base', 'standard', 'incarnate', 'therian', 'ordinary', 'aria', 'male', 'female'];
  const parts = name.split('-');
  
  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i];
    if (baseForms.includes(part) && i > 0) {
      return parts.slice(0, i).join('-');
    }
  }
  
  const megaMatch = name.match(/^(.+)-mega$/);
  if (megaMatch) return megaMatch[1];
  
  const gmaxMatch = name.match(/^(.+)-gmax$/);
  if (gmaxMatch) return gmaxMatch[1];
  
  const primalMatch = name.match(/^(.+)-primal$/);
  if (primalMatch) return primalMatch[1];
  
  return name;
}

type Props = { params: { gen: string } };

export default async function GenPage({ params }: Props) {
  const { gen } = params;
  const res = await fetch(`https://pokeapi.co/api/v2/generation/${gen}`, { next: { revalidate: 60 * 60 } });
  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Generation not found.</div>
      </div>
    );
  }

  const data = await res.json();
  const species = data.pokemon_species || [];

  const items = species.map((s: any) => {
    const parts = s.url.split("/").filter(Boolean);
    const id = parts[parts.length - 1];
    const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    return { id, name: s.name, img, baseName: getBaseName(s.name) };
  }).sort((a: any, b: any) => Number(a.id) - Number(b.id));

  const familyMap = new Map<string, PokemonFamily>();
  
  for (const item of items) {
    const existing = familyMap.get(item.baseName);
    if (existing) {
      existing.forms.push(item);
      if (Number(item.id) < Number(existing.defaultFormId)) {
        existing.defaultFormId = item.id;
      }
    } else {
      familyMap.set(item.baseName, {
        baseName: item.baseName,
        forms: [item],
        defaultFormId: item.id
      });
    }
  }

  const families = Array.from(familyMap.values()).sort((a, b) => Number(a.defaultFormId) - Number(b.defaultFormId));

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold capitalize">Generation: {gen.replace('-', ' ')}</h1>
          <nav className="flex items-center gap-4">
            <Link href="/generations" className="text-sm text-sky-700">Back to Generations</Link>
            <Link href="/" className="text-sm text-sky-700">Home</Link>
          </nav>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {families.map((family) => (
            <PokemonFamilyCard 
              key={family.baseName} 
              baseName={family.baseName} 
              forms={family.forms} 
              defaultFormId={family.defaultFormId}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
