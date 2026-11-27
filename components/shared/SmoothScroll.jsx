"use client";

import { useEffect } from "react";

// Realizador do scroll.
// 1) Cenas "em vídeo": as secções marcadas com data-scene (as animações presas ao scroll)
//    tocam inteiras com um só gesto. Ao chegar a uma cena, um scroll (roda, trackpad ou dedo)
//    leva a página do início ao fim da cena sozinha, à velocidade certa, como um vídeo.
//    Para cima, a cena volta ao início da mesma forma.
//    data-scene-duration="2.4" define a duração (segundos) da cena inteira.
// 2) Fora das cenas, a roda do rato desliza suavemente (computador).
// Respeita "reduzir movimento", o zoom (Ctrl + roda), os modais abertos e as zonas com scroll próprio.

const EASE_PER_FRAME = 0.11; // scroll suave da roda: fração do caminho por frame (~60 fps)
const QUIET_MS = 220; // depois de uma cena, espera que o gesto (e a inércia do trackpad) acabe

const easeInOut = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

function canScroll(el, dy) {
  while (el instanceof Element && el !== document.body && el !== document.documentElement) {
    const oy = getComputedStyle(el).overflowY;
    if ((oy === "auto" || oy === "scroll") && el.scrollHeight > el.clientHeight + 1) {
      if (dy > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1) return true;
      if (dy < 0 && el.scrollTop > 0) return true;
    }
    el = el.parentElement;
  }
  return false;
}

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // ── posição das cenas no documento ──
    // Guarda-se o início de cada cena enquanto ela ainda está abaixo do topo (fora de
    // qualquer "sticky"), para as contas não falharem dentro da cascata do telemóvel.
    let starts = new WeakMap();
    const vh = () => window.innerHeight;
    const scenes = () =>
      [...document.querySelectorAll("[data-scene]")]
        .map((el) => {
          const r = el.getBoundingClientRect();
          if (!r.height || r.height <= vh() + 4) return null;
          const y = window.scrollY;
          if (r.top > 1 || !starts.has(el)) starts.set(el, r.top + y);
          const start = starts.get(el);
          // a cena inclui a saída: acaba quando a secção seguinte chega ao topo
          const end = Math.min(start + r.height, document.documentElement.scrollHeight - vh());
          const dur = parseFloat(el.dataset.sceneDuration || "2") * 1000;
          return { el, start, end, dur };
        })
        .filter(Boolean);
    const recordStarts = () => scenes();

    // cena a tocar no sentido do gesto (reach = quanto o gesto "alcança")
    const sceneFor = (dir, reach) => {
      const y = window.scrollY;
      for (const s of scenes()) {
        if (dir > 0 && s.start - reach <= y && y < s.end - 2) return { s, to: s.end };
        if (dir < 0 && s.start + 2 < y && y <= s.end + reach) return { s, to: s.start };
      }
      return null;
    };

    // ── reprodução de uma cena ──
    let playing = false;
    let playRaf = 0;
    let quietUntil = 0;
    const play = ({ s, to }) => {
      cancelSmooth();
      const from = window.scrollY;
      const dist = to - from;
      if (Math.abs(dist) < 2) return false;
      const full = s.end - s.start || 1;
      const dur = Math.max(450, s.dur * Math.min(1, Math.abs(dist) / full));
      const t0 = performance.now();
      playing = true;
      const tick = (now) => {
        const k = Math.min(1, (now - t0) / dur);
        window.scrollTo({ top: from + dist * easeInOut(k), behavior: "instant" });
        if (k < 1) playRaf = requestAnimationFrame(tick);
        else {
          playing = false;
          quietUntil = performance.now() + QUIET_MS;
          syncSmooth();
        }
      };
      playRaf = requestAnimationFrame(tick);
      return true;
    };

    // ── scroll suave da roda (fora das cenas, só no computador) ──
    let target = window.scrollY;
    let current = window.scrollY;
    let smoothRaf = 0;
    let last = 0;
    let smoothing = false;
    const max = () => document.documentElement.scrollHeight - vh();
    const syncSmooth = () => {
      target = current = window.scrollY;
    };
    const cancelSmooth = () => {
      if (smoothing) cancelAnimationFrame(smoothRaf);
      smoothing = false;
      last = 0;
    };
    const smoothFrame = (now) => {
      const dt = last ? Math.min(64, now - last) : 16.7;
      last = now;
      const k = 1 - Math.pow(1 - EASE_PER_FRAME, dt / 16.7);
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.5) current = target;
      window.scrollTo({ top: current, behavior: "instant" });
      // a meio do deslize pode chegar-se a uma cena: passa a tocá-la
      const dir = Math.sign(target - current);
      if (dir) {
        const hit = sceneFor(dir, Math.abs(target - current));
        if (hit && play(hit)) return;
      }
      if (current !== target) smoothRaf = requestAnimationFrame(smoothFrame);
      else cancelSmooth();
    };

    const blocked = (e) => e.ctrlKey || document.body.style.overflow === "hidden";

    // ── roda do rato / trackpad ──
    const onWheel = (e) => {
      if (blocked(e) || e.defaultPrevented) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (canScroll(e.target, e.deltaY)) return;
      const now = performance.now();
      if (playing || now < quietUntil) {
        // durante a cena (e a inércia que se segue) o gesto é absorvido
        e.preventDefault();
        if (!playing) quietUntil = now + QUIET_MS;
        return;
      }
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? vh() : 1;
      const delta = e.deltaY * unit;
      const dir = Math.sign(delta);
      const pending = smoothing ? target - window.scrollY : 0;
      const hit = sceneFor(dir, Math.abs(delta) + Math.abs(pending));
      if (hit) {
        e.preventDefault();
        play(hit);
        return;
      }
      if (!fine) return; // trackpads/ratos sem "hover": scroll nativo fora das cenas
      e.preventDefault();
      if (!smoothing) current = window.scrollY;
      target = Math.max(0, Math.min(max(), (smoothing ? target : window.scrollY) + delta));
      if (!smoothing) {
        smoothing = true;
        smoothRaf = requestAnimationFrame(smoothFrame);
      }
    };

    // ── dedo (telemóvel / tablet) ──
    let touchY = 0;
    let decided = false;
    let hijacked = false;
    const onTouchStart = (e) => {
      touchY = e.touches[0].clientY;
      decided = false;
      hijacked = false;
    };
    const onTouchMove = (e) => {
      if (document.body.style.overflow === "hidden") return;
      if (playing || hijacked) {
        if (e.cancelable) e.preventDefault();
        return;
      }
      if (decided) return;
      const dy = touchY - e.touches[0].clientY; // > 0: dedo para cima = página para baixo
      if (Math.abs(dy) < 8) return;
      decided = true;
      if (canScroll(e.target, dy)) return;
      const hit = sceneFor(Math.sign(dy), Math.abs(dy) + 40);
      if (hit && e.cancelable) {
        e.preventDefault();
        hijacked = true;
        play(hit);
      }
    };

    // ── scroll nativo (teclado, barra, inércia do dedo, âncoras) ──
    let prevY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (!playing && !smoothing) {
        syncSmooth();
        // a inércia do dedo entrou numa cena: toca-a até ao fim
        if (!fine && Math.abs(y - prevY) > 0.5) {
          const dir = Math.sign(y - prevY);
          for (const s of scenes()) {
            const enteredDown = dir > 0 && prevY < s.start && y >= s.start && y < s.end - 2;
            const enteredUp = dir < 0 && prevY > s.end && y <= s.end && y > s.start + 2;
            if (enteredDown || enteredUp) {
              play({ s, to: dir > 0 ? s.end : s.start });
              break;
            }
          }
        }
      }
      if (y > 0) recordStarts();
      prevY = window.scrollY;
    };

    // um clique interrompe só o deslize suave (não a cena)
    const onPointerDown = () => {
      if (smoothing) {
        cancelSmooth();
        syncSmooth();
      }
    };
    const onResize = () => {
      starts = new WeakMap(); // as alturas mudam: medir de novo
      recordStarts();
    };

    recordStarts();
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(playRaf);
      cancelSmooth();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return null;
}
