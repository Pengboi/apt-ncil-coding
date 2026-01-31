import Link from "next/link";
import SpeakClient from "../SpeakClient";
import ImageSpeak from "../ImageSpeak";

type Params = {
  params: { id: string };
};

export default async function PokemonPage({ params }: Params) {
  const { id } = params;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { next: { revalidate: 60 * 60 } });
  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Pokémon not found.</div>
      </div>
    );
  }

  const data = await res.json();

  // fetch species to get flavor text (pokedex entry)
  const spRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`, { next: { revalidate: 60 * 60 } });
  const species = spRes.ok ? await spRes.json() : null;
  const flavor = species?.flavor_text_entries?.find((e: any) => e.language.name === 'en')?.flavor_text?.replace(/\n|\f/g, ' ') || '';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sky-100">
      <main className="max-w-3xl mx-auto p-6">
        <Link href="/" className="text-sm text-sky-700 mb-4 inline-block">← Back</Link>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-6">
            <ImageSpeak src={data.sprites.other['official-artwork'].front_default || data.sprites.front_default} alt={data.name} stats={data.stats} abilities={data.abilities} name={data.name} id={data.id} />

            <div>
              <h2 className="text-2xl font-bold capitalize">{data.name} <span className="text-slate-500">#{data.id}</span></h2>

              <div className="mt-2">
                <strong>Types:</strong>
                <div className="flex gap-2 mt-1">
                  {data.types.map((t: any) => (
                    <span key={t.slot} className="px-2 py-1 bg-slate-100 rounded text-sm capitalize">{t.type.name}</span>
                  ))}
                </div>
              </div>

              <div className="mt-3 text-sm text-slate-700">
                <div><strong>Height:</strong> {data.height}</div>
                <div><strong>Weight:</strong> {data.weight}</div>
              </div>

              <div className="mt-3">
                <strong>Abilities:</strong>
                <ul className="list-disc pl-5 mt-1 text-sm">
                  {data.abilities.map((a: any) => (
                    <li key={a.slot} className="capitalize">{a.ability.name}{a.is_hidden ? ' (hidden)' : ''}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold">Pokédex Entry</h3>
            <p className="mt-2 text-sm text-slate-700">{flavor || 'No Pokédex entry available.'}</p>

            <h3 className="font-semibold mt-4">Base Stats</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
              {data.stats.map((s: any) => (
                <div key={s.stat.name} className="text-sm bg-slate-50 p-2 rounded">
                  <div className="capitalize text-slate-700">{s.stat.name.replace('-', ' ')}</div>
                  <div className="text-lg font-medium text-slate-900">{s.base_stat}</div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              {/* Client-side speech component: will speak the flavor text and base stats */}
              <SpeakClient entry={flavor} stats={data.stats} name={data.name} id={data.id} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
