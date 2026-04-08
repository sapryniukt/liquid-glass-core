export function imageDataToDataUrl(imageData: ImageData): string {
  const canvas = document.createElement('canvas')
  canvas.width = imageData.width
  canvas.height = imageData.height
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''
  ctx.putImageData(imageData, 0, 0)
  return canvas.toDataURL('image/png')
}

export function getDevicePixelRatio(override?: number): number {
  return override ?? (typeof window !== 'undefined' ? window.devicePixelRatio ?? 1 : 1)
}

let idCounter = 0
export function generateFilterId(prefix = 'liquid-glass'): string {
  return `${prefix}-${++idCounter}-${Math.random().toString(36).substring(2, 8)}`
}
