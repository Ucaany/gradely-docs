"use client"

import { useTheme } from "next-themes"
// Import langsung dari node_modules agar tidak terkena alias 'sonner' di tsconfig
import { Toaster as Sonner, type ToasterProps } from "../../../node_modules/sonner/dist"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
