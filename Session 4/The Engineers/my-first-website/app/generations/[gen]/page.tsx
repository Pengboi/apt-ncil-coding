import PokemonCard from "../../PokemonCard";
import Link from "next/link";

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
    return { id, name: s.name, img };
  }).sort((a: any, b: any) => Number(a.id) - Number(b.id));

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
          {items.map((it: any) => (
            <PokemonCard key={it.id} id={it.id} name={it.name} img={it.img} />
          ))}
        </div>
      </main>
    </div>
  );
}
