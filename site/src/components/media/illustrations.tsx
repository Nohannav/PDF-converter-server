/**
 * Illustrations vectorielles PROVISOIRES, dessinées pour ce projet (aucune
 * licence tierce). Elles évoquent les concepts tant que les photos réelles de
 * l'agence ne sont pas disponibles et ne prétendent pas représenter les
 * installations réelles. Elles sont remplacées automatiquement par les photos
 * déposées dans /public/images (voir src/config/media.ts).
 */
import { useId } from "react";
import {
  Briefcase,
  Cake,
  GlassWater,
  Heart,
  Presentation,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type IllustrationKey =
  | "combi-closed"
  | "combi-bar"
  | "combi-dj"
  | "combi-pro"
  | "disco-exterior"
  | "disco-dancefloor"
  | "event-wedding"
  | "event-birthday"
  | "event-private"
  | "event-corporate"
  | "event-tradeshow"
  | "event-launch";

export type IllustrationTone = "day" | "night";

const C = {
  red: "#b3262d",
  redDark: "#8c1c22",
  white: "#f7f1e6",
  whiteShade: "#e6dccb",
  ink: "#141110",
  tyre: "#171311",
  chrome: "#d9d4cc",
  chromeDark: "#9c968e",
  glass: "#2b2f36",
  glassLight: "#4a5260",
  wood: "#c08a5a",
  woodDark: "#4a2c1c",
  copper: "#c38b55",
  amber: "#f2c27b",
  rose: "#e0587a",
  violet: "#6b3fa0",
};

type CombiVariant = "closed" | "bar" | "dj" | "pro";

function Combi({ variant, uid, night }: { variant: CombiVariant; uid: string; night: boolean }) {
  const open = variant !== "closed";
  const body = "M10 200 L6 70 Q8 4 70 2 L370 2 Q418 4 420 60 L422 200 Z";
  return (
    <g>
      <defs>
        <clipPath id={`${uid}-body`}>
          <path d={body} />
        </clipPath>
        <linearGradient id={`${uid}-red`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.red} />
          <stop offset="1" stopColor={C.redDark} />
        </linearGradient>
        <linearGradient id={`${uid}-white`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffaf1" />
          <stop offset="1" stopColor={C.whiteShade} />
        </linearGradient>
        <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.glassLight} />
          <stop offset="0.55" stopColor={C.glass} />
          <stop offset="1" stopColor="#1d2026" />
        </linearGradient>
        <linearGradient id={`${uid}-inside`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={variant === "dj" ? "#2a1a2e" : C.woodDark} />
          <stop offset="1" stopColor={variant === "dj" ? "#140d17" : "#2b190f"} />
        </linearGradient>
        <radialGradient id={`${uid}-insideGlow`} cx="0.5" cy="0.2" r="0.8">
          <stop offset="0" stopColor={variant === "dj" ? C.rose : C.amber} stopOpacity="0.55" />
          <stop offset="1" stopColor={variant === "dj" ? C.violet : C.amber} stopOpacity="0" />
        </radialGradient>
        <pattern id={`${uid}-stripes`} width="34" height="10" patternUnits="userSpaceOnUse">
          <rect width="17" height="10" fill={C.red} />
          <rect x="17" width="17" height="10" fill={C.white} />
        </pattern>
      </defs>

      {/* Ombre au sol */}
      <ellipse cx="214" cy="236" rx="236" ry="12" fill="#000" opacity={night ? 0.45 : 0.16} />

      {/* Auvent relevé (bar / DJ / pro) */}
      {open && (
        <g>
          <path d="M128 30 L412 30 L440 -34 L100 -34 Z" fill={`url(#${uid}-stripes)`} />
          <path d="M100 -34 L440 -34" stroke={C.redDark} strokeWidth="3" />
          <path
            d="M128 30 q11 12 22 0 q11 12 22 0 q11 12 22 0 q11 12 22 0 q11 12 22 0 q11 12 22 0 q11 12 22 0 q11 12 22 0 q11 12 22 0 q11 12 22 0 q11 12 22 0 q11 12 22 0 q11 12 20 0"
            fill={C.red}
          />
        </g>
      )}

      {/* Carrosserie bicolore */}
      <g clipPath={`url(#${uid}-body)`}>
        <rect x="0" y="0" width="430" height="210" fill={`url(#${uid}-red)`} />
        <rect x="0" y="0" width="430" height="104" fill={`url(#${uid}-white)`} />
        <rect x="0" y="102" width="430" height="5" fill={C.chrome} />
      </g>
      <path d={body} fill="none" stroke="#000" strokeOpacity="0.18" strokeWidth="2" />

      {/* Vitres */}
      <path d="M24 88 L22 52 Q26 22 62 22 L92 22 L92 88 Z" fill={`url(#${uid}-glass)`} />
      {!open &&
        [110, 182, 254, 326].map((x) => (
          <rect key={x} x={x} y="22" width="60" height="66" rx="9" fill={`url(#${uid}-glass)`} />
        ))}
      <path d="M30 34 L46 26" stroke="#fff" strokeOpacity="0.35" strokeWidth="4" strokeLinecap="round" />

      {/* Portes et détails */}
      <path d="M100 14 L100 196" stroke="#000" strokeOpacity="0.22" strokeWidth="2" />
      {!open && (
        <>
          <path d="M178 108 L178 196 M300 108 L300 196" stroke="#000" strokeOpacity="0.22" strokeWidth="2" />
          <rect x="284" y="124" width="10" height="4" rx="2" fill={C.chrome} />
        </>
      )}
      <rect x="64" y="112" width="18" height="4" rx="2" fill={C.chrome} />
      {[118, 128, 138, 148].map((y) => (
        <rect key={y} x="396" y={y} width="16" height="4" rx="2" fill={C.redDark} />
      ))}
      <ellipse cx="9" cy="128" rx="5" ry="12" fill={C.chrome} />

      {/* Ouverture latérale aménagée */}
      {open && (
        <g>
          <rect x="132" y="30" width="276" height="120" rx="6" fill={`url(#${uid}-inside)`} />
          <rect x="132" y="30" width="276" height="120" rx="6" fill={`url(#${uid}-insideGlow)`} />
          {variant === "bar" && <BarInterior />}
          {variant === "dj" && <DjInterior />}
          {variant === "pro" && <ProInterior />}
          <rect x="122" y="146" width="296" height="12" rx="3" fill={C.wood} />
          <rect x="122" y="156" width="296" height="4" fill="#000" opacity="0.2" />
          {variant === "bar" && <BarCounterItems />}
          {variant === "dj" && <DjCounterItems />}
          {variant === "pro" && <ProCounterItems />}
        </g>
      )}

      {/* Pare-chocs */}
      <rect x="-10" y="180" width="26" height="9" rx="4" fill={C.chrome} />
      <rect x="410" y="180" width="24" height="9" rx="4" fill={C.chrome} />

      {/* Roues */}
      {[85, 340].map((cx) => (
        <g key={cx}>
          <path d={`M${cx - 42} 202 A42 42 0 0 1 ${cx + 42} 202 Z`} fill="#1c1513" />
          <circle cx={cx} cy="204" r="32" fill={C.tyre} />
          <circle cx={cx} cy="204" r="19" fill={C.white} />
          <circle cx={cx} cy="204" r="11" fill={C.chrome} />
          <circle cx={cx} cy="204" r="4" fill={C.chromeDark} />
        </g>
      ))}

      {/* Signalétique de marque (pro) */}
      {variant === "pro" && (
        <g>
          <rect x="150" y="-86" width="240" height="44" rx="6" fill={C.ink} />
          <circle cx="182" cy="-64" r="12" fill="none" stroke={C.copper} strokeWidth="4" />
          <rect x="204" y="-72" width="150" height="7" rx="3.5" fill={C.white} />
          <rect x="204" y="-60" width="96" height="6" rx="3" fill={C.copper} />
          <path d="M190 -42 L190 -34 M350 -42 L350 -34" stroke={C.ink} strokeWidth="4" />
        </g>
      )}
    </g>
  );
}

function BarInterior() {
  const bottles = [
    { x: 150, c: "#3f6b3a" },
    { x: 168, c: C.amber },
    { x: 186, c: "#7a2a1c" },
    { x: 204, c: "#d8d2c4" },
    { x: 222, c: C.copper },
  ];
  return (
    <g>
      <rect x="140" y="64" width="260" height="4" fill={C.wood} opacity="0.85" />
      <rect x="140" y="104" width="260" height="4" fill={C.wood} opacity="0.85" />
      {[0, 1].map((row) =>
        bottles.map((b, i) => (
          <g key={`${row}-${i}`} transform={`translate(${b.x + row * 132} ${row === 0 ? 34 : 74})`}>
            <rect x="0" y="12" width="12" height="18" rx="3" fill={b.c} />
            <rect x="4" y="2" width="4" height="12" rx="1.5" fill={b.c} />
            <rect x="2" y="16" width="8" height="6" fill="#fff" opacity="0.5" />
          </g>
        )),
      )}
      <circle cx="300" cy="52" r="3" fill={C.amber} />
      <circle cx="330" cy="50" r="3" fill={C.amber} />
      <circle cx="360" cy="52" r="3" fill={C.amber} />
    </g>
  );
}

function BarCounterItems() {
  return (
    <g>
      {[160, 186, 330, 356].map((x) => (
        <path key={x} d={`M${x} 128 L${x + 14} 128 L${x + 10} 146 L${x + 4} 146 Z`} fill="#fff" opacity="0.75" />
      ))}
      <rect x="236" y="122" width="10" height="24" rx="3" fill="#3f6b3a" />
      <rect x="239" y="112" width="4" height="12" fill="#3f6b3a" />
      <path d="M270 134 h30 l-4 12 h-22 z" fill={C.chrome} />
      <circle cx="285" cy="132" r="6" fill="#e9a23b" />
    </g>
  );
}

function DjInterior() {
  return (
    <g>
      {[150, 190, 230, 270, 310, 350].map((x) => (
        <rect key={x} x={x} y="40" width="32" height="90" rx="4" fill="#fff" opacity="0.04" />
      ))}
      <circle cx="270" cy="58" r="14" fill="#cfc8d6" />
      <path d="M256 58 h28 M270 44 v28 M260 48 l20 20 M280 48 l-20 20" stroke="#8f86a0" strokeWidth="1.5" />
      <path d="M270 30 v14" stroke="#8f86a0" strokeWidth="1.5" />
    </g>
  );
}

function DjCounterItems() {
  return (
    <g>
      {[170, 302].map((x) => (
        <g key={x}>
          <rect x={x} y="120" width="68" height="26" rx="4" fill="#1f1b1e" />
          <ellipse cx={x + 30} cy="130" rx="22" ry="7" fill="#0c0a0b" />
          <ellipse cx={x + 30} cy="130" rx="6" ry="2" fill={C.rose} />
          <rect x={x + 56} y="124" width="4" height="16" rx="2" fill={C.chrome} />
        </g>
      ))}
      <rect x="246" y="116" width="48" height="30" rx="4" fill="#2a2529" />
      {[254, 266, 278].map((x) => (
        <rect key={x} x={x} y="122" width="4" height="18" rx="2" fill={C.amber} opacity="0.85" />
      ))}
    </g>
  );
}

function ProInterior() {
  const boxes = ["#efe6d6", C.copper, "#efe6d6", C.red, "#efe6d6", C.copper];
  return (
    <g>
      <rect x="140" y="80" width="260" height="4" fill={C.wood} />
      {boxes.map((c, i) => (
        <rect key={i} x={150 + i * 40} y={56} width="28" height="24" rx="3" fill={c} />
      ))}
      <rect x="150" y="96" width="110" height="40" rx="4" fill="#efe6d6" opacity="0.9" />
      <circle cx="170" cy="116" r="9" fill="none" stroke={C.copper} strokeWidth="3" />
      <rect x="186" y="108" width="62" height="5" rx="2.5" fill={C.ink} opacity="0.7" />
      <rect x="186" y="118" width="40" height="5" rx="2.5" fill={C.ink} opacity="0.4" />
    </g>
  );
}

function ProCounterItems() {
  return (
    <g>
      <rect x="170" y="130" width="40" height="16" rx="2" fill="#efe6d6" />
      <rect x="176" y="126" width="40" height="16" rx="2" fill="#fff" />
      <rect x="290" y="118" width="44" height="28" rx="3" fill="#1f1b1e" />
      <rect x="294" y="122" width="36" height="20" rx="2" fill={C.glassLight} />
      <rect x="350" y="126" width="18" height="20" rx="3" fill={C.copper} />
    </g>
  );
}

function Festoon({ y = 90, night, width = 800 }: { y?: number; night: boolean; width?: number }) {
  const bulbs = Array.from({ length: 15 }, (_, i) => {
    const t = (i + 0.5) / 15;
    const x = t * width;
    const sag = Math.sin(t * Math.PI) * 46;
    return { x, y: y + sag };
  });
  return (
    <g>
      <path d={`M0 ${y} Q${width / 2} ${y + 92} ${width} ${y}`} fill="none" stroke={night ? "#4a3a30" : "#6e5a48"} strokeWidth="2" />
      {bulbs.map((b, i) => (
        <g key={i}>
          {night && <circle cx={b.x} cy={b.y + 8} r="16" fill={C.amber} opacity="0.18" />}
          <circle cx={b.x} cy={b.y + 8} r="5.5" fill={night ? "#ffd99a" : "#f4d9a8"} />
          <rect x={b.x - 2.5} y={b.y} width="5" height="4" fill={night ? "#4a3a30" : "#6e5a48"} />
        </g>
      ))}
    </g>
  );
}

function SceneBackground({ uid, night }: { uid: string; night: boolean }) {
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={night ? "#15100e" : "#f8f1e5"} />
          <stop offset="1" stopColor={night ? "#2a1c16" : "#ecdcc3"} />
        </linearGradient>
        <radialGradient id={`${uid}-halo`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={night ? C.copper : "#f0cf9c"} stopOpacity={night ? 0.42 : 0.8} />
          <stop offset="1" stopColor={night ? C.copper : "#f0cf9c"} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="560" fill={`url(#${uid}-sky)`} />
      <circle cx={night ? 410 : 600} cy={night ? 300 : 190} r={night ? 330 : 170} fill={`url(#${uid}-halo)`} />
      {!night && <circle cx="600" cy="190" r="92" fill="#efc890" opacity="0.55" />}
      {night &&
        [
          [60, 60],
          [140, 120],
          [700, 70],
          [620, 140],
          [520, 40],
          [260, 50],
          [760, 200],
        ].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="#fff" opacity="0.6" />)}
      <rect y="474" width="800" height="86" fill={night ? "#120c0a" : "#e2d0b2"} />
      <rect y="474" width="800" height="2" fill={night ? "#2c201a" : "#cdb791"} />
    </>
  );
}

function CombiScene({ variant, tone }: { variant: CombiVariant; tone: IllustrationTone }) {
  const uid = useId().replace(/:/g, "");
  const night = tone === "night";
  return (
    <>
      <SceneBackground uid={uid} night={night} />
      {variant !== "closed" && variant !== "pro" && <Festoon y={56} night={night} />}
      {variant === "dj" && night && (
        <g opacity="0.5">
          <path d="M300 230 L180 0 L250 0 Z" fill={C.rose} opacity="0.35" />
          <path d="M500 230 L560 0 L630 0 Z" fill={C.violet} opacity="0.45" />
        </g>
      )}
      <g transform="translate(190 236)">
        <Combi variant={variant} uid={uid} night={night} />
      </g>
      {variant === "dj" && (
        <g>
          {[110, 690].map((x) => (
            <g key={x}>
              <path d={`M${x} 470 L${x - 16} 474 M${x} 470 L${x + 16} 474 M${x} 470 L${x} 400`} stroke="#2a2420" strokeWidth="4" />
              <rect x={x - 26} y="340" width="52" height="70" rx="5" fill="#221d1b" />
              <circle cx={x} cy="362" r="10" fill="#0f0c0b" stroke="#3a332f" strokeWidth="3" />
              <circle cx={x} cy="392" r="14" fill="#0f0c0b" stroke="#3a332f" strokeWidth="3" />
            </g>
          ))}
        </g>
      )}
      {variant === "pro" && (
        <g>
          <rect x="660" y="300" width="70" height="170" rx="3" fill={C.ink} />
          <rect x="668" y="310" width="54" height="40" fill={C.red} />
          <circle cx="695" cy="380" r="14" fill="none" stroke={C.copper} strokeWidth="4" />
          <rect x="672" y="410" width="46" height="5" rx="2.5" fill={C.white} />
          <rect x="672" y="422" width="30" height="5" rx="2.5" fill={C.white} opacity="0.6" />
          <rect x="652" y="468" width="86" height="8" rx="3" fill="#2a2420" />
        </g>
      )}
      {variant === "bar" && (
        <g>
          <rect x="636" y="400" width="54" height="72" rx="4" fill="#2a2420" />
          <rect x="642" y="406" width="42" height="40" rx="2" fill="#1a1614" />
          <path d="M650 418 h26 M650 428 h18" stroke={C.white} strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round" />
          <path d="M636 472 L630 476 M690 472 L696 476" stroke="#2a2420" strokeWidth="4" />
        </g>
      )}
    </>
  );
}

function DiscoExterior() {
  const uid = useId().replace(/:/g, "");
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f0b18" />
          <stop offset="1" stopColor="#261838" />
        </linearGradient>
        <linearGradient id={`${uid}-door`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffb3c4" />
          <stop offset="0.5" stopColor={C.rose} />
          <stop offset="1" stopColor={C.violet} />
        </linearGradient>
        <linearGradient id={`${uid}-win`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.violet} />
          <stop offset="1" stopColor={C.rose} />
        </linearGradient>
        <radialGradient id={`${uid}-spill`} cx="0.5" cy="0" r="1">
          <stop offset="0" stopColor={C.rose} stopOpacity="0.55" />
          <stop offset="1" stopColor={C.rose} stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${uid}-shell`}>
          <path d="M0 150 Q0 20 140 10 Q290 0 300 120 L300 160 Q300 175 285 175 L15 175 Q0 175 0 160 Z" />
        </clipPath>
      </defs>
      <rect width="800" height="560" fill={`url(#${uid}-sky)`} />
      {[
        [80, 70],
        [180, 140],
        [690, 60],
        [600, 120],
        [480, 50],
        [300, 80],
        [740, 180],
        [40, 200],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="#fff" opacity="0.7" />
      ))}
      {/* Faisceaux */}
      <g opacity="0.55">
        <path d="M420 250 L250 0 L320 0 Z" fill={C.rose} opacity="0.4" />
        <path d="M440 250 L520 0 L590 0 Z" fill={C.violet} opacity="0.6" />
        <path d="M430 250 L700 20 L740 70 Z" fill={C.amber} opacity="0.25" />
      </g>
      <rect y="470" width="800" height="90" fill="#0a0710" />
      {/* Piste lumineuse au sol */}
      <g transform="translate(470 470)">
        {Array.from({ length: 3 }, (_, r) =>
          Array.from({ length: 6 }, (_, c) => {
            const colors = [C.rose, C.amber, C.violet, C.copper];
            const w0 = 40 + r * 8;
            const x = -60 + c * w0 - r * 24;
            return (
              <path
                key={`${r}-${c}`}
                d={`M${x} ${r * 22} l${w0 - 4} 0 l${8} 20 l${-(w0 + 4)} 0 Z`}
                transform={`translate(${r * 0} 6)`}
                fill={colors[(r + c) % colors.length]}
                opacity={0.35 + ((r * 7 + c * 3) % 5) * 0.1}
              />
            );
          }),
        )}
      </g>
      <ellipse cx="400" cy="474" rx="210" ry="12" fill="#000" opacity="0.5" />
      <g transform="translate(200 250) scale(1.3)">
        {/* Timon */}
        <path d="M0 160 L-70 172" stroke="#3a3346" strokeWidth="7" strokeLinecap="round" />
        <circle cx="-60" cy="180" r="8" fill="#1b1622" />
        <g clipPath={`url(#${uid}-shell)`}>
          <rect width="320" height="200" fill="#f4ecdf" />
          <rect y="112" width="320" height="70" fill="#7d1a22" />
          <rect y="108" width="320" height="5" fill={C.copper} />
        </g>
        <path
          d="M0 150 Q0 20 140 10 Q290 0 300 120 L300 160 Q300 175 285 175 L15 175 Q0 175 0 160 Z"
          fill="none"
          stroke="#000"
          strokeOpacity="0.25"
          strokeWidth="2"
        />
        {/* Fenêtre et boule à facettes */}
        <rect x="34" y="46" width="92" height="50" rx="16" fill={`url(#${uid}-win)`} />
        <circle cx="80" cy="70" r="13" fill="#d7d1e0" />
        <path d="M67 70 h26 M80 57 v26 M70 62 l20 16 M90 62 l-20 16" stroke="#8b82a0" strokeWidth="1.4" />
        <path d="M80 46 v11" stroke="#d7d1e0" strokeWidth="1.5" />
        {/* Porte ouverte */}
        <rect x="170" y="44" width="62" height="128" rx="10" fill={`url(#${uid}-door)`} />
        <path d="M232 46 L276 30 L276 188 L232 172 Z" fill="#efe6d6" />
        <circle cx="266" cy="110" r="3" fill={C.chromeDark} />
        <rect x="178" y="176" width="48" height="6" rx="2" fill="#3a3346" />
        <path d="M150 182 L320 300 L60 300 Z" fill={`url(#${uid}-spill)`} opacity="0.7" />
        {/* Barre lumineuse */}
        <rect x="190" y="2" width="70" height="8" rx="4" fill="#2a2433" />
        {[200, 216, 232, 248].map((x, i) => (
          <circle key={x} cx={x} cy="6" r="3" fill={[C.rose, C.amber, C.violet, C.rose][i]} />
        ))}
        {/* Roue */}
        <path d="M84 176 A36 36 0 0 1 156 176 Z" fill="#1b1622" />
        <circle cx="120" cy="178" r="24" fill="#120e16" />
        <circle cx="120" cy="178" r="12" fill="#e9e1d4" />
        <circle cx="120" cy="178" r="5" fill={C.chromeDark} />
      </g>
    </>
  );
}

function DiscoDancefloor() {
  const uid = useId().replace(/:/g, "");
  const rows = 6;
  const cols = 8;
  const colors = [C.rose, C.amber, C.violet, C.copper, "#f08aa3"];
  const vpX = 400;
  const top = 330;
  const bottom = 560;
  const tiles: React.ReactNode[] = [];
  const yAt = (r: number) => top + (bottom - top) * Math.pow(r / rows, 1.35);
  const xAt = (c: number, y: number) => {
    const spread = 160 + ((y - top) / (bottom - top)) * 760;
    return vpX - spread / 2 + (spread * c) / cols;
  };
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const y1 = yAt(r);
      const y2 = yAt(r + 1);
      const d = `M${xAt(c, y1)} ${y1} L${xAt(c + 1, y1)} ${y1} L${xAt(c + 1, y2)} ${y2} L${xAt(c, y2)} ${y2} Z`;
      tiles.push(
        <path
          key={`${r}-${c}`}
          d={d}
          fill={colors[(r * 3 + c * 2) % colors.length]}
          opacity={0.3 + (((r + 1) * (c + 2)) % 6) * 0.11}
          stroke="#0d0913"
          strokeWidth="2.5"
        />,
      );
    }
  }
  return (
    <>
      <defs>
        <radialGradient id={`${uid}-room`} cx="0.5" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#3a2150" />
          <stop offset="1" stopColor="#0d0913" />
        </radialGradient>
        <radialGradient id={`${uid}-ball`} cx="0.35" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#c9c2d6" />
          <stop offset="1" stopColor="#6c6480" />
        </radialGradient>
        <clipPath id={`${uid}-ballClip`}>
          <circle cx="400" cy="150" r="54" />
        </clipPath>
      </defs>
      <rect width="800" height="560" fill={`url(#${uid}-room)`} />
      {/* Plafond arrondi de la caravane */}
      <path d="M0 120 Q400 -60 800 120" fill="none" stroke="#f4ecdf" strokeOpacity="0.12" strokeWidth="18" />
      <path d="M0 330 L800 330" stroke="#000" strokeOpacity="0.3" />
      {/* Rayons */}
      {Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2;
        const x2 = 400 + Math.cos(a) * 520;
        const y2 = 150 + Math.sin(a) * 520;
        return (
          <line
            key={i}
            x1="400"
            y1="150"
            x2={x2}
            y2={y2}
            stroke={colors[i % colors.length]}
            strokeOpacity="0.22"
            strokeWidth="3"
          />
        );
      })}
      {tiles}
      <line x1="400" y1="0" x2="400" y2="96" stroke="#c9c2d6" strokeWidth="2" />
      <circle cx="400" cy="150" r="54" fill={`url(#${uid}-ball)`} />
      <g clipPath={`url(#${uid}-ballClip)`} stroke="#4f4862" strokeOpacity="0.6" strokeWidth="1.2">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`h${i}`} x1="340" x2="460" y1={100 + i * 12} y2={100 + i * 12} />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <ellipse key={`v${i}`} cx="400" cy="150" rx={6 + i * 6} ry="54" fill="none" />
        ))}
      </g>
      {[
        [370, 120],
        [420, 132],
        [388, 170],
      ].map(([x, y]) => (
        <circle key={`${x}`} cx={x} cy={y} r="3" fill="#fff" />
      ))}
    </>
  );
}

const eventIcons: Record<string, { icon: LucideIcon; bg: [string, string]; fg: string }> = {
  "event-wedding": { icon: Heart, bg: ["#f3e7da", "#e4cdb4"], fg: "#7d1a22" },
  "event-birthday": { icon: Cake, bg: ["#b3262d", "#7d1a22"], fg: "#f7f1e6" },
  "event-private": { icon: GlassWater, bg: ["#2a1c16", "#141110"], fg: "#e2b07c" },
  "event-corporate": { icon: Briefcase, bg: ["#1f1b19", "#3a302a"], fg: "#f7f1e6" },
  "event-tradeshow": { icon: Presentation, bg: ["#ece3d3", "#d9c7aa"], fg: "#141110" },
  "event-launch": { icon: Sparkles, bg: ["#c38b55", "#8f5f33"], fg: "#141110" },
};

function EventScene({ name }: { name: keyof typeof eventIcons }) {
  const uid = useId().replace(/:/g, "");
  const { icon: Icon, bg, fg } = eventIcons[name];
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={bg[0]} />
          <stop offset="1" stopColor={bg[1]} />
        </linearGradient>
      </defs>
      <rect width="800" height="560" fill={`url(#${uid}-bg)`} />
      <circle cx="400" cy="210" r="150" fill="none" stroke={fg} strokeOpacity="0.14" strokeWidth="2" />
      <circle cx="400" cy="210" r="220" fill="none" stroke={fg} strokeOpacity="0.08" strokeWidth="2" />
      <Icon x={325} y={135} width={150} height={150} color={fg} strokeWidth={1.1} />
    </>
  );
}

export function Illustration({
  name,
  tone = "day",
  className,
  label,
}: {
  name: IllustrationKey;
  tone?: IllustrationTone;
  className?: string;
  /** Texte alternatif ; si absent, l'illustration est décorative. */
  label?: string;
}) {
  let content: React.ReactNode;
  switch (name) {
    case "combi-closed":
      content = <CombiScene variant="closed" tone={tone} />;
      break;
    case "combi-bar":
      content = <CombiScene variant="bar" tone={tone} />;
      break;
    case "combi-dj":
      content = <CombiScene variant="dj" tone={tone === "day" ? "night" : tone} />;
      break;
    case "combi-pro":
      content = <CombiScene variant="pro" tone={tone} />;
      break;
    case "disco-exterior":
      content = <DiscoExterior />;
      break;
    case "disco-dancefloor":
      content = <DiscoDancefloor />;
      break;
    default:
      content = <EventScene name={name} />;
  }
  return (
    <svg
      viewBox="0 0 800 560"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      {content}
    </svg>
  );
}
