import React from 'react';

interface AlchemicalCornerProps {
  className?: string;
  size?: number;
}

/**
 * An ornate bronze/gold filigree corner brace with rivet detail,
 * characteristic of ancient alchemical tomes and apothecary workstations.
 */
export const AlchemicalCorner: React.FC<AlchemicalCornerProps> = ({
  className = '',
  size = 28,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
    >
      {/* Outer corner angle */}
      <path
        d="M2 38V6C2 3.79086 3.79086 2 6 2H38"
        stroke="#D97706"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Inner filigree curve */}
      <path
        d="M2 24C12 24 24 12 24 2"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeDasharray="2 2"
      />
      {/* Corner Rivet / Brass Stud */}
      <circle cx="8" cy="8" r="3.5" fill="#B45309" stroke="#FDE68A" strokeWidth="1" />
      <line x1="6.5" y1="8" x2="9.5" y2="8" stroke="#78350F" strokeWidth="0.8" />
      {/* Scroll Flourish */}
      <path
        d="M6 16C10 16 16 10 16 6"
        stroke="#FBBF24"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};
