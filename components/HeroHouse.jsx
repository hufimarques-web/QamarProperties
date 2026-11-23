"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function HeroHouse() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y     = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  return (
    <section
      ref={ref}
      style={{ overflow: "hidden", width: "100%", height: "80vh" }}
      aria-hidden="true"
    >
      <motion.img
        src="/images/fea9976f-38ce-446a-b21c-a6742cbe7f22.png"
        alt=""
        style={{
          width: "100%",
          height: "160%",
          objectFit: "cover",
          objectPosition: "center top",
          display: "block",
          y,
          scale,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      />
    </section>
  );
}
