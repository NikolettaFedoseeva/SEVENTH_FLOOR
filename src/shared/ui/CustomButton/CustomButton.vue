<script setup lang="ts">
import { computed } from "vue";

interface Props {
  text?: string;
  variant?: "primary" | "secondary" | "outline" | "text" | "outline-white";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  block?: boolean;
  to?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
}

const props = withDefaults(defineProps<Props>(), {
  text: "",
  variant: "primary",
  size: "md",
  disabled: false,
  block: false,
  type: "button",
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const componentTag = computed(() => {
  if (props.to) return "router-link";
  if (props.href) return "a";
  return "button";
});
</script>

<template>
  <div
    class="custom-btn-wrapper"
    :class="{ 'custom-btn-wrapper--block': block }"
  >
    <component
      :is="componentTag"
      :to="to"
      :href="href"
      :type="!to && !href ? type : undefined"
      :disabled="disabled"
      class="blob-btn"
      :class="[
        `blob-btn--${size}`,
        `blob-btn--${variant}`,
        { 'blob-btn--disabled': disabled },
        { 'blob-btn--block': block },
      ]"
      @click="emit('click', $event)"
    >
      {{ props.text }}
      <slot />
      <span class="blob-btn__inner">
        <span class="blob-btn__blobs">
          <span class="blob-btn__blob"></span>
          <span class="blob-btn__blob"></span>
          <span class="blob-btn__blob"></span>
          <span class="blob-btn__blob"></span>
        </span>
      </span>
    </component>
    <br />

    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display: none">
      <defs>
        <filter id="goo">
          <feGaussianBlur
            in="SourceGraphic"
            result="blur"
            stdDeviation="10"
          ></feGaussianBlur>
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
            result="goo"
          ></feColorMatrix>
          <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
        </filter>
      </defs>
    </svg>
  </div>
</template>

<style scoped lang="scss">
$borderW: 2px;
$numOfBlobs: 4;

.custom-btn-wrapper {
  display: inline-block;
  text-align: center;
}

.custom-btn-wrapper--block {
  display: block;
  width: 100%;
}

.blob-btn {
  /* Core styles */
  z-index: 1;
  position: relative;
  padding: 24px;
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: bold;
  background-color: transparent;
  outline: none;
  border: none;
  transition: color 0.5s;
  cursor: pointer;
  border-radius: 8px;
  /* Ensure anchor tag display property plays nice */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  /* Default Color */
  color: #000;

  /* Modifiers */
  &--block {
    width: 100%;
    display: flex;
  }

  &--sm {
    padding: 12px 12px;
    font-size: 14px;
  }

  &--lg {
    padding: 24px 24px;
    font-size: 18px;
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* --- MIXIN FOR VARIANTS --- */
  // Args:
  // $borderColor: Border color
  // $bgColor: Initial background color (usually white/transparent)
  // $blobColor: Color of the blobs (fill effect)
  // $textColor: Initial text color
  // $hoverTextColor: Text color on hover
  @mixin blob-btn-variant(
    $borderColor,
    $bgColor,
    $blobColor,
    $textColor,
    $hoverTextColor
  ) {
    color: $textColor;

    // Background of the "inner" part (behind blobs)
    .blob-btn__inner {
      background: $bgColor;
    }

    &:before {
      border: $borderW solid $borderColor;
    }

    .blob-btn__blob {
      background: $blobColor;
    }

    &:hover {
      color: $hoverTextColor;
    }
  }

  /* --- VARIANTS --- */
  &--primary {
    // Dark Background (#2b2b2b), Light Blobs (#ffffff)
    // Border: Dark (#2b2b2b)
    // Initial Text: White
    // Hover Text: Dark (#2b2b2b) - assuming blobs (White) cover it
    @include blob-btn-variant(#2b2b2b, #2b2b2b, #ffffff, #ffffff, #2b2b2b);
  }

  &--secondary {
    // Gray Background (#f3f4f6), Dark Blobs? Or maybe darker gray?
    // Let's keep it consistent: Gray Bg -> Fill with Darker Gray?
    // User asked this specific effect for CustomButton which implies Primary.
    // Let's stick to standard behavior for secondary (usually light btn).
    // Original Secondary: #f3f4f6 (Light Gray).
    // Let's try: Bg #f3f4f6, Text Dark, Blobs Darker Gray (#d1d5db) -> Hover Text Dark
    @include blob-btn-variant(#e5e7eb, #f3f4f6, #d1d5db, #1f2937, #1f2937);
  }

  &--outline {
    // Transparent Bg, Dark Border, Fill Dark
    @include blob-btn-variant(#2b2b2b, #ffffff, #2b2b2b, #2b2b2b, #ffffff);
  }

  &--outline-white {
    // Transparent Bg, White Border, White Text, White Blobs, Dark Text on Hover
    @include blob-btn-variant(#ffffff, transparent, #ffffff, #ffffff, #2b2b2b);
  }

  &--text {
    padding: 0;
    &:before {
      border: none;
    }
    &:after {
      content: none;
    }
    .blob-btn__inner {
      display: none;
    }
    color: #4b5563;
    &:hover {
      color: #111827;
    }
  }

  &:before {
    content: "";
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /* border set by mixin */
    border-radius: 8px;
  }

  &:after {
    content: "";
    z-index: -2;
    position: absolute;
    left: $borderW * 1.5;
    top: $borderW * 1.5;
    width: 100%;
    height: 100%;
    transition: all 0.3s 0.2s;
    border-radius: 8px;
  }

  &:hover {
    border-radius: 8px;

    &:after {
      transition: all 0.3s;
      left: 0;
      top: 0;
      border-radius: 8px;
    }
  }

  &__inner {
    z-index: -1;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background: #ffffff; /* Default, overridden by mixin */
  }

  &__blobs {
    position: relative;
    display: block;
    height: 100%;
    filter: url("#goo");
  }

  &__blob {
    position: absolute;
    top: $borderW;
    width: calc(100% / #{$numOfBlobs});
    height: 100%;
    /* background set by mixin */
    border-radius: 100%;
    transform: translate3d(0, 150%, 0) scale(1.7);
    transition: transform 0.45s;

    @supports (filter: url("#goo")) {
      transform: translate3d(0, 150%, 0) scale(1.4);
    }

    @for $i from 1 through $numOfBlobs {
      &:nth-child(#{$i}) {
        left: calc((#{$i} - 1) * (120% / #{$numOfBlobs}));
        transition-delay: ($i - 1) * 0.08s;
      }
    }

    .blob-btn:hover & {
      transform: translateZ(0) scale(1.7);

      @supports (filter: url("#goo")) {
        transform: translateZ(0) scale(1.4);
      }
    }
  }
}
</style>
