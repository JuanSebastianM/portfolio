import { useEffect, useState } from 'react';

type Club = 'nacional' | 'barca';
type Mode = 'light' | 'dark';

const themeColors: Record<string, string> = {
  'nacional:light': '#f4f7f2',
  'nacional:dark': '#07150e',
  'barca:light': '#f7f4f6',
  'barca:dark': '#120810',
};

function applyTheme(club: Club, mode: Mode) {
  const root = document.documentElement;
  root.dataset.club = club;
  root.dataset.mode = mode;
  localStorage.setItem('club', club);
  localStorage.setItem('mode', mode);
  const meta = document.querySelector('meta[name="theme-color"]');
  meta?.setAttribute('content', themeColors[`${club}:${mode}`]);
  window.dispatchEvent(new CustomEvent('themechange'));
}

export default function ThemeSwitcher() {
  const [club, setClub] = useState<Club>('nacional');
  const [mode, setMode] = useState<Mode>('light');

  useEffect(() => {
    const root = document.documentElement;
    setClub(root.dataset.club === 'barca' ? 'barca' : 'nacional');
    setMode(root.dataset.mode === 'dark' ? 'dark' : 'light');
  }, []);

  return (
    <div className="theme-switcher" role="group" aria-label="Color theme">
      <button
        type="button"
        data-club-option="nacional"
        aria-pressed={club === 'nacional'}
        onClick={() => {
          setClub('nacional');
          applyTheme('nacional', mode);
        }}
      >
        Nacional
      </button>
      <button
        type="button"
        data-club-option="barca"
        aria-pressed={club === 'barca'}
        onClick={() => {
          setClub('barca');
          applyTheme('barca', mode);
        }}
      >
        Barcelona
      </button>
      <button
        type="button"
        data-mode-option="dark"
        aria-pressed={mode === 'dark'}
        onClick={() => {
          const next: Mode = mode === 'dark' ? 'light' : 'dark';
          setMode(next);
          applyTheme(club, next);
        }}
      >
        Dark
      </button>
    </div>
  );
}
