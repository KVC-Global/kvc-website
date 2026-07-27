import * as LucideIcons from "lucide-react"
import type { LucideIcon } from "lucide-react"

export function getIcon(
  iconName?: string,
  fallback?: LucideIcon,
): LucideIcon {
  if (!iconName) return fallback || LucideIcons.Building2
  const key = iconName as keyof typeof LucideIcons
  if (typeof LucideIcons[key] === "function") {
    return LucideIcons[key] as LucideIcon
  }
  return fallback || LucideIcons.Building2
}
