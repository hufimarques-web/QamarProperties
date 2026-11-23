"use client";

import { GodRays } from "@paper-design/shaders-react";

export function GodRaysBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <GodRays
        colorBack="#00000000"
        colors={["#FFFFFF6E", "#F3F3F3F0", "#8A8A8A", "#989898"]}
        colorBloom="#FFFFFF"
        offsetX={0.85}
        offsetY={-1}
        intensity={1}
        spotty={0.45}
        midSize={10}
        midIntensity={0}
        density={0.12}
        bloom={0.15}
        speed={1}
        scale={1.6}
        frame={3332042.8159981333}
        style={{ height: "100%", width: "100%", position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
}
