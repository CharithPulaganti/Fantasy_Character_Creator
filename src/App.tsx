import React, { useState, useEffect, useCallback } from 'react';
import { FantasyCharacter, CharacterClassType } from './types/character';
import {
  generateCharacter,
  generateFantasyName,
  generateStatsForClass,
  generateCombatStats,
  generateCardStats,
  generateBackstory,
} from './utils/generator';
import { playGenerateSound, toggleAudio, isAudioEnabled } from './utils/audio';
import { Header } from './components/Header';
import { CharacterCard } from './components/CharacterCard';
import { MyDeckSection } from './components/MyDeckSection';
import { ClassSelector } from './components/ClassSelector';
import { ClassCodexSection } from './components/ClassCodexSection';
import { RosterModal } from './components/RosterModal';
import {
  Sparkles,
  Dices,
  History,
  RotateCcw,
  Sliders,
  Check,
  Image as ImageIcon,
  RefreshCw,
  ScrollText,
  Layers,
} from 'lucide-react';

const DECK_STORAGE_KEY = 'mythic_forge_deck_v1';
const ROSTER_STORAGE_KEY = 'mythic_forge_saved_roster_v1';

export default function App() {
  const [character, setCharacter] = useState<FantasyCharacter>(() =>
    generateCharacter()
  );
  const [selectedClassFilter, setSelectedClassFilter] = useState<CharacterClassType | 'ALL'>('ALL');
  const [characterLevel, setCharacterLevel] = useState<number>(1);
  const [recentHistory, setRecentHistory] = useState<FantasyCharacter[]>([]);
  const [deck, setDeck] = useState<FantasyCharacter[]>(() => {
    try {
      const storedDeck = localStorage.getItem(DECK_STORAGE_KEY);
      if (storedDeck) {
        const parsed: FantasyCharacter[] = JSON.parse(storedDeck);
        return parsed.map((c) => ({
          ...c,
          cardStats: c.cardStats || generateCardStats(c.characterClass, c.combat?.level || 1),
        }));
      }
      const oldRoster = localStorage.getItem(ROSTER_STORAGE_KEY);
      if (oldRoster) {
        const parsed: FantasyCharacter[] = JSON.parse(oldRoster);
        return parsed.map((c) => ({
          ...c,
          cardStats: c.cardStats || generateCardStats(c.characterClass, c.combat?.level || 1),
        }));
      }
      return [];
    } catch {
      return [];
    }
  });

  const [isRosterOpen, setIsRosterOpen] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(() => isAudioEnabled());
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hasPortrait, setHasPortrait] = useState<boolean>(true);
  const [portraitSeed, setPortraitSeed] = useState<number>(0);

  // Sync deck with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(deck));
    } catch {
      // Ignored if local storage unavailable
    }
  }, [deck]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  /**
   * Primary generator trigger:
   * Button labeled "Generate Character"
   * Every click generates a new character with a different randomly selected name and class.
   */
  const handleGenerate = useCallback(
    (targetClass?: CharacterClassType) => {
      const lockClass = targetClass || (selectedClassFilter === 'ALL' ? undefined : selectedClassFilter);

      const nextChar = generateCharacter({
        targetClass: lockClass,
        previousCharacter: character,
        level: characterLevel,
      });

      // Update history with previous character and its portrait seed
      setRecentHistory((prev) => [
        { ...character, portraitSeed, hasPortrait: true },
        ...prev.slice(0, 4),
      ]);
      setCharacter(nextChar);
      setPortraitSeed(0);
      setHasPortrait(true);
      playGenerateSound();
    },
    [character, selectedClassFilter, characterLevel, portraitSeed]
  );

  /**
   * Generates a cartoon/video game style fantasy portrait of the currently displayed character
   */
  const handleGeneratePortrait = () => {
    setHasPortrait(true);
    setPortraitSeed(0);
    playGenerateSound();
    showToast(`Generated cartoon portrait for ${character.name}`);
  };

  /**
   * Regenerates a different portrait for the same currently displayed character
   */
  const handleRegeneratePortrait = () => {
    setHasPortrait(true);
    const nextSeed = portraitSeed + 1;
    setPortraitSeed(nextSeed);
    playGenerateSound();
    showToast(`Regenerated portrait style #${(nextSeed % 5) + 1} for ${character.name}`);
  };

  /**
   * Generates a unique one-to-two-sentence fantasy origin story for the currently displayed character
   */
  const handleGenerateBackstory = () => {
    const newStory = generateBackstory(
      character.name,
      character.characterClass,
      character.lore.origin
    );
    setCharacter((prev) => ({
      ...prev,
      lore: {
        ...prev.lore,
        origin: newStory,
      },
    }));
    playGenerateSound();
    showToast(`Crafted new backstory for ${character.name}`);
  };

  /**
   * Saves the currently displayed character, including its portrait, name, class, backstory, and stats,
   * into a "My Deck" section within the application. Prevents duplicate saves.
   */
  const handleSaveToDeck = () => {
    const alreadySaved = deck.some(
      (c) => c.id === character.id || (c.name === character.name && c.characterClass === character.characterClass)
    );

    if (alreadySaved) {
      showToast(`"${character.name}" is already in My Deck`);
      return;
    }

    const charToSave: FantasyCharacter = {
      ...character,
      portraitSeed,
      hasPortrait: true,
      cardStats: character.cardStats || generateCardStats(character.characterClass, character.combat.level),
    };

    setDeck((prev) => [charToSave, ...prev]);
    playGenerateSound();
    showToast(`Saved "${character.name}" to My Deck!`);
  };

  const handleRemoveFromDeck = (id: string) => {
    setDeck((prev) => prev.filter((c) => c.id !== id));
    showToast('Removed card from My Deck');
  };

  const handleClearDeck = () => {
    setDeck([]);
    showToast('My Deck cleared');
  };

  const handleSelectDeckCard = (char: FantasyCharacter) => {
    setCharacter(char);
    setPortraitSeed(char.portraitSeed ?? 0);
    setHasPortrait(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playGenerateSound();
    showToast(`Loaded "${char.name}" onto player card`);
  };

  // Reroll only the name
  const handleRerollName = () => {
    const newName = generateFantasyName(character.name);
    setCharacter((prev) => ({ ...prev, name: newName }));
    playGenerateSound();
    showToast('Name rerolled');
  };

  // Reroll only stats
  const handleRerollStats = () => {
    const newStats = generateStatsForClass(character.characterClass);
    const newCombat = generateCombatStats(character.characterClass, newStats, character.combat.level);
    const newCardStats = generateCardStats(character.characterClass, character.combat.level);
    setCharacter((prev) => ({
      ...prev,
      stats: newStats,
      combat: newCombat,
      cardStats: newCardStats,
    }));
    playGenerateSound();
    showToast('Stats recalculated');
  };

  const handleToggleSound = () => {
    const newState = toggleAudio();
    setIsSoundOn(newState);
    showToast(newState ? 'Audio enabled' : 'Audio muted');
  };

  const handleLevelChange = (lvl: number) => {
    setCharacterLevel(lvl);
    const updatedCombat = generateCombatStats(character.characterClass, character.stats, lvl);
    const updatedCardStats = generateCardStats(character.characterClass, lvl);
    setCharacter((prev) => ({
      ...prev,
      combat: updatedCombat,
      cardStats: updatedCardStats,
    }));
  };

  const isSavedInDeck = deck.some(
    (c) => c.id === character.id || (c.name === character.name && c.characterClass === character.characterClass)
  );

  // Keyboard shortcut: Spacebar (when not in an input) triggers generation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        handleGenerate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGenerate]);

  const scrollToClasses = () => {
    document.getElementById('classes')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDeck = () => {
    document.getElementById('my-deck')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen alchemist-table alchemical-texture text-amber-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200 relative overflow-hidden">
      {/* Mystical Alchemy Circle Watermark in Background */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[700px] h-[700px] pointer-events-none opacity-10 select-none">
        <svg viewBox="0 0 500 500" className="w-full h-full stroke-amber-400" fill="none">
          <circle cx="250" cy="250" r="230" strokeWidth="1" strokeDasharray="6 4" />
          <circle cx="250" cy="250" r="200" strokeWidth="1.5" />
          <polygon points="250,50 423,350 77,350" strokeWidth="1.2" />
          <polygon points="250,450 423,150 77,150" strokeWidth="1.2" />
          <circle cx="250" cy="250" r="115" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="250" cy="250" r="30" strokeWidth="1.5" />
          <line x1="250" y1="20" x2="250" y2="480" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="20" y1="250" x2="480" y2="250" strokeWidth="0.8" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* Top Bar Header */}
      <Header
        onGenerateClick={() => handleGenerate()}
        onOpenRoster={() => setIsRosterOpen(true)}
        onScrollToDeck={scrollToDeck}
        onToggleSound={handleToggleSound}
        onScrollToClasses={scrollToClasses}
        isSoundOn={isSoundOn}
        deckCount={deck.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 z-10">
        {/* Hero Generator Command Center - Alchemist's Bench */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-amber-800/40">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
              <Dices className="w-3.5 h-3.5 text-amber-400" />
              <span>Ancient Transmutation Circle</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-100 drop-shadow-[0_2px_12px_rgba(245,158,11,0.3)]"
              style={{ fontFamily: 'var(--font-fantasy)' }}
            >
              The Alchemist&rsquo;s Workbench
            </h1>
            <p className="text-sm sm:text-base text-amber-200/80 max-w-2xl leading-relaxed">
              Transmute primeval elements into bounded fantasy player cards. Generate unique champions,
              portraits, backstories, and vital attributes, then save them into your deck.
            </p>
          </div>

          {/* ACTION BUTTONS ROW: Generate Character, Generate Portrait, Regenerate Portrait, Generate Backstory, Save to Deck */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => handleGenerate()}
              className="btn-fantasy-gold group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold rounded-xl active:scale-95 transition-all cursor-pointer whitespace-nowrap shadow-lg"
            >
              <Sparkles className="w-5 h-5 text-stone-900 group-hover:rotate-12 transition-transform" />
              <span className="tracking-wide">Generate Character</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono font-medium text-stone-900 bg-amber-300/80 rounded border border-amber-600/40">
                Space
              </kbd>
            </button>

            <button
              type="button"
              onClick={handleGeneratePortrait}
              className="btn-fantasy-gold inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-bold rounded-xl active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              title="Generate a cartoon fantasy portrait matching the current character"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Generate Portrait</span>
            </button>

            <button
              type="button"
              onClick={handleRegeneratePortrait}
              className="btn-fantasy-bronze inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-semibold rounded-xl active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              title="Create a different cartoon portrait for the same currently displayed character"
            >
              <RefreshCw className="w-4 h-4 text-amber-400" />
              <span>Regenerate Portrait</span>
            </button>

            <button
              type="button"
              onClick={handleGenerateBackstory}
              className="btn-fantasy-bronze inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-semibold rounded-xl active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              title="Generate a unique one-to-two-sentence fantasy origin story for this character"
            >
              <ScrollText className="w-4 h-4 text-amber-400" />
              <span>Generate Backstory</span>
            </button>

            <button
              type="button"
              onClick={handleSaveToDeck}
              disabled={isSavedInDeck}
              className={`inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-bold rounded-xl active:scale-95 transition-all cursor-pointer whitespace-nowrap shadow-md ${
                isSavedInDeck
                  ? 'bg-amber-950/80 border border-amber-500/60 text-amber-300 cursor-default opacity-90'
                  : 'btn-fantasy-gold'
              }`}
              title={isSavedInDeck ? 'This character is already in My Deck' : 'Save this player card to My Deck'}
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
          </div>
        </div>

        {/* Controls Toolbar: Class Selector & Level Slider - Brass Bench Plate */}
        <div className="p-4 bg-[#181310] border border-amber-800/40 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
          <div className="flex-1">
            <ClassSelector
              selectedClass={selectedClassFilter}
              onSelectClass={(cls) => {
                setSelectedClassFilter(cls);
                if (cls !== 'ALL') {
                  handleGenerate(cls);
                }
              }}
            />
          </div>

          <div className="flex items-center gap-4 border-t lg:border-t-0 lg:border-l border-amber-800/40 pt-3 lg:pt-0 lg:pl-6 shrink-0">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-amber-300">
                <span className="flex items-center gap-1 font-bold">
                  <Sliders className="w-3 h-3 text-amber-400" />
                  <span>Transmutation Level</span>
                </span>
                <span className="font-mono text-amber-400 font-bold">Lv {characterLevel}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 3, 5, 8, 12].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => handleLevelChange(lvl)}
                    className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-colors cursor-pointer active:scale-95 ${
                      characterLevel === lvl
                        ? 'btn-fantasy-gold font-bold shadow-sm'
                        : 'text-amber-300/70 hover:text-amber-100 hover:bg-[#251D18]'
                    }`}
                  >
                    Lv {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Centerpiece: Beautiful Bordered Fantasy Player Card */}
        <section aria-label="Generated Fantasy Player Card">
          <CharacterCard
            character={character}
            portraitSeed={portraitSeed}
            hasPortrait={hasPortrait}
            onGeneratePortrait={handleGeneratePortrait}
            onRegeneratePortrait={handleRegeneratePortrait}
            onGenerateBackstory={handleGenerateBackstory}
            onSaveToDeck={handleSaveToDeck}
            isSavedInDeck={isSavedInDeck}
            onRerollName={handleRerollName}
            onRerollStats={handleRerollStats}
          />
        </section>

        {/* MY DECK SECTION: Display all saved characters and allow viewing */}
        <MyDeckSection
          deck={deck}
          activeCharacterId={character.id}
          onSelectCard={handleSelectDeckCard}
          onRemoveCard={handleRemoveFromDeck}
          onClearDeck={handleClearDeck}
          onGenerateNew={() => handleGenerate()}
        />

        {/* Quick History Strip (Previous rolls in this session) */}
        {recentHistory.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-amber-400" />
                <span>Recent Transmutations in This Session</span>
              </h3>
              <span className="text-xs text-amber-400/70">Click to restore onto workbench</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {recentHistory.map((pastChar, idx) => (
                <button
                  key={`${pastChar.id}_${idx}`}
                  type="button"
                  onClick={() => {
                    setRecentHistory((prev) => [
                      { ...character, portraitSeed, hasPortrait },
                      ...prev.filter((c) => c.id !== pastChar.id),
                    ]);
                    setCharacter(pastChar);
                    setPortraitSeed(pastChar.portraitSeed ?? 0);
                    setHasPortrait(true);
                    playGenerateSound();
                  }}
                  className="p-3 bg-[#181310] border border-amber-800/40 hover:border-amber-500/60 rounded-xl text-left transition-all cursor-pointer group flex items-center justify-between gap-2 shadow-sm hover:shadow-[0_2px_12px_rgba(245,158,11,0.15)] active:scale-95"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-amber-100 truncate group-hover:text-amber-300" style={{ fontFamily: 'var(--font-fantasy)' }}>
                      {pastChar.name}
                    </div>
                    <div className="text-[11px] text-amber-400/70 truncate">
                      {pastChar.characterClass} · Lv {pastChar.combat.level}
                    </div>
                  </div>
                  <RotateCcw className="w-3.5 h-3.5 text-amber-600 group-hover:text-amber-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Class Codex Showcase Section */}
        <ClassCodexSection
          onGenerateSpecificClass={(cls) => {
            setSelectedClassFilter(cls);
            handleGenerate(cls);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-amber-800/40 bg-[#0C0A09] py-8 text-center text-xs text-amber-400/70 z-10">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-medium text-amber-200/90">
            The Alchemist&rsquo;s Workbench &middot; Fantasy Player Card Creator &amp; Grimoire Deck
          </p>
          <div className="flex items-center justify-center gap-4 text-amber-400/60 text-xs">
            <span>7 Ancient Disciplines</span>
            <span>&middot;</span>
            <span>Bordered Collectible Player Cards</span>
            <span>&middot;</span>
            <span>Health &middot; Mana &middot; Strength</span>
          </div>
        </div>
      </footer>

      {/* Roster / Vault Archive Modal */}
      <RosterModal
        isOpen={isRosterOpen}
        onClose={() => setIsRosterOpen(false)}
        roster={deck}
        onSelectCharacter={handleSelectDeckCard}
        onDeleteCharacter={handleRemoveFromDeck}
        onClearRoster={handleClearDeck}
        onGenerateNew={() => handleGenerate()}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-slate-900 border border-amber-500/50 text-amber-200 text-xs font-semibold rounded-xl shadow-2xl animate-in slide-in-from-bottom-2 duration-150">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
