import * as LucideIcons from "lucide-react"
import type { LucideIcon } from "lucide-react"

export function getIcon(
  iconName?: string,
  fallback?: LucideIcon,
): LucideIcon {
  if (!iconName || typeof iconName !== "string") return fallback || LucideIcons.Building2
  const cleanName = iconName.trim()
  const iconMap = LucideIcons as Record<string, any>

  // Direct match (e.g. "Globe", "Star", "Users", "Clock")
  if (iconMap[cleanName]) return iconMap[cleanName] as LucideIcon

  // PascalCase conversion (e.g. "globe" -> "Globe", "building-2" -> "Building2", "book_open" -> "BookOpen")
  const pascalName = cleanName.replace(/(?:^|-|_|\s)(\w)/g, (_, c) => c.toUpperCase())
  if (iconMap[pascalName]) return iconMap[pascalName] as LucideIcon

  return fallback || LucideIcons.Building2
}
