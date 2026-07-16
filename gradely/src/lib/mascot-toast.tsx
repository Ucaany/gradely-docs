'use client'

/**
 * mascotToast — Drop-in replacement untuk toast.success / toast.error / toast.warning
 *
 * Menggunakan Sonner's toast.custom() agar mascot illustration bisa dirender
 * di dalam toast notification yang sudah ada di top-right (dari layout.tsx).
 *
 * Usage:
 *   import { mascotToast } from '@/lib/mascot-toast'
 *   mascotToast.success('Nilai berhasil disimpan!')
 *   mascotToast.error('Gagal menyimpan data')
 *   mascotToast.warning('Periksa kembali inputmu')
 *   mascotToast.info('Data sedang diproses')
 */

import * as React from 'react'
import { toast } from 'sonner'
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  X,
} from 'lucide-react'
import Image from 'next/image'

// ---------------------------------------------------------------------------
// Config per type
// ---------------------------------------------------------------------------

type ToastType = 'success' | 'error' | 'warning' | 'info'

const TYPE_CONFIG: Record<ToastType, {
  mascot: string
  icon: React.ElementType
  iconColor: string
  bg: string
  border: string
  titleColor: string
}> = {
  success: {
    mascot: '/assets/illustrations/mascot-running-document.svg',
    icon: CheckCircle2,
    iconColor: 'text-green-500',
    bg: 'bg-white dark:bg-zinc-900',
    border: 'border-green-400/40',
    titleColor: 'text-green-700 dark:text-green-400',
  },
  error: {
    mascot: '/assets/illustrations/mascot-angry-watch.svg',
    icon: XCircle,
    iconColor: 'text-red-500',
    bg: 'bg-white dark:bg-zinc-900',
    border: 'border-red-400/40',
    titleColor: 'text-red-700 dark:text-red-400',
  },
  warning: {
    mascot: '/assets/illustrations/mascot-phone-thinking.svg',
    icon: AlertTriangle,
    iconColor: 'text-yellow-500',
    bg: 'bg-white dark:bg-zinc-900',
    border: 'border-yellow-400/40',
    titleColor: 'text-yellow-700 dark:text-yellow-400',
  },
  info: {
    mascot: '/assets/illustrations/mascot-idle-neutral.svg',
    icon: Info,
    iconColor: 'text-blue-500',
    bg: 'bg-white dark:bg-zinc-900',
    border: 'border-blue-400/40',
    titleColor: 'text-blue-700 dark:text-blue-400',
  },
}

// ---------------------------------------------------------------------------
// Toast content component
// ---------------------------------------------------------------------------

interface MascotToastContentProps {
  type: ToastType
  title: string
  description?: string
  toastId: string | number
}

function MascotToastContent({ type, title, description, toastId }: MascotToastContentProps) {
  const cfg = TYPE_CONFIG[type]
  const IconComponent = cfg.icon

  return (
    <div
      className={`
        flex items-start gap-3 w-full
        rounded-xl border ${cfg.border} ${cfg.bg}
        px-3 py-3 shadow-lg shadow-black/10
        backdrop-blur-sm
      `}
    >
      <div className="flex-shrink-0 self-center">
        <Image
          src={cfg.mascot}
          alt=""
          width={40}
          height={40}
          className="w-10 h-10 object-contain"
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-1 flex-col gap-0.5 min-w-0 pt-0.5">
        <div className="flex items-center gap-1.5">
          <IconComponent className={`h-3.5 w-3.5 flex-shrink-0 ${cfg.iconColor}`} aria-hidden="true" />
          <p className={`text-sm font-semibold leading-tight truncate ${cfg.titleColor}`}>
            {title}
          </p>
        </div>
        {description && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
      </div>

      <button
        onClick={() => toast.dismiss(toastId)}
        className="flex-shrink-0 -mt-0.5 -mr-0.5 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        aria-label="Tutup notifikasi"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Helper function
// ---------------------------------------------------------------------------

function show(
  type: ToastType,
  title: string,
  description?: string,
  opts?: { duration?: number }
) {
  return toast.custom(
    (id: string | number) => (
      <MascotToastContent
        type={type}
        title={title}
        description={description}
        toastId={id}
      />
    ),
    {
      duration: opts?.duration ?? (type === 'error' ? 6000 : 4000),
      position: 'top-right',
    }
  )
}

// ---------------------------------------------------------------------------
// Public API — drop-in replacement untuk toast.success / toast.error
// ---------------------------------------------------------------------------

export const mascotToast = {
  /** Berhasil disimpan, aksi sukses */
  success: (title: string, description?: string, opts?: { duration?: number }) =>
    show('success', title, description, opts),

  /** Terjadi kesalahan */
  error: (title: string, description?: string, opts?: { duration?: number }) =>
    show('error', title, description, opts),

  /** Peringatan / perlu perhatian */
  warning: (title: string, description?: string, opts?: { duration?: number }) =>
    show('warning', title, description, opts),

  /** Informasi umum */
  info: (title: string, description?: string, opts?: { duration?: number }) =>
    show('info', title, description, opts),
}
