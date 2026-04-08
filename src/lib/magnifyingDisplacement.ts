import { getDevicePixelRatio } from './utils'

/**
 * Generate a radial displacement map that pushes pixels toward/away from center.
 * Used for the magnifying/zoom pre-warp stage of the filter pipeline.
 */
export function calculateMagnifyingMap(
  width: number,
  height: number,
  dpr?: number
): ImageData {
  const devicePixelRatio = getDevicePixelRatio(dpr)
  const bufferWidth = Math.floor(width * devicePixelRatio)
  const bufferHeight = Math.floor(height * devicePixelRatio)
  const imageData = new ImageData(bufferWidth, bufferHeight)

  const centerX = bufferWidth / 2
  const centerY = bufferHeight / 2

  for (let y = 0; y < bufferHeight; y++) {
    for (let x = 0; x < bufferWidth; x++) {
      const idx = (y * bufferWidth + x) * 4

      const dx = (x - centerX) / centerX
      const dy = (y - centerY) / centerY

      imageData.data[idx] = 128 + dx * 127
      imageData.data[idx + 1] = 128 + dy * 127
      imageData.data[idx + 2] = 0
      imageData.data[idx + 3] = 255
    }
  }

  return imageData
}
