// data/players.ts
// Replace each `image` value with `/images/players/<slug>.webp` when you upload real photos.
export type Player = {
  slug: string;
  name: string;
  role: string;
  shortDescription: string;
  image: string; // path inside /public/images
};

export const players: Player[] = [
  {
    slug: "vinicius-jr",
    name: "Vinícius Júnior",
    role: "Left Winger 🇧🇷",
    shortDescription: "Electric dribbler and key attacking threat.",
    image: "/images/VINICIUS_550x650_SinParche.png",
  },
  {
    slug: "rodrygo-goes",
    name: "Rodrygo Goes",
    role: "Right Winger 🇧🇷",
    shortDescription: "Versatile attacker with a nose for goal.",
    image: "/images/placeholder-1.svg",
  },
  {
    slug: "kylian-mbappe",
    name: "Kylian Mbappé",
    role: "Striker 🇫🇷",
    shortDescription: "Clinical finisher with blistering pace.",
    image: "/images/placeholder-1.svg",
  },
  {
    slug: "jude-bellingham",
    name: "Jude Bellingham",
    role: "Central Midfielder 🏴",
    shortDescription: "Box-to-box engine and midfield leader.",
    image: "/images/placeholder-1.svg",
  },
  {
    slug: "antonio-rudiger",
    name: "Antonio Rüdiger",
    role: "Center-back 🇩🇪",
    shortDescription: "Aerially dominant and aggressive defender.",
    image: "/images/placeholder-1.svg",
  },
  {
    slug: "andriy-lunin",
    name: "Andriy Lunin",
    role: "Goalkeeper 🇺🇦",
    shortDescription: "Shot-stopper with excellent reflexes.",
    image: "/images/placeholder-1.svg",
  },
];
