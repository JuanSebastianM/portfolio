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
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (window.matchMedia('(max-width: 767px)').matches) return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData) return false;
  return true;
}

export default function PitchBall() {
  const [Canvas, setCanvas] = useState<CanvasComponent | null>(null);

  useEffect(() => {
    if (!canShowBall()) return;
    let alive = true;
    import('./PitchBallCanvas').then((mod) => {
      if (alive) setCanvas(() => mod.default);
    });
    return () => {
      alive = false;
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
