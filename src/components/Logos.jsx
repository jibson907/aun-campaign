/* Brand marks rendered as inline SVG so the page works asset-free.
   Swap for official AUN/Chohkman SVG files when available. */

export function AUNLogo({ className = 'h-10 w-auto', tone = 'auto' }) {
  // tone="auto" picks colors based on currentColor; pass tone="light" to render on dark bg.
  const wordmarkFill = tone === 'light' ? '#ffffff' : '#003366';
  return (
    <svg
      viewBox="0 0 240 64"
      role="img"
      aria-label="American University of Nigeria"
      className={className}
    >
      <defs>
        <linearGradient id="aun-shield" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#0b4286" />
          <stop offset="100%" stopColor="#003366" />
        </linearGradient>
      </defs>
      <g>
        <rect x="0" y="6" width="54" height="54" rx="12" fill="url(#aun-shield)" />
        <rect x="0" y="6" width="54" height="10" fill="#f4b400" rx="12" />
        <text
          x="27"
          y="44"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontWeight="800"
          fontSize="22"
          fill="#ffffff"
        >
          AUN
        </text>
        <text
          x="66"
          y="28"
          fontFamily="Inter, sans-serif"
          fontWeight="800"
          fontSize="14"
          fill={wordmarkFill}
          letterSpacing="1.5"
        >
          AMERICAN UNIVERSITY
        </text>
        <text
          x="66"
          y="48"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
          fontSize="12"
          fill={wordmarkFill}
          letterSpacing="2"
          opacity="0.78"
        >
          OF NIGERIA
        </text>
      </g>
    </svg>
  );
}

export function ChohkmanLogo({ className = 'h-10 w-auto', tone = 'auto' }) {
  const wordmarkFill = tone === 'light' ? '#ffffff' : '#003366';
  return (
    <svg
      viewBox="0 0 240 64"
      role="img"
      aria-label="Chohkman Academy"
      className={className}
    >
      <defs>
        <linearGradient id="chk-disc" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#facc46" />
          <stop offset="100%" stopColor="#d59a02" />
        </linearGradient>
      </defs>
      <g>
        <circle cx="27" cy="33" r="24" fill="url(#chk-disc)" />
        <text
          x="27"
          y="40"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontWeight="800"
          fontSize="22"
          fill="#003366"
        >
          C
        </text>
        <text
          x="66"
          y="28"
          fontFamily="Inter, sans-serif"
          fontWeight="800"
          fontSize="14"
          fill={wordmarkFill}
          letterSpacing="1.5"
        >
          CHOHKMAN
        </text>
        <text
          x="66"
          y="48"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
          fontSize="12"
          fill={wordmarkFill}
          letterSpacing="2"
          opacity="0.78"
        >
          ACADEMY
        </text>
      </g>
    </svg>
  );
}
