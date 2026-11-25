import { socials } from "./socials";

test("socials order and urls", () => {
  expect(socials.map((s) => s.id)).toEqual([
    "discord",
    "gmail",
    "github",
    "steam",
    "bluesky",
    "linkedin",
  ]);
  expect(socials.map((s) => s.href)).toEqual([
    "https://discord.com/users/392839201034338316",
    "mailto:henriqueferreira.fox@gmail.com",
    "https://github.com/rachzy",
    "https://steamcommunity.com/id/rachzy/",
    "https://bsky.app/profile/rachzy.com",
    "https://www.linkedin.com/in/henrique-ferreira-638304239/",
  ]);
  expect(socials.map((s) => s.label)).toEqual([
    "Discord",
    "Gmail",
    "GitHub",
    "Steam",
    "Bluesky",
    "LinkedIn",
  ]);
  expect(socials.filter((s) => !s.external).map((s) => s.id)).toEqual([
    "gmail",
  ]);
});
