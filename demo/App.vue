<script setup lang="ts">
import { ref } from "vue";
import {
  LiquidGlassPanel,
  LiquidGlassSearchBar,
  LiquidGlassButton,
  LiquidGlassSwitch,
  LiquidGlassSlider,
  LiquidGlassBottomNavBar,
} from "../src";

const searchValue = ref("");
const switchValue = ref(false);
const sliderValue = ref(40);
const navValue = ref("home");

const navItems = [
  {
    id: "home",
    label: "Home",
    icon: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 10.5 12 3l9 7.5V21h-6.5v-6h-5V21H3v-10.5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
  },
  {
    id: "search",
    label: "Search",
    icon: `<svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="m20 20-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  {
    id: "saved",
    label: "Saved",
    icon: `<svg viewBox="0 0 24 24" fill="none"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
  },
  {
    id: "profile",
    label: "Profile",
    icon: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/><path d="M4 20c1.5-3.2 4.2-5 8-5s6.5 1.8 8 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
];
</script>

<template>
  <div class="demo-root">
    <div class="demo-bg">
      <div class="bg-blob bg-blob-1"></div>
      <div class="bg-blob bg-blob-2"></div>
      <div class="bg-blob bg-blob-3"></div>
      <div class="bg-blob bg-blob-4"></div>
      <img
        class="bg-photo"
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80"
        alt="background"
      />
    </div>

    <div class="demo-content">
      <h1 class="demo-title">Liquid Glass Core</h1>
      <p class="demo-subtitle">Physics-based refraction for Vue 3</p>

      <!-- Panel -->
      <section class="demo-section">
        <h2>Panel</h2>
        <div class="panel-wrapper">
          <LiquidGlassPanel
            :border-radius="28"
            :bezel-width="18"
            :glass-thickness="120"
            :blur="0.7"
            :scale-ratio="0.75"
            :specular-opacity="0.2"
            :specular-saturation="4"
            bezel-type="convex_squircle"
            shape="rectangle"
            :corner-radius="0.6"
            background-color="rgba(255,255,255,0.06)"
            border-color="rgba(255,255,255,0.25)"
          >
            <div class="panel-content">
              <h3>Glass Container</h3>
              <p>
                This panel refracts whatever is behind it through a
                physics-based convex bezel profile. The edges show progressive
                gradient blur.
              </p>
            </div>
          </LiquidGlassPanel>
        </div>
      </section>

      <!-- Search Bar -->
      <section class="demo-section">
        <h2>Search Bar</h2>
        <div class="search-wrapper">
          <LiquidGlassSearchBar v-model="searchValue" size="medium" />
        </div>
      </section>

      <!-- Switch -->
      <section class="demo-section">
        <h2>Switch</h2>
        <LiquidGlassSwitch v-model="switchValue" size="medium" />
        <span class="demo-value">{{ switchValue ? "ON" : "OFF" }}</span>
      </section>

      <!-- Slider -->
      <section class="demo-section">
        <h2>Slider</h2>
        <LiquidGlassSlider
          v-model="sliderValue"
          :min="0"
          :max="100"
          size="medium"
        />
        <span class="demo-value">{{ Math.round(sliderValue) }}</span>
      </section>

      <!-- Button -->
      <section class="demo-section">
        <h2>Button</h2>
        <LiquidGlassButton
          label="Liquid Glass Button"
          size="medium"
          :width="180"
          :blur="2"
          :scale-ratio="0.2"
          :specular-opacity="0.4"
          :specular-saturation="4"
        />
      </section>

      <!-- Bottom Nav Bar -->
      <section class="demo-section">
        <h2>Bottom Nav Bar</h2>
        <LiquidGlassBottomNavBar
          v-model="navValue"
          :items="navItems"
          size="medium"
        />
        <span class="demo-value">{{ navValue }}</span>
      </section>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto,
    sans-serif;
  background: #1a1a2e;
  color: #fff;
  min-height: 100vh;
  overflow-x: hidden;
}

.demo-root {
  position: relative;
  min-height: 100vh;
}

.demo-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.bg-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
}

.bg-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
}

.bg-blob-1 {
  width: 500px;
  height: 500px;
  background: #ff6b6b;
  top: -100px;
  left: -100px;
}

.bg-blob-2 {
  width: 400px;
  height: 400px;
  background: #4ecdc4;
  top: 30%;
  right: -80px;
}

.bg-blob-3 {
  width: 350px;
  height: 350px;
  background: #a855f7;
  bottom: 10%;
  left: 20%;
}

.bg-blob-4 {
  width: 300px;
  height: 300px;
  background: #f59e0b;
  bottom: -50px;
  right: 25%;
}

.demo-content {
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
  padding: 60px 24px 100px;
}

.demo-title {
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  margin-bottom: 8px;
}

.demo-subtitle {
  font-size: 1.1rem;
  opacity: 0.7;
  margin-bottom: 48px;
}

.demo-section {
  margin-bottom: 56px;
}

.demo-section h2 {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.5;
  margin-bottom: 16px;
}

.demo-value {
  display: inline-block;
  margin-left: 16px;
  font-size: 0.9rem;
  opacity: 0.6;
  vertical-align: middle;
}

/* Panel */
.panel-wrapper {
  width: 100%;
  height: 220px;
}

.panel-content {
  color: rgba(255, 255, 255, 0.9);
}

.panel-content h3 {
  font-size: 1.25rem;
  margin-bottom: 10px;
  font-weight: 600;
}

.panel-content p {
  font-size: 0.9rem;
  line-height: 1.6;
  opacity: 0.8;
}

.search-wrapper {
  position: relative;
  width: 420px;
  max-width: 100%;
}
</style>
