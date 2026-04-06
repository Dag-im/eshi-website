import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function stripWrappingQuotes(value: string) {
  const trimmed = value.trim()
  if (
    (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
    (trimmed.startsWith('"') && trimmed.endsWith('"'))
  ) {
    return trimmed.slice(1, -1).trim()
  }

  return trimmed
}

export function resolveAssetUrl(assetUrl?: string | null) {
  if (!assetUrl) {
    return ''
  }

  const cleanAssetUrl = stripWrappingQuotes(assetUrl)
  if (!cleanAssetUrl) {
    return ''
  }

  if (/^https?:\/\//i.test(cleanAssetUrl) || cleanAssetUrl.startsWith('blob:') || cleanAssetUrl.startsWith('data:')) {
    return cleanAssetUrl
  }

  const apiBaseUrl = stripWrappingQuotes(process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '')
  const apiOrigin = apiBaseUrl?.replace(/\/api$/, '')
  const apiUploadsBase = apiBaseUrl
    ? (apiBaseUrl.endsWith('/api') ? `${apiBaseUrl}/uploads` : `${apiBaseUrl}/api/uploads`)
    : ''

  if (cleanAssetUrl.startsWith('/api/uploads/')) {
    return apiOrigin ? `${apiOrigin}${cleanAssetUrl}` : cleanAssetUrl
  }

  if (cleanAssetUrl.startsWith('/uploads/')) {
    if (apiBaseUrl.endsWith('/api')) {
      return `${apiBaseUrl}${cleanAssetUrl}`
    }
    return apiOrigin ? `${apiOrigin}/api${cleanAssetUrl}` : cleanAssetUrl
  }

  if (/^uploads\//i.test(cleanAssetUrl)) {
    return apiBaseUrl ? `${apiUploadsBase}/${cleanAssetUrl.replace(/^uploads\//i, '')}` : `/${cleanAssetUrl}`
  }

  if (!cleanAssetUrl.includes('/')) {
    return apiUploadsBase ? `${apiUploadsBase}/${cleanAssetUrl}` : cleanAssetUrl
  }

  return cleanAssetUrl
}
