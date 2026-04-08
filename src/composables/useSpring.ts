import { ref, watch, onUnmounted, type Ref } from 'vue'
import type { SpringConfig } from '../types'

/**
 * Creates a spring-animated reactive value.
 * When the target changes, the returned ref animates toward it
 * using spring physics (stiffness / damping / mass).
 */
export function useSpring(
  target: Ref<number> | (() => number),
  config: SpringConfig = {}
): Ref<number> {
  const { stiffness = 100, damping = 10, mass = 1 } = config

  const getTarget = typeof target === 'function' ? target : () => target.value

  const current = ref(getTarget())
  let velocity = 0
  let animationFrame: number | null = null

  const animate = () => {
    const targetValue = getTarget()
    const displacement = targetValue - current.value

    const springForce = displacement * stiffness
    const dampingForce = velocity * damping
    const acceleration = (springForce - dampingForce) / mass

    velocity += acceleration * (1 / 60)
    current.value += velocity * (1 / 60)

    if (Math.abs(displacement) < 0.001 && Math.abs(velocity) < 0.001) {
      current.value = targetValue
      velocity = 0
      animationFrame = null
      return
    }

    animationFrame = requestAnimationFrame(animate)
  }

  if (typeof target !== 'function') {
    watch(target, () => {
      if (!animationFrame) {
        animationFrame = requestAnimationFrame(animate)
      }
    })
  } else {
    let polling: number
    const checkAndAnimate = () => {
      const targetValue = getTarget()
      if (Math.abs(targetValue - current.value) > 0.001 || Math.abs(velocity) > 0.001) {
        if (!animationFrame) {
          animationFrame = requestAnimationFrame(animate)
        }
      }
      polling = requestAnimationFrame(checkAndAnimate)
    }
    polling = requestAnimationFrame(checkAndAnimate)

    onUnmounted(() => {
      cancelAnimationFrame(polling)
    })
  }

  onUnmounted(() => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
      animationFrame = null
    }
  })

  return current
}

/**
 * Linear interpolation between two output values mapped from an input range.
 */
export function useLerp(
  value: Ref<number>,
  outputRange: [number, number],
  inputRange: [number, number] = [0, 1]
): Ref<number> {
  const result = ref(0)

  watch(value, (v) => {
    const t = (v - inputRange[0]) / (inputRange[1] - inputRange[0])
    result.value = outputRange[0] + t * (outputRange[1] - outputRange[0])
  }, { immediate: true })

  return result
}
