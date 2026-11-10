import React, { useState } from 'react';
import { FantasyCharacter, CharacterClassType } from '../types/character';
import { FANTASY_CLASSES } from '../data/fantasyData';
import { ClassBadgeIcon } from './ClassBadgeIcon';
import { FantasyPortrait } from './FantasyPortrait';
import {
  X,
  Trash2,
  ExternalLink,
  Download,
  Copy,
  Check,
  Bookmark,
  Sparkles,
} from 'lucide-react';

import { AlchemicalCorner } from './AlchemicalCorner';

interface RosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  roster: FantasyCharacter[];
  onSelectCharacter: (char: FantasyCharacter) => void;
  onDeleteCharacter: (id: string) => void;
  onClearRoster: () => void;
  onGenerateNew: () => void;
}

export const RosterModal: React.FC<RosterModalProps> = ({
  isOpen,
  onClose,
  roster,
  onSelectCharacter,
  onDeleteCharacter,
  onClearRoster,
  onGenerateNew,
}) => {
  const [filterClass, setFilterClass] = useState<CharacterClassType | 'ALL'>('ALL');
  const [copiedAll, setCopiedAll] = useState(false);

  if (!isOpen) return null;

  const filteredRoster = filterClass === 'ALL'
    ? roster
    : roster.filter((c) => c.characterClass === filterClass);

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(roster, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `mythic_forge_roster_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyAllMarkdown = async () => {
    const md = roster
      .map(
        (c) =>
          `# ${c.name}\n- Class: ${c.characterClass} (${c.lore.subclass})\n- Race: ${c.lore.race} · Level ${c.combat.level} · ${c.lore.alignment}\n- Weapon: ${c.equipment.weapon}\n- Ability: ${c.lore.signatureAbility}\n- Backstory: ${c.lore.origin}\n`
      )
      .join('\n---\n\n');

    try {
      await navigator.clipboard.writeText(md);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-[#16120E] border-2 border-amber-700/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden border-alchemical-gold">
        {/* Filigree Corners */}
        <AlchemicalCorner className="absolute top-2 left-2 z-20" size={24} />
        <AlchemicalCorner className="absolute top-2 right-2 z-20 rotate-90" size={24} />
        <AlchemicalCorner className="absolute bottom-2 right-2 z-20 rotate-180" size={24} />
        <AlchemicalCorner className="absolute bottom-2 left-2 z-20 -rotate-90" size={24} />

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-amber-800/40 flex items-center justify-between bg-[#1F1915]">
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-5 h-5 text-amber-400" />
            <h2
              className="text-xl font-bold text-amber-100 tracking-wide"
              style={{ fontFamily: 'var(--font-fantasy)' }}
            >
              Archived Transmutations
            </h2>
            <span className="text-xs text-amber-400/70 font-mono">
              ({roster.length} {roster.length === 1 ? 'Hero' : 'Heroes'})
            </span>
          </div>

          <div className="flex items-center gap-2 z-30">
            {roster.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={handleCopyAllMarkdown}
                  className="btn-fantasy-bronze px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy all characters as markdown"
                >
                  {copiedAll ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-400" />
                      <span>Copy All</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleExportJson}
                  className="btn-fantasy-bronze px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Download JSON export"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Export JSON</span>
                </button>
              </>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-amber-400 hover:text-amber-100 hover:bg-amber-950/40 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter bar if roster has characters */}
        {roster.length > 0 && (
          <div className="px-6 py-2.5 bg-[#14100E] border-b border-amber-800/40 flex items-center gap-2 overflow-x-auto">
            <span className="text-xs text-amber-300/80 font-bold whitespace-nowrap">School:</span>
            <button
              type="button"
              onClick={() => setFilterClass('ALL')}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer whitespace-nowrap ${
                filterClass === 'ALL'
                  ? 'btn-fantasy-gold font-bold shadow-sm'
                  : 'text-amber-300/70 hover:text-amber-100 hover:bg-[#251D18]'
              }`}
            >
              All ({roster.length})
            </button>
            {(['Mage', 'Rogue', 'Warrior', 'Archer', 'Paladin', 'Necromancer', 'Druid'] as CharacterClassType[]).map(
              (cls) => {
                const count = roster.filter((c) => c.characterClass === cls).length;
                if (count === 0) return null;
                return (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => setFilterClass(cls)}
                    className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer whitespace-nowrap ${
                      filterClass === cls
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {cls} ({count})
                  </button>
                );
              }
            )}
          </div>
        )}

        {/* Roster List or Empty State */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {roster.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                <Bookmark className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Your Roster is Empty</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                  Click &ldquo;Save Hero&rdquo; on any generated character card to archive them here for reference or export.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onGenerateNew();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate a Character</span>
              </button>
            </div>
          ) : (
            filteredRoster.map((char) => {
              const theme = FANTASY_CLASSES[char.characterClass];
              return (
                <div
                  key={char.id}
                  className="p-4 bg-[#1F1915] border border-amber-800/40 rounded-xl hover:border-amber-600/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-amber-500/40 shadow-md">
                      <FantasyPortrait character={char} variation={char.portraitSeed ?? 0} />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-amber-100 truncate" style={{ fontFamily: 'var(--font-fantasy)' }}>{char.name}</h4>
                        <span className={`text-xs font-semibold ${theme.accentColor}`}>
                          {char.characterClass}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-amber-400/70 truncate">
                        <span>{char.lore.subclass}</span>
                        <span aria-hidden="true">·</span>
                        <span>{char.lore.race}</span>
                        <span aria-hidden="true">·</span>
                        <span>Level {char.combat.level}</span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{char.equipment.weapon}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectCharacter(char);
                        onClose();
                      }}
                      className="btn-fantasy-gold px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteCharacter(char.id)}
                      className="p-1.5 text-stone-500 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                      title="Remove from roster"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        {roster.length > 0 && (
          <div className="px-6 py-3 border-t border-amber-800/40 bg-[#120E0C] flex items-center justify-between text-xs text-amber-500/70">
            <span>Archived: {filteredRoster.length} of {roster.length} transmutations</span>
            <button
              type="button"
              onClick={onClearRoster}
              className="text-rose-400/80 hover:text-rose-300 hover:underline cursor-pointer"
            >
              Clear Entire Archive
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
