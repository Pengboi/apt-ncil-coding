'use client';

import { useState, useEffect } from 'react';

interface PokemonStats {
  stat: { name: string };
  base_stat: number;
}

interface PokemonType {
  type: { name: string };
}

interface PokemonDetailData {
  id: number;
  name: string;
  height: number;
  weight: number;
  stats: PokemonStats[];
  types: PokemonType[];
  abilities: { ability: { name: string } }[];
  sprites: { other: { 'official-artwork': { front_default: string } } };
}

interface PokemonDetailProps {
  pokemonName: string;
  onBack: () => void;
}

export default function PokemonDetail({ pokemonName, onBack }: PokemonDetailProps) {
  const [pokemon, setPokemon] = useState<PokemonDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        const data = await response.json();
        setPokemon(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon detail:', error);
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [pokemonName]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Loading...</h2>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600">Pokemon not found</h2>
        <button
          onClick={onBack}
          className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Back to List
        </button>
      </div>
    );
  }

  const typeColors: { [key: string]: string } = {
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-500',
    ice: 'bg-cyan-400',
    fighting: 'bg-orange-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-700',
    flying: 'bg-blue-300',
    psychic: 'bg-pink-500',
    bug: 'bg-green-600',
    rock: 'bg-gray-500',
    ghost: 'bg-purple-700',
    dragon: 'bg-blue-700',
    dark: 'bg-gray-700',
    steel: 'bg-gray-400',
    fairy: 'bg-pink-300',
    normal: 'bg-gray-400',
  };

  return (
    <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
      <button
        onClick={onBack}
        className="ml-4 mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
      >
        ← Back to List
      </button>

      <div className="p-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Image Section */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              className="w-64 h-64 object-contain"
            />
            <h1 className="text-4xl font-bold text-gray-800 capitalize mt-4">
              {pokemon.name}
            </h1>
            <p className="text-gray-600 text-lg">
              #{pokemon.id.toString().padStart(3, '0')}
            </p>
          </div>

          {/* Details Section */}
          <div className="flex-1">
            {/* Types */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Types</h2>
              <div className="flex gap-2 flex-wrap">
                {pokemon.types.map((type, index) => (
                  <span
                    key={index}
                    className={`${
                      typeColors[type.type.name] || 'bg-gray-400'
                    } text-white px-4 py-2 rounded-full font-semibold capitalize`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Facts */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Facts</h2>
              <ul className="space-y-2">
                <li className="text-lg text-gray-700">
                  <span className="font-semibold">Height:</span> {(pokemon.height / 10).toFixed(1)} m
                </li>
                <li className="text-lg text-gray-700">
                  <span className="font-semibold">Weight:</span> {(pokemon.weight / 10).toFixed(1)} kg
                </li>
                <li className="text-lg text-gray-700">
                  <span className="font-semibold">Abilities:</span>{' '}
                  {pokemon.abilities
                    .map((a) => a.ability.name)
                    .join(', ')
                    .replace(/-/g, ' ')}
                </li>
              </ul>
            </div>

            {/* Stats */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Stats</h2>
              <div className="space-y-3">
                {pokemon.stats.map((stat, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-gray-700 capitalize">
                        {stat.stat.name.replace('-', ' ')}
                      </span>
                      <span className="text-gray-600">{stat.base_stat}</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all"
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
