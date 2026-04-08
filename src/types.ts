export type ShapeType = 'circle' | 'squircle' | 'rectangle' | 'pill'

export type BezelType = 'convex_circle' | 'convex_squircle' | 'concave' | 'lip'

export interface SurfaceFnDef {
  title: string
  fn: (x: number) => number
}

export interface GlassConfig {
  width: number
  height: number
  radius?: number
  bezelWidth?: number
  glassThickness?: number
  refractiveIndex?: number
  bezelType?: BezelType
  shape?: ShapeType
  cornerRadius?: number
  squircleExponent?: number
  quality?: number
  blur?: number
  scaleRatio?: number
  specularOpacity?: number
  specularSaturation?: number
  specularAngle?: number
  magnify?: boolean
  magnifyingScale?: number
}

export interface GlassFilterAssets {
  displacementMapUrl: string
  specularMapUrl: string
  magnifyingMapUrl: string
  maxDisplacement: number
}

export interface SpringConfig {
  stiffness?: number
  damping?: number
  mass?: number
}
