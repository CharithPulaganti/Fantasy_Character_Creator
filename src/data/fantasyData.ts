import { CharacterClassType, ClassTheme } from '../types/character';

export const FANTASY_CLASSES: Record<CharacterClassType, ClassTheme> = {
  Mage: {
    name: 'Mage',
    subtitle: 'Wielder of the Arcane Weave',
    iconName: 'Wand2',
    primaryColor: 'from-violet-600 to-indigo-700',
    accentColor: 'text-violet-400',
    glowColor: 'rgba(139, 92, 246, 0.35)',
    bgGradient: 'bg-gradient-to-br from-violet-950/40 via-slate-900/80 to-indigo-950/40',
    description: 'Masters of esoteric spells, elemental conduits, and reality-altering incantations.',
  },
  Rogue: {
    name: 'Rogue',
    subtitle: 'Phantom of the Shadows',
    iconName: 'Footprints',
    primaryColor: 'from-emerald-600 to-teal-800',
    accentColor: 'text-emerald-400',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    bgGradient: 'bg-gradient-to-br from-emerald-950/40 via-slate-900/80 to-teal-950/40',
    description: 'Acrobatic infiltrators, critical strike specialists, and unseen silent stalkers.',
  },
  Warrior: {
    name: 'Warrior',
    subtitle: 'Ironclad Vanguard of Battle',
    iconName: 'ShieldAlert',
    primaryColor: 'from-rose-600 to-amber-700',
    accentColor: 'text-rose-400',
    glowColor: 'rgba(244, 63, 94, 0.35)',
    bgGradient: 'bg-gradient-to-br from-rose-950/40 via-slate-900/80 to-stone-950/40',
    description: 'Unyielding martial champions capable of shattering enemy formations and enduring fatal blows.',
  },
  Archer: {
    name: 'Archer',
    subtitle: 'Hawkeye of the High Ridge',
    iconName: 'Crosshair',
    primaryColor: 'from-amber-600 to-lime-700',
    accentColor: 'text-amber-400',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    bgGradient: 'bg-gradient-to-br from-amber-950/40 via-slate-900/80 to-lime-950/40',
    description: 'Precision marksmen whose arrows find weak spots across impossible winds and distances.',
  },
  Paladin: {
    name: 'Paladin',
    subtitle: 'Beacon of Sacred Dawn',
    iconName: 'Sun',
    primaryColor: 'from-amber-500 to-yellow-600',
    accentColor: 'text-amber-300',
    glowColor: 'rgba(234, 179, 8, 0.4)',
    bgGradient: 'bg-gradient-to-br from-amber-950/40 via-slate-900/80 to-yellow-950/40',
    description: 'Holy crusaders empowered by sacred vows to protect the innocent and smite wickedness.',
  },
  Necromancer: {
    name: 'Necromancer',
    subtitle: 'Harvester of Lost Souls',
    iconName: 'Skull',
    primaryColor: 'from-cyan-600 to-purple-800',
    accentColor: 'text-cyan-400',
    glowColor: 'rgba(6, 182, 212, 0.35)',
    bgGradient: 'bg-gradient-to-br from-cyan-950/40 via-slate-900/80 to-purple-950/40',
    description: 'Dark conjurers commanding spectral legions, bone marrow hexes, and soul siphons.',
  },
  Druid: {
    name: 'Druid',
    subtitle: 'Voice of the Primeval Wild',
    iconName: 'Trees',
    primaryColor: 'from-green-600 to-emerald-800',
    accentColor: 'text-emerald-400',
    glowColor: 'rgba(34, 197, 94, 0.35)',
    bgGradient: 'bg-gradient-to-br from-emerald-950/40 via-slate-900/80 to-green-950/40',
    description: 'Nature wardens commanding living storms, shapeshifting forms, and ancient earthen rites.',
  },
};

export const FIRST_NAMES: string[] = [
  'Thalor', 'Lyra', 'Garrick', 'Vespera', 'Kaelen', 'Elowen', 'Draeven', 'Aurelia',
  'Baelor', 'Morrigan', 'Zephyr', 'Valeria', 'Fenris', 'Seraphina', 'Rowan', 'Osric',
  'Thyra', 'Alastair', 'Caelum', 'Nyx', 'Darian', 'Rhiannon', 'Torin', 'Sylas',
  'Isolde', 'Gideon', 'Evander', 'Faelan', 'Aeloria', 'Cassian', 'Mirella', 'Branoc',
  'Soren', 'Kaelitha', 'Vondur', 'Astrid', 'Corvus', 'Theron', 'Elira', 'Lucan',
  'Zarek', 'Yvaine', 'Ragnor', 'Leona', 'Tariq', 'Naida', 'Ignis', 'Xanthos',
];

export const SURNAME_PREFIXES: string[] = [
  'Storm', 'Shadow', 'Iron', 'Moon', 'Ember', 'Frost', 'Night', 'Sun',
  'Stone', 'Raven', 'Blood', 'Dawn', 'Star', 'Wild', 'Grave', 'Ash',
  'Silver', 'Thunder', 'Void', 'Wind', 'Dusk', 'Bramble', 'Oak', 'Gloom',
];

export const SURNAME_SUFFIXES: string[] = [
  'weaver', 'shade', 'guard', 'whisper', 'bringer', 'walker', 'thorn', 'strike',
  'caller', 'gale', 'seeker', 'wood', 'clad', 'fang', 'strider', 'crest',
  'binder', 'fall', 'forge', 'bane', 'rider', 'flame', 'singer', 'shield',
];

export const TITLES: string[] = [
  'the Undaunted', 'the Unbroken', 'the Silent', 'the Sunwarden', 'the Ascendant',
  'of the Astral Verge', 'the Bone Carver', 'the Hearthkeeper', 'of the Whispering Pines',
  'the Ever-Watchful', 'Bane of Wyrms', 'Wanderer of Mists', 'the Iron-Willed',
  'of the Shattered Veil', 'the Moon-Touched', 'the Oathkeeper', 'the Relentless',
  'of the Obsidian Spire', 'the Swiftwind', 'the Resolute', 'Keeper of the Grove',
];

export const RACES: string[] = [
  'High Elf', 'Wood Elf', 'Drow', 'Mountain Dwarf', 'Iron Dwarf',
  'Imperial Human', 'Nomad Human', 'Tiefling', 'Dragonborn',
  'Celestial Aasimar', 'Half-Elf', 'Goliath', 'Forest Sylph',
];

export const SUBCLASSES: Record<CharacterClassType, string[]> = {
  Mage: ['Arcane Scholar', 'Pyromancer', 'Chronomancer', 'Frost Evoker', 'Astral Seer'],
  Rogue: ['Shadow Infiltrator', 'Acrobatic Duelist', 'Silent Assassin', 'Gilded Thief', 'Phantom Scout'],
  Warrior: ['Berserker Vanguard', 'Gladiator Champion', 'Shield Paragon', 'Warmaster', 'Ironclad Knight'],
  Archer: ['Windrunner Marksman', 'Hawkeye Sniper', 'Beast Hunter', 'Gloom Stalker', 'Wayfinder'],
  Paladin: ['Oath of the Dawn', 'Sunwarden Crusader', 'Shield of Righteousness', 'Avenging Templar', 'Silver Hand'],
  Necromancer: ['Lord of Graves', 'Soul Harvester', 'Bone Sculptor', 'Plague Weaver', 'Specter Binder'],
  Druid: ['Circle of the Wild', 'Warden of Thorns', 'Stormcaller Shaman', 'Grove Shepherd', 'Beast Aspect'],
};

export const ALIGNMENTS: string[] = [
  'Lawful Good', 'Neutral Good', 'Chaotic Good',
  'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
  'Lawful Evil', 'Neutral Evil', 'Chaotic Evil',
];

export const WEAPONS_BY_CLASS: Record<CharacterClassType, string[]> = {
  Mage: [
    'Staff of Celestial Resonances',
    'Arcane Conduit Wand & Glass Focus',
    'Bound Grimoire of Prismatic Rites',
    'Chronomantic Hourglass Blade',
  ],
  Rogue: [
    'Twin Serrated Obsidian Stilettos',
    'Shadowforged Kriss & Smoke Bombs',
    'Concealed Wrist Blades & Spring Wire',
    'Venom-Dipped Dual Daggers',
  ],
  Warrior: [
    'Runed Greatsword of Sunken Iron',
    'Battle-Worn War Cleaver & Tower Shield',
    'Heavy Halberd of the Vanguard',
    'Twin Dwarven Forged Battleaxes',
  ],
  Archer: [
    'Yew Composite Longbow of the Hawkeye',
    'Windforged Recurve & Barbed Quiver',
    'Twin Repeating Hand Crossbows',
    'Moonlit Greatbow with Silver Tips',
  ],
  Paladin: [
    'Blessed Sun-Forged Warhammer & Crested Kite Shield',
    'Consecrated Bastard Sword of the Radiant Host',
    'Gilded Morningstar with Holy Censer',
    'Dawnlit Broadsword & Aegis of Light',
  ],
  Necromancer: [
    'Ossuary Scythe of the Bone Shepherd',
    'Spinal Scepter & Lantern of Trapped Wights',
    'Tome of Forbidden Epitaphs & Athame',
    'Bleached Skull Focus & Soul-Drain Dagger',
  ],
  Druid: [
    'Living Ironwood Quarterstaff with Vine Coils',
    'Sickle of the Harvest Moon & Mistletoe Totem',
    'Antler Cudgel & Petrified Bark Buckler',
    'Great Oak Spear with Rune Leaves',
  ],
};

export const ARMOR_BY_CLASS: Record<CharacterClassType, string[]> = {
  Mage: [
    'Silken Astral Robes with Runic Thread',
    'Embroidered Scholar Mantle & Leather Bracers',
    'Vestments of Starlight Gossamer',
  ],
  Rogue: [
    'Supple Shadow-Dyed Leather Gambeson',
    'Midnight Shrouded Studded Vest & Cloak',
    'Reinforced Darkweave Infiltrator Suit',
  ],
  Warrior: [
    'Fluted Steel Plate & Chainmail Hauberk',
    'Heavy Vanguard Fortress Armor',
    'Dragonbone Reinforced Brigandine',
  ],
  Archer: [
    'Fitted Boar-Hide Jerkin & Camouflage Mantle',
    'Nimble Forest Leather with Quiver Harness',
    'Elven Ringmail with Feather Trim',
  ],
  Paladin: [
    'Polished Auric Plate with Holy Vestment',
    'Gilded Silver Harness & Cloak of Purity',
    'Engraved Sanctuary Cuirass & Greaves',
  ],
  Necromancer: [
    'Tattered Crypt Shroud with Ash-Stitched Hem',
    'Grimoire Harness & Ribcage Cuirass',
    'Midnight Velvet Coat with Bone Talismans',
  ],
  Druid: [
    'Cured Boar Hide & Moss-Weave Vestment',
    'Carved Barkscale Armor with Ivy Mantle',
    'Woven Vine Tunic & Antler Shoulder Guards',
  ],
};

export const TRINKETS: string[] = [
  'A cracked pocket watch ticking backwards',
  'A silver locket containing pressed moonflower petals',
  'An ancient coin minted by an empire erased from history',
  'A warm smooth pebble that faintly glows near danger',
  'A carved bone dice that always rolls odd numbers',
  'A vial of shimmering water collected from an astral well',
  'A tarnished signet ring bearing a raven crest',
  'A dried sprig of yew wrapped in gold wire',
  'A music box playing three melancholic notes',
  'A small compass pointing towards the nearest ley line',
];

export const ORIGINS: string[] = [
  'Exiled scholar cast out of the Sunken Academy for reading forbidden prophecies.',
  'Last surviving guard of a forgotten frontier citadel swallowed by frost.',
  'Born during a total solar eclipse under the gaze of a wandering star.',
  'Former arena champion who shattered their own chains to wander the wilderness.',
  'Raised by silent mountain monks atop the spires of Cloud-Peak Monastery.',
  'Orphan of a drowned coastal town who learned survival along pirate coves.',
  'Disowned heir to an aristocratic trading dynasty who chose steel over silver.',
  'Wanderer whose ancestral village slipped into the Ethereal plane overnight.',
  'Former battle medic who took up arms after losing their entire battalion.',
  'Mystic traveler chosen by an ancient awakened forest spirit.',
];

export const PERSONALITY_QUIRKS: string[] = [
  'Always inspects doorways for hidden runes before stepping through.',
  'Never eats or drinks until their primary weapon is meticulously polished.',
  'Speaks in quiet, measured whispers even during the roar of battle.',
  'Keeps a detailed journal of every sky pattern and constellation they witness.',
  'Fidgets with a silver coin across their knuckles whenever thinking deeply.',
  'Refuses to accept any payment in copper, only silver or honest trade.',
  'Humms ancient lullabies when setting camp at dusk.',
  'Never sleeps under a man-made roof if open skies are visible.',
  'Names every beast, crow, and horse they encounter along the road.',
  'Collects small smooth river stones to place at resting shrines.',
];

export const SIGNATURE_ABILITIES: Record<CharacterClassType, string[]> = {
  Mage: [
    'Astral Rift: Tears open a brief vortex pulling foes and dispersing enemy spells.',
    'Chrono-Shift: Steps backwards four seconds in time to mend wounds and reposition.',
    'Prismatic Ray: Unleashes a tri-elemental beam piercing heavy barriers.',
    'Supernova Spark: Detonates compressed arcane motes into blinding starlight.',
  ],
  Rogue: [
    'Ghost Step: Dissolves into shadows, reappearing instantly behind target.',
    'Flurry of Stilettos: Hurls six poisoned blades with pinpoint precision.',
    'Smoke Mirage: Deploys dense obscuring ash leaving three decoy silhouettes.',
    'Severing Strike: A targeted anatomy cut that temporarily disables limb function.',
  ],
  Warrior: [
    'Titan Roar: A concussive war cry that destabilizes nearby enemies and rallies allies.',
    'Colossus Cleave: A sweeping heavy swing that shatters armor plates and shields.',
    'Indomitable Will: Defies a lethal strike, converting fatal trauma into sheer resolve.',
    'Iron Rampart: Plants shield firmly, blocking all frontal projectiles for 10 seconds.',
  ],
  Archer: [
    'Windpiercer Volley: Fires an overdrawn arrow that shoots clean through three targets.',
    'Rain of Barbs: Looses a high-arc cluster raining suppressive arrows over a 20-pace zone.',
    'Falcon Senses: Enters extreme concentration, slowing perceived movement by 50%.',
    'Snare Arrow: Releases a spring-loaded bola arrow anchoring the target to the earth.',
  ],
  Paladin: [
    'Radiant Smite: Channels solar fire through the weapon, erupting upon impact.',
    'Aura of Dawn: Surrounds companions in warm restorative light purging toxins.',
    'Righteous Rebuke: Blinds attackers with a concussive flash whenever armor is struck.',
    'Bastion of Faith: Erects a golden translucent dome withstanding siege engines.',
  ],
  Necromancer: [
    'Soul Siphon: Drains vital essence from wounded foes to rejuvenate personal vigor.',
    'Grave Bloom: Sprouts sharp bone briars from the soil to impale approaching threats.',
    'Specter Tether: Binds a fallen spirit to scout ahead and haunt enemy minds.',
    'Corpse Lantern: Emits cold violet luminescence that paralyzes frightened beasts.',
  ],
  Druid: [
    'Grizzly Aspect: Temporarily manifests the raw physical power and hide of a primordial bear.',
    'Briar Surge: Roots erupt from the earth to entangle and crush multiple assailants.',
    'Call Lightning: Summons a direct thunderstorm bolt focused onto a single point.',
    'Verdant Mending: Directs life energy from surrounding flora to mend critical wounds.',
  ],
};
