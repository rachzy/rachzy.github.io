import type { IconProps } from "./types";

function Stroke({
  size = 20,
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function HomeIcon(p: IconProps) {
  return (
    <Stroke {...p}>
      <path d="M3.5 11L12 4l8.5 7" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M10 20v-5.5h4V20" />
    </Stroke>
  );
}

export function GlobeIcon(p: IconProps) {
  return (
    <Stroke {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z" />
    </Stroke>
  );
}

export function DownloadIcon(p: IconProps) {
  return (
    <Stroke {...p}>
      <path d="M12 4v11" />
      <path d="M7.5 10.5L12 15l4.5-4.5" />
      <path d="M5 19.5h14" />
    </Stroke>
  );
}

export function ChevronIcon({
  direction,
  ...p
}: IconProps & { direction: "left" | "right" }) {
  return (
    <Stroke {...p}>
      <path d={direction === "left" ? "M14.5 6L8.5 12l6 6" : "M9.5 6l6 6-6 6"} />
    </Stroke>
  );
}
