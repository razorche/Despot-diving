import { useId } from 'react';
import { cn } from '@/lib/utils';

type DespotClubLogoProps = {
  variant?: 'full' | 'mark';
  className?: string;
  title?: string;
};

export function DespotClubLogo({
  variant = 'full',
  className,
  title = 'Despot Ronilački Klub',
}: DespotClubLogoProps) {
  const uid = useId().replace(/:/g, '');
  const dGrad = `despotDGrad-${uid}`;
  const waveGrad = `despotWaveGrad-${uid}`;

  if (variant === 'mark') {
    return (
      <svg
        viewBox="0 0 48 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('block shrink-0', className)}
        role={title ? 'img' : undefined}
        aria-hidden={title ? undefined : true}
        aria-label={title || undefined}
      >
        {title ? <title>{title}</title> : null}
        <defs>
          <linearGradient id={dGrad} x1="6" y1="4" x2="42" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#a8e8ec" />
            <stop offset="0.45" stopColor="#3ecfd6" />
            <stop offset="1" stopColor="#1a6b8a" />
          </linearGradient>
          <linearGradient id={waveGrad} x1="8" y1="32" x2="40" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#3ecfd6" />
            <stop offset="1" stopColor="#1565a8" />
          </linearGradient>
        </defs>
        <path
          fill={`url(#${dGrad})`}
          d="M8 4h14c11.6 0 21 9.4 21 21s-9.4 21-21 21H8V4zm10 8v28c6.1 0 11-4.9 11-11S24.1 12 18 12z"
        />
        <path
          fill={`url(#${waveGrad})`}
          opacity="0.85"
          d="M10 36c4 2 8 2 12 0s8-2 12 0 8 2 12 0v6H10v-6z"
        />
        <path
          fill="#e8f6f8"
          d="M22 14l6 4-2 3 4 6-3 1-3-5-2 8h-3l1-9-2-4 4-4z"
        />
        <circle cx="26" cy="13" r="2.2" fill="#e8f6f8" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 300 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('block shrink-0', className)}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={dGrad} x1="6" y1="4" x2="42" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#a8e8ec" />
          <stop offset="0.45" stopColor="#3ecfd6" />
          <stop offset="1" stopColor="#1a6b8a" />
        </linearGradient>
        <linearGradient id={waveGrad} x1="8" y1="32" x2="40" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3ecfd6" />
          <stop offset="1" stopColor="#1565a8" />
        </linearGradient>
        <linearGradient id={`${dGrad}-text`} x1="58" y1="12" x2="200" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#e8f6f8" />
          <stop offset="1" stopColor="#8ec5cf" />
        </linearGradient>
      </defs>
      <g>
        <path
          fill={`url(#${dGrad})`}
          d="M8 4h14c11.6 0 21 9.4 21 21s-9.4 21-21 21H8V4zm10 8v28c6.1 0 11-4.9 11-11S24.1 12 18 12z"
        />
        <path
          fill={`url(#${waveGrad})`}
          opacity="0.85"
          d="M10 36c4 2 8 2 12 0s8-2 12 0 8 2 12 0v6H10v-6z"
        />
        <path
          fill="#e8f6f8"
          d="M22 14l6 4-2 3 4 6-3 1-3-5-2 8h-3l1-9-2-4 4-4z"
        />
        <circle cx="26" cy="13" r="2.2" fill="#e8f6f8" />
      </g>
      <text
        x="58"
        y="34"
        fill={`url(#${dGrad}-text)`}
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="28"
        fontWeight="700"
        letterSpacing="0.06em"
      >
        DESP<tspan fill="#3ecfd6">O</tspan>T
      </text>
      <path
        stroke="#3ecfd6"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        d="M168 28c2 1.5 4 1.5 6 0"
      />
      <path
        stroke="#5ee0e6"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        d="M166 31c3 2 6 2 9 0"
      />
      <line x1="58" y1="42" x2="78" y2="42" stroke="#c4a574" strokeWidth="1" />
      <text
        x="145"
        y="44"
        textAnchor="middle"
        fill="#8ec5cf"
        fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="9"
        fontWeight="500"
        letterSpacing="0.28em"
      >
        DIVING CLUB
      </text>
      <line x1="212" y1="42" x2="232" y2="42" stroke="#c4a574" strokeWidth="1" />
    </svg>
  );
}
