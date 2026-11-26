import { useId } from "react";
import type { ProjectId } from "../../data/projects";
import type { IconProps } from "./types";

function Base({
  size = 36,
  className,
  stroke,
  children,
}: IconProps & { stroke: string; children: React.ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke={stroke}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

function AntaresIcon(p: IconProps) {
  return (
    <Base {...p} stroke="#ff9a3d">
      <path d="M32 8C34 22 42 30 56 32C42 34 34 42 32 56C30 42 22 34 8 32C22 30 30 22 32 8Z" />
    </Base>
  );
}

function LarawagIcon(p: IconProps) {
  const id = `lw-${useId().replace(/:/g, "")}`;
  return (
    <Base {...p} stroke="#b99cff">
      <defs>
        <mask
          id={id}
          maskUnits="userSpaceOnUse"
          x="-20"
          y="-20"
          width="104"
          height="104"
        >
          <rect x="-20" y="-20" width="104" height="104" fill="#fff" />
          <circle cx="7.6" cy="28.2" r="6.6" fill="#000" stroke="none" />
        </mask>
      </defs>
      <g transform="rotate(-20 32 32)">
        <ellipse cx="32" cy="32" rx="26" ry="11" mask={`url(#${id})`} />
        <circle cx="7.6" cy="28.2" r="3.4" />
      </g>
      <circle cx="32" cy="32" r="4.5" />
    </Base>
  );
}

function ShaulaIcon(p: IconProps) {
  return (
    <Base {...p} stroke="#5aa5ff">
      <path d="M30.25 12A20 20 0 1 0 49.27 37.36A16 16 0 1 1 30.25 12Z" />
    </Base>
  );
}

function FangIcon(p: IconProps) {
  return (
    <Base {...p} stroke="#4fd38a">
      <circle cx="32" cy="32" r="18" />
      <path d="M14.7 27Q32 21 49.3 27" />
      <path d="M15.9 40Q32 46 48.1 40" />
    </Base>
  );
}

export const projectIcons: Record<ProjectId, (p: IconProps) => JSX.Element> = {
  antares: AntaresIcon,
  larawag: LarawagIcon,
  shaula: ShaulaIcon,
  fang: FangIcon,
};
