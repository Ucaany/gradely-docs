'use client'

/**
 * DashboardMascotHeader — Client wrapper untuk greeting mascot di dashboard
 * Server Component tidak bisa pakai hooks (useTheme, time-aware),
 * jadi komponen ini membungkus UserSettingsMascot untuk digunakan di Server pages.
 */

import { UserSettingsMascot } from '@/components/mascot'

interface DashboardMascotHeaderProps {
  userName: string
  userRole: 'student' | 'lecturer' | 'admin' | 'company'
  profileCompletion?: number
  avatarUrl?: string
}

export function DashboardMascotHeader({
  userName,
  userRole,
  profileCompletion,
  avatarUrl,
}: DashboardMascotHeaderProps) {
  return (
    <UserSettingsMascot
      userName={userName}
      userRole={userRole}
      profileCompletion={profileCompletion}
      avatarUrl={avatarUrl}
    />
  )
}

