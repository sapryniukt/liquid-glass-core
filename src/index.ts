import type { App, Plugin } from 'vue'
import {
  LiquidGlassFilter,
  LiquidGlassPanel,
  LiquidGlassSearchBar,
  LiquidGlassButton,
  LiquidGlassSwitch,
  LiquidGlassSlider,
  LiquidGlassBottomNavBar,
  GradientBlur,
} from './components'

// Types
export type {
  ShapeType,
  BezelType,
  SurfaceFnDef,
  GlassConfig,
  GlassFilterAssets,
  SpringConfig,
} from './types'

// Lib — pure math functions
export {
  CONVEX_CIRCLE,
  CONVEX,
  CONCAVE,
  LIP,
  SURFACE_PRESETS,
  createCustomSurface,
  calculateDisplacementMap,
  calculateDisplacementMap2D,
  calculateDisplacementMapWithShape,
  calculateSpecularMap,
  calculateMagnifyingMap,
  imageDataToDataUrl,
  getDevicePixelRatio,
  generateFilterId,
} from './lib'

// Composables
export {
  useLiquidGlass,
  useSpring,
  useLerp,
  useGlassHover,
  type UseLiquidGlassOptions,
  type GlassHoverOptions,
} from './composables'

// Components
export {
  LiquidGlassFilter,
  LiquidGlassPanel,
  LiquidGlassSearchBar,
  LiquidGlassButton,
  LiquidGlassSwitch,
  LiquidGlassSlider,
  LiquidGlassBottomNavBar,
  GradientBlur,
} from './components'

const allComponents = [
  LiquidGlassFilter,
  LiquidGlassPanel,
  LiquidGlassSearchBar,
  LiquidGlassButton,
  LiquidGlassSwitch,
  LiquidGlassSlider,
  LiquidGlassBottomNavBar,
  GradientBlur,
]

export const LiquidGlassCorePlugin: Plugin = {
  install(app: App) {
    for (const component of allComponents) {
      const componentName = component.name ?? (component as { __name?: string }).__name
      if (!componentName) continue
      app.component(componentName, component)
    }
  },
}

export default LiquidGlassCorePlugin
