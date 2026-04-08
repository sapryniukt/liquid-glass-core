<script setup lang="ts">
import { computed, ref, type CSSProperties } from "vue";
import {
  useGlassHover,
  type GlassHoverOptions,
} from "../composables/useGlassHover";
import LiquidGlassFilter from "./LiquidGlassFilter.vue";

const props = withDefaults(
  defineProps<{
    label?: string;
    size?: "small" | "medium" | "large";
    disabled?: boolean;
    width?: number;
    // Liquid glass tuning
    specularOpacity?: number;
    specularSaturation?: number;
    refractionLevel?: number;
    blur?: number;
    bezelWidth?: number;
    glassThickness?: number;
    refractiveIndexBase?: number;
    hoverRefractiveBoost?: number;
    pressedRefractionBoost?: number;
    // Motion / layout
    pressScale?: number;
    fontWeight?: number | string;
    letterSpacing?: string;
    transition?: string;
    // Theme-able visual props (fallbacks keep current look)
    borderColor?: string;
    textColor?: string;
    backgroundColor?: string;
    backgroundColorPressed?: string;
    shadow?: string;
    shadowPressed?: string;
    borderStyle?: string;
    hoverLight?: boolean;
    hoverLightOptions?: GlassHoverOptions;
  }>(),
  {
    label: "Liquid Glass Button",
    size: "medium",
    disabled: false,
    width: 180,
    specularOpacity: 0.4,
    specularSaturation: 8,
    refractionLevel: 0.4,
    blur: 1,
    bezelWidth: 12,
    glassThickness: 80,
    refractiveIndexBase: 1.4,
    hoverRefractiveBoost: 0.12,
    pressedRefractionBoost: 0.05,
    pressScale: 0.97,
    fontWeight: 600,
    letterSpacing: "0.01em",
    transition:
      "transform 180ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 200ms ease, background-color 200ms ease",
    borderColor: "var(--lg-button-border, rgba(255, 255, 255, 0.15))",
    textColor: "var(--lg-button-text, rgba(255, 255, 255, 0.95))",
    backgroundColor: "var(--lg-button-bg, rgba(255,255,255,0.05))",
    backgroundColorPressed:
      "var(--lg-button-bg-pressed, rgba(255,255,255,0.05))",
    shadow: "var(--lg-button-shadow, 0 2px 10px rgba(0,0,0,0.05))",
    shadowPressed:
      "var(--lg-button-shadow-pressed, 0 4px 24px rgba(0,0,0,0.1))",
    borderStyle: "1px solid",
    hoverLight: true,
  },
);

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const sizePresets = {
  small: { height: 44, fontSize: 14 },
  medium: { height: 56, fontSize: 15 },
  large: { height: 64, fontSize: 16 },
};

const pressed = ref(false);
const buttonRef = ref<HTMLButtonElement | null>(null);
const filterId = `lg-button-${Math.random().toString(36).substring(2, 9)}`;
const { hoverStyle, hoverProgress } = useGlassHover(
  buttonRef,
  props.hoverLightOptions,
);

const dimensions = computed(() => sizePresets[props.size]);
const height = computed(() => dimensions.value.height);
const radius = computed(() => height.value / 2);
const hoverRefractiveIndex = computed(
  () =>
    props.refractiveIndexBase +
    hoverProgress.value * props.hoverRefractiveBoost,
);
const scaleRatio = computed(() =>
  pressed.value
    ? props.refractionLevel + props.pressedRefractionBoost
    : props.refractionLevel,
);
const buttonStyle = computed<CSSProperties>(() => ({
  position: "relative",
  width: `${props.width}px`,
  height: `${height.value}px`,
  borderRadius: `${radius.value}px`,
  border: `${props.borderStyle} ${props.borderColor}`,
  color: props.textColor,
  fontSize: `${dimensions.value.fontSize}px`,
  fontWeight: props.fontWeight,
  letterSpacing: props.letterSpacing,
  cursor: props.disabled ? "not-allowed" : "pointer",
  userSelect: "none",
  transition: props.transition,
  transform: pressed.value ? `scale(${props.pressScale})` : "scale(1)",
  overflow: "hidden",
  backdropFilter: `url(#${filterId})`,
  WebkitBackdropFilter: `url(#${filterId})`,
  backgroundColor: pressed.value
    ? props.backgroundColorPressed
    : props.backgroundColor,
  boxShadow: pressed.value ? props.shadowPressed : props.shadow,
}));

const handlePointerDown = () => {
  if (props.disabled) return;
  pressed.value = true;
};

const handlePointerUp = () => {
  pressed.value = false;
};

const handleClick = (event: MouseEvent) => {
  if (props.disabled) return;
  emit("click", event);
};
</script>

<template>
  <div
    :style="{
      position: 'relative',
      display: 'inline-block',
      opacity: disabled ? 0.5 : 1,
    }"
  >
    <LiquidGlassFilter
      :id="filterId"
      :width="width"
      :height="height"
      :radius="radius"
      :bezel-width="bezelWidth"
      :glass-thickness="glassThickness"
      :refractive-index="hoverRefractiveIndex"
      bezel-type="convex_squircle"
      shape="pill"
      :blur="blur"
      :scale-ratio="scaleRatio"
      :specular-opacity="specularOpacity"
      :specular-saturation="specularSaturation"
    />

    <button
      ref="buttonRef"
      type="button"
      :disabled="disabled"
      :style="buttonStyle"
      @pointerdown="handlePointerDown"
      @pointerup="handlePointerUp"
      @pointercancel="handlePointerUp"
      @pointerleave="handlePointerUp"
      @click="handleClick"
    >
      <div
        v-if="hoverLight"
        :style="{
          ...hoverStyle,
          borderRadius: `${radius}px`,
          overflow: 'hidden',
        }"
      />
      <span :style="{ position: 'relative', zIndex: 1 }">
        <slot>{{ label }}</slot>
      </span>
    </button>
  </div>
</template>
