// data/players.ts
// Replace each `image` value with `/images/players/<slug>.webp` when you upload real photos.

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
    shortDescription: "Electric dribbler and key attacking threat.",
    image: "/images/VINICIUS_550x650_SinParche.png",
    number: 7,
    positionX: 25,
    positionY: 75,
  },
  {
    slug: "rodrygo-goes",
    name: "Rodrygo Goes",
    role: "Right Winger",
    shortDescription: "Versatile attacker with a nose for goal.",
    image: "/images/placeholder-1.svg",
    number: 11,
    positionX: 75,
    positionY: 75,
  },
  {
    slug: "kylian-mbappe",
    name: "Kylian Mbappé",
    role: "Striker",
    shortDescription: "Clinical finisher with blistering pace.",
    image: "/images/placeholder-1.svg",
    number: 9,
    positionX: 50,
    positionY: 80,
  },
  {
    slug: "jude-bellingham",
    name: "Jude Bellingham",
    role: "Central Midfielder",
    shortDescription: "Box-to-box engine and midfield leader.",
    image: "/images/placeholder-1.svg",
    number: 5,
    positionX: 50,
    positionY: 55,
  },
  {
    slug: "federico-valverde",
    name: "Federico Valverde",
    role: "Right Midfielder",
    shortDescription: "Energetic runner with powerful shooting.",
    image: "/images/placeholder-1.svg",
    number: 8,
    positionX: 75,
    positionY: 50,
  },
  {
    slug: "aurélien-tchouameni",
    name: "Aurélien Tchouaméni",
    role: "Defensive Midfielder",
    shortDescription: "Physical presence and ball-winning midfielder.",
    image: "/images/placeholder-1.svg",
    number: 6,
    positionX: 25,
    positionY: 50,
  },
  {
    slug: "dani-carvajal",
    name: "Dani Carvajal",
    role: "Right-back",
    shortDescription: "Solid defender with attacking overlap.",
    image: "/images/placeholder-1.svg",
    number: 2,
    positionX: 85,
    positionY: 30,
  },
  {
    slug: "david-alaba",
    name: "David Alaba",
    role: "Left-back",
    shortDescription: "Versatile defender with set-piece expertise.",
    image: "/images/placeholder-1.svg",
    number: 4,
    positionX: 15,
    positionY: 30,
  },
  {
    slug: "eton-mendy",
    name: "Éder Militão",
    role: "Center-back",
    shortDescription: "Quick and aggressive defender.",
    image: "/images/placeholder-1.svg",
    number: 3,
    positionX: 35,
    positionY: 25,
  },
  {
    slug: "antonio-rudiger",
    name: "Antonio Rüdiger",
    role: "Center-back",
    shortDescription: "Aerially dominant and aggressive defender.",
    image: "/images/placeholder-1.svg",
    number: 22,
    positionX: 65,
    positionY: 25,
  },
  {
    slug: "andriy-lunin",
    name: "Andriy Lunin",
    role: "Goalkeeper",
    shortDescription: "Shot-stopper with excellent reflexes.",
    image: "/images/placeholder-1.svg",
    number: 13,
    positionX: 50,
    positionY: 8,
  },
];

// Get player flag emoji based on role
export function getPlayerFlag(role: string): string {
  if (role.includes("Brazil") || role.includes("Vinícius") || role.includes("Rodrygo")) return "🇧🇷";
  if (role.includes("France") || role.includes("Mbappé") || role.includes("Tchouaméni")) return "🇫🇷";
  if (role.includes("England") || role.includes("Bellingham")) return "🏴󠁧󠁢󠁥󠁮󠁧󠁿";
  if (role.includes("Germany") || role.includes("Rüdiger")) return "🇩🇪";
  if (role.includes("Ukraine") || role.includes("Lunin")) return "🇺🇦";
  if (role.includes("Spain") || role.includes("Carvajal") || role.includes("Valverde")) return "🇪🇸";
  if (role.includes("Austria") || role.includes("Alaba")) return "🇦🇹";
  return "";
}
