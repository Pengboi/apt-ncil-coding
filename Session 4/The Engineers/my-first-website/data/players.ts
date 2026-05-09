// data/players.ts
// Player images should be placed in /public/images/

export type Player = {
  slug: string;
  name: string;
  role: string;
  shortDescription: string;
  image: string; // path inside /public/images
  number: number;
  positionX: number; // horizontal position on pitch (0-100%)
  positionY: number; // vertical position on pitch (0-100%, 0 = goal, 100 = opponent goal)
};

export const players: Player[] = [
  {
    slug: "vinicius-jr",
    name: "Vinícius Júnior",
    role: "Left Winger",
    shortDescription: "Electric dribbler and key attacking threat. Known for his explosive pace and ability to beat defenders one-on-one.",
    image: "/images/jr.jpeg",
    number: 7,
    positionX: 25,
    positionY: 75,
  },
  {
    slug: "rodrygo-goes",
    name: "Rodrygo Goes",
    role: "Right Winger",
    shortDescription: "Versatile attacker with a nose for goal. Clinical finisher who delivers in big moments.",
    image: "/images/rodrygo.webp",
    number: 11,
    positionX: 75,
    positionY: 75,
  },
  {
    slug: "kylian-mbappe",
    name: "Kylian Mbappé",
    role: "Striker",
    shortDescription: "Clinical finisher with blistering pace. World-class forward who terrorizes defenses.",
    image: "/images/mbappe.jpg",
    number: 9,
    positionX: 50,
    positionY: 80,
  },
  {
    slug: "jude-bellingham",
    name: "Jude Bellingham",
    role: "Central Midfielder",
    shortDescription: "Box-to-box engine and midfield leader. Combines technical skill with physical dominance.",
    image: "/images/jude.webp",
    number: 5,
    positionX: 50,
    positionY: 55,
  },
  {
    slug: "aurélien-tchouameni",
    name: "Aurélien Tchouaméni",
    role: "Defensive Midfielder",
    shortDescription: "Physical presence and ball-winning midfielder. Protects the defense with intelligence.",
    image: "/images/tchouameni.jpg",
    number: 6,
    positionX: 25,
    positionY: 50,
  },
  {
    slug: "dani-carvajal",
    name: "Dani Carvajal",
    role: "Right-back",
    shortDescription: "Solid defender with attacking overlap. Veteran presence with exceptional work rate.",
    image: "/images/carvajal.svg",
    number: 2,
    positionX: 85,
    positionY: 30,
  },
  {
    slug: "david-alaba",
    name: "David Alaba",
    role: "Left-back",
    shortDescription: "Versatile defender with set-piece expertise. Brings experience and composure to the back line.",
    image: "/images/david.jpg",
    number: 4,
    positionX: 15,
    positionY: 30,
  },
  {
    slug: "eder-militao",
    name: "Éder Militão",
    role: "Center-back",
    shortDescription: "Quick and aggressive defender. Strong in duels and excellent recovery pace.",
    image: "/images/militao.svg",
    number: 3,
    positionX: 35,
    positionY: 25,
  },
  {
    slug: "antonio-rudiger",
    name: "Antonio Rüdiger",
    role: "Center-back",
    shortDescription: "Aerially dominant and aggressive defender. Leader at the back with fearless commitment.",
    image: "/images/rudiger.svg",
    number: 22,
    positionX: 65,
    positionY: 25,
  },
  {
    slug: "andriy-lunin",
    name: "Andriy Lunin",
    role: "Goalkeeper",
    shortDescription: "Shot-stopper with excellent reflexes. Reliable last line of defense.",
    image: "/images/lunin.svg",
    number: 13,
    positionX: 50,
    positionY: 8,
  },
];

// Get player flag emoji based on name and role
export function getPlayerFlag(name: string, role: string): string {
  // Brazil
  if (name.includes("Vinícius") || name.includes("Rodrygo") || name.includes("Militão")) return "🇧🇷";
  // France
  if (name.includes("Mbappé") || name.includes("Tchouaméni")) return "🇫🇷";
  // England
  if (name.includes("Bellingham")) return "🏴󠁧󠁢󠁥󠁮󠁧󠁿";
  // Germany
  if (name.includes("Rüdiger")) return "🇩🇪";
  // Ukraine
  if (name.includes("Lunin")) return "🇺🇦";
  // Spain
  if (name.includes("Carvajal")) return "🇪🇸";
  // Austria
  if (name.includes("Alaba")) return "🇦🇹";
  return "";
}
