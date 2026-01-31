'use client';

import { Team } from '../data/teams';

interface TeamListProps {
  teams: Team[];
  onSelectTeam: (name: string) => void;
}

export default function TeamList({ teams, onSelectTeam }: TeamListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {teams.map((team) => (
        <button
          key={team.id}
          onClick={() => onSelectTeam(team.name)}
          className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer text-left"
        >
          <div className="flex items-center gap-4">
            <div className="text-5xl">{team.logo}</div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {team.name}
              </h2>
              <p className="text-gray-600">Founded: {team.founded}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
