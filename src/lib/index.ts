export {
  CONVEX_CIRCLE,
  CONVEX,
  CONCAVE,
  LIP,
  SURFACE_PRESETS,
  createCustomSurface,
} from './surfaceEquations'

export {
  calculateDisplacementMap,
  calculateDisplacementMap2D,
  calculateDisplacementMapWithShape,
} from './displacementMap'

export { calculateSpecularMap } from './specular'

export { calculateMagnifyingMap } from './magnifyingDisplacement'

export { imageDataToDataUrl, getDevicePixelRatio, generateFilterId } from './utils'
