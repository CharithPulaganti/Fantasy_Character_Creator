import {
  CharacterClassType,
  FantasyCharacter,
  AttributeStats,
  CharacterCombat,
  CharacterEquipment,
  CharacterLore,
  CardStats,
} from '../types/character';
import {
  FANTASY_CLASSES,
  FIRST_NAMES,
  SURNAME_PREFIXES,
  SURNAME_SUFFIXES,
  TITLES,
  RACES,
  SUBCLASSES,
  ALIGNMENTS,
  WEAPONS_BY_CLASS,
  ARMOR_BY_CLASS,
  TRINKETS,
  ORIGINS,
  PERSONALITY_QUIRKS,
  SIGNATURE_ABILITIES,
} from '../data/fantasyData';

const ALL_CLASSES: CharacterClassType[] = [
  'Mage',
  'Rogue',
  'Warrior',
  'Archer',
  'Paladin',
  'Necromancer',
  'Druid',
];

function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomItemExcluding<T>(items: T[], exclude?: T): T {
  if (!exclude || items.length <= 1) return getRandomItem(items);
  const filtered = items.filter((item) => item !== exclude);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

function rollStat(baseMin = 10, variance = 8): number {
  return Math.min(20, Math.max(7, Math.floor(baseMin + Math.random() * variance)));
}

/**
 * Generate a distinct fantasy name.
 * Excludes the previous name to ensure every single click provides a new name.
 */
export function generateFantasyName(previousName?: string): string {
  let attempts = 0;
  let result = '';

  while (attempts < 10) {
    const firstName = getRandomItem(FIRST_NAMES);
    const style = Math.random();

    if (style < 0.55) {
      // First + Compound Surname (e.g., Thalor Emberweaver)
      const prefix = getRandomItem(SURNAME_PREFIXES);
      const suffix = getRandomItem(SURNAME_SUFFIXES);
      result = `${firstName} ${prefix}${suffix}`;
    } else if (style < 0.85) {
      // First + Title (e.g., Lyra the Undaunted)
      const title = getRandomItem(TITLES);
      result = `${firstName} ${title}`;
    } else {
      // First + Compound Surname + Short Title
      const prefix = getRandomItem(SURNAME_PREFIXES);
      const suffix = getRandomItem(SURNAME_SUFFIXES);
      const title = getRandomItem(TITLES);
      result = `${firstName} ${prefix}${suffix} ${title}`;
    }

    if (result !== previousName) break;
    attempts++;
  }

  return result;
}

/**
 * Procedurally allocate stats aligned with the chosen fantasy class
 */
export function generateStatsForClass(characterClass: CharacterClassType): AttributeStats {
  const stats: AttributeStats = {
    strength: rollStat(9, 6),
    agility: rollStat(9, 6),
    intelligence: rollStat(9, 6),
    wisdom: rollStat(9, 6),
    constitution: rollStat(10, 6),
    charisma: rollStat(9, 6),
  };

  switch (characterClass) {
    case 'Warrior':
      stats.strength = rollStat(15, 5); // 15-20
      stats.constitution = rollStat(14, 5);
      break;
    case 'Mage':
      stats.intelligence = rollStat(16, 4); // 16-20
      stats.wisdom = rollStat(13, 5);
      break;
    case 'Rogue':
      stats.agility = rollStat(16, 4); // 16-20
      stats.charisma = rollStat(12, 6);
      break;
    case 'Archer':
      stats.agility = rollStat(16, 4);
      stats.wisdom = rollStat(13, 5);
      break;
    case 'Paladin':
      stats.strength = rollStat(14, 5);
      stats.charisma = rollStat(15, 5);
      stats.constitution = rollStat(13, 5);
      break;
    case 'Necromancer':
      stats.intelligence = rollStat(15, 5);
      stats.constitution = rollStat(13, 5);
      stats.wisdom = rollStat(12, 5);
      break;
    case 'Druid':
      stats.wisdom = rollStat(16, 4);
      stats.constitution = rollStat(13, 5);
      stats.agility = rollStat(11, 5);
      break;
  }

  return stats;
}

/**
 * Generate combat stats like HP, Energy, and Armor Class
 */
export function generateCombatStats(
  characterClass: CharacterClassType,
  stats: AttributeStats,
  level = 1
): CharacterCombat {
  let hitDie = 8;
  let energyType: CharacterCombat['energyType'] = 'Stamina';

  switch (characterClass) {
    case 'Warrior':
      hitDie = 12;
      energyType = 'Stamina';
      break;
    case 'Paladin':
      hitDie = 10;
      energyType = 'Divine Favor';
      break;
    case 'Archer':
    case 'Rogue':
      hitDie = 8;
      energyType = 'Stamina';
      break;
    case 'Druid':
      hitDie = 8;
      energyType = 'Primal Essence';
      break;
    case 'Mage':
      hitDie = 6;
      energyType = 'Mana';
      break;
    case 'Necromancer':
      hitDie = 6;
      energyType = 'Soul Energy';
      break;
  }

  const conMod = Math.floor((stats.constitution - 10) / 2);
  const dexMod = Math.floor((stats.agility - 10) / 2);

  const baseHp = hitDie + conMod;
  const levelHp = Math.max(1, Math.floor(hitDie / 2 + 1) + conMod) * (level - 1);
  const health = Math.max(12, baseHp + levelHp);

  const primaryStatForEnergy =
    characterClass === 'Mage' || characterClass === 'Necromancer'
      ? stats.intelligence
      : characterClass === 'Druid'
      ? stats.wisdom
      : characterClass === 'Paladin'
      ? stats.charisma
      : stats.agility;

  const energy = 30 + primaryStatForEnergy * 3 + level * 5;
  const armorClass = 10 + dexMod + (characterClass === 'Warrior' || characterClass === 'Paladin' ? 6 : 2);

  return {
    level,
    health,
    energy,
    energyType,
    armorClass,
  };
}

/**
 * Generates a unique one-to-two-sentence fantasy origin story
 * that explicitly reflects the character's name and class.
 */
export function generateBackstory(
  name: string,
  characterClass: CharacterClassType,
  previousStory?: string
): string {
  const storiesByClass: Record<CharacterClassType, ((n: string) => string)[]> = {
    Mage: [
      (n) => `After unearthing a fractured astral relic in the ruins of the Sunken Spire, ${n} bound their soul to the primordial currents of the arcane weave. Now wandering the realm as an enlightened Mage, they reshape reality with every murmured incantation.`,
      (n) => `${n} spent decades deciphering the chronomantic vaults beneath the Celestial Citadel before mortal scholars branded their discoveries forbidden. As an exile Mage, they command temporal eddies and starlight flares that defy the boundaries of fate.`,
      (n) => `Born during a total stellar convergence, ${n} could hear the whisper of ancient ley lines long before speaking their first words. Today, this master Mage wields elemental tempest and prismatic wards that have brought dread to entire legions.`,
      (n) => `When the Grand Archives went up in arcane fire, ${n} absorbed the burning secrets of five lost civilizations directly into their mind. Now, as a formidable Mage, they seek the lost fragments of the cosmic lattice before darkness claims them.`,
      (n) => `Cast out of the High Enclave for experimenting with trans-dimensional geometry, ${n} proved that true magic requires absolute courage. As a visionary Mage, their rune-etched focus turns impossible theories into blinding arcane power.`,
      (n) => `Having survived the collapse of an ethereal rift that swallowed their homeland, ${n} carries the resonance of the void within their very core. As a wandering Mage, they bend gravity and raw mana to shield those who cannot defend themselves.`,
    ],
    Rogue: [
      (n) => `Raised among the treacherous subterranean waterways of the capital's underworld, ${n} earned a legendary reputation by stealing the High Inquisitor's seal without disturbing a single cobweb. Operating in absolute silence as a master Rogue, they turn shadows into lethal ambushes.`,
      (n) => `${n} was once the personal spy to a treacherous guildmaster until a contract on their own life forced a violent reckoning. Now an independent Rogue, they walk the razor edge between justice and survival with twin venom-tipped blades.`,
      (n) => `Orphaned during the Siege of the Black Gates, ${n} learned to move without casting sound or shadow upon stone floors. As a phantom Rogue, they can infiltrate the most secure fortresses and slip away before alarm bells ever sound.`,
      (n) => `A former acrobatic performer who traded the stage for the perilous guildhalls of thieves, ${n} dances through combat with breathtaking agility. As a lethal Rogue, their mocking smirk is often the last thing their targets ever witness.`,
      (n) => `Betrayed by an aristocratic house that used their covert talents, ${n} took a silent oath to dismantle corrupt dynasties from within. This resourceful Rogue relies on razor-sharp instincts, poison vials, and unseen footwork to balance the scales.`,
      (n) => `${n} mastered the ancient art of the shadow-step in the misty alleys of the coast, slipping between lanterns like an elusive specter. As a feared Rogue, no lock remains shut and no vault remains secure against their nimble touch.`,
    ],
    Warrior: [
      (n) => `Hardened on the bloodstained sands of the Imperial Arena, ${n} shattered their own gladiatorial chains before cleaving through a dozen legionnaires to claim freedom. As an indomitable Warrior, they charge into the fiercest vanguards where lesser fighters dare not tread.`,
      (n) => `Sole survivor of the doomed Iron Vanguard that held the mountain pass against an encroaching demon host, ${n} bears the runic scars of twenty bloody campaigns. This veteran Warrior fights with an unyielding fury that shatters enemy morale.`,
      (n) => `Forged in the brutal frost-wastes of the northern frontier, ${n} felled a primeval wyrm with only a shattered broadsword and sheer resolve. As a battle-hardened Warrior, their war cry rallies broken armies back from the brink of defeat.`,
      (n) => `${n} was heir to a fallen martial house, choosing the bitter discipline of heavy plate and the blade over courtly intrigue. Now standing as a resolute Warrior, they serve as the immovable wall protecting the defenseless from chaos.`,
      (n) => `Trained by blind warmasters in the sacred katas of the greatsword, ${n} reads enemy movements in the subtle shift of wind and armor creaks. This relentless Warrior turns brute violence into an art form of terrifying precision.`,
      (n) => `When invaders burned their border garrison to the ground, ${n} refused to retreat, holding the bridge alone through three days and nights. Today, this legendary Warrior continues the march, determined to carve a legacy in steel and fire.`,
    ],
    Archer: [
      (n) => `Stalking the canopy of the Whispering Pines since early youth, ${n} can hear the heartbeat of prey across impossible distances in total darkness. As a peerless Archer, their arrows pierce the weak points of heavy plate armor before the bowstring even finishes singing.`,
      (n) => `Former chief scout of the Frontier Rangers, ${n} was the first to track unnatural beasts creeping from the ash-lands into the civilized valleys. Now wandering as a solitary Archer, their hawkeye focus and windforged recurve bow ensure that no threat escapes unnoticed.`,
      (n) => `${n} was blessed by a woodland celestial during a ferocious mountain gale, gaining sight that sees through dense illusions and blinding fog. As a vigilant Archer, they loose deadly volleys that navigate winding tree boughs like living falcons.`,
      (n) => `Raised among nomadic ridge-runners, ${n} learned to shoot on galloping mounts while evading enemy cavalry across open plains. This marksman Archer carries arrows dipped in viper venom and ancient silver, ready for both beasts and tyrants.`,
      (n) => `When a corrupt lord scorched their ancestral forest, ${n} took to the crags and waged an unseen one-person war from the clifftops. As an elusive Archer, their name became a terrified whisper among patrolling sentries who never saw their hunter.`,
      (n) => `Trained to defend the sacred grove spires against aerial predators, ${n} never misses a target even while falling through the air. As an elite Archer, their whistling arrows strike fear into the hearts of beasts and warlords alike.`,
    ],
    Paladin: [
      (n) => `Standing an unbroken vigil atop the Sunken Spires through an eternal solar eclipse, ${n} felt the holy radiance of the Dawn Mother ignite directly inside their chest. As a consecrated Paladin, their golden warhammer obliterates dark horrors and dispels ancient curses.`,
      (n) => `${n} was once a disgraced knight until a vision of blinding holy light commanded them to lay down selfish pride and defend the forsaken. Now walking as an anointed Paladin, their shield emanates an impenetrable sanctuary of pure righteousness.`,
      (n) => `Sworn to the sacred Order of the Silver Hand, ${n} has banished dozens of restless fiends back to the nether realms with unwavering courage. As a radiant Paladin, their battle hymns inspire allies and purge malevolent plagues from dying lands.`,
      (n) => `Born to humble stone-cutters, ${n} discovered their divine calling when an ancient consecrated altar spontaneously flared to life at their touch. This noble Paladin channels solar wrath to burn away falsehood and restore hope to despairing hearts.`,
      (n) => `Having witnessed whole villages swallowed by demonic rifts, ${n} took the solemn Oath of Vengeance to hunt malice wherever it hides. As a fearless Paladin, their presence turns dark tides and strikes terror into corrupt rulers.`,
      (n) => `Cloaked in sun-forged armor engraved with ancient litanies, ${n} serves as a beacon of warmth against the creeping cold of wickedness. This devoted Paladin would gladly sacrifice life and limb to preserve the innocent from harm.`,
    ],
    Necromancer: [
      (n) => `Unearthing a forbidden ossuary manuscript beneath the crypts of the Shattered Veil, ${n} came to understand that death is merely a gateway to greater authority. As a cold Necromancer, they weave lingering spirits and bone marrow into impenetrable legions.`,
      (n) => `Once an esteemed anatomical healer seeking the cure for mortality, ${n} crossed ethical boundaries that horrified their colleagues and led to their exile. Now practicing as a dreaded Necromancer, they harness vital life-essence to turn fallen foes into obedient thralls.`,
      (n) => `${n} was born with the uncanny ability to perceive specters and hear the final whispers of those who passed violently. As an enigmatic Necromancer, they siphon the memories and grief of ancient souls to summon eldritch frost and soulfire.`,
      (n) => `Betrayed and entombed alive in an imperial sepulcher, ${n} bargained with ancient crypt wights for the strength to claw their way back to the surface. Today, this vengeful Necromancer commands spectral wraiths that paralyze the minds of their enemies.`,
      (n) => `Wandering through abandoned battlefields to catalog the names of the unburied dead, ${n} offers peace to some and eternal service to others. As a macabre Necromancer, their soul lantern burns with an eerie cyan flame that never gutters.`,
      (n) => `Guided by an ancient skeletal advisor whose whisper only they can hear, ${n} unravels the mysteries of the cosmic balance between decay and rebirth. This formidable Necromancer proves that even the grave can be made to obey a master's will.`,
    ],
    Druid: [
      (n) => `When a corrupted ash-blight withered their sacred elder grove, ${n} bonded their own life-force to an ironwood seed to nurse the primeval forest back to life. As a fierce Druid, the very roots of the earth and the fury of thunderstorms obey their command.`,
      (n) => `${n} was found as an infant nestled in the den of primordial dire wolves atop the Cloud-Peak range, growing up speaking the tongue of beasts. As an untamed Druid, they shift seamlessly into ferocious predator aspects to tear apart encroaching hunters.`,
      (n) => `Communing with the ancient earthen elementals sleeping beneath the crust, ${n} senses tremors and tectonic shifts days before they erupt. This wise Druid summons living briar walls and healing rain to defend nature's sanctuaries against destruction.`,
      (n) => `Exiled from civilization for opposing the clear-cutting of a sacred valley, ${n} proved that nature's wrath is far more relentless than any forge or machine. As a primordial Druid, their antler staff channels the raw fury of lightning and biting winter winds.`,
      (n) => `Keeper of an ancient circle of standing stones that mark cosmic alignments, ${n} harmonizes the ebb and flow of life in the wild frontier. This steadfast Druid commands swarms of nature spirits and protective brambles to guard ancient secrets.`,
      (n) => `Carrying a vial of sap from the Mother Tree of the Primeval Verge, ${n} wanders the damaged lands to cleanse blighted soil and restore balance. As an enduring Druid, life flourishes in their footsteps while rot and corruption wither away.`,
    ],
  };

  const templates = storiesByClass[characterClass] || storiesByClass.Mage;
  const filtered = previousStory
    ? templates.filter((tpl) => tpl(name) !== previousStory)
    : templates;
  const chosenTpl = getRandomItem(filtered.length > 0 ? filtered : templates);
  return chosenTpl(name);
}

export function generateEquipment(characterClass: CharacterClassType): CharacterEquipment {
  return {
    weapon: getRandomItem(WEAPONS_BY_CLASS[characterClass]),
    armor: getRandomItem(ARMOR_BY_CLASS[characterClass]),
    trinket: getRandomItem(TRINKETS),
  };
}

export function generateLore(characterClass: CharacterClassType, name?: string): CharacterLore {
  const charName = name || getRandomItem(FIRST_NAMES);
  return {
    title: getRandomItem(TITLES),
    race: getRandomItem(RACES),
    subclass: getRandomItem(SUBCLASSES[characterClass]),
    alignment: getRandomItem(ALIGNMENTS),
    origin: generateBackstory(charName, characterClass),
    personalityQuirk: getRandomItem(PERSONALITY_QUIRKS),
    signatureAbility: getRandomItem(SIGNATURE_ABILITIES[characterClass]),
  };
}

/**
 * Generates appropriate random values for player card stats: Health, Mana, and Strength.
 * Tailored with class-appropriate distributions whenever a character is created.
 */
export function generateCardStats(
  characterClass: CharacterClassType,
  level = 1
): CardStats {
  const levelBonus = (level - 1) * 6;
  const rand = (min: number, max: number) =>
    Math.floor(min + Math.random() * (max - min + 1));

  let health = 100;
  let mana = 80;
  let strength = 50;

  switch (characterClass) {
    case 'Warrior':
      health = rand(120, 160) + levelBonus;
      mana = rand(30, 60);
      strength = rand(75, 98) + Math.floor(levelBonus / 2);
      break;
    case 'Paladin':
      health = rand(110, 145) + levelBonus;
      mana = rand(70, 110) + levelBonus;
      strength = rand(70, 92) + Math.floor(levelBonus / 2);
      break;
    case 'Mage':
      health = rand(65, 95) + levelBonus;
      mana = rand(130, 180) + levelBonus * 2;
      strength = rand(20, 45);
      break;
    case 'Necromancer':
      health = rand(70, 105) + levelBonus;
      mana = rand(120, 170) + levelBonus * 2;
      strength = rand(25, 52);
      break;
    case 'Druid':
      health = rand(85, 125) + levelBonus;
      mana = rand(105, 155) + levelBonus * 2;
      strength = rand(45, 72);
      break;
    case 'Rogue':
      health = rand(80, 115) + levelBonus;
      mana = rand(45, 85);
      strength = rand(50, 78);
      break;
    case 'Archer':
      health = rand(75, 110) + levelBonus;
      mana = rand(50, 90);
      strength = rand(55, 82);
      break;
  }

  return { health, mana, strength };
}

/**
 * Main procedural character generation function.
 * Ensures:
 * - Every click yields a new character with a different randomly selected name and class (when targetClass is not fixed).
 */
export function generateCharacter(options?: {
  targetClass?: CharacterClassType;
  previousCharacter?: FantasyCharacter | null;
  level?: number;
}): FantasyCharacter {
  const previousClass = options?.previousCharacter?.characterClass;
  const previousName = options?.previousCharacter?.name;

  // If targetClass is specified, use it. Otherwise, pick a different class from previous if possible
  const chosenClass: CharacterClassType =
    options?.targetClass ||
    getRandomItemExcluding(ALL_CLASSES, previousClass);

  const name = generateFantasyName(previousName);
  const stats = generateStatsForClass(chosenClass);
  const level = options?.level || Math.floor(Math.random() * 8) + 1; // 1 to 8
  const combat = generateCombatStats(chosenClass, stats, level);
  const cardStats = generateCardStats(chosenClass, level);
  const equipment = generateEquipment(chosenClass);
  const lore = generateLore(chosenClass, name);

  return {
    id: `char_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name,
    characterClass: chosenClass,
    lore,
    stats,
    combat,
    cardStats,
    equipment,
    timestamp: Date.now(),
  };
}
