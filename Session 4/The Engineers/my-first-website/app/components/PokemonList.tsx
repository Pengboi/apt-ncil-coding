'use client';

interface Pokemon {
  id: number;
  name: string;
  url: string;
}

interface PokemonListProps {
  pokemon: Pokemon[];
  onSelectPokemon: (name: string) => void;
}

export default function PokemonList({ pokemon, onSelectPokemon }: PokemonListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {pokemon.map((poke) => (
        <button
          key={poke.id}
          onClick={() => onSelectPokemon(poke.name)}
          className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer text-left"
        >
          <div className="flex items-center gap-4">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`}
              alt={poke.name}
              className="w-20 h-20 object-contain"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-800 capitalize">
                {poke.name}
              </h2>
              <p className="text-gray-600">#{poke.id.toString().padStart(3, '0')}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
