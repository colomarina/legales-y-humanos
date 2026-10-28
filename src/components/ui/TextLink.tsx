import type { ReactNode } from 'react'
import { Arrow } from './Arrow'
import './TextLink.css'

interface TextLinkProps {
  href: string
  children: ReactNode
}

/** Enlace secundario con subrayado que crece al pasar o enfocar. */
export function TextLink({ href, children }: TextLinkProps) {
  return (
    <a className="text-link" href={href}>
      <span className="text-link__label">{children}</span>
      <Arrow />
    </a>
  )
}
