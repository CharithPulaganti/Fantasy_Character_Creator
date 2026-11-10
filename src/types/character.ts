export type CharacterClassType =
  | 'Mage'
  | 'Rogue'
  | 'Warrior'
  | 'Archer'
  | 'Paladin'
  | 'Necromancer'
  | 'Druid';

export interface AttributeStats {
  strength: number;
  agility: number;
  intelligence: number;
  wisdom: number;
  constitution: number;
  charisma: number;
}

export interface CharacterEquipment {
  weapon: string;
  armor: string;
  trinket: string;
}

export interface CharacterLore {
  title: string;
  race: string;
  subclass: string;
  alignment: string;
  origin: string;
  personalityQuirk: string;
  signatureAbility: string;
}

export interface CharacterCombat {
  level: number;
  health: number;
  energy: number;
  energyType: 'Mana' | 'Stamina' | 'Divine Favor' | 'Soul Energy' | 'Primal Essence';
  armorClass: number;
}

export interface CardStats {
  health: number;
  mana: number;
  strength: number;
}

export interface FantasyCharacter {
  id: string;
  name: string;
  characterClass: CharacterClassType;
  lore: CharacterLore;
  stats: AttributeStats;
  combat: CharacterCombat;
  cardStats: CardStats;
  equipment: CharacterEquipment;
  timestamp: number;
  portraitSeed?: number;
  hasPortrait?: boolean;
}

export interface ClassTheme {
  name: CharacterClassType;
  subtitle: string;
  iconName: string;
  primaryColor: string;
  accentColor: string;
  glowColor: string;
  bgGradient: string;
  description: string;
}
