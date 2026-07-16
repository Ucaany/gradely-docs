/**
 * loading.tsx - Company Dashboard Loading Screen
 */

import { MascotRunningDocument } from '@/components/mascot/icons'

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default async function CompanyDashboardLoading() {
  await sleep(1800)

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 min-h-[60vh]">
      <div className="animate-bounce">
        <MascotRunningDocument className="w-24 h-24 text-black dark:text-neutral-100" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-medium text-foreground">Memuat dashboard...</p>
        <div className="flex items-center gap-1">
          <span className="animate-dot-1 inline-block w-1.5 h-1.5 rounded-full bg-primary/60" />
          <span className="animate-dot-2 inline-block w-1.5 h-1.5 rounded-full bg-primary/60" />
          <span className="animate-dot-3 inline-block w-1.5 h-1.5 rounded-full bg-primary/60" />
        </div>
      </div>
    </div>
  )
}
