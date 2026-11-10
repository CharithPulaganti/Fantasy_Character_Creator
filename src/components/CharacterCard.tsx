import React, { useState } from 'react';
import { FantasyCharacter } from '../types/character';
import { FANTASY_CLASSES } from '../data/fantasyData';
import { ClassBadgeIcon } from './ClassBadgeIcon';
import { FantasyPortrait } from './FantasyPortrait';
import { AlchemicalCorner } from './AlchemicalCorner';
import {
  Heart,
  Sparkles,
  Swords,
  Shield,
  Scroll,
  Check,
  Copy,
  RotateCcw,
  Image as ImageIcon,
  RefreshCw,
  Flame,
  ScrollText,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface CharacterCardProps {
  character: FantasyCharacter;
  portraitSeed: number;
  hasPortrait: boolean;
  onGeneratePortrait: () => void;
  onRegeneratePortrait: () => void;
  onGenerateBackstory: () => void;
  onSaveToDeck: () => void;
  isSavedInDeck: boolean;
  onRerollName: () => void;
  onRerollStats: () => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  portraitSeed,
  hasPortrait,
  onGeneratePortrait,
  onRegeneratePortrait,
  onGenerateBackstory,
  onSaveToDeck,
  isSavedInDeck,
  onRerollName,
  onRerollStats,
}) => {
  const [copied, setCopied] = useState(false);
  const [showFullEquipment, setShowFullEquipment] = useState(false);
  const theme = FANTASY_CLASSES[character.characterClass];

  // Guaranteed fallback for card stats (Health, Mana, Strength)
  const health = character.cardStats?.health ?? character.combat?.health ?? 100;
  const mana = character.cardStats?.mana ?? character.combat?.energy ?? 80;
  const strength = character.cardStats?.strength ?? character.stats?.strength ?? 50;

  const handleCopyCard = async () => {
    const text = `
=== [FANTASY PLAYER CARD] ${character.name.toUpperCase()} ===
Class: ${character.characterClass} (${character.lore.subclass})
Race: ${character.lore.race} | Level: ${character.combat.level} | Alignment: ${character.lore.alignment}

[CARD STATS]
❤️ Health: ${health} HP
✨ Mana: ${mana} MP
⚔️ Strength: ${strength} STR

[BACKSTORY]
"${character.lore.origin}"

[SIGNATURE ABILITY]
${character.lore.signatureAbility}

[EQUIPMENT]
Weapon: ${character.equipment.weapon}
Armor: ${character.equipment.armor}
Trinket: ${character.equipment.trinket}
    `.trim();

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Outer Glow Halo representing the Class Elemental Alignment */}
      <div
        className="absolute -inset-1 rounded-3xl opacity-35 blur-xl pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${theme.glowColor}, rgba(217, 119, 6, 0.2) 60%, transparent 85%)`,
        }}
      />

      {/* Main Bordered Fantasy Player Card Container */}
      <div className="relative rounded-3xl border-4 border-amber-600/80 bg-[#14100E] shadow-[0_12px_48px_rgba(0,0,0,0.85)] overflow-hidden border-alchemical-gold">
        {/* Ornate Gold & Bronze Corner Filigrees on All Four Card Corners */}
        <AlchemicalCorner className="absolute top-3 left-3 z-30 pointer-events-none" size={36} />
        <AlchemicalCorner className="absolute top-3 right-3 z-30 rotate-90 pointer-events-none" size={36} />
        <AlchemicalCorner className="absolute bottom-3 right-3 z-30 rotate-180 pointer-events-none" size={36} />
        <AlchemicalCorner className="absolute bottom-3 left-3 z-30 -rotate-90 pointer-events-none" size={36} />

        {/* Embedded Top Center Mana Gem Socket */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
          <div
            className="w-14 h-4 rounded-b-xl border-x-2 border-b-2 border-amber-500/70 bg-[#251D18] flex items-center justify-center shadow-md"
            style={{
              boxShadow: `0 2px 10px ${theme.glowColor}`,
            }}
          >
            <div
              className="w-2.5 h-2.5 rounded-full ring-2 ring-amber-400/80 animate-pulse"
              style={{ backgroundColor: theme.glowColor }}
            />
          </div>
        </div>

        {/* Subtle Card Background Watermark & Grid */}
        <div className="absolute inset-0 alchemical-texture opacity-30 pointer-events-none" />
        <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full border border-amber-600/10 pointer-events-none" />

        {/* CARD CONTENT BODY */}
        <div className="relative p-6 sm:p-8 lg:p-10 space-y-7 z-10">
          {/* 1. CARD HEADER: Name, Class, Metadata, and Quick Copy */}
          <div className="pt-2 border-b border-amber-800/40 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                {/* Level / Race / Alignment Ribbon */}
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300/90">
                  <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-600/40 text-amber-300 font-mono">
                    Level {character.combat.level}
                  </span>
                  <span aria-hidden="true" className="text-amber-600">·</span>
                  <span>{character.lore.race}</span>
                  <span aria-hidden="true" className="text-amber-600">·</span>
                  <span className="text-amber-400/80">{character.lore.alignment}</span>
                </div>

                {/* PROMINENT CHARACTER NAME IN STYLIZED FANTASY FONT */}
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h1
                    className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-100 drop-shadow-[0_2px_14px_rgba(245,158,11,0.4)]"
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    {character.name}
                  </h1>
                  <button
                    type="button"
                    onClick={onRerollName}
                    className="text-xs text-amber-400/80 hover:text-amber-200 transition-colors flex items-center gap-1 cursor-pointer hover:underline"
                    title="Generate a new name for this card"
                  >
                    <RotateCcw className="w-3 h-3 text-amber-500" />
                    <span>Reroll Name</span>
                  </button>
                </div>

                {/* CHARACTER CLASS DISPLAYED CLEARLY BELOW NAME */}
                <div className="flex items-center gap-2.5 pt-1">
                  <div className={`p-1.5 rounded-lg bg-gradient-to-br ${theme.primaryColor} border border-amber-400/40 shadow-sm shrink-0`}>
                    <ClassBadgeIcon characterClass={character.characterClass} size="sm" />
                  </div>
                  <span
                    className={`text-lg sm:text-xl font-black uppercase tracking-wider ${theme.accentColor} drop-shadow-sm`}
                  >
                    {character.characterClass}
                  </span>
                  <span className="text-amber-600/80 font-mono">/</span>
                  <span className="text-sm sm:text-base text-amber-200 font-semibold">
                    {character.lore.subclass}
                  </span>
                  <span className="text-xs text-amber-400/60 hidden md:inline italic">
                    ({theme.subtitle})
                  </span>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center gap-2 self-start shrink-0">
                <button
                  type="button"
                  onClick={handleCopyCard}
                  className="btn-fantasy-bronze flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap active:scale-95"
                  title="Copy player card markdown text"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-400" />
                      <span>Copy Card</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* 2. CARD ART PORTRAIT + THREE STATS & BACKSTORY GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
            {/* Left Column (5 cols on lg): Framed Portrait Window with Generate & Regenerate Portrait Buttons */}
            <div className="lg:col-span-5 flex flex-col items-center p-4 bg-[#1C1612] border-2 border-amber-800/60 rounded-2xl space-y-4 shadow-xl relative">
              <div className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-300">
                <span className="flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>Card Portrait</span>
                </span>
                {hasPortrait && (
                  <span className="text-[11px] font-mono text-amber-400/80">
                    Art Variant #{(portraitSeed % 5) + 1}
                  </span>
                )}
              </div>

              {/* Framed Gold-Leaf Portrait Frame */}
              <div className="w-full max-w-[280px] sm:max-w-[320px] mx-auto rounded-2xl overflow-hidden border-2 border-amber-500/70 shadow-[0_6px_24px_rgba(0,0,0,0.8)] relative bg-stone-950 ring-1 ring-amber-300/30">
                <FantasyPortrait
                  character={character}
                  variation={portraitSeed}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* The Two Portrait Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 w-full pt-1">
                <button
                  type="button"
                  onClick={onGeneratePortrait}
                  className="btn-fantasy-gold flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap active:scale-95 shadow-md"
                  title="Generate a cartoon fantasy portrait matching this character"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Generate Portrait</span>
                </button>

                <button
                  type="button"
                  onClick={onRegeneratePortrait}
                  className="btn-fantasy-bronze flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap active:scale-95"
                  title="Create a different cartoon portrait for this character"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Regenerate Portrait</span>
                </button>
              </div>
            </div>

            {/* Right Column (7 cols on lg): Stats Badges/Bars + Origin Backstory + Save to Deck Button */}
            <div className="lg:col-span-7 space-y-5">
              {/* THREE RANDOMLY GENERATED NUMERICAL STATS: HEALTH, MANA, AND STRENGTH */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Card Vital Attributes</span>
                  </h3>
                  <button
                    type="button"
                    onClick={onRerollStats}
                    className="text-xs text-amber-400/80 hover:text-amber-200 transition-colors flex items-center gap-1 cursor-pointer"
                    title="Reroll character attributes"
                  >
                    <RotateCcw className="w-3 h-3 text-amber-500" />
                    <span>Reroll Stats</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* HEALTH STAT BADGE & BAR */}
                  <div className="p-3.5 bg-[#1C1612] border border-rose-900/50 rounded-xl space-y-2.5 shadow-md hover:border-rose-700/60 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-300">
                        <Heart className="w-4 h-4 text-rose-400 fill-rose-500/20" />
                        <span>Health</span>
                      </div>
                      <span className="font-mono text-lg font-black text-rose-100 tabular-nums">
                        {health} <span className="text-[10px] text-rose-400/80 font-normal">HP</span>
                      </span>
                    </div>

                    {/* Stat Progress Bar */}
                    <div className="w-full bg-[#100C0A] h-2 rounded-full overflow-hidden border border-rose-950">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-300 transition-all duration-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"
                        style={{ width: `${Math.min(100, Math.round((health / 180) * 100))}%` }}
                      />
                    </div>
                  </div>

                  {/* MANA STAT BADGE & BAR */}
                  <div className="p-3.5 bg-[#1C1612] border border-cyan-900/50 rounded-xl space-y-2.5 shadow-md hover:border-cyan-700/60 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-300">
                        <Sparkles className="w-4 h-4 text-cyan-400 fill-cyan-500/20" />
                        <span>Mana</span>
                      </div>
                      <span className="font-mono text-lg font-black text-cyan-100 tabular-nums">
                        {mana} <span className="text-[10px] text-cyan-400/80 font-normal">MP</span>
                      </span>
                    </div>

                    {/* Stat Progress Bar */}
                    <div className="w-full bg-[#100C0A] h-2 rounded-full overflow-hidden border border-cyan-950">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-300 transition-all duration-500 shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                        style={{ width: `${Math.min(100, Math.round((mana / 180) * 100))}%` }}
                      />
                    </div>
                  </div>

                  {/* STRENGTH STAT BADGE & BAR */}
                  <div className="p-3.5 bg-[#1C1612] border border-amber-900/50 rounded-xl space-y-2.5 shadow-md hover:border-amber-700/60 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
                        <Swords className="w-4 h-4 text-amber-400" />
                        <span>Strength</span>
                      </div>
                      <span className="font-mono text-lg font-black text-amber-100 tabular-nums">
                        {strength} <span className="text-[10px] text-amber-400/80 font-normal">STR</span>
                      </span>
                    </div>

                    {/* Stat Progress Bar */}
                    <div className="w-full bg-[#100C0A] h-2 rounded-full overflow-hidden border border-amber-950">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-700 via-amber-400 to-yellow-200 transition-all duration-500 shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                        style={{ width: `${Math.min(100, Math.round((strength / 100) * 100))}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. GENERATED BACKSTORY PANEL */}
              <div className="p-4 sm:p-5 bg-[#1C1612] border border-amber-800/50 rounded-2xl space-y-3 shadow-md relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-amber-900/40">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                    <ScrollText className="w-4 h-4 text-amber-400" />
                    <span>Origin Chronicle &amp; Lore</span>
                  </div>

                  {/* BUTTON LABELED: Generate Backstory */}
                  <button
                    type="button"
                    onClick={onGenerateBackstory}
                    className="btn-fantasy-gold inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap active:scale-95 shadow-sm"
                    title="Generate a unique fantasy origin story reflecting this character's name and class"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Backstory</span>
                  </button>
                </div>

                {/* BACKSTORY 1-2 SENTENCE TEXT */}
                <div className="p-4 rounded-xl bg-[#251D18] border border-amber-700/40 shadow-inner">
                  <p className="text-sm sm:text-base text-amber-100/95 leading-relaxed font-serif italic">
                    &ldquo;{character.lore.origin}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-amber-400/80">
                  <span className="font-semibold text-amber-300 uppercase tracking-wider text-[11px]">
                    Signature Ability:
                  </span>
                  <span className="text-amber-200/90 truncate">{character.lore.signatureAbility}</span>
                </div>
              </div>

              {/* 4. PRIMARY BUTTON LABELED "Save to Deck" */}
              <div className="pt-1 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={onSaveToDeck}
                  disabled={isSavedInDeck}
                  className={`w-full sm:flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold rounded-xl transition-all cursor-pointer shadow-lg active:scale-95 whitespace-nowrap ${
                    isSavedInDeck
                      ? 'bg-amber-950/80 border-2 border-amber-500/60 text-amber-300 shadow-[0_0_16px_rgba(245,158,11,0.2)] opacity-90 cursor-default'
                      : 'btn-fantasy-gold'
                  }`}
                  title={isSavedInDeck ? 'This character card is already in My Deck' : 'Save this player card to My Deck'}
                >
                  {isSavedInDeck ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Saved to Deck</span>
                    </>
                  ) : (
                    <>
                      <Layers className="w-4 h-4 text-stone-900" />
                      <span>Save to Deck</span>
                    </>
                  )}
                </button>

                {/* Toggle Additional Grimoire Relics Drawer */}
                <button
                  type="button"
                  onClick={() => setShowFullEquipment(!showFullEquipment)}
                  className="btn-fantasy-bronze px-4 py-3.5 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
                  title="View equipped weapons and relics"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>{showFullEquipment ? 'Hide Gear' : 'Forged Relics'}</span>
                  {showFullEquipment ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Expandable Forged Relics & Equipment Section */}
          {showFullEquipment && (
            <div className="pt-4 border-t border-amber-800/40 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in duration-200">
              <div className="p-3 bg-[#1C1612] border border-amber-800/40 rounded-xl space-y-1">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Swords className="w-3.5 h-3.5 text-amber-500" /> Primary Weapon
                </div>
                <div className="text-xs font-semibold text-amber-100">{character.equipment.weapon}</div>
              </div>

              <div className="p-3 bg-[#1C1612] border border-amber-800/40 rounded-xl space-y-1">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-amber-500" /> Armor &amp; Robes
                </div>
                <div className="text-xs font-semibold text-amber-100">{character.equipment.armor}</div>
              </div>

              <div className="p-3 bg-[#1C1612] border border-amber-800/40 rounded-xl space-y-1">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Scroll className="w-3.5 h-3.5 text-amber-500" /> Arcane Trinket
                </div>
                <div className="text-xs font-semibold text-amber-100 line-clamp-1">{character.equipment.trinket}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
