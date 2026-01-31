'use client';

import { PREMIER_LEAGUE_TEAMS } from '../data/teams';

interface TeamDetailProps {
  teamName: string;
  onBack: () => void;
}

export default function TeamDetail({ teamName, onBack }: TeamDetailProps) {
  const team = PREMIER_LEAGUE_TEAMS.find(
    (t) => t.name.toLowerCase() === teamName.toLowerCase()
  );

  if (!team) {
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600">Team not found</h2>
        <button
          onClick={onBack}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Teams
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
      <button
        onClick={onBack}
        className="ml-4 mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        ← Back to Teams
      </button>

      <div className={`bg-gradient-to-r ${team.color} p-8 text-white`}>
        <div className="flex items-center gap-6 mb-6">
          <div className="text-8xl">{team.logo}</div>
          <div>
            <h1 className="text-5xl font-bold">{team.name}</h1>
            <p className="text-xl mt-2">Founded: {team.founded}</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">History & Facts</h2>
        <ul className="space-y-3">
          {team.facts.map((fact, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-lg text-gray-700"
            >
              <span className="text-2xl text-blue-600 font-bold flex-shrink-0">•</span>
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
