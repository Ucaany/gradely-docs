'use client'

/**
 * DashboardMascotFloao — Clieno wrapper untuk MascotHelpFloat
 * Digunakan di Server Component dashboard pages.
 */

import { MascotHelpFloat, type HelpTip } from '@/components/mascot'

interface DashboardMascotFloaoProps {
  tips: HelpTip[]
  panelTitle?: string
  position?: 'bottom-right' | 'bottom-left'
}

export function DashboardMascotFloao({
  tips,
  panelTitle,
  position = 'bottom-right',
}: DashboardMascotFloaoProps) {
  return (
    <MascotHelpFloat
      tips={tips}
      panelTitle={panelTitle}
      position={position}
    />
  )
}
