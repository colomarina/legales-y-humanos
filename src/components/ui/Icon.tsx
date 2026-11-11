import type { ReactNode } from 'react'

export type IconName = 'people' | 'scale' | 'layers' | 'person' | 'coins' | 'document' | 'grid'

const paths: Record<IconName, ReactNode> = {
  people: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" />
      <path d="M15.5 4.8a3.5 3.5 0 0 1 0 6.4" />
      <path d="M18 14c2.1.8 3.5 2.9 3.5 6" />
    </>
  ),
  scale: (
    <>
      <path d="M12 3v18" />
      <path d="M7.5 21h9" />
      <path d="M4 7h16" />
      <path d="M12 7l-1-2h2z" />
      <path d="M6 7l-3 7a3.2 3.2 0 0 0 6 0z" />
      <path d="M18 7l-3 7a3.2 3.2 0 0 0 6 0z" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 4.5-9 4.5-9-4.5z" />
      <path d="M3 12l9 4.5 9-4.5" />
      <path d="M3 16.5L12 21l9-4.5" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21c0-4.1 3.4-7.5 7.5-7.5s7.5 3.4 7.5 7.5" />
    </>
  ),
  coins: (
    <>
      <ellipse cx="14" cy="6" rx="6" ry="2.5" />
      <path d="M8 6v8c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V6" />
      <path d="M8 10c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5" />
      <path d="M8 11.6c-.9-.3-1.9-.4-2.5-.4C3 11.2 2 12.3 2 12.9v5.6C2 19.3 3.8 20.5 6.5 20.5c2.2 0 4-.7 4.4-1.6" />
      <path d="M2 15.7c0 .9 1.8 2 4.5 2" />
    </>
  ),
  document: (
    <>
      <path d="M6 2.5h8l4.5 4.5v14.5H6z" />
      <path d="M14 2.5V7h4.5" />
      <path d="M9 11.5h6.5M9 15h6.5M9 18.5h4" />
    </>
  ),
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </>
  ),
}

export function Icon({ name }: { name: IconName }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  )
}
