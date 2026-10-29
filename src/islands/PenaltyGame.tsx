import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * A penalty shootout on the hero pitch. Pick a corner, the keeper guesses, the net decides.
 * With data-motion="off" the shot resolves instantly: same game, no movement.
 */

type Col = 0 | 1 | 2;
type Row = 0 | 1;
type Outcome = 'goal' | 'saved' | 'post';
type Phase = 'aim' | 'shot' | 'result';

const COLS = [112, 200, 288];
const ROWS = [160, 206];
const SPOT = { x: 200, y: 404 };
const KEEPER = { x: 200, y: 230 };
const SHOT_MS = 520;
const BEST_KEY = 'penalty-best';

const targets = ROWS.flatMap((y, row) =>
  COLS.map((x, col) => ({
    col: col as Col,
    row: row as Row,
    x,
    y,
    label: `Shoot ${row === 0 ? 'top' : 'low'} ${['left', 'center', 'right'][col]}`,
  })),
);

const lines: Record<Outcome, string[]> = {
  goal: ['GOAL!', 'Top bins!', 'Back of the net!', 'Golazo!'],
  saved: ['Saved!', 'Keeper read it.', 'Denied!'],
  post: ['Off the post!', 'Off the woodwork!'],
};

function pick<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function motionOn() {
  return document.documentElement.dataset.motion !== 'off';
}

function readBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function saveBest(value: number) {
  try {
    localStorage.setItem(BEST_KEY, String(value));
  } catch {
    // Private mode or blocked storage: the best streak just will not persist.
  }
}

/** Where the keeper ends up for a dive, as a transform around his feet. */
function diveTransform(col: Col, row: Row) {
  if (col === 1) return row === 0 ? 'translate(0px, -26px)' : 'translate(0px, 6px) scale(1.1, 0.86)';
  const side = col === 0 ? -1 : 1;
  const dx = side * 74;
  return row === 0 ? `translate(${dx}px, -30px) rotate(${side * 58}deg)` : `translate(${dx}px, 0px) rotate(${side * 82}deg)`;
}

// A fixed crowd so the stand looks the same on every render.
const crowd = Array.from({ length: 150 }, (_, index) => {
  const seed = Math.sin(index * 12.9898) * 43758.5453;
  const r = seed - Math.floor(seed);
  return { x: (index % 30) * 13.6 + 6 + r * 4, y: 14 + Math.floor(index / 30) * 13 + r * 3, tone: index % 3 };
});

export default function PenaltyGame() {
  const [playing, setPlaying] = useState(false);
  const [phase, setPhase] = useState<Phase>('aim');
  const [shot, setShot] = useState<{ col: Col; row: Row } | null>(null);
  const [keeper, setKeeper] = useState<{ col: Col; row: Row } | null>(null);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [message, setMessage] = useState('');
  const [score, setScore] = useState({ goals: 0, shots: 0, streak: 0, best: 0 });
  const root = useRef<HTMLDivElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const firstTarget = useRef<HTMLButtonElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    setScore((current) => ({ ...current, best: readBest() }));
    return () => timers.current.forEach((id) => window.clearTimeout(id));
  }, []);

  useEffect(() => {
    root.current?.closest('.hero-stage')?.classList.toggle('is-playing', playing);
    if (playing) firstTarget.current?.focus();
  }, [playing]);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const reset = useCallback(() => {
    setPhase('aim');
    setShot(null);
    setKeeper(null);
    setOutcome(null);
  }, []);

  const exit = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    reset();
    setPlaying(false);
    window.requestAnimationFrame(() => launcher.current?.focus());
  }, [reset]);

  useEffect(() => {
    if (!playing) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') exit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [playing, exit]);

  function shoot(col: Col, row: Row) {
    if (phase !== 'aim') return;
    const roll = Math.random();
    const dive = { col: (roll < 0.38 ? 0 : roll < 0.62 ? 1 : 2) as Col, row: (Math.random() < 0.5 ? 0 : 1) as Row };
    let result: Outcome = 'goal';
    if (row === 0 && col !== 1 && Math.random() < 0.12) result = 'post';
    else if (dive.col === col && (col === 1 || dive.row === row || Math.random() < 0.35)) result = 'saved';

    const moving = motionOn();
    setShot({ col, row });
    setKeeper(dive);
    setPhase('shot');
    later(
      () => {
        setOutcome(result);
        setPhase('result');
        const text = pick(lines[result]);
        setMessage(text);
        setScore((current) => {
          const goals = current.goals + (result === 'goal' ? 1 : 0);
          const streak = result === 'goal' ? current.streak + 1 : 0;
          const best = Math.max(current.best, streak);
          if (best > current.best) saveBest(best);
          return { goals, shots: current.shots + 1, streak, best };
        });
        later(reset, moving ? 1500 : 1200);
      },
      moving ? SHOT_MS : 0,
    );
  }

  const target = shot ? { x: COLS[shot.col], y: ROWS[shot.row] } : SPOT;
  const postBounce = outcome === 'post' && shot ? { x: target.x + (shot.col === 0 ? -40 : 40), y: target.y - 30 } : null;
  const savedBall = outcome === 'saved' && shot ? { x: target.x, y: target.y + 70 } : null;
  const ball = postBounce ?? savedBall ?? target;
  const ballScale = phase === 'aim' ? 1 : 0.6;

  return (
    <div className="penalty-root" ref={root}>
      {!playing ? (
        <button ref={launcher} type="button" className="btn btn-primary penalty-launch" onClick={() => setPlaying(true)}>
          <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
            <circle cx="10" cy="10" r="8.5" fill="#fff" stroke="#1d1d22" strokeWidth="1.2" />
            <path d="M10 5.5l3.2 2.3-1.2 3.7H8l-1.2-3.7z" fill="#1d1d22" />
          </svg>
          Take a penalty
        </button>
      ) : (
        <div className="penalty" role="region" aria-label="Penalty shootout mini game">
          <div className="penalty-hud">
            <span>
              Goals <strong>{score.goals}</strong>/{score.shots}
            </span>
            <span>
              Streak <strong>{score.streak}</strong> · Best <strong>{score.best}</strong>
            </span>
            <button type="button" className="penalty-exit" onClick={exit} aria-label="Back to the pitch">
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className={`penalty-scene phase-${phase}${outcome ? ` is-${outcome}` : ''}`}>
            <svg viewBox="0 0 400 500" aria-hidden="true">
              <defs>
                <pattern id="penalty-net" width="9" height="9" patternUnits="userSpaceOnUse">
                  <path d="M0 0L9 9M9 0L0 9" stroke="var(--chalk)" strokeWidth="0.9" opacity="0.6" />
                </pattern>
              </defs>
              <rect width="400" height="500" className="pitch-grass" />
              {[[230, 262], [300, 350], [400, 470]].map(([y1, y2]) => (
                <rect key={y1} x="0" y={y1} width="400" height={y2 - y1} className="pitch-stripe" />
              ))}
              <rect width="400" height="96" className="penalty-stand" />
              {crowd.map((fan, index) => (
                <circle key={index} cx={fan.x} cy={fan.y} r="3.4" className={`penalty-fan tone-${fan.tone}`} />
              ))}
              <rect y="96" width="400" height="4" className="penalty-board" />
              <g className="pitch-lines">
                <line x1="0" y1="230" x2="400" y2="230" />
                <path d="M96 230L72 272H328L304 230" />
                <path d="M14 230L-40 380H440L386 230" />
                <ellipse cx={SPOT.x} cy={SPOT.y + 14} rx="5" ry="2.5" className="pitch-dot" />
              </g>
              <g className="penalty-goal">
                <rect x="66" y="138" width="268" height="92" fill="url(#penalty-net)" className="penalty-net" />
                <rect x="60" y="128" width="8" height="103" rx="2" className="penalty-post" />
                <rect x="332" y="128" width="8" height="103" rx="2" className="penalty-post" />
                <rect x="60" y="128" width="280" height="8" rx="2" className="penalty-post" />
              </g>
              <g
                className="penalty-keeper"
                style={{
                  transform: `translate(${KEEPER.x}px, ${KEEPER.y}px) ${
                    keeper && phase !== 'aim' ? diveTransform(keeper.col, keeper.row) : ''
                  }`,
                }}
              >
                <rect x="-11" y="-30" width="9" height="30" rx="4" className="keeper-legs" />
                <rect x="2" y="-30" width="9" height="30" rx="4" className="keeper-legs" />
                <rect x="-14" y="-62" width="28" height="36" rx="8" className="keeper-kit" />
                <path d="M-12 -56L-30 -74M12 -56L30 -74" className="keeper-arms" />
                <circle cx="-31" cy="-76" r="6" className="keeper-gloves" />
                <circle cx="31" cy="-76" r="6" className="keeper-gloves" />
                <circle cx="0" cy="-72" r="9" className="keeper-head" />
              </g>
              <ellipse
                className="penalty-shadow"
                cx="0"
                cy="0"
                rx="13"
                ry="4"
                style={{ transform: `translate(${ball.x}px, ${phase === 'aim' ? SPOT.y + 13 : 232}px)` }}
              />
              <g className="penalty-ball" style={{ transform: `translate(${ball.x}px, ${ball.y}px) scale(${ballScale})` }}>
                <circle r="13" className="ball-skin" />
                <path d="M0 -5l4.8 3.5-1.8 5.6h-6l-1.8-5.6z" className="ball-patch" />
              </g>
            </svg>
            {phase === 'aim' && (
              <div className="penalty-targets">
                {targets.map((spot, index) => (
                  <button
                    key={spot.label}
                    ref={index === 0 ? firstTarget : undefined}
                    type="button"
                    className="penalty-target"
                    style={{ left: `${(spot.x / 400) * 100}%`, top: `${(spot.y / 500) * 100}%` }}
                    aria-label={spot.label}
                    onClick={() => shoot(spot.col, spot.row)}
                  >
                    <span aria-hidden="true" />
                  </button>
                ))}
              </div>
            )}
            {phase === 'result' && outcome && <p className={`penalty-call call-${outcome}`}>{message}</p>}
            {phase === 'aim' && <p className="penalty-tip">Pick a spot in the goal.</p>}
          </div>
          <p className="sr-only" role="status" aria-live="polite">
            {phase === 'result' ? `${message} ${score.goals} goals from ${score.shots} shots.` : ''}
          </p>
        </div>
      )}
    </div>
  );
}
