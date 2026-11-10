import React from 'react';
import { CharacterClassType } from '../types/character';
import { FANTASY_CLASSES } from '../data/fantasyData';
import { Dices } from 'lucide-react';
import { ClassBadgeIcon } from './ClassBadgeIcon';

interface ClassSelectorProps {
  selectedClass: CharacterClassType | 'ALL';
  onSelectClass: (cls: CharacterClassType | 'ALL') => void;
}

const CLASS_LIST: CharacterClassType[] = [
  'Mage',
  'Rogue',
  'Warrior',
  'Archer',
  'Paladin',
  'Necromancer',
  'Druid',
];

export const ClassSelector: React.FC<ClassSelectorProps> = ({
  selectedClass,
  onSelectClass,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
          <span>Transmutation Discipline</span>
        </span>
        <span className="text-xs text-amber-400/70 font-medium">
          {selectedClass === 'ALL'
            ? 'Random class generated on each roll'
            : `Locked to ${selectedClass}`}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#181310] border border-amber-800/40 rounded-xl shadow-inner">
        <button
          type="button"
          onClick={() => onSelectClass('ALL')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
            selectedClass === 'ALL'
              ? 'btn-fantasy-gold shadow-md'
              : 'text-amber-300/70 hover:text-amber-100 hover:bg-[#251D18] border border-transparent'
          }`}
        >
          <Dices className="w-3.5 h-3.5" />
          <span>All Classes (Random)</span>
        </button>

        {CLASS_LIST.map((cls) => {
          const isSelected = selectedClass === cls;
          const theme = FANTASY_CLASSES[cls];

          return (
            <button
              key={cls}
              type="button"
              onClick={() => onSelectClass(cls)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                isSelected
                  ? 'bg-gradient-to-b from-[#38281E] to-[#251D18] text-amber-200 border border-amber-500/60 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                  : 'text-amber-300/70 hover:text-amber-100 hover:bg-[#251D18] border border-transparent'
              }`}
            >
              <ClassBadgeIcon characterClass={cls} size="sm" className="w-3.5 h-3.5" />
              <span>{theme.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
