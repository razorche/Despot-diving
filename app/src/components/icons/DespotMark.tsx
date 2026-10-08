/** Ronilačka maska — brend ikona za dock */
export function DespotMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 22c4-6 8-8 12-8s8 2 12 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 28c3-4 6-5 10-5s7 1 10 5"
        stroke="#3ecfd6"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="18" cy="20" r="2.5" fill="currentColor" />
      <circle cx="30" cy="20" r="2.5" fill="currentColor" />
    </svg>
  );
}
