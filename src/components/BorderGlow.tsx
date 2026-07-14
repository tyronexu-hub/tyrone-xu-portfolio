import { CSSProperties, ReactNode, useCallback, useEffect, useRef } from "react";
import "./BorderGlow.css";

type BorderGlowProps = {
  children: ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
};

type GlowVars = CSSProperties & Record<`--${string}`, string | number>;

const gradientPositions = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
const gradientKeys = [
  "--gradient-one",
  "--gradient-two",
  "--gradient-three",
  "--gradient-four",
  "--gradient-five",
  "--gradient-six",
  "--gradient-seven",
] as const;
const colorMap = [0, 1, 2, 0, 1, 2, 1];

const parseHsl = (hsl: string) => {
  const match = hsl.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return {
    h: parseFloat(match[1]),
    s: parseFloat(match[2]),
    l: parseFloat(match[3]),
  };
};

const buildGlowVars = (glowColor: string, intensity: number): GlowVars => {
  const { h, s, l } = parseHsl(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ["", "-60", "-50", "-40", "-30", "-20", "-10"];

  return opacities.reduce<GlowVars>((vars, opacity, index) => {
    vars[`--glow-color${keys[index]}`] = `hsl(${base} / ${Math.min(opacity * intensity, 100)}%)`;
    return vars;
  }, {});
};

const buildGradientVars = (colors: string[]): GlowVars => {
  const safeColors = colors.length > 0 ? colors : ["#d8ff68", "#8aa4ff", "#a3c6c7"];

  return gradientKeys.reduce<GlowVars>(
    (vars, key, index) => {
      const color = safeColors[Math.min(colorMap[index], safeColors.length - 1)];
      vars[key] = `radial-gradient(at ${gradientPositions[index]}, ${color} 0, transparent 50%)`;
      return vars;
    },
    { "--gradient-base": `linear-gradient(${safeColors[0]} 0 100%)` },
  );
};

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const easeInCubic = (x: number) => x * x * x;

const animateValue = ({
  start = 0,
  end = 100,
  duration = 1000,
  delay = 0,
  ease = easeOutCubic,
  onUpdate,
  onEnd,
}: {
  start?: number;
  end?: number;
  duration?: number;
  delay?: number;
  ease?: (x: number) => number;
  onUpdate: (value: number) => void;
  onEnd?: () => void;
}) => {
  const startAt = performance.now() + delay;

  const tick = () => {
    const elapsed = performance.now() - startAt;
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) requestAnimationFrame(tick);
    else onEnd?.();
  };

  window.setTimeout(() => requestAnimationFrame(tick), delay);
};

export default function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "82 100 72",
  backgroundColor = "rgba(9, 12, 14, 0.72)",
  borderRadius = 8,
  glowRadius = 34,
  glowIntensity = 0.75,
  coneSpread = 24,
  animated = false,
  colors = ["#d8ff68", "#8aa4ff", "#a3c6c7"],
  fillOpacity = 0.28,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const getCenter = useCallback((el: HTMLDivElement) => {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const getEdgeProximity = useCallback(
    (el: HTMLDivElement, x: number, y: number) => {
      const [cx, cy] = getCenter(el);
      const dx = x - cx;
      const dy = y - cy;
      const kx = dx === 0 ? Infinity : cx / Math.abs(dx);
      const ky = dy === 0 ? Infinity : cy / Math.abs(dy);
      return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    },
    [getCenter],
  );

  const getCursorAngle = useCallback(
    (el: HTMLDivElement, x: number, y: number) => {
      const [cx, cy] = getCenter(el);
      const dx = x - cx;
      const dy = y - cy;
      if (dx === 0 && dy === 0) return 0;
      const degrees = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      return degrees < 0 ? degrees + 360 : degrees;
    },
    [getCenter],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.setProperty("--edge-proximity", `${(getEdgeProximity(card, x, y) * 100).toFixed(3)}`);
      card.style.setProperty("--cursor-angle", `${getCursorAngle(card, x, y).toFixed(3)}deg`);
    },
    [getCursorAngle, getEdgeProximity],
  );

  useEffect(() => {
    const card = cardRef.current;
    if (!animated || !card) return;

    const angleStart = 110;
    const angleEnd = 465;
    card.classList.add("sweep-active");
    card.style.setProperty("--cursor-angle", `${angleStart}deg`);

    animateValue({ duration: 500, onUpdate: (value) => card.style.setProperty("--edge-proximity", `${value}`) });
    animateValue({
      ease: easeInCubic,
      duration: 1500,
      end: 50,
      onUpdate: (value) => {
        card.style.setProperty("--cursor-angle", `${(angleEnd - angleStart) * (value / 100) + angleStart}deg`);
      },
    });
    animateValue({
      ease: easeOutCubic,
      delay: 1500,
      duration: 2250,
      start: 50,
      end: 100,
      onUpdate: (value) => {
        card.style.setProperty("--cursor-angle", `${(angleEnd - angleStart) * (value / 100) + angleStart}deg`);
      },
    });
    animateValue({
      ease: easeInCubic,
      delay: 2500,
      duration: 1500,
      start: 100,
      end: 0,
      onUpdate: (value) => card.style.setProperty("--edge-proximity", `${value}`),
      onEnd: () => card.classList.remove("sweep-active"),
    });
  }, [animated]);

  const style: GlowVars = {
    "--card-bg": backgroundColor,
    "--edge-sensitivity": edgeSensitivity,
    "--border-radius": `${borderRadius}px`,
    "--glow-padding": `${glowRadius}px`,
    "--cone-spread": coneSpread,
    "--fill-opacity": fillOpacity,
    ...buildGlowVars(glowColor, glowIntensity),
    ...buildGradientVars(colors),
  };

  return (
    <div
      ref={cardRef}
      className={`border-glow-card ${className}`.trim()}
      onPointerMove={handlePointerMove}
      style={style}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">{children}</div>
    </div>
  );
}
