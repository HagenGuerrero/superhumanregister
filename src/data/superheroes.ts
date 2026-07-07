import type { Hero } from "../types";

export const HEROES: Hero[] = [
  {
    id: "spider-man", no: "001", name: "Spider-Man", alias: "Peter Parker", house: "Marvel", publisher: "Marvel Comics", first: "Amazing Fantasy #15 (1962)", accent: "oklch(0.58 0.15 25)",
    bio: "A high-school science prodigy bitten by a radioactive spider, Peter Parker learned that great power demands great responsibility after his inaction cost his uncle’s life. He has balanced the burdens of a working-class life with a career as New York’s tireless friendly-neighborhood protector ever since.",
    powers: ["Superhuman strength, agility and reflexes", "Ability to cling to nearly any surface", "Precognitive “spider-sense” danger warning", "Self-engineered web-shooters and web fluid"],
    affiliations: ["Avengers", "Daily Bugle"],
    relationships: [{ name: "Mary Jane Watson", role: "Partner" }, { name: "May Parker", role: "Aunt" }, { name: "Ben Parker", role: "Late uncle" }],
    stats: [{ label: "Intelligence", value: 6 }, { label: "Strength", value: 4 }, { label: "Speed", value: 3 }, { label: "Durability", value: 3 }, { label: "Energy", value: 1 }, { label: "Fighting", value: 4 }],
    prowess: [
      { label: "Reflex & Agility", note: "The spider-sense fused with acrobatic reflexes lets him react to threats faster than the human eye can track — dodging gunfire and course-correcting mid-swing on instinct alone.", source: "Spider-Man 2 (2004)" },
      { label: "Proportional Strength", note: "Pinned beneath tons of collapsed machinery with the only antidote out of reach, Peter found the will to lift the wreckage off himself through sheer desperation and proportional spider-strength.", source: "The Amazing Spider-Man #33 (1966)" },
    ],
  },
  {
    id: "storm", no: "002", name: "Storm", alias: "Ororo Munroe", house: "Marvel", publisher: "Marvel Comics", first: "Giant-Size X-Men #1 (1975)", accent: "oklch(0.58 0.13 235)",
    bio: "Descended from a line of African priestesses, Ororo Munroe was worshipped as a goddess for her power over the elements before joining the X-Men. A natural leader, she has led the team and ruled Wakanda as queen, carrying herself with a regal calm that belies the tempests she commands.",
    powers: ["Total control of weather and atmosphere", "Flight on self-generated winds", "Lightning generation and direction", "Heightened senses attuned to the environment"],
    affiliations: ["X-Men", "Avengers"],
    relationships: [{ name: "T’Challa", role: "Former husband" }, { name: "Charles Xavier", role: "Mentor" }, { name: "Kitty Pryde", role: "Protégée" }],
    stats: [{ label: "Intelligence", value: 4 }, { label: "Strength", value: 3 }, { label: "Speed", value: 5 }, { label: "Durability", value: 3 }, { label: "Energy", value: 7 }, { label: "Fighting", value: 4 }],
    prowess: [
      { label: "Elemental Command", note: "Storm can summon hurricanes, droughts or blizzards across continents, making her one of the most powerful mutants alive — a living weather system as much as a person.", source: "X2: X-Men United (2003)" },
      { label: "Worshipped as a Goddess", note: "Long before the X-Men, tribespeople in Kenya revered Ororo as a rain goddess, and she commanded storms with a serenity that still awes allies and enemies alike.", source: "Marvel Team-Up #100 (1980)" },
    ],
  },
  {
    id: "wonder-woman", no: "003", name: "Wonder Woman", alias: "Diana of Themyscira", house: "DC", publisher: "DC Comics", first: "All Star Comics #8 (1941)", accent: "oklch(0.58 0.15 12)",
    bio: "Princess of the immortal Amazons, Diana left the hidden island of Themyscira to bring peace to the world of men. Equal parts warrior and diplomat, she wields the strength of the gods with a conviction rooted in compassion and unbending truth.",
    powers: ["Godlike strength, speed and durability", "Flight", "Lasso of Truth that compels honesty", "Master of armed and unarmed combat"],
    affiliations: ["Justice League", "Amazons"],
    relationships: [{ name: "Steve Trevor", role: "Ally & love" }, { name: "Hippolyta", role: "Mother" }, { name: "Etta Candy", role: "Friend" }],
    stats: [{ label: "Intelligence", value: 4 }, { label: "Strength", value: 7 }, { label: "Speed", value: 4 }, { label: "Durability", value: 6 }, { label: "Energy", value: 5 }, { label: "Fighting", value: 7 }],
    prowess: [
      { label: "Amazonian Might", note: "Trained for centuries and blessed by the Olympian gods, Diana matches the strongest beings on Earth in raw power while outclassing nearly all of them in combat skill.", source: "Wonder Woman (2017)" },
      { label: "Lasso of Truth", note: "No mortal or god has ever lied while bound in the golden lasso — Diana wields it as both weapon and interrogation tool, compelling total honesty from anyone it holds.", source: "Wonder Woman #7 (1943)" },
    ],
  },
  {
    id: "flash", no: "004", name: "The Flash", alias: "Barry Allen", house: "DC", publisher: "DC Comics", first: "Showcase #4 (1956)", accent: "oklch(0.58 0.14 62)",
    bio: "A meticulous police forensic scientist, Barry Allen was struck by lightning and doused in chemicals, gaining a connection to the Speed Force. He fights crime as the Fastest Man Alive, using his mind for detective work as readily as his legs.",
    powers: ["Superhuman speed approaching light-speed", "Intangibility by vibrating molecules", "Time and dimensional travel via the Speed Force", "Accelerated healing and perception"],
    affiliations: ["Justice League", "Central City P.D."],
    relationships: [{ name: "Iris West", role: "Wife" }, { name: "Wally West", role: "Protégé" }, { name: "Eobard Thawne", role: "Nemesis" }],
    stats: [{ label: "Intelligence", value: 4 }, { label: "Strength", value: 3 }, { label: "Speed", value: 7 }, { label: "Durability", value: 3 }, { label: "Energy", value: 5 }, { label: "Fighting", value: 3 }],
    prowess: [
      { label: "Absolute Speed", note: "Tapping the Speed Force, Barry moves fast enough to run across water, outpace time itself and be everywhere at once — the benchmark against which all speedsters are measured.", source: "The Flash: Rebirth #1 (2009)" },
      { label: "Speed Force Time Travel", note: "By running fast enough to breach the barrier of time itself, Barry has raced into the past and future alike — a feat he uses only when the timeline itself is at stake.", source: "Crisis on Infinite Earths #8 (1985)" },
    ],
  },
  {
    id: "batman", no: "005", name: "Batman", alias: "Bruce Wayne", house: "DC", publisher: "DC Comics", first: "Detective Comics #27 (1939)", accent: "oklch(0.58 0.12 295)",
    bio: "After witnessing his parents’ murder as a child, billionaire Bruce Wayne spent his life honing his body and mind into a weapon against crime. Without a single superpower, he stands among the world’s greatest heroes through sheer discipline, intellect and preparation.",
    powers: ["Peak human strength and conditioning", "World-class detective and strategist", "Mastery of martial arts", "Vast arsenal of gadgets and vehicles"],
    affiliations: ["Justice League", "Bat-Family"],
    relationships: [{ name: "Alfred Pennyworth", role: "Guardian" }, { name: "Dick Grayson", role: "First Robin" }, { name: "The Joker", role: "Archenemy" }],
    stats: [{ label: "Intelligence", value: 7 }, { label: "Strength", value: 3 }, { label: "Speed", value: 3 }, { label: "Durability", value: 3 }, { label: "Energy", value: 3 }, { label: "Fighting", value: 6 }],
    prowess: [
      { label: "Peerless Intellect", note: "Batman’s greatest weapon is his mind — a contingency plan for every ally and enemy, and the deductive brilliance to unravel any mystery before his opponents realize they’ve been beaten.", source: "JLA: Tower of Babel #43 (2000)" },
      { label: "World's Greatest Detective", note: "Given a single fiber or footprint, Bruce can reconstruct an entire crime scene — a deductive gift that has let him outthink gods, aliens and fellow detectives alike.", source: "Detective Comics #27 (1939)" },
    ],
  },
  {
    id: "spawn", no: "006", name: "Spawn", alias: "Al Simmons", house: "Image", publisher: "Image Comics", first: "Spawn #1 (1992)", accent: "oklch(0.58 0.14 330)",
    bio: "A murdered black-ops soldier, Al Simmons struck a bargain to see his wife again and returned as a Hellspawn — a reluctant agent caught between Heaven and Hell. He wages a lonely war on both sides, wielding infernal power on his own uneasy terms.",
    powers: ["Necroplasmic energy manipulation", "Living symbiotic costume with chains and weapons", "Regeneration and shapeshifting", "Teleportation and dark magic"],
    affiliations: ["Hellspawn"],
    relationships: [{ name: "Wanda Blake", role: "Late wife" }, { name: "The Violator", role: "Tormentor" }, { name: "Cogliostro", role: "Mentor" }],
    stats: [{ label: "Intelligence", value: 5 }, { label: "Strength", value: 6 }, { label: "Speed", value: 4 }, { label: "Durability", value: 6 }, { label: "Energy", value: 7 }, { label: "Fighting", value: 5 }],
    prowess: [
      { label: "Necroplasmic Power", note: "Spawn draws on a finite well of hellborn necroplasm to reshape reality, raise the dead and unleash devastating force — a power so vast even its masters fear what he might do with it.", source: "Spawn #8 (1993)" },
      { label: "The Symbiotic Costume", note: "Spawn's living cape and chains obey his will in battle, forming blades, shields and grappling weapons drawn straight from his own necroplasmic reserves.", source: "Spawn (1997 film)" },
    ],
  },
  {
    id: "invincible", no: "007", name: "Invincible", alias: "Mark Grayson", house: "Image", publisher: "Image Comics", first: "Invincible #1 (2003)", accent: "oklch(0.58 0.13 155)",
    bio: "The half-Viltrumite son of Earth’s greatest hero, teenager Mark Grayson came into his powers only to learn his father served a conquering empire. He chose Earth, and has spent his young life reckoning with legacy, loss and what kind of hero he wants to be.",
    powers: ["Superhuman strength and near-invulnerability", "Flight at supersonic speed", "Accelerated healing", "Extended lifespan"],
    affiliations: ["Guardians of the Globe"],
    relationships: [{ name: "Atom Eve", role: "Partner" }, { name: "Omni-Man", role: "Father" }, { name: "Cecil Stedman", role: "Handler" }],
    stats: [{ label: "Intelligence", value: 4 }, { label: "Strength", value: 6 }, { label: "Speed", value: 6 }, { label: "Durability", value: 6 }, { label: "Energy", value: 2 }, { label: "Fighting", value: 4 }],
    prowess: [
      { label: "Viltrumite Durability", note: "Mark can trade blows across city blocks, survive re-entry and walk away from wounds that would kill almost anyone — an endurance that lets him outlast foes far stronger than himself.", source: "Invincible, Season 1 (2021)" },
      { label: "Earth's Line of Defense", note: "Mark's decision to defy his father and stand with Earth against the Viltrum Empire remains the defining act of his young career — proof his heart outweighs his bloodline.", source: "Invincible #111 (2014)" },
    ],
  },
  {
    id: "hellboy", no: "008", name: "Hellboy", alias: "Anung un Rama", house: "Dark Horse", publisher: "Dark Horse Comics", first: "San Diego Comic-Con Comics #2 (1993)", accent: "oklch(0.58 0.15 42)",
    bio: "Summoned to Earth as an infant by occultists, the demon child was raised by a kindly professor to become a paranormal investigator. Gruff, wisecracking and deeply human despite his origins, Hellboy has spent decades punching monsters while defying the apocalyptic destiny etched into his hand.",
    powers: ["Superhuman strength and stamina", "The stone Right Hand of Doom", "Rapid regeneration and longevity", "Expertise in the occult and folklore"],
    affiliations: ["B.P.R.D."],
    relationships: [{ name: "Trevor Bruttenholm", role: "Adoptive father" }, { name: "Abe Sapien", role: "Colleague" }, { name: "Liz Sherman", role: "Teammate" }],
    stats: [{ label: "Intelligence", value: 4 }, { label: "Strength", value: 5 }, { label: "Speed", value: 2 }, { label: "Durability", value: 6 }, { label: "Energy", value: 3 }, { label: "Fighting", value: 5 }],
    prowess: [
      { label: "Unkillable Resilience", note: "Hellboy shrugs off injuries that would end most beings and heals with startling speed, letting him wade into curses and creatures no ordinary agent could survive.", source: "Hellboy (2004 film)" },
      { label: "The Right Hand of Doom", note: "Sealed in stone since infancy, Hellboy's massive right hand holds power enough to end the world — a destiny he has spent his whole life refusing to fulfill.", source: "Hellboy: Seed of Destruction #1 (1994)" },
    ],
  },
  {
    id: "bloodshot", no: "009", name: "Bloodshot", alias: "Ray Garrison", house: "Valiant", publisher: "Valiant Entertainment", first: "Bloodshot #1 (1993)", accent: "oklch(0.58 0.15 15)",
    bio: "A soldier whose memories were stripped and rewritten, Ray Garrison was injected with billions of microscopic nanites that rebuilt him into a living weapon. He hunts for the truth of his past while trying to stay his own man against those who made him.",
    powers: ["Nanite-driven regeneration", "Enhanced strength, speed and stamina", "Technopathic control of machines", "Shapeshifting and physical adaptation"],
    affiliations: ["Project Rising Spirit"],
    relationships: [{ name: "Project Rising Spirit", role: "Creators" }, { name: "The Bloodshot Squad", role: "Successors" }],
    stats: [{ label: "Intelligence", value: 4 }, { label: "Strength", value: 5 }, { label: "Speed", value: 4 }, { label: "Durability", value: 6 }, { label: "Energy", value: 3 }, { label: "Fighting", value: 5 }],
    prowess: [
      { label: "Nanite Regeneration", note: "The nanites flooding Bloodshot’s blood knit wounds shut in seconds and adapt his body to any threat, making him almost impossible to permanently put down.", source: "Bloodshot (2019 film)" },
      { label: "Technopathic Override", note: "Bloodshot's nanites can reach out and seize control of nearby machinery mid-fight, turning an enemy's own weapons and vehicles against them.", source: "Bloodshot #4 (2012)" },
    ],
  },
  {
    id: "xo-manowar", no: "010", name: "X-O Manowar", alias: "Aric of Dacia", house: "Valiant", publisher: "Valiant Entertainment", first: "X-O Manowar #1 (1992)", accent: "oklch(0.58 0.13 205)",
    bio: "A fifth-century Visigoth warrior abducted by aliens, Aric of Dacia seized their sacred living armor and escaped to a future Earth centuries removed from his own. A king out of time, he commands one of the most powerful weapons in the galaxy while learning to lead in a world he barely recognizes.",
    powers: ["The sentient Shanhara armor", "Immense strength and durability", "Flight and energy weaponry", "Adaptive alien technology"],
    affiliations: ["Unity"],
    relationships: [{ name: "Shanhara", role: "Living armor" }, { name: "The Vine", role: "Former captors" }, { name: "Unity", role: "Teammates" }],
    stats: [{ label: "Intelligence", value: 4 }, { label: "Strength", value: 6 }, { label: "Speed", value: 4 }, { label: "Durability", value: 7 }, { label: "Energy", value: 5 }, { label: "Fighting", value: 5 }],
    prowess: [
      { label: "Sentient Armor", note: "Bonded to the living Shanhara, Aric wields a weapon that adapts to any foe — generating weapons, absorbing energy and shielding him against the most powerful forces in the cosmos.", source: "X-O Manowar #1 (1992)" },
      { label: "Alien Adaptation", note: "Shanhara rewrites itself on the fly, absorbing incoming energy and manufacturing new weapons to answer whatever threat Aric faces next.", source: "X-O Manowar #0 (2017)" },
    ],
  },
];
