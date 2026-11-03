import { useEffect, useState } from 'react';

type Mode = 'light' | 'dark';

const themeColors: Record<Mode, string> = {
  light: '#f4f7f2',
  dark: '#120810',
};

function readMode(): Mode {
  return document.documentElement.dataset.mode === 'dark' ? 'dark' : 'light';
}

function motionOff() {
  return document.documentElement.dataset.motion === 'off';
}

function applyMode(mode: Mode) {
  const root = document.documentElement;
  root.dataset.mode = mode;
  root.dataset.club = mode === 'dark' ? 'barca' : 'nacional';
  localStorage.setItem('mode', mode);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColors[mode]);
  window.dispatchEvent(new CustomEvent('themechange'));
}

function applyMotion(off: boolean) {
  document.documentElement.dataset.motion = off ? 'off' : 'on';
  localStorage.setItem('motion', off ? 'off' : 'on');
  window.dispatchEvent(new CustomEvent('motionchange'));
}

export default function HeaderTools() {
  const [mode, setMode] = useState<Mode>('light');
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setMode(readMode());
    setReduced(motionOff());
  }, []);

  return (
    <div className="header-tools">
      <button
        type="button"
        className="icon-btn"
        aria-pressed={mode === 'dark'}
        aria-label={mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        onClick={() => {
          const next: Mode = mode === 'dark' ? 'light' : 'dark';
          setMode(next);
          applyMode(next);
        }}
      >
        {mode === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>
      <button
        type="button"
        className="icon-btn motion-btn"
        aria-pressed={reduced}
        aria-label={reduced ? 'Reduce motion is on' : 'Reduce motion is off'}
        onClick={() => {
          const next = !reduced;
          setReduced(next);
          applyMotion(next);
        }}
      >
        <MotionIcon />
        <span>Reduce motion</span>
      </button>
    </div>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
      <path
        fill="currentColor"
        d="M14.5 3.2a8.2 8.2 0 1 0 6.3 12.6A7 7 0 0 1 14.5 3.2z"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
      <circle cx="12" cy="12" r="3.2" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
        <path d="M12 3.2v2.2M12 18.6v2.2M3.2 12h2.2M18.6 12h2.2M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" />
      </g>
    </svg>
  );
}

function MotionIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
      <circle cx="7" cy="12" r="2.1" fill="currentColor" />
      <path d="M11 12h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M16.5 8.5 20 12l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
