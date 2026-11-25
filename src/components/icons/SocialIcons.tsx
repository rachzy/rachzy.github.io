import type { SocialId } from "../../data/socials";
import type { IconProps } from "./types";

type SvgProps = IconProps & { children: React.ReactNode; fill?: boolean };

function Svg({ size = 22, className, children, fill }: SvgProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill={fill ? "currentColor" : "none"}
      stroke={fill ? "none" : "currentColor"}
      strokeWidth={fill ? undefined : 1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

function DiscordIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M8.2 5.2c-1.6.3-3 .8-4.2 1.5C2.2 10 1.6 14 2 17.8c1.5 1.2 3.1 1.9 4.7 2.3l1.1-1.8c-.6-.2-1.2-.5-1.7-.9.1-.1.3-.2.4-.3 3.3 1.5 6.9 1.5 10.2 0 .1.1.3.2.4.3-.5.4-1.1.7-1.7.9l1.1 1.8c1.6-.4 3.2-1.1 4.7-2.3.5-4.4-.8-8.4-2.2-11.1-1.2-.7-2.6-1.2-4.2-1.5l-.5 1c-1.3-.2-2.6-.2-3.9 0z" />
      <circle cx="8.8" cy="13" r="1.5" />
      <circle cx="15.2" cy="13" r="1.5" />
    </Svg>
  );
}

function GmailIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M3 6.5l9 6.8 9-6.8" />
    </Svg>
  );
}

function GithubIcon(p: IconProps) {
  return (
    <Svg {...p} fill>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </Svg>
  );
}

function SteamIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="15.5" cy="9.5" r="2.8" />
      <circle cx="8.7" cy="15.6" r="1.9" />
      <path d="M2.7 9.8l6 2.4" />
      <path d="M10.4 13.5l3-2.8" />
    </Svg>
  );
}

function BlueskyIcon(p: IconProps) {
  return (
    <Svg {...p} fill>
      <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.140.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z" />
    </Svg>
  );
}

function LinkedinIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V17" />
      <circle cx="8" cy="7.7" r=".6" />
      <path d="M12 17v-6.5M12 13c0-1.5 1-2.5 2.3-2.5S16.5 11.4 16.5 13v4" />
    </Svg>
  );
}

export const socialIcons: Record<SocialId, (p: IconProps) => JSX.Element> = {
  discord: DiscordIcon,
  gmail: GmailIcon,
  github: GithubIcon,
  steam: SteamIcon,
  bluesky: BlueskyIcon,
  linkedin: LinkedinIcon,
};
