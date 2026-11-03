import { Component, useEffect, useState, type ReactNode } from 'react';

type CanvasComponent = () => ReactNode;

class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function canShowBall() {
  if (document.documentElement.dataset.motion === 'off') return false;
  if (window.matchMedia('(max-width: 767px)').matches) return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData) return false;
  return true;
}

export default function PitchBall() {
  const [Canvas, setCanvas] = useState<CanvasComponent | null>(null);

  useEffect(() => {
    let alive = true;
    const sync = () => {
      if (!alive) return;
      if (!canShowBall()) {
        setCanvas(null);
        return;
      }
      import('./PitchBallCanvas').then((mod) => {
        if (alive && canShowBall()) setCanvas(() => mod.default);
      });
    };
    sync();
    window.addEventListener('motionchange', sync);
    return () => {
      alive = false;
      window.removeEventListener('motionchange', sync);
    };
  }, []);

  return (
    <div className="pitch-ball" aria-hidden="true">
      {Canvas ? (
        <WebGLBoundary>
          <Canvas />
        </WebGLBoundary>
      ) : null}
    </div>
  );
}
