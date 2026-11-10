import React from 'react';
import { CharacterClassType } from '../types/character';

interface ClassBadgeIconProps {
  characterClass: CharacterClassType;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ClassBadgeIcon: React.FC<ClassBadgeIconProps> = ({
  characterClass,
  className = '',
  size = 'md',
}) => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const currentSize = sizeMap[size];

  switch (characterClass) {
    case 'Mage':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${currentSize} ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 3" />
          <polygon points="50,14 86,72 14,72" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.6" />
          <polygon points="50,86 86,28 14,28" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.6" />
          <circle cx="50" cy="50" r="16" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" />
          <path d="M50 24V76M24 50H76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="50" cy="50" r="4" fill="currentColor" />
        </svg>
      );

    case 'Rogue':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${currentSize} ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="2.5" />
          {/* Crossed daggers */}
          <path d="M26 26L74 74M74 26L26 74" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          {/* Dagger blades */}
          <path d="M48 52L22 78L26 82L52 56Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
          <path d="M52 52L78 78L74 82L48 56Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
          {/* Shadow cowl crescent */}
          <path d="M35 32C42 24 58 24 65 32C60 44 40 44 35 32Z" fill="currentColor" />
        </svg>
      );

    case 'Warrior':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${currentSize} ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="2.5" />
          {/* Tower shield outline */}
          <path
            d="M30 26H70V54C70 68 50 82 50 82C50 82 30 68 30 54V26Z"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="currentColor"
            fillOpacity="0.1"
          />
          {/* Broadsword through center */}
          <path d="M50 16V72M44 30H56M47 72L50 78L53 72Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="18" r="3" fill="currentColor" />
        </svg>
      );

    case 'Archer':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${currentSize} ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="2.5" strokeDasharray="8 4" />
          {/* Greatbow arc */}
          <path
            d="M32 24C58 34 68 50 68 76"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Bowstring */}
          <line x1="32" y1="24" x2="68" y2="76" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
          {/* Arrow */}
          <line x1="22" y1="78" x2="76" y2="24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <polygon points="76,24 66,26 74,34" fill="currentColor" />
          <line x1="22" y1="78" x2="16" y2="84" stroke="currentColor" strokeWidth="2" />
        </svg>
      );

    case 'Paladin':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${currentSize} ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="2.5" />
          {/* Radiant Sunburst */}
          <circle cx="50" cy="50" r="16" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.2" />
          <path
            d="M50 12V26M50 74V88M12 50H26M74 50H88M23 23L33 33M67 67L77 77M23 77L33 67M67 33L77 23"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Golden Templar Cross inside */}
          <path d="M50 38V62M38 50H62" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" />
        </svg>
      );

    case 'Necromancer':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${currentSize} ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="2.5" strokeDasharray="5 3" />
          {/* Stylized skull */}
          <path
            d="M34 46C34 32 40 24 50 24C60 24 66 32 66 46C66 54 62 58 60 62L60 70H40L40 62C38 58 34 54 34 46Z"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="currentColor"
            fillOpacity="0.15"
          />
          {/* Eye sockets */}
          <circle cx="43" cy="45" r="4" fill="currentColor" />
          <circle cx="57" cy="45" r="4" fill="currentColor" />
          {/* Jaw teeth lines */}
          <path d="M45 66V70M50 66V70M55 66V70" stroke="currentColor" strokeWidth="2" />
          {/* Soul flame wisps */}
          <path d="M26 78C30 72 38 72 38 78C38 84 32 88 26 78Z" fill="currentColor" opacity="0.6" />
          <path d="M74 78C70 72 62 72 62 78C62 84 68 88 74 78Z" fill="currentColor" opacity="0.6" />
        </svg>
      );

    case 'Druid':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${currentSize} ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="2.5" />
          {/* Antler branches & leaf motif */}
          <path
            d="M50 78V36M50 48C40 42 34 34 32 22M50 48C60 42 66 34 68 22"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path d="M38 32C32 30 28 26 26 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M62 32C68 30 72 26 74 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          {/* Sacred leaf center */}
          <path
            d="M50 36C42 46 44 60 50 66C56 60 58 46 50 36Z"
            fill="currentColor"
            fillOpacity="0.25"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );

    default:
      return null;
  }
};
