export function Flag({ code, size = 28 }: { code: "us" | "br"; size?: number }) {
  const label = code === "us" ? "United States flag" : "Brazil flag";
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 30 20"
      width={size}
      height={(size * 2) / 3}
      style={{ borderRadius: 2, flex: "none" }}
    >
      {code === "us" ? (
        <>
          <rect width="30" height="20" fill="#fff" />
          {[0, 2, 4, 6, 8, 10, 12].map((i) => (
            <rect key={i} y={(i * 20) / 13} width="30" height={20 / 13} fill="#b22234" />
          ))}
          <rect width="12" height={(20 * 7) / 13} fill="#3c3b6e" />
        </>
      ) : (
        <>
          <rect width="30" height="20" fill="#009c3b" />
          <path d="M15 2.5L27 10 15 17.5 3 10z" fill="#ffdf00" />
          <circle cx="15" cy="10" r="4.2" fill="#002776" />
        </>
      )}
    </svg>
  );
}
