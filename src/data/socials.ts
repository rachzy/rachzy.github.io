export type SocialId =
  | "discord"
  | "gmail"
  | "github"
  | "steam"
  | "bluesky"
  | "linkedin";

export type Social = {
  id: SocialId;
  label: string;
  href: string;
  external: boolean;
};

export const socials: Social[] = [
  {
    id: "discord",
    label: "Discord",
    href: "https://discord.com/users/392839201034338316",
    external: true,
  },
  {
    id: "gmail",
    label: "Gmail",
    href: "mailto:henriqueferreira.fox@gmail.com",
    external: false,
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/rachzy",
    external: true,
  },
  {
    id: "steam",
    label: "Steam",
    href: "https://steamcommunity.com/id/rachzy/",
    external: true,
  },
  {
    id: "bluesky",
    label: "Bluesky",
    href: "https://bsky.app/profile/rachzy.com",
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/henrique-ferreira-638304239/",
    external: true,
  },
];
