"use client";

export function HeroSmoke() {
  return (
    <div className="hero-smoke-wrap" aria-hidden="true">
      {/* Cloud PNG — transparent bg, anchored bottom, bleeds up into hero */}
      <img
        src="/images/clouds-separator.png"
        alt=""
        className="hero-smoke-img"
      />
      {/* Bottom fade ensures seamless join with cream background */}
      <div className="hero-smoke-fade" />
    </div>
  );
}
