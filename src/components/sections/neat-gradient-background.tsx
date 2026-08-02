"use client";

import { useEffect, useRef } from "react";
import { NeatGradient, type NeatConfig } from "@firecms/neat";
import { useReducedMotion } from "framer-motion";

const CONFIG: NeatConfig = {
  colors: [
    { color: "#FFFFFF", enabled: true },
    { color: "#DBB770", enabled: true },
    { color: "#D6B773", enabled: true },
    { color: "#FFFFFF", enabled: true },
    { color: "#D9B76D", enabled: true },
    { color: "#FF9A9E", enabled: false },
  ],
  speed: 2.5,
  horizontalPressure: 3,
  verticalPressure: 4,
  waveFrequencyX: 2,
  waveFrequencyY: 3,
  waveAmplitude: 5,
  shadows: 1,
  highlights: 5,
  colorBrightness: 1,
  colorSaturation: 7,
  wireframe: false,
  antialias: false,
  colorBlending: 8,
  backgroundColor: "#003FFF",
  backgroundAlpha: 1,
  grainScale: 0,
  grainSparsity: 0,
  grainIntensity: 0,
  grainSpeed: 1,
  resolution: 1,
  yOffset: 300,
  yOffsetWaveMultiplier: 4,
  yOffsetColorMultiplier: 4,
  yOffsetFlowMultiplier: 4,
  flowDistortionA: 0.4,
  flowDistortionB: 3,
  flowScale: 3.3,
  flowEase: 0.53,
  flowEnabled: true,
  enableProceduralTexture: false,
  transparentTextureVoid: false,
  textureVoidLikelihood: 0.06,
  textureVoidWidthMin: 10,
  textureVoidWidthMax: 500,
  textureBandDensity: 0.8,
  textureColorBlending: 0.06,
  textureSeed: 333,
  textureEase: 0.5,
  proceduralBackgroundColor: "#003FFF",
  textureShapeTriangles: 20,
  textureShapeCircles: 15,
  textureShapeBars: 15,
  textureShapeSquiggles: 10,
  domainWarpEnabled: false,
  domainWarpIntensity: 0,
  domainWarpScale: 3,
  vignetteIntensity: 0,
  vignetteRadius: 0.8,
  fresnelEnabled: false,
  fresnelPower: 2,
  fresnelIntensity: 0.5,
  fresnelColor: "#FFFFFF",
  iridescenceEnabled: false,
  iridescenceIntensity: 0.5,
  iridescenceSpeed: 1,
  bloomIntensity: 0,
  bloomThreshold: 0.7,
  chromaticAberration: 0,
  shapeType: "plane",
  shapeRotationX: 0,
  shapeRotationY: 0,
  shapeRotationZ: 0,
  shapeAutoRotateSpeedX: 0,
  shapeAutoRotateSpeedY: 0,
  sphereRadius: 15,
  torusRadius: 15,
  torusTube: 5,
  cylinderRadius: 10,
  cylinderHeight: 40,
  planeBend: 0,
  planeTwist: 0,
  silhouetteFade: 0.25,
  cylinderFade: 0.08,
  ribbonFade: 0.05,
  flatShading: true,
  cameraLock: true,
  cameraX: 0,
  cameraY: 0,
  cameraZ: 0,
  cameraRotationX: 0,
  cameraRotationY: 0,
  cameraRotationZ: 0,
  cameraZoom: 1,
};

/** Animated 3D gradient behind the hero. Scroll drives `yOffset` for a
 *  subtle parallax drift; reduced-motion visitors get a static frame. */
export function NeatGradientBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gradientRef = useRef<NeatGradient | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!canvasRef.current) return;

    const gradient = new NeatGradient({
      ...CONFIG,
      ref: canvasRef.current,
      speed: prefersReducedMotion ? 0 : CONFIG.speed,
    });
    gradientRef.current = gradient;

    function onScroll() {
      gradient.yOffset = window.scrollY;
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      gradient.destroy();
      gradientRef.current = null;
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
