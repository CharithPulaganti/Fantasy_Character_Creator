import React from 'react';
import { CharacterClassType } from '../types/character';
import { FANTASY_CLASSES, SUBCLASSES } from '../data/fantasyData';
import { ClassBadgeIcon } from './ClassBadgeIcon';
import { Sparkles, ArrowRight } from 'lucide-react';

interface ClassCodexSectionProps {
  onGenerateSpecificClass: (cls: CharacterClassType) => void;
}

const ORDERED_CLASSES: CharacterClassType[] = [
  'Mage',
  'Rogue',
  'Warrior',
  'Archer',
  'Paladin',
  'Necromancer',
  'Druid',
];

export const ClassCodexSection: React.FC<ClassCodexSectionProps> = ({
  onGenerateSpecificClass,
}) => {
  return (
    <section id="classes" className="space-y-6 pt-10 border-t border-amber-800/40">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2
            className="text-2xl sm:text-3xl font-black tracking-wide text-amber-100"
            style={{ fontFamily: 'var(--font-fantasy)' }}
          >
            The Seven Alchemical Disciplines
          </h2>
          <p className="text-sm text-amber-300/70 mt-1 max-w-xl">
            Explore each ancient archetype. Select any discipline to forge an instant hero tailored to that school of power.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {ORDERED_CLASSES.map((cls) => {
          const theme = FANTASY_CLASSES[cls];
          const subclasses = SUBCLASSES[cls].slice(0, 3).join(', ');

          return (
            <div
              key={cls}
              onClick={() => onGenerateSpecificClass(cls)}
              className="group p-5 rounded-xl border border-amber-800/40 bg-[#181310] hover:bg-[#221B16] hover:border-amber-500/60 hover:shadow-[0_4px_24px_rgba(245,158,11,0.15)] transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 shadow-md active:scale-[0.98]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${theme.primaryColor} text-amber-100 shadow-md group-hover:scale-105 transition-transform ring-1 ring-amber-500/30`}
                  >
                    <ClassBadgeIcon characterClass={cls} size="sm" className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-semibold ${theme.accentColor}`}>
                    {theme.subtitle}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                    {cls}
                  </h3>
                  <p className="text-xs text-amber-200/70 leading-relaxed mt-1">
                    {theme.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-amber-900/30 flex items-center justify-between text-xs text-amber-400/80">
                <span className="truncate max-w-[160px] text-[11px] text-amber-500/70">
                  {subclasses}
                </span>
                <span className="flex items-center gap-1 font-bold text-amber-400 group-hover:translate-x-0.5 transition-transform">
                  <span>Transmute</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
