import React from 'react';
import { FantasyCharacter } from '../types/character';
import { FANTASY_CLASSES } from '../data/fantasyData';

interface FantasyPortraitProps {
  character: FantasyCharacter;
  variation?: number;
  className?: string;
}

// Simple deterministic hash based on string
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export const FantasyPortrait: React.FC<FantasyPortraitProps> = ({
  character,
  variation = 0,
  className = '',
}) => {
  const { name, characterClass, lore } = character;
  const nameHash = hashCode(name + characterClass);
  const v = (variation + nameHash) % 5;

  const skinTones = ['#FAD0B1', '#E8B38E', '#D1926D', '#B07550', '#8D5B4C', '#E2D4F0', '#CFD8DC'];
  const skinColor = skinTones[(nameHash + (lore.race.includes('Elf') ? 0 : 2)) % skinTones.length];

  const hairColors = ['#2C1A14', '#53311E', '#9E4717', '#E5A93C', '#E0E7EC', '#683A7E', '#2A4365'];
  const hairColor = hairColors[(nameHash + v) % hairColors.length];

  const isElf = lore.race.includes('Elf');
  const isDwarf = lore.race.includes('Dwarf');
  const isTiefling = lore.race.includes('Tiefling');

  const theme = FANTASY_CLASSES[characterClass];

  return (
    <div className={`relative aspect-square w-full rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-2xl bg-slate-950 ${className}`}>
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full object-cover select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients for backgrounds and gear */}
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            {characterClass === 'Mage' && (
              <>
                <stop offset="0%" stopColor="#2E1065" />
                <stop offset="50%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#3B0764" />
              </>
            )}
            {characterClass === 'Rogue' && (
              <>
                <stop offset="0%" stopColor="#064E3B" />
                <stop offset="50%" stopColor="#022C22" />
                <stop offset="100%" stopColor="#0F172A" />
              </>
            )}
            {characterClass === 'Warrior' && (
              <>
                <stop offset="0%" stopColor="#7F1D1D" />
                <stop offset="50%" stopColor="#18181B" />
                <stop offset="100%" stopColor="#450A0A" />
              </>
            )}
            {characterClass === 'Archer' && (
              <>
                <stop offset="0%" stopColor="#78350F" />
                <stop offset="50%" stopColor="#1C1917" />
                <stop offset="100%" stopColor="#14532D" />
              </>
            )}
            {characterClass === 'Paladin' && (
              <>
                <stop offset="0%" stopColor="#713F12" />
                <stop offset="50%" stopColor="#1E1B4B" />
                <stop offset="100%" stopColor="#854D0E" />
              </>
            )}
            {characterClass === 'Necromancer' && (
              <>
                <stop offset="0%" stopColor="#164E63" />
                <stop offset="50%" stopColor="#09090B" />
                <stop offset="100%" stopColor="#3B0764" />
              </>
            )}
            {characterClass === 'Druid' && (
              <>
                <stop offset="0%" stopColor="#065F46" />
                <stop offset="50%" stopColor="#022C22" />
                <stop offset="100%" stopColor="#14532D" />
              </>
            )}
          </linearGradient>

          <radialGradient id="auraGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor={theme.glowColor} stopOpacity="0.8" />
            <stop offset="70%" stopColor={theme.glowColor} stopOpacity="0" />
          </radialGradient>

          <linearGradient id="armorMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="50%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          <linearGradient id="goldTrim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="60%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#854D0E" />
          </linearGradient>

          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Background Scene Canvas */}
        <rect width="400" height="400" fill="url(#bgGrad)" />

        {/* Dynamic Class Background Elements */}
        {characterClass === 'Mage' && (
          <g opacity="0.35">
            <circle cx="200" cy="180" r="140" stroke="#C084FC" strokeWidth="2" strokeDasharray="10 6" />
            <polygon points="200,60 320,270 80,270" stroke="#E9D5FF" strokeWidth="1.5" fill="none" />
            <polygon points="200,300 320,90 80,90" stroke="#E9D5FF" strokeWidth="1.5" fill="none" />
            <circle cx="200" cy="180" r="40" stroke="#A855F7" strokeWidth="2" />
            {/* Stars */}
            <circle cx="90" cy="80" r="2.5" fill="#F3E8FF" />
            <circle cx="310" cy="90" r="3" fill="#F3E8FF" />
            <circle cx="70" cy="220" r="2" fill="#F3E8FF" />
            <circle cx="330" cy="210" r="2.5" fill="#F3E8FF" />
          </g>
        )}

        {characterClass === 'Rogue' && (
          <g opacity="0.3">
            {/* Rooftop silhouette & moon */}
            <circle cx="320" cy="90" r="45" fill="#E2E8F0" opacity="0.2" />
            <path d="M0 320L60 280L140 330L220 270L300 310L400 260V400H0Z" fill="#0F172A" />
            <path d="M50 180C100 160 140 220 200 170C260 120 320 200 380 150" stroke="#10B981" strokeWidth="2" strokeDasharray="4 8" opacity="0.4" />
          </g>
        )}

        {characterClass === 'Warrior' && (
          <g opacity="0.35">
            {/* Battle fortress & flying embers */}
            <path d="M40 100V300H360V100L300 140L250 90L200 130L150 90L100 140Z" fill="#27272A" />
            <circle cx="100" cy="180" r="4" fill="#F87171" filter="url(#glowEffect)" />
            <circle cx="120" cy="130" r="2" fill="#FBBF24" />
            <circle cx="280" cy="110" r="3.5" fill="#F87171" filter="url(#glowEffect)" />
            <circle cx="310" cy="170" r="2" fill="#FBBF24" />
          </g>
        )}

        {characterClass === 'Archer' && (
          <g opacity="0.3">
            {/* Mountain pine silhouettes */}
            <polygon points="50,280 90,160 130,280" fill="#064E3B" />
            <polygon points="120,300 160,180 200,300" fill="#022C22" />
            <polygon points="270,290 310,170 350,290" fill="#064E3B" />
            {/* Wind lines */}
            <path d="M40 80C120 70 200 110 360 80" stroke="#FDE68A" strokeWidth="1.5" strokeDasharray="8 6" />
          </g>
        )}

        {characterClass === 'Paladin' && (
          <g opacity="0.35">
            {/* Cathedral stained glass rays */}
            <polygon points="200,0 120,400 160,400" fill="#FEF08A" opacity="0.2" />
            <polygon points="200,0 240,400 280,400" fill="#FEF08A" opacity="0.2" />
            <circle cx="200" cy="150" r="110" stroke="#FACC15" strokeWidth="2" strokeDasharray="6 4" />
            <path d="M200 40V260M90 150H310" stroke="#FACC15" strokeWidth="1.5" />
          </g>
        )}

        {characterClass === 'Necromancer' && (
          <g opacity="0.35">
            {/* Crypt stones and spectral souls */}
            <circle cx="100" cy="140" r="16" fill="#06B6D4" opacity="0.25" filter="url(#glowEffect)" />
            <circle cx="300" cy="130" r="20" fill="#06B6D4" opacity="0.25" filter="url(#glowEffect)" />
            <path d="M90 150C95 130 110 130 105 150" stroke="#22D3EE" strokeWidth="2" />
            <path d="M290 140C295 115 315 115 310 140" stroke="#22D3EE" strokeWidth="2" />
          </g>
        )}

        {characterClass === 'Druid' && (
          <g opacity="0.35">
            {/* Ancient grove trunk & firefly motes */}
            <circle cx="200" cy="180" r="120" stroke="#4ADE80" strokeWidth="2" strokeDasharray="12 6" />
            <circle cx="80" cy="140" r="3" fill="#86EFAC" filter="url(#glowEffect)" />
            <circle cx="120" cy="90" r="2.5" fill="#FEF08A" filter="url(#glowEffect)" />
            <circle cx="310" cy="160" r="3" fill="#86EFAC" filter="url(#glowEffect)" />
            <circle cx="280" cy="100" r="2" fill="#FEF08A" filter="url(#glowEffect)" />
          </g>
        )}

        {/* Aura ambient back glow */}
        <circle cx="200" cy="180" r="160" fill="url(#auraGlow)" />

        {/* 2. Character Torso, Armor & Robes */}
        <g id="torso">
          {/* Base Shoulders */}
          <path
            d="M100 380 C110 300, 150 270, 200 270 C250 270, 290 300, 300 380 Z"
            fill={
              characterClass === 'Mage' ? '#312E81' :
              characterClass === 'Rogue' ? '#1E293B' :
              characterClass === 'Warrior' ? '#334155' :
              characterClass === 'Archer' ? '#451A03' :
              characterClass === 'Paladin' ? '#F8FAFC' :
              characterClass === 'Necromancer' ? '#18181B' :
              '#14532D'
            }
            stroke="#0F172A"
            strokeWidth="4"
          />

          {/* Pauldrons / Armor Trim */}
          {characterClass === 'Warrior' && (
            <g>
              {/* Spiked steel shoulders */}
              <path d="M80 340 L120 280 L160 310 L120 370 Z" fill="url(#armorMetal)" stroke="#1E293B" strokeWidth="3" />
              <path d="M320 340 L280 280 L240 310 L280 370 Z" fill="url(#armorMetal)" stroke="#1E293B" strokeWidth="3" />
              {/* Spikes */}
              <polygon points="100,280 85,250 115,270" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2" />
              <polygon points="300,280 315,250 285,270" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2" />
              {/* Chest crest */}
              <path d="M170 300 H230 L200 350 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
            </g>
          )}

          {characterClass === 'Paladin' && (
            <g>
              {/* Gold trimmed radiant pauldrons */}
              <path d="M80 340 C90 280, 150 280, 160 320 Z" fill="url(#goldTrim)" stroke="#854D0E" strokeWidth="3" />
              <path d="M320 340 C310 280, 250 280, 240 320 Z" fill="url(#goldTrim)" stroke="#854D0E" strokeWidth="3" />
              {/* Holy cross on chest */}
              <rect x="194" y="295" width="12" height="60" fill="url(#goldTrim)" />
              <rect x="175" y="310" width="50" height="12" fill="url(#goldTrim)" />
            </g>
          )}

          {characterClass === 'Mage' && (
            <g>
              {/* High scholar collar */}
              <path d="M150 270 L140 230 L170 260 L200 275 L230 260 L260 230 L250 270 Z" fill="#4C1D95" stroke="#7C3AED" strokeWidth="2.5" />
              {/* Astral Gem Medallion */}
              <polygon points="200,285 212,302 200,320 188,302" fill="#C084FC" stroke="#E9D5FF" strokeWidth="2" filter="url(#glowEffect)" />
            </g>
          )}

          {characterClass === 'Rogue' && (
            <g>
              {/* Leather straps & throwing daggers */}
              <path d="M130 380 L240 280" stroke="#78350F" strokeWidth="8" />
              <path d="M155 315 L175 300" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
              <path d="M175 335 L195 320" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
            </g>
          )}

          {characterClass === 'Archer' && (
            <g>
              {/* Quiver harness & feather clasp */}
              <path d="M140 280 L260 380" stroke="#78350F" strokeWidth="9" />
              <circle cx="200" cy="330" r="10" fill="url(#goldTrim)" stroke="#78350F" strokeWidth="2" />
              <polygon points="120,290 100,240 130,270" fill="#F59E0B" />
            </g>
          )}

          {characterClass === 'Necromancer' && (
            <g>
              {/* Ribcage / Bone collar */}
              <path d="M150 290 Q200 320 250 290" stroke="#E2E8F0" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M160 315 Q200 345 240 315" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" fill="none" />
              <circle cx="200" cy="305" r="8" fill="#06B6D4" filter="url(#glowEffect)" />
            </g>
          )}

          {characterClass === 'Druid' && (
            <g>
              {/* Fur mantle & vine torc */}
              <path d="M110 320 C130 260, 270 260, 290 320" stroke="#78350F" strokeWidth="14" strokeLinecap="round" fill="none" />
              <path d="M150 280 Q200 305 250 280" stroke="#22C55E" strokeWidth="4" fill="none" />
              <circle cx="200" cy="295" r="7" fill="#15803D" />
            </g>
          )}
        </g>

        {/* 3. Neck & Head Base */}
        <g id="head-base">
          {/* Neck */}
          <rect x="180" y="220" width="40" height="60" rx="8" fill={skinColor} stroke="#0F172A" strokeWidth="3" />
          <path d="M180 250 Q200 265 220 250" fill="none" stroke="#00000020" strokeWidth="3" />

          {/* Ears (Pointed if Elf) */}
          {isElf ? (
            <g fill={skinColor} stroke="#0F172A" strokeWidth="3">
              <polygon points="135,170 85,135 140,195" />
              <polygon points="265,170 315,135 260,195" />
              <circle cx="95" cy="145" r="2.5" fill="url(#goldTrim)" />
              <circle cx="305" cy="145" r="2.5" fill="url(#goldTrim)" />
            </g>
          ) : (
            <g fill={skinColor} stroke="#0F172A" strokeWidth="2.5">
              <ellipse cx="140" cy="180" rx="10" ry="16" />
              <ellipse cx="260" cy="180" rx="10" ry="16" />
            </g>
          )}

          {/* Tiefling Horns */}
          {isTiefling && (
            <g fill="#1E293B" stroke="#0F172A" strokeWidth="3">
              <path d="M150 140 C120 90, 80 80, 70 50 C100 65, 130 100, 155 130 Z" />
              <path d="M250 140 C280 90, 320 80, 330 50 C300 65, 270 100, 245 130 Z" />
            </g>
          )}

          {/* Face Base */}
          <path
            d="M140 160 C140 120, 260 120, 260 160 C260 215, 230 250, 200 250 C170 250, 140 215, 140 160 Z"
            fill={skinColor}
            stroke="#0F172A"
            strokeWidth="3.5"
          />

          {/* Cheek / Warpaint */}
          {characterClass === 'Warrior' && (
            <g fill="#DC2626" opacity="0.8">
              <polygon points="152,185 170,195 155,200" />
              <polygon points="248,185 230,195 245,200" />
            </g>
          )}
          {characterClass === 'Druid' && (
            <g stroke="#16A34A" strokeWidth="2" fill="none" opacity="0.8">
              <path d="M155 185 Q165 195 155 205" />
              <path d="M245 185 Q235 195 245 205" />
            </g>
          )}
        </g>

        {/* 4. Facial Features (Eyes, Eyebrows, Nose, Mouth) */}
        <g id="face-features">
          {/* Eyebrows */}
          <path
            d={v % 2 === 0 ? "M160 155 Q175 150 188 156" : "M160 152 Q175 148 188 154"}
            stroke={hairColor}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={v % 2 === 0 ? "M240 155 Q225 150 212 156" : "M240 152 Q225 148 212 154"}
            stroke={hairColor}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Eyes: Class-specific glowing magic */}
          {characterClass === 'Mage' ? (
            <g>
              <ellipse cx="174" cy="168" rx="10" ry="7" fill="#F3E8FF" stroke="#581C87" strokeWidth="2" />
              <ellipse cx="226" cy="168" rx="10" ry="7" fill="#F3E8FF" stroke="#581C87" strokeWidth="2" />
              <circle cx="174" cy="168" r="4.5" fill="#A855F7" filter="url(#glowEffect)" />
              <circle cx="226" cy="168" r="4.5" fill="#A855F7" filter="url(#glowEffect)" />
              <circle cx="176" cy="166" r="1.5" fill="#FFFFFF" />
              <circle cx="228" cy="166" r="1.5" fill="#FFFFFF" />
            </g>
          ) : characterClass === 'Necromancer' ? (
            <g>
              <ellipse cx="174" cy="168" rx="10" ry="6" fill="#083344" stroke="#0E7490" strokeWidth="2" />
              <ellipse cx="226" cy="168" rx="10" ry="6" fill="#083344" stroke="#0E7490" strokeWidth="2" />
              <circle cx="174" cy="168" r="4" fill="#22D3EE" filter="url(#glowEffect)" />
              <circle cx="226" cy="168" r="4" fill="#22D3EE" filter="url(#glowEffect)" />
            </g>
          ) : characterClass === 'Paladin' ? (
            <g>
              <ellipse cx="174" cy="168" rx="10" ry="7" fill="#FEF9C3" stroke="#854D0E" strokeWidth="2" />
              <ellipse cx="226" cy="168" rx="10" ry="7" fill="#FEF9C3" stroke="#854D0E" strokeWidth="2" />
              <circle cx="174" cy="168" r="4.5" fill="#EAB308" filter="url(#glowEffect)" />
              <circle cx="226" cy="168" r="4.5" fill="#EAB308" filter="url(#glowEffect)" />
              <circle cx="176" cy="166" r="1.5" fill="#FFFFFF" />
              <circle cx="228" cy="166" r="1.5" fill="#FFFFFF" />
            </g>
          ) : characterClass === 'Rogue' ? (
            <g>
              <ellipse cx="174" cy="168" rx="10" ry="5" fill="#022C22" stroke="#065F46" strokeWidth="2" />
              <ellipse cx="226" cy="168" rx="10" ry="5" fill="#022C22" stroke="#065F46" strokeWidth="2" />
              <circle cx="174" cy="168" r="3.5" fill="#10B981" filter="url(#glowEffect)" />
              <circle cx="226" cy="168" r="3.5" fill="#10B981" filter="url(#glowEffect)" />
              <circle cx="175" cy="166" r="1" fill="#FFFFFF" />
              <circle cx="227" cy="166" r="1" fill="#FFFFFF" />
            </g>
          ) : (
            <g>
              <ellipse cx="174" cy="168" rx="10" ry="7" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
              <ellipse cx="226" cy="168" rx="10" ry="7" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
              <circle cx="174" cy="168" r="4.5" fill="#2563EB" />
              <circle cx="226" cy="168" r="4.5" fill="#2563EB" />
              <circle cx="175" cy="166" r="1.5" fill="#FFFFFF" />
              <circle cx="227" cy="166" r="1.5" fill="#FFFFFF" />
            </g>
          )}

          {/* Nose */}
          <path d="M200 170 L195 195 L204 195" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Mouth (expression varies by seed) */}
          {v % 3 === 0 ? (
            // Smirk
            <path d="M188 218 Q200 226 215 216" stroke="#451A03" strokeWidth="3" strokeLinecap="round" fill="none" />
          ) : v % 3 === 1 ? (
            // Confident warrior grin
            <path d="M185 218 Q200 228 215 218" stroke="#451A03" strokeWidth="3" strokeLinecap="round" fill="none" />
          ) : (
            // Serious / stoic straight mouth
            <path d="M186 219 L214 219" stroke="#451A03" strokeWidth="3" strokeLinecap="round" fill="none" />
          )}

          {/* Dwarf Beard */}
          {isDwarf && (
            <path
              d="M145 200 C130 260, 150 340, 200 350 C250 340, 270 260, 255 200 C240 220, 220 230, 200 230 C180 230, 160 220, 145 200 Z"
              fill={hairColor}
              stroke="#0F172A"
              strokeWidth="3.5"
            />
          )}

          {/* Rogue Face Mask if variation is 2 or 4 */}
          {characterClass === 'Rogue' && (v === 1 || v === 3) && (
            <path
              d="M140 190 Q200 215 260 190 L250 250 Q200 270 150 250 Z"
              fill="#0F172A"
              stroke="#334155"
              strokeWidth="2.5"
            />
          )}
        </g>

        {/* 5. Hair & Iconic Class Headgear */}
        <g id="headgear">
          {/* Base Hair behind headgear */}
          <path
            d="M135 160 C130 90, 270 90, 265 160 C260 140, 250 120, 200 120 C150 120, 140 140, 135 160 Z"
            fill={hairColor}
            stroke="#0F172A"
            strokeWidth="3"
          />

          {/* Mage Hat / Arcane Hood */}
          {characterClass === 'Mage' && (
            <g>
              {v % 2 === 0 ? (
                // Classic wizard pointy hat with star
                <g>
                  <ellipse cx="200" cy="130" rx="90" ry="24" fill="#3B0764" stroke="#581C87" strokeWidth="3" />
                  <path d="M130 125 C150 70, 170 30, 250 15 C210 50, 230 80, 270 125 Z" fill="#4C1D95" stroke="#6D28D9" strokeWidth="3" />
                  <ellipse cx="200" cy="122" rx="60" ry="12" fill="none" stroke="url(#goldTrim)" strokeWidth="4" />
                  <polygon points="200,116 204,124 212,125 206,131 208,139 200,135 192,139 194,131 188,125 196,124" fill="#FDE047" />
                </g>
              ) : (
                // Arcane Mystic Hood with floating crystal
                <g>
                  <path d="M125 180 C120 70, 280 70, 275 180 C240 140, 160 140, 125 180 Z" fill="#2E1065" stroke="#7C3AED" strokeWidth="3.5" />
                  <polygon points="200,45 212,65 200,85 188,65" fill="#E879F9" stroke="#FDF4FF" strokeWidth="2" filter="url(#glowEffect)" />
                </g>
              )}
            </g>
          )}

          {/* Rogue Cowl / Shadow Hood */}
          {characterClass === 'Rogue' && (
            <path
              d="M125 180 C120 70, 280 70, 275 180 C240 135, 160 135, 125 180 Z"
              fill="#064E3B"
              stroke="#047857"
              strokeWidth="3.5"
            />
          )}

          {/* Warrior Knight Helmet / Horns */}
          {characterClass === 'Warrior' && (
            <g>
              {v % 2 === 0 ? (
                // Horned steel helm
                <g>
                  <path d="M135 155 C130 85, 270 85, 265 155 L255 120 C230 110, 170 110, 145 120 Z" fill="url(#armorMetal)" stroke="#1E293B" strokeWidth="3.5" />
                  <path d="M135 110 C100 80, 80 50, 65 30 C85 55, 110 80, 135 95 Z" fill="#E2E8F0" stroke="#1E293B" strokeWidth="3" />
                  <path d="M265 110 C300 80, 320 50, 335 30 C315 55, 290 80, 265 95 Z" fill="#E2E8F0" stroke="#1E293B" strokeWidth="3" />
                  <rect x="180" y="75" width="40" height="20" rx="4" fill="#DC2626" />
                </g>
              ) : (
                // Steel Circlet & Fierce Warband
                <g>
                  <rect x="135" y="125" width="130" height="16" rx="4" fill="url(#armorMetal)" stroke="#0F172A" strokeWidth="2.5" />
                  <polygon points="200,115 210,133 190,133" fill="#EF4444" />
                </g>
              )}
            </g>
          )}

          {/* Archer Forest Hood & Feather */}
          {characterClass === 'Archer' && (
            <g>
              <path d="M130 165 C125 80, 275 80, 270 165 C240 135, 160 135, 130 165 Z" fill="#78350F" stroke="#451A03" strokeWidth="3" />
              {/* Green & Gold Arrow Feather */}
              <polygon points="250,110 300,50 280,100" fill="#15803D" stroke="#14532D" strokeWidth="2" />
              <polygon points="255,105 295,55 285,90" fill="#EAB308" />
            </g>
          )}

          {/* Paladin Radiant Crown / Solar Halo */}
          {characterClass === 'Paladin' && (
            <g>
              {/* Glowing Solar Halo */}
              <circle cx="200" cy="110" r="70" fill="none" stroke="url(#goldTrim)" strokeWidth="4" strokeDasharray="14 8" filter="url(#glowEffect)" />
              {/* Golden Coronet / Crown */}
              <polygon points="140,130 160,85 180,115 200,75 220,115 240,85 260,130" fill="url(#goldTrim)" stroke="#854D0E" strokeWidth="2.5" />
              <circle cx="200" cy="100" r="5" fill="#EF4444" />
            </g>
          )}

          {/* Necromancer Skull Cowl / Horned Shroud */}
          {characterClass === 'Necromancer' && (
            <g>
              <path d="M125 180 C115 60, 285 60, 275 180 C240 130, 160 130, 125 180 Z" fill="#09090B" stroke="#18181B" strokeWidth="4" />
              {/* Skeletal bone forehead tiara */}
              <path d="M150 120 Q200 95 250 120 L240 135 Q200 115 160 135 Z" fill="#E2E8F0" stroke="#0F172A" strokeWidth="2.5" />
              <circle cx="200" cy="110" r="6" fill="#06B6D4" filter="url(#glowEffect)" />
            </g>
          )}

          {/* Druid Antler Headdress & Ivy */}
          {characterClass === 'Druid' && (
            <g stroke="#14532D" strokeWidth="3" fill="#451A03">
              {/* Large Antlers */}
              <path d="M155 110 C140 70, 110 50, 80 40 C100 55, 120 70, 130 95" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M120 65 C100 55, 85 55, 75 45" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M245 110 C260 70, 290 50, 320 40 C300 55, 280 70, 270 95" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M280 65 C300 55, 315 55, 325 45" strokeWidth="3.5" strokeLinecap="round" />
              {/* Leaf circlet */}
              <ellipse cx="200" cy="125" rx="55" ry="14" fill="#15803D" stroke="#166534" strokeWidth="2" />
              <circle cx="170" cy="125" r="4" fill="#EF4444" />
              <circle cx="230" cy="125" r="4" fill="#EF4444" />
            </g>
          )}
        </g>

        {/* 6. Foreground Weapon or Magical Particle in Hand */}
        {characterClass === 'Mage' && (
          <g>
            <circle cx="90" cy="310" r="24" fill="#9333EA" opacity="0.8" filter="url(#glowEffect)" />
            <circle cx="90" cy="310" r="10" fill="#FFFFFF" />
            <line x1="90" y1="334" x2="70" y2="400" stroke="#78350F" strokeWidth="7" strokeLinecap="round" />
          </g>
        )}
        {characterClass === 'Rogue' && (
          <g>
            {/* Poisoned Stiletto Blade foreground */}
            <polygon points="75,270 95,260 85,380 65,390" fill="#E2E8F0" stroke="#047857" strokeWidth="2.5" />
            <line x1="85" y1="270" x2="75" y2="380" stroke="#10B981" strokeWidth="3" filter="url(#glowEffect)" />
          </g>
        )}
        {characterClass === 'Warrior' && (
          <g>
            {/* Broadsword Hilt resting on shoulder */}
            <polygon points="80,240 100,240 95,390 75,390" fill="#E2E8F0" stroke="#1E293B" strokeWidth="3" />
            <rect x="65" y="270" width="40" height="8" rx="2" fill="url(#goldTrim)" />
            <circle cx="85" cy="235" r="8" fill="url(#goldTrim)" />
          </g>
        )}
        {characterClass === 'Archer' && (
          <g>
            {/* Bow stave in foreground */}
            <path d="M70 240 Q105 320 80 400" stroke="#78350F" strokeWidth="8" strokeLinecap="round" fill="none" />
            <line x1="70" y1="240" x2="80" y2="400" stroke="#FEF08A" strokeWidth="2" strokeDasharray="4 2" />
          </g>
        )}
        {characterClass === 'Paladin' && (
          <g>
            {/* Radiant Sun Hammer */}
            <rect x="70" y="270" width="45" height="30" rx="4" fill="url(#goldTrim)" stroke="#854D0E" strokeWidth="2.5" />
            <line x1="92" y1="300" x2="85" y2="400" stroke="#78350F" strokeWidth="7" strokeLinecap="round" />
            <polygon points="92,275 97,285 87,285" fill="#FFFFFF" />
          </g>
        )}
        {characterClass === 'Necromancer' && (
          <g>
            {/* Floating soul skull in palm */}
            <circle cx="310" cy="300" r="18" fill="#06B6D4" opacity="0.7" filter="url(#glowEffect)" />
            <circle cx="305" cy="298" r="3" fill="#083344" />
            <circle cx="315" cy="298" r="3" fill="#083344" />
            <path d="M306 308 H314" stroke="#083344" strokeWidth="2" />
          </g>
        )}
        {characterClass === 'Druid' && (
          <g>
            {/* Living wooden staff with sprout */}
            <line x1="310" y1="240" x2="310" y2="400" stroke="#78350F" strokeWidth="8" strokeLinecap="round" />
            <circle cx="310" cy="240" r="12" fill="#22C55E" filter="url(#glowEffect)" />
            <path d="M310 240 C325 230 330 245 320 250 Z" fill="#4ADE80" />
          </g>
        )}

        {/* 7. Bottom Nameplate & Class Ribbon */}
        <g id="nameplate">
          <rect x="15" y="340" width="370" height="46" rx="10" fill="#14100E" fillOpacity="0.95" stroke="url(#goldTrim)" strokeWidth="2" />
          <text
            x="200"
            y="360"
            textAnchor="middle"
            fill="#FEF3C7"
            fontSize="14"
            fontWeight="bold"
            fontFamily="var(--font-fantasy), var(--font-serif), Georgia, serif"
            letterSpacing="0.8"
          >
            {name.length > 24 ? name.substring(0, 22) + '...' : name}
          </text>
          <text
            x="200"
            y="376"
            textAnchor="middle"
            fill="#FBBF24"
            fontSize="10"
            fontWeight="600"
            letterSpacing="1"
          >
            {characterClass.toUpperCase()} &middot; {lore.subclass.toUpperCase()}
          </text>
        </g>

        {/* 8. Ornate Outer RPG Frame Border */}
        <rect x="4" y="4" width="392" height="392" rx="14" fill="none" stroke="url(#goldTrim)" strokeWidth="3" />
        <rect x="10" y="10" width="380" height="380" rx="10" fill="none" stroke="#FFFFFF20" strokeWidth="1" />
        {/* Corner Insets */}
        <polygon points="4,24 24,4 4,4" fill="url(#goldTrim)" />
        <polygon points="396,24 376,4 396,4" fill="url(#goldTrim)" />
        <polygon points="4,376 24,396 4,396" fill="url(#goldTrim)" />
        <polygon points="396,376 376,396 396,396" fill="url(#goldTrim)" />
      </svg>
    </div>
  );
};
