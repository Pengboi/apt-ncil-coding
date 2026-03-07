'use client';

import { SkillNode } from '../types';

interface SkillTreeProps {
  nodes: SkillNode[];
  unlockedSkills: string[];
  availablePoints: number;
  onUnlock: (nodeId: string) => void;
}

export function SkillTree({ nodes, unlockedSkills, availablePoints, onUnlock }: SkillTreeProps) {
  const branches = [
    { name: 'Vigor', color: 'red', nodes: nodes.filter(n => n.position.y === 0 || n.id.includes('vigor')) },
    { name: 'Might', color: 'orange', nodes: nodes.filter(n => n.position.y === 1 || n.id.includes('might')) },
    { name: 'Arcane', color: 'purple', nodes: nodes.filter(n => n.position.y === 2 || n.id.includes('arcane')) },
    { name: 'Agility', color: 'cyan', nodes: nodes.filter(n => n.position.y === 3 || n.id.includes('agility')) },
  ];

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Skill Tree</h3>
        <div className="px-4 py-2 bg-amber-500/20 rounded-lg border border-amber-500/30">
          <span className="text-amber-400 font-bold">{availablePoints}</span>
          <span className="text-amber-400/70 text-sm ml-1">Skill Points</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {branches.map(branch => (
          <div key={branch.name} className="bg-gray-900 rounded-lg p-4">
            <h4 className={`text-lg font-bold text-${branch.color}-400 mb-3`}>{branch.name}</h4>
            <div className="space-y-2">
              {branch.nodes.map(node => {
                const isUnlocked = unlockedSkills.includes(node.id);
                const canUnlock = availablePoints > 0 && (!node.requires || node.requires.every(r => unlockedSkills.includes(r)));
                const isMaxed = node.currentLevel >= node.maxLevel;

                return (
                  <div
                    key={node.id}
                    className={`p-3 rounded-lg border transition-all ${
                      isUnlocked
                        ? `bg-${branch.color}-500/10 border-${branch.color}-500/30`
                        : canUnlock
                        ? 'bg-gray-800 border-gray-600 hover:border-gray-500 cursor-pointer'
                        : 'bg-gray-800/50 border-gray-700 opacity-50'
                    }`}
                    onClick={() => canUnlock && !isMaxed && onUnlock(node.id)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{node.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-white">{node.name}</span>
                          <span className="text-xs text-gray-500">
                            {node.currentLevel}/{node.maxLevel}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">{node.description}</p>
                        
                        {node.effects.map((effect, idx) => (
                          <div key={idx} className="text-xs text-green-400 mt-1">
                            {effect.description}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {canUnlock && !isMaxed && (
                      <div className="mt-2 text-center">
                        <span className="text-xs text-amber-400">Click to unlock (-1 point)</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Ultimate Skill */}
      {nodes.filter(n => n.id.includes('ult')).map(ult => (
        <div key={ult.id} className="mt-6 p-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg border border-amber-500/50">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{ult.icon}</span>
            <div>
              <h4 className="text-xl font-bold text-amber-400">{ult.name}</h4>
              <p className="text-gray-300">{ult.description}</p>
              <p className="text-sm text-amber-400/70 mt-1">Requires mastery of multiple branches</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
