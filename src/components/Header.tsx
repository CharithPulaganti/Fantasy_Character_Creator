import React from 'react';
import { Sparkles, Volume2, VolumeX, Layers, Bookmark } from 'lucide-react';

interface HeaderProps {
  onGenerateClick: () => void;
  onOpenRoster: () => void;
  onScrollToDeck: () => void;
  onToggleSound: () => void;
  onScrollToClasses: () => void;
  isSoundOn: boolean;
  deckCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onGenerateClick,
  onOpenRoster,
  onScrollToDeck,
  onToggleSound,
  onScrollToClasses,
  isSoundOn,
  deckCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-800/40 bg-[#120E0C]/90 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="/"
          className="text-xl sm:text-2xl font-black tracking-wider text-amber-100 whitespace-nowrap shrink-0 hover:text-amber-300 transition-colors drop-shadow-[0_1px_6px_rgba(245,158,11,0.25)]"
          style={{ fontFamily: 'var(--font-fantasy)' }}
        >
          Mythic Forge
        </a>

        {/* Zone 2: 4 single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-amber-200/80">
          <button
            type="button"
            onClick={onScrollToDeck}
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>My Deck</span>
            {deckCount > 0 && (
              <span className="text-xs text-amber-300 bg-amber-950/80 px-1.5 py-0.2 rounded-full border border-amber-600/40 font-mono font-bold">
                {deckCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onScrollToClasses}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Class Codex
          </button>

          <button
            type="button"
            onClick={onOpenRoster}
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-xs text-amber-400/70"
            title="Open Grimoire Archive"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-500" />
            <span>Vault Archive</span>
          </button>

          <button
            type="button"
            onClick={onToggleSound}
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title={isSoundOn ? 'Mute sound effects' : 'Unmute sound effects'}
          >
            {isSoundOn ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span>Audio Active</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-stone-500" />
                <span>Audio Muted</span>
              </>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onGenerateClick}
            className="btn-fantasy-gold flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold tracking-wide rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Character</span>
          </button>
        </div>
      </div>
    </header>
  );
};
