'use client'

/**
 * Wrapper untuk `sonner` toast.
 *
 * Meng-override toast.success / toast.error / toast.warning / toast.info
 * agar selalu menampilkan mascot illustration (Gradely brand).
 *
 * Di-alias sebagai `sonner` di tsconfig.json, sehingga
 * `import { toast } from 'sonner'` di mana pun otomatis pakai mascot.
 */

import * as React from 'react'
// Import langsung dari node_modules agar tidak terkena alias ini sendiri
import * as Sonner from '../../node_modules/sonner/dist'
import type { ToastT } from '../../node_modules/sonner/dist'
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'warning' | 'info'

const TYPE_CONFIG: Record<ToastType, {
  mascot: string
  icon: React.ElementType
  iconColor: string
  titleColor: string
  borderColor: string
}> = {
  success: {
    mascot: '/assets/illustrations/mascot-running-document.svg',
    icon: CheckCircle2,
    iconColor: 'text-green-500',
    titleColor: 'text-green-700 dark:text-green-400',
    borderColor: 'border-green-200 dark:border-green-800',
  },
  error: {
    mascot: '/assets/illustrations/mascot-angry-watch.svg',
    icon: XCircle,
    iconColor: 'text-red-500',
    titleColor: 'text-red-700 dark:text-red-400',
    borderColor: 'border-red-200 dark:border-red-800',
  },
  warning: {
    mascot: '/assets/illustrations/mascot-phone-thinking.svg',
    icon: AlertTriangle,
    iconColor: 'text-yellow-500',
    titleColor: 'text-yellow-700 dark:text-yellow-400',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
  },
  info: {
    mascot: '/assets/illustrations/mascot-idle-neutral.svg',
    icon: Info,
    iconColor: 'text-blue-500',
    titleColor: 'text-blue-700 dark:text-blue-400',
    borderColor: 'border-blue-200 dark:border-blue-800',
  },
}

function MascotToastContent({
  type,
  title,
  description,
  toastId,
}: {
  type: ToastType
  title: string
  description?: string
  toastId: string | number
}) {
  const cfg = TYPE_CONFIG[type]
  const IconComponent = cfg.icon

  return (
    <div
      style={{ width: '320px', maxWidth: 'calc(100vw - 32px)' }}
      className={`
        flex items-start gap-3 rounded-xl border px-3 py-3
        bg-white dark:bg-zinc-900 shadow-lg shadow-black/10
        ${cfg.borderColor}
      `}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={cfg.mascot}
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 flex-shrink-0 self-center object-contain"
        aria-hidden="true"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-0.5 pt-0.5">
        <div className="flex items-center gap-1.5">
          <IconComponent className={`h-3.5 w-3.5 flex-shrink-0 ${cfg.iconColor}`} aria-hidden="true" />
          <p className={`truncate text-sm font-semibold leading-tight ${cfg.titleColor}`}>
            {title}
          </p>
        </div>
        {description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      <button
        onClick={() => Sonner.toast.dismiss(toastId)}
        className="-mr-0.5 -mt-0.5 flex-shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
        aria-label="Tutup notifikasi"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

function makeOpts(data?: ToastT, type?: ToastType): ToastT {
  return {
    position: 'top-right',
    duration: type === 'error' ? 6000 : 4000,
    unstyled: true,
    ...data,
  } as ToastT
}

function getDesc(data?: ToastT): string | undefined {
  if (typeof data === 'object' && data !== null && 'description' in data) {
    return data.description as string | undefined
  }
  return undefined
}

const patchedToast = {
  ...Sonner.toast,

  success: (message: string | React.ReactNode, data?: ToastT) =>
    Sonner.toast.custom(
      (id: string | number) => (
        <MascotToastContent type="success" title={String(message)} description={getDesc(data)} toastId={id} />
      ),
      makeOpts(data, 'success')
    ),

  error: (message: string | React.ReactNode, data?: ToastT) =>
    Sonner.toast.custom(
      (id: string | number) => (
        <MascotToastContent type="error" title={String(message)} description={getDesc(data)} toastId={id} />
      ),
      makeOpts(data, 'error')
    ),

  warning: (message: string | React.ReactNode, data?: ToastT) =>
    Sonner.toast.custom(
      (id: string | number) => (
        <MascotToastContent type="warning" title={String(message)} description={getDesc(data)} toastId={id} />
      ),
      makeOpts(data, 'warning')
    ),

  info: (message: string | React.ReactNode, data?: ToastT) =>
    Sonner.toast.custom(
      (id: string | number) => (
        <MascotToastContent type="info" title={String(message)} description={getDesc(data)} toastId={id} />
      ),
      makeOpts(data, 'info')
    ),
} as unknown as typeof Sonner.toast

export const toast = patchedToast
export default patchedToast
