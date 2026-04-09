# @sapryniukt/vue-liquid-glass

Physics-based liquid glass effect library for Vue 3 — real-time refraction, specular highlights, chromatic aberration, and ready-to-use glass components.

## Installation

```bash
npm install @sapryniukt/vue-liquid-glass
```

**Peer dependency:** Vue 3.4+

## Quick Start

### Plugin (register all components globally)

```ts
import { createApp } from 'vue'
import LiquidGlassCorePlugin from '@sapryniukt/vue-liquid-glass'
import App from './App.vue'

createApp(App).use(LiquidGlassCorePlugin).mount('#app')
```

### Named imports (tree-shakeable)

```ts
import {
  LiquidGlassPanel,
  LiquidGlassSwitch,
  LiquidGlassSlider,
  LiquidGlassBottomNavBar,
  LiquidGlassSearchBar,
  LiquidGlassButton,
} from '@sapryniukt/vue-liquid-glass'
```

## Components

### LiquidGlassPanel

A glass container with refraction, specular highlights, and gradient blur edges.

```vue
<LiquidGlassPanel
  :border-radius="24"
  :blur="1.2"
  :specular-opacity="0.4"
  content-padding="24px"
>
  <p>Content behind glass</p>
</LiquidGlassPanel>
```

| Prop | Type | Default |
|------|------|---------|
| `borderRadius` | `number` | `50` |
| `bezelWidth` | `number` | `40` |
| `glassThickness` | `number` | `120` |
| `refractiveIndex` | `number` | `1.5` |
| `bezelType` | `BezelType` | `"convex_squircle"` |
| `shape` | `ShapeType` | `"pill"` |
| `blur` | `number` | `1` |
| `scaleRatio` | `number` | `0.4` |
| `specularOpacity` | `number` | `0.4` |
| `specularSaturation` | `number` | `8` |
| `magnify` | `boolean` | `false` |
| `gradientBlurSize` | `number` | `60` |
| `backgroundColor` | `string` | `"var(--lg-panel-bg, rgba(255,255,255,0.05))"` |
| `contentPadding` | `string` | `"20px"` |
| `disabled` | `boolean` | `false` |
| `hoverLight` | `boolean` | `true` |

### LiquidGlassSwitch

A toggle switch with a draggable glass thumb and animated track.

```vue
<LiquidGlassSwitch v-model="isEnabled" size="medium" />
```

| Prop | Type | Default |
|------|------|---------|
| `modelValue` | `boolean` | `false` |
| `size` | `"xs" \| "small" \| "medium" \| "large"` | `"medium"` |
| `disabled` | `boolean` | `false` |
| `restScale` | `number` | `0.65` |
| `activeScale` | `number` | `0.9` |
| `hoverLight` | `boolean` | `true` |

### LiquidGlassSlider

A range slider with a glass thumb that scales on drag.

```vue
<LiquidGlassSlider v-model="volume" :min="0" :max="100" size="medium" />
```

| Prop | Type | Default |
|------|------|---------|
| `modelValue` | `number` | `0` |
| `min` | `number` | `0` |
| `max` | `number` | `100` |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` |
| `disabled` | `boolean` | `false` |
| `restScale` | `number` | `0.6` |
| `dragScale` | `number` | `1` |
| `hoverLight` | `boolean` | `true` |

### LiquidGlassBottomNavBar

A navigation bar with a morphing glass thumb indicator.

```vue
<LiquidGlassBottomNavBar
  v-model="activeTab"
  :items="[
    { id: 'home', label: 'Home', icon: '<svg>...</svg>' },
    { id: 'search', label: 'Search', icon: '<svg>...</svg>' },
    { id: 'profile', label: 'Profile', icon: '<svg>...</svg>' },
  ]"
/>
```

| Prop | Type | Default |
|------|------|---------|
| `modelValue` | `string` | `""` |
| `items` | `NavItem[]` | **(required)** |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` |
| `disabled` | `boolean` | `false` |
| `activeColor` | `string` | `"var(--lg-nav-active, #7ec8ff)"` |
| `hoverLight` | `boolean` | `true` |

`NavItem`: `{ id: string; label: string; icon?: string }`

### LiquidGlassSearchBar

An expandable search input with a glass orb indicator.

```vue
<LiquidGlassSearchBar v-model="query" placeholder="Search..." size="medium" />
```

| Prop | Type | Default |
|------|------|---------|
| `modelValue` | `string` | `""` |
| `placeholder` | `string` | `"Search..."` |
| `size` | `"xs" \| "small" \| "medium" \| "large"` | `"medium"` |
| `disabled` | `boolean` | `false` |
| `hoverLight` | `boolean` | `true` |

### LiquidGlassButton

A glass-effect button with press/hover refraction response.

```vue
<LiquidGlassButton label="Click Me" size="medium" @click="handleClick" />
```

| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | `"Liquid Glass Button"` |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` |
| `disabled` | `boolean` | `false` |
| `width` | `number` | `180` |
| `blur` | `number` | `1` |
| `specularOpacity` | `number` | `0.4` |
| `pressScale` | `number` | `0.97` |
| `hoverLight` | `boolean` | `true` |

### LiquidGlassFilter

Low-level SVG filter primitive used internally by all glass components. Use this to build custom glass elements.

```vue
<LiquidGlassFilter
  id="my-filter"
  :width="200"
  :height="100"
  :radius="50"
  shape="pill"
/>

<div style="backdrop-filter: url(#my-filter)">Custom glass</div>
```

### GradientBlur

A directional gradient blur overlay for softening glass edges.

```vue
<GradientBlur direction="bottom" :size="60" />
```

## Composables

### `useLiquidGlass(elementRef?, options?)`

Generates and manages a liquid glass SVG filter for any element.

```ts
import { ref } from 'vue'
import { useLiquidGlass } from '@sapryniukt/vue-liquid-glass'

const el = ref<HTMLElement | null>(null)
const { filterId, backdropStyle, regenerate } = useLiquidGlass(el, {
  refractiveIndex: 1.5,
  blur: 0.8,
  scaleRatio: 0.4,
})
```

**Returns:** `filterId`, `assets`, `scale`, `backdropStyle`, `regenerate`, `observedWidth`, `observedHeight`

### `useGlassHover(elementRef, options?)`

Tracks pointer position to create a light-follow hover effect.

```ts
import { ref } from 'vue'
import { useGlassHover } from '@sapryniukt/vue-liquid-glass'

const el = ref<HTMLElement | null>(null)
const { hoverStyle, hoverProgress } = useGlassHover(el, {
  radius: 150,
  intensity: 0.18,
})
```

**Options:** `radius`, `intensity`, `baseBrightness`, `smoothing`, `fadeSmoothing`

**Returns:** `mouseX`, `mouseY`, `isHovering`, `hoverProgress`, `hoverStyle`

### `useSpring(initial, config?)`

A spring-physics animation primitive.

### `useLerp(initial, smoothing?)`

Linear interpolation helper for smooth value transitions.

## Low-Level Lib

For advanced use, the pure math functions are also exported:

```ts
import {
  calculateDisplacementMap,
  calculateSpecularMap,
  calculateMagnifyingMap,
  imageDataToDataUrl,
  CONVEX,
  CONCAVE,
  LIP,
  createCustomSurface,
} from '@sapryniukt/vue-liquid-glass'
```

## CSS Custom Properties

All components support theming via CSS custom properties:

```css
:root {
  --lg-panel-bg: rgba(255, 255, 255, 0.05);
  --lg-panel-border: rgba(255, 255, 255, 0.15);
  --lg-panel-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  --lg-button-text: rgba(255, 255, 255, 0.95);
  --lg-button-bg: rgba(255, 255, 255, 0.05);
  --lg-slider-fill: #0377F7;
  --lg-slider-track-base: rgba(137, 137, 143, 0.72);
  --lg-nav-active: #7ec8ff;
  --lg-nav-text: rgba(255, 255, 255, 0.82);
  --lg-switch-track-inset: inset 0 0 10px rgba(255, 255, 255, 0.08);
}
```

## Types

```ts
import type {
  ShapeType,
  BezelType,
  SurfaceFnDef,
  GlassConfig,
  GlassFilterAssets,
  SpringConfig,
  UseLiquidGlassOptions,
  GlassHoverOptions,
} from '@sapryniukt/vue-liquid-glass'
```

## Inspiration

This library is inspired by the concept described in [Liquid Glass with CSS & SVG](https://kube.io/blog/liquid-glass-css-svg) by Kube.

## License

GNU General Public License v3.0 (GPL-3.0)

SPDX License Identifier: `GPL-3.0-only`
