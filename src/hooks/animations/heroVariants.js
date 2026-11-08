export const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

export const fadeUpVariants = {
  hidden: {
    opacity: 0,
    x: -900,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 1.12,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.4,
      ease: "easeOut",
    },
  },
};
export const textHover = {
  y: -4,
  transition: {
    duration: 0.6,
    ease: "easeOut",
  },
};

import { useScroll, useTransform } from "motion/react";

// Scroll settings
const heroScrollSettings = {
  scrollRange: [0, 300],
  xRange: [0, -900],
  opacityRange: [1, 0.2],
};

// Hero scroll animation
export function useHeroScroll() {
  const { scrollY } = useScroll();

  const textX = useTransform(
    scrollY,
    heroScrollSettings.scrollRange,
    heroScrollSettings.xRange
  );

  const textOpacity = useTransform(
    scrollY,
    heroScrollSettings.scrollRange,
    heroScrollSettings.opacityRange
  );

  return { textX, textOpacity };
}
