import { useEffect, useRef, useState } from 'react';
import { ambienceLevel, createAmbience, type Ambience } from '../lib/ambience';

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
  const [soundOn, setSoundOn] = useState(false);
  const [volume, setVolume] = useState(70);
  const crowd = useRef<Ambience | null>(null);

  useEffect(() => {
    setMode(readMode());
    setReduced(motionOff());
    const raw = localStorage.getItem('soundVolume');
    const saved = raw === null ? Number.NaN : Number(raw);
    if (Number.isFinite(saved)) setVolume(Math.min(100, Math.max(0, saved)));
    return () => {
      void crowd.current?.stop();
      crowd.current = null;
    };
  }, []);

  async function toggleSound() {
    if (soundOn) {
      const current = crowd.current;
      crowd.current = null;
      setSoundOn(false);
      localStorage.setItem('sound', 'off');
      await current?.stop();
      return;
    }
    const next = await createAmbience(ambienceLevel(volume));
    (window as unknown as { __ambienceAnalyser?: AnalyserNode }).__ambienceAnalyser = next.analyser;
    crowd.current = next;
    setSoundOn(true);
    localStorage.setItem('sound', 'on');
  }

  function onVolume(value: number) {
    setVolume(value);
    localStorage.setItem('soundVolume', String(value));
    crowd.current?.setLevel(ambienceLevel(value));
  }

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
      <div className="sound-control">
        <button
          type="button"
          className="icon-btn"
          aria-pressed={soundOn}
          aria-label={soundOn ? 'Turn stadium ambience off' : 'Turn stadium ambience on'}
          onClick={() => void toggleSound()}
        >
          {soundOn ? <SpeakerIcon /> : <SpeakerOffIcon />}
        </button>
        {soundOn ? (
          <input
            className="volume"
            type="range"
            min={0}
            max={100}
            value={volume}
            aria-label="Ambience volume"
            onChange={(event) => onVolume(Number(event.target.value))}
          />
        ) : null}
      </div>
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

function SpeakerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
      <path fill="currentColor" d="M4 9h3.2L11 5.6v12.8L7.2 15H4z" />
      <path d="M14 9.2a3.2 3.2 0 0 1 0 5.6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function SpeakerOffIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
      <path fill="currentColor" d="M4 9h3.2L11 5.6v12.8L7.2 15H4z" />
      <path d="M15 9.5 19.5 14M19.5 9.5 15 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
