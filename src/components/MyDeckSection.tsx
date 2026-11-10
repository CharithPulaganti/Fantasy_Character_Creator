import React, { useState } from 'react';
import { FantasyCharacter, CharacterClassType } from '../types/character';
import { FANTASY_CLASSES } from '../data/fantasyData';
import { FantasyPortrait } from './FantasyPortrait';
import { ClassBadgeIcon } from './ClassBadgeIcon';
import { AlchemicalCorner } from './AlchemicalCorner';
import {
  Layers,
  Heart,
  Sparkles,
  Swords,
  Trash2,
  ExternalLink,
  Eye,
  Search,
  Download,
  Copy,
  Check,
  PlusCircle,
} from 'lucide-react';

interface MyDeckSectionProps {
  deck: FantasyCharacter[];
  activeCharacterId?: string;
  onSelectCard: (char: FantasyCharacter) => void;
  onRemoveCard: (id: string) => void;
  onClearDeck: () => void;
  onGenerateNew: () => void;
}

export const MyDeckSection: React.FC<MyDeckSectionProps> = ({
  deck,
  activeCharacterId,
  onSelectCard,
  onRemoveCard,
  onClearDeck,
  onGenerateNew,
}) => {
  const [filterClass, setFilterClass] = useState<CharacterClassType | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectModalChar, setInspectModalChar] = useState<FantasyCharacter | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const filteredDeck = deck.filter((c) => {
    const matchesClass = filterClass === 'ALL' || c.characterClass === filterClass;
    const matchesSearch =
      searchQuery.trim() === '' ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.characterClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lore.subclass.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

  const handleExportDeck = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(deck, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `mythic_forge_deck_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyDeckSummary = async () => {
    const summary = deck
      .map(
        (c, idx) =>
          `[Card #${idx + 1}] ${c.name} — ${c.characterClass} (${c.lore.subclass})
Health: ${c.cardStats?.health ?? c.combat.health} HP | Mana: ${c.cardStats?.mana ?? c.combat.energy} MP | Strength: ${c.cardStats?.strength ?? c.stats.strength} STR
Backstory: "${c.lore.origin}"`
      )
      .join('\n\n---\n\n');

    try {
      await navigator.clipboard.writeText(summary);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2200);
    } catch {
      // Ignore fallback
    }
  };

  return (
    <section id="my-deck" className="space-y-6 pt-4">
      {/* Deck Section Header Plate */}
      <div className="p-5 sm:p-6 bg-[#16120E] border-2 border-amber-700/50 rounded-2xl shadow-2xl relative overflow-hidden border-alchemical-gold">
        <AlchemicalCorner className="absolute top-2 left-2 z-10" size={24} />
        <AlchemicalCorner className="absolute top-2 right-2 z-10 rotate-90" size={24} />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-800/40 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Grimoire Card Vault</span>
            </div>
            <div className="flex items-baseline gap-3">
              <h2
                className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-100"
                style={{ fontFamily: 'var(--font-fantasy)' }}
              >
                My Deck
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-900/40 border border-amber-600/40 text-amber-300">
                {deck.length} {deck.length === 1 ? 'Card' : 'Cards'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amber-300/80 max-w-xl">
              All fantasy player cards saved to your deck. View any saved card, inspect its stats,
              or load it onto the alchemist&rsquo;s workbench.
            </p>
          </div>

          {/* Quick Deck Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            {deck.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={handleCopyDeckSummary}
                  className="btn-fantasy-bronze flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap active:scale-95"
                  title="Copy deck cards summary"
                >
                  {copiedAll ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-400" />
                      <span>Copy Deck</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleExportDeck}
                  className="btn-fantasy-bronze flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap active:scale-95"
                  title="Download JSON deck file"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Export</span>
                </button>
              </>
            )}

            <button
              type="button"
              onClick={onGenerateNew}
              className="btn-fantasy-gold flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Forge New Card</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        {deck.length > 0 && (
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Class filter tags */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
              <button
                type="button"
                onClick={() => setFilterClass('ALL')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  filterClass === 'ALL'
                    ? 'btn-fantasy-gold font-bold shadow-sm'
                    : 'text-amber-300/70 hover:text-amber-100 hover:bg-[#251D18]'
                }`}
              >
                All ({deck.length})
              </button>
              {(
                [
                  'Mage',
                  'Rogue',
                  'Warrior',
                  'Archer',
                  'Paladin',
                  'Necromancer',
                  'Druid',
                ] as CharacterClassType[]
              ).map((cls) => {
                const count = deck.filter((c) => c.characterClass === cls).length;
                if (count === 0) return null;
                return (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => setFilterClass(cls)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                      filterClass === cls
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : 'text-amber-300/70 hover:text-amber-100 hover:bg-[#251D18]'
                    }`}
                  >
                    {cls} ({count})
                  </button>
                );
              })}
            </div>

            {/* Quick search input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-amber-500/70 pointer-events-none" />
              <input
                type="text"
                placeholder="Search deck by name or class..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#1F1915] border border-amber-800/50 rounded-lg text-amber-100 placeholder:text-amber-600/60 focus:outline-none focus:border-amber-400/80 transition-colors"
              />
            </div>
          </div>
        )}
      </div>

      {/* Deck Grid / Empty State */}
      {deck.length === 0 ? (
        <div className="p-10 text-center bg-[#16120E] border-2 border-dashed border-amber-800/40 rounded-2xl space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-950/40 border border-amber-700/50 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
            <Layers className="w-8 h-8" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3
              className="text-lg font-bold text-amber-200"
              style={{ fontFamily: 'var(--font-fantasy)' }}
            >
              Your Deck is Empty
            </h3>
            <p className="text-xs text-amber-300/70 leading-relaxed">
              No character cards have been saved to your deck yet. Transmute a champion above, then click
              the golden <strong className="text-amber-300">&ldquo;Save to Deck&rdquo;</strong> button to
              archive them in your grimoire.
            </p>
          </div>
          <button
            type="button"
            onClick={onGenerateNew}
            className="btn-fantasy-gold inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-stone-900" />
            <span>Generate Character</span>
          </button>
        </div>
      ) : filteredDeck.length === 0 ? (
        <div className="p-8 text-center bg-[#16120E] border border-amber-800/40 rounded-2xl space-y-2">
          <p className="text-sm text-amber-300/80">No cards match your filter &ldquo;{searchQuery}&rdquo;</p>
          <button
            type="button"
            onClick={() => {
              setFilterClass('ALL');
              setSearchQuery('');
            }}
            className="text-xs text-amber-400 hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDeck.map((card) => {
            const theme = FANTASY_CLASSES[card.characterClass];
            const isActive = card.id === activeCharacterId;

            // Health, Mana, and Strength stats (safely falling back for older cards)
            const healthVal = card.cardStats?.health ?? card.combat?.health ?? 100;
            const manaVal = card.cardStats?.mana ?? card.combat?.energy ?? 80;
            const strVal = card.cardStats?.strength ?? card.stats?.strength ?? 50;

            return (
              <div
                key={card.id}
                className={`relative rounded-2xl border-2 transition-all duration-200 bg-[#16120E] overflow-hidden flex flex-col justify-between shadow-xl group ${
                  isActive
                    ? 'border-amber-400 ring-2 ring-amber-400/30 shadow-[0_0_24px_rgba(245,158,11,0.25)]'
                    : 'border-amber-700/50 hover:border-amber-500/70 hover:shadow-[0_4px_20px_rgba(245,158,11,0.15)]'
                }`}
              >
                {/* Mini Filigrees */}
                <AlchemicalCorner className="absolute top-1.5 left-1.5 z-10 opacity-70" size={16} />
                <AlchemicalCorner
                  className="absolute top-1.5 right-1.5 z-10 rotate-90 opacity-70"
                  size={16}
                />

                {/* Card Top: Portrait + Header Info */}
                <div className="p-4 space-y-3.5">
                  <div className="flex items-start gap-3">
                    {/* Portrait Thumbnail */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 border-amber-500/50 shadow-md relative bg-stone-900">
                      <FantasyPortrait
                        character={card}
                        variation={card.portraitSeed ?? 0}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${theme.accentColor}`}
                        >
                          {card.characterClass}
                        </span>
                        {isActive && (
                          <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-500/40">
                            Active
                          </span>
                        )}
                      </div>

                      <h3
                        className="text-lg font-bold text-amber-100 truncate group-hover:text-amber-200 transition-colors"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {card.name}
                      </h3>

                      <div className="text-[11px] text-amber-400/70 truncate">
                        {card.lore.subclass} &middot; {card.lore.race}
                      </div>
                    </div>
                  </div>

                  {/* Three Random Numerical Stats Badges & Mini Bars: Health, Mana, Strength */}
                  <div className="grid grid-cols-3 gap-2 pt-1 border-t border-amber-900/40">
                    {/* Health */}
                    <div className="p-2 rounded-lg bg-[#1F1915] border border-rose-900/40 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-bold text-rose-300">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3 text-rose-400 fill-rose-500/20" />
                          <span>HP</span>
                        </span>
                        <span className="font-mono text-xs text-rose-200 font-black">
                          {healthVal}
                        </span>
                      </div>
                      <div className="w-full bg-[#120E0C] h-1 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-600 to-rose-400 rounded-full"
                          style={{ width: `${Math.min(100, Math.round((healthVal / 180) * 100))}%` }}
                        />
                      </div>
                    </div>

                    {/* Mana */}
                    <div className="p-2 rounded-lg bg-[#1F1915] border border-cyan-900/40 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-bold text-cyan-300">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-cyan-400 fill-cyan-500/20" />
                          <span>MP</span>
                        </span>
                        <span className="font-mono text-xs text-cyan-200 font-black">
                          {manaVal}
                        </span>
                      </div>
                      <div className="w-full bg-[#120E0C] h-1 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full"
                          style={{ width: `${Math.min(100, Math.round((manaVal / 180) * 100))}%` }}
                        />
                      </div>
                    </div>

                    {/* Strength */}
                    <div className="p-2 rounded-lg bg-[#1F1915] border border-amber-900/40 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-bold text-amber-300">
                        <span className="flex items-center gap-1">
                          <Swords className="w-3 h-3 text-amber-400" />
                          <span>STR</span>
                        </span>
                        <span className="font-mono text-xs text-amber-200 font-black">
                          {strVal}
                        </span>
                      </div>
                      <div className="w-full bg-[#120E0C] h-1 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-600 to-yellow-300 rounded-full"
                          style={{ width: `${Math.min(100, Math.round((strVal / 100) * 100))}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Backstory Excerpt */}
                  <div className="p-2.5 rounded-lg bg-[#221A15] border border-amber-800/30">
                    <p className="text-xs text-amber-200/90 leading-relaxed font-serif italic line-clamp-2">
                      &ldquo;{card.lore.origin}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-3 bg-[#120E0C] border-t border-amber-800/40 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectCard(card)}
                      className="btn-fantasy-gold px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-sm"
                      title="Load card onto the alchemist's workbench"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{isActive ? 'Current Card' : 'View Card'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setInspectModalChar(card)}
                      className="btn-fantasy-bronze px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1 cursor-pointer hover:text-amber-200"
                      title="Quick inspection of full player card"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>Inspect</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveCard(card.id)}
                    className="p-1.5 text-amber-600/70 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                    title="Remove from My Deck"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Clear Deck Footer Option */}
      {deck.length > 0 && (
        <div className="flex items-center justify-between text-xs text-amber-500/70 px-2">
          <span>{filteredDeck.length} of {deck.length} cards shown in My Deck</span>
          <button
            type="button"
            onClick={onClearDeck}
            className="text-rose-400/80 hover:text-rose-300 hover:underline cursor-pointer"
          >
            Clear Entire Deck
          </button>
        </div>
      )}

      {/* Inspect Modal: Complete Full-Fidelity Player Card Preview */}
      {inspectModalChar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-[#16120E] border-2 border-amber-600/80 rounded-2xl shadow-2xl p-6 space-y-5 border-alchemical-gold">
            <AlchemicalCorner className="absolute top-2 left-2 z-10" size={24} />
            <AlchemicalCorner className="absolute top-2 right-2 z-10 rotate-90" size={24} />
            <AlchemicalCorner className="absolute bottom-2 right-2 z-10 rotate-180" size={24} />
            <AlchemicalCorner className="absolute bottom-2 left-2 z-10 -rotate-90" size={24} />

            <div className="flex items-center justify-between border-b border-amber-800/40 pb-3">
              <div className="flex items-center gap-2">
                <ClassBadgeIcon characterClass={inspectModalChar.characterClass} size="sm" />
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                  {inspectModalChar.characterClass} Player Card
                </span>
              </div>
              <button
                type="button"
                onClick={() => setInspectModalChar(null)}
                className="text-amber-400 hover:text-amber-100 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-36 h-36 rounded-2xl overflow-hidden border-2 border-amber-500/60 shadow-xl bg-stone-900">
                <FantasyPortrait
                  character={inspectModalChar}
                  variation={inspectModalChar.portraitSeed ?? 0}
                />
              </div>

              <div>
                <h3
                  className="text-2xl font-black text-amber-100"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  {inspectModalChar.name}
                </h3>
                <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  {inspectModalChar.characterClass} &middot; {inspectModalChar.lore.subclass} &middot; Level {inspectModalChar.combat.level}
                </p>
              </div>
            </div>

            {/* Three Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-[#1F1915] border border-rose-900/50 rounded-xl text-center space-y-1">
                <span className="text-[10px] text-rose-300 uppercase font-bold flex items-center justify-center gap-1">
                  <Heart className="w-3 h-3 text-rose-400" /> Health
                </span>
                <span className="text-xl font-black font-mono text-rose-100">
                  {inspectModalChar.cardStats?.health ?? inspectModalChar.combat.health}
                </span>
              </div>

              <div className="p-3 bg-[#1F1915] border border-cyan-900/50 rounded-xl text-center space-y-1">
                <span className="text-[10px] text-cyan-300 uppercase font-bold flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" /> Mana
                </span>
                <span className="text-xl font-black font-mono text-cyan-100">
                  {inspectModalChar.cardStats?.mana ?? inspectModalChar.combat.energy}
                </span>
              </div>

              <div className="p-3 bg-[#1F1915] border border-amber-900/50 rounded-xl text-center space-y-1">
                <span className="text-[10px] text-amber-300 uppercase font-bold flex items-center justify-center gap-1">
                  <Swords className="w-3 h-3 text-amber-400" /> Strength
                </span>
                <span className="text-xl font-black font-mono text-amber-100">
                  {inspectModalChar.cardStats?.strength ?? inspectModalChar.stats.strength}
                </span>
              </div>
            </div>

            {/* Backstory */}
            <div className="p-4 bg-[#221A15] border border-amber-800/40 rounded-xl space-y-1">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                Origin Backstory
              </span>
              <p className="text-xs text-amber-100/90 leading-relaxed font-serif italic">
                &ldquo;{inspectModalChar.lore.origin}&rdquo;
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-amber-800/40">
              <button
                type="button"
                onClick={() => {
                  onSelectCard(inspectModalChar);
                  setInspectModalChar(null);
                }}
                className="btn-fantasy-gold px-4 py-2 text-xs font-bold rounded-lg cursor-pointer active:scale-95"
              >
                Load onto Workbench
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
