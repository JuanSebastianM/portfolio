import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BufferAttribute,
  CanvasTexture,
  Color,
  DoubleSide,
  type Mesh,
  type Group,
  Quaternion,
  RepeatWrapping,
  SphereGeometry,
  SRGBColorSpace,
  Vector3,
} from 'three';

/**
 * The hero pitch in 3D. Click anywhere on it to kick the ball there; put it in a goal to score.
 * Units are meters. The pitch is 105 x 68 along z and x, like Pitch.astro. The ball and the
 * goals are drawn larger than life so they read at this size.
 */

const HALF_W = 34;
const HALF_L = 52.5;
const RUN_OFF = 4;
const R = 1.3;
const GOAL_HALF = 5.5;
const GOAL_H = 3.7;
const GOAL_DEPTH = 2.6;
const GRAVITY = 36;
const SPOT = new Vector3(0, R, 0);

type Palette = { grass: string; stripe: string; chalk: string; accent: string };

function readPalette(): Palette {
  const styles = getComputedStyle(document.documentElement);
  const get = (name: string, fallback: string) => styles.getPropertyValue(name).trim() || fallback;
  return {
    grass: get('--grass', '#2b7a45'),
    stripe: get('--grass-alt', '#31884d'),
    chalk: get('--chalk', 'rgba(255,255,255,0.9)'),
    accent: get('--accent', '#0e6b38'),
  };
}

/** Paints the grass and the markings, the same layout as Pitch.astro. */
function paintPitch(canvas: HTMLCanvasElement, palette: Palette) {
  const W = HALF_W * 2 + RUN_OFF * 2;
  const L = HALF_L * 2 + RUN_OFF * 2;
  const scale = canvas.width / W;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = palette.grass;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const bands = 14;
  ctx.fillStyle = palette.stripe;
  for (let index = 1; index < bands; index += 2) {
    ctx.fillRect(0, (canvas.height / bands) * index, canvas.width, canvas.height / bands);
  }
  ctx.setTransform(scale, 0, 0, scale, RUN_OFF * scale, RUN_OFF * scale);
  ctx.strokeStyle = palette.chalk;
  ctx.fillStyle = palette.chalk;
  ctx.lineWidth = 0.3;
  const w = HALF_W * 2;
  const l = HALF_L * 2;
  const cx = HALF_W;
  ctx.strokeRect(0, 0, w, l);
  ctx.beginPath();
  ctx.moveTo(0, l / 2);
  ctx.lineTo(w, l / 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, l / 2, 9.15, 0, Math.PI * 2);
  ctx.stroke();
  const dot = (x: number, y: number) => {
    ctx.beginPath();
    ctx.arc(x, y, 0.45, 0, Math.PI * 2);
    ctx.fill();
  };
  dot(cx, l / 2);
  for (const end of [0, 1]) {
    const y = (d: number) => (end ? l - d : d);
    const box = (half: number, depth: number) =>
      ctx.strokeRect(cx - half, Math.min(y(0), y(depth)), half * 2, depth);
    box(20.16, 16.5);
    box(9.16, 5.5);
    dot(cx, y(11));
    const reach = Math.sqrt(9.15 ** 2 - 5.5 ** 2);
    const angle = Math.atan2(5.5, reach);
    ctx.beginPath();
    if (end) ctx.arc(cx, y(11), 9.15, Math.PI + angle, -angle);
    else ctx.arc(cx, y(11), 9.15, angle, Math.PI - angle);
    ctx.stroke();
  }
  for (const [x, y, start] of [
    [0, 0, 0],
    [w, 0, Math.PI / 2],
    [w, l, Math.PI],
    [0, l, -Math.PI / 2],
  ]) {
    ctx.beginPath();
    ctx.arc(x, y, 1, start, start + Math.PI / 2);
    ctx.stroke();
  }
}

function useNetTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = 'rgba(255,255,255,0.85)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(64, 64);
      ctx.moveTo(64, 0);
      ctx.lineTo(0, 64);
      ctx.stroke();
    }
    const texture = new CanvasTexture(canvas);
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(8, 3);
    return texture;
  }, []);
}

/** A white ball with twelve black panels, centered on the icosahedron's vertices. */
function useBallGeometry() {
  return useMemo(() => {
    const geometry = new SphereGeometry(R, 48, 32);
    const phi = (1 + Math.sqrt(5)) / 2;
    const centers = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
    ].map(([x, y, z]) => new Vector3(x, y, z).normalize());
    const positions = geometry.getAttribute('position');
    const colors = new Float32Array(positions.count * 3);
    const point = new Vector3();
    const dark = new Color('#16161a');
    const light = new Color('#f7f7f4');
    for (let index = 0; index < positions.count; index += 1) {
      point.fromBufferAttribute(positions, index).normalize();
      const near = Math.max(...centers.map((center) => center.dot(point)));
      const color = near > 0.93 ? dark : light;
      colors.set([color.r, color.g, color.b], index * 3);
    }
    geometry.setAttribute('color', new BufferAttribute(colors, 3));
    return geometry;
  }, []);
}

function Goal({ end }: { end: 1 | -1 }) {
  const net = useNetTexture();
  const z = end * HALF_L;
  const back = z + end * GOAL_DEPTH;
  return (
    <group>
      {[-GOAL_HALF, GOAL_HALF].map((x) => (
        <mesh key={x} position={[x, GOAL_H / 2, z]}>
          <cylinderGeometry args={[0.28, 0.28, GOAL_H, 10]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
      ))}
      <mesh position={[0, GOAL_H, z]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.28, 0.28, GOAL_HALF * 2 + 0.56, 10]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>
      <mesh position={[0, GOAL_H / 2, back]}>
        <planeGeometry args={[GOAL_HALF * 2, GOAL_H]} />
        <meshBasicMaterial map={net} transparent side={DoubleSide} depthWrite={false} />
      </mesh>
      <mesh position={[0, GOAL_H, (z + back) / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[GOAL_HALF * 2, GOAL_DEPTH]} />
        <meshBasicMaterial map={net} transparent side={DoubleSide} depthWrite={false} />
      </mesh>
      {[-GOAL_HALF, GOAL_HALF].map((x) => (
        <mesh key={x} position={[x, GOAL_H / 2, (z + back) / 2]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[GOAL_DEPTH, GOAL_H]} />
          <meshBasicMaterial map={net} transparent side={DoubleSide} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

function CornerFlags({ color }: { color: string }) {
  return (
    <group>
      {[
        [-HALF_W, -HALF_L],
        [HALF_W, -HALF_L],
        [-HALF_W, HALF_L],
        [HALF_W, HALF_L],
      ].map(([x, z]) => (
        <group key={`${x}${z}`} position={[x, 0, z]}>
          <mesh position={[0, 1.6, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 3.2, 6]} />
            <meshStandardMaterial color="#f2f2f2" />
          </mesh>
          <mesh position={[0.55, 2.8, 0]}>
            <boxGeometry args={[1.1, 0.75, 0.05]} />
            <meshStandardMaterial color={color} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

type Props = { onGoal: () => void; onKick: () => void };

function Scene({ onGoal, onKick }: Props) {
  const { invalidate } = useThree();
  const [palette, setPalette] = useState<Palette>(() => readPalette());
  const pitchCanvas = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 912;
    canvas.height = 1356;
    return canvas;
  }, []);
  const pitchTexture = useMemo(() => {
    const texture = new CanvasTexture(pitchCanvas);
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = 4;
    return texture;
  }, [pitchCanvas]);
  const ballGeometry = useBallGeometry();
  const ball = useRef<Group>(null);
  const shadow = useRef<Mesh>(null);
  const state = useRef({
    position: SPOT.clone(),
    velocity: new Vector3(),
    spin: new Quaternion(),
    scoredAt: 0,
  });

  useEffect(() => {
    paintPitch(pitchCanvas, palette);
    pitchTexture.needsUpdate = true;
    invalidate();
  }, [palette, pitchCanvas, pitchTexture, invalidate]);

  useEffect(() => {
    // The theme script swaps the CSS variables first, so read them on the next frame.
    const onTheme = () => window.requestAnimationFrame(() => setPalette(readPalette()));
    window.addEventListener('themechange', onTheme);
    return () => window.removeEventListener('themechange', onTheme);
  }, []);

  const axis = useMemo(() => new Vector3(), []);
  const step = useMemo(() => new Quaternion(), []);

  useFrame((_, rawDelta) => {
    const s = state.current;
    const dt = Math.min(rawDelta, 1 / 30);
    const { position: p, velocity: v } = s;

    if (s.scoredAt) {
      // Let the net catch it, then put it back on the spot.
      v.multiplyScalar(Math.exp(-6 * dt));
      v.y -= GRAVITY * dt;
      p.addScaledVector(v, dt);
      if (p.y < R) p.y = R;
      if (performance.now() - s.scoredAt > 1400) {
        s.scoredAt = 0;
        p.copy(SPOT).setY(R + 6);
        v.set(0, 0, 0);
      }
    } else {
      v.y -= GRAVITY * dt;
      p.addScaledVector(v, dt);
      if (p.y < R) {
        p.y = R;
        v.y = Math.abs(v.y) > 3 ? -v.y * 0.48 : 0;
      }
      if (p.y <= R + 0.01) {
        const roll = Math.exp(-1.1 * dt);
        v.x *= roll;
        v.z *= roll;
      }
      if (Math.abs(p.x) > HALF_W + RUN_OFF - R) {
        p.x = Math.sign(p.x) * (HALF_W + RUN_OFF - R);
        v.x *= -0.6;
      }
      if (Math.abs(p.z) > HALF_L - R * 0.2) {
        const inMouth = Math.abs(p.x) < GOAL_HALF - R * 0.6 && p.y < GOAL_H - R * 0.4;
        if (inMouth) {
          s.scoredAt = performance.now();
          onGoal();
        } else if (Math.abs(p.z) > HALF_L + RUN_OFF - R) {
          p.z = Math.sign(p.z) * (HALF_L + RUN_OFF - R);
          v.z *= -0.6;
        }
      }
    }

    const ground = Math.hypot(v.x, v.z);
    if (ground > 0.05) {
      axis.set(v.z, 0, -v.x).normalize();
      step.setFromAxisAngle(axis, (ground / R) * dt);
      s.spin.premultiply(step);
    }
    if (ball.current) {
      ball.current.position.copy(p);
      ball.current.quaternion.copy(s.spin);
    }
    if (shadow.current) {
      shadow.current.position.set(p.x, 0.05, p.z);
      const lift = Math.max(0.35, 1 - (p.y - R) / 14);
      shadow.current.scale.setScalar(lift);
    }
    const moving = s.scoredAt || v.lengthSq() > 0.02 || p.y > R + 0.01;
    if (moving) invalidate();
    else v.set(0, 0, 0);
  });

  function kick(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation();
    const s = state.current;
    if (s.scoredAt) return;
    const target = event.point;
    const dx = target.x - s.position.x;
    const dz = target.z - s.position.z;
    const dist = Math.hypot(dx, dz);
    if (dist < R * 2.2) {
      // Clicked the ball itself: pop it up.
      s.velocity.set((Math.random() - 0.5) * 6, 18, (Math.random() - 0.5) * 6);
    } else {
      const speed = Math.min(60, Math.max(14, dist * 1.25));
      s.velocity.set((dx / dist) * speed, Math.min(15, 3 + dist * 0.22), (dz / dist) * speed);
    }
    onKick();
    invalidate();
  }

  return (
    <>
      <hemisphereLight args={['#ffffff', palette.grass, 1.1]} />
      <directionalLight position={[20, 40, 30]} intensity={1.6} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} onPointerDown={kick}>
        <planeGeometry args={[HALF_W * 2 + RUN_OFF * 2, HALF_L * 2 + RUN_OFF * 2]} />
        <meshBasicMaterial map={pitchTexture} />
      </mesh>
      <mesh ref={shadow} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[R * 1.05, 24]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.32} depthWrite={false} />
      </mesh>
      <Goal end={-1} />
      <Goal end={1} />
      <CornerFlags color={palette.accent} />
      <group ref={ball} position={SPOT} onPointerDown={kick}>
        <mesh geometry={ballGeometry}>
          <meshStandardMaterial vertexColors roughness={0.45} />
        </mesh>
      </group>
    </>
  );
}

export default function PitchBallCanvas() {
  const wrap = useRef<HTMLDivElement>(null);
  const [goals, setGoals] = useState(0);
  const [flash, setFlash] = useState(false);
  const [kicked, setKicked] = useState(false);
  const [loop, setLoop] = useState<'demand' | 'never'>('demand');

  useEffect(() => {
    const stage = wrap.current?.closest('.hero-stage');
    stage?.classList.add('has-3d');
    const onVis = () => setLoop(document.hidden ? 'never' : 'demand');
    document.addEventListener('visibilitychange', onVis);
    return () => {
      stage?.classList.remove('has-3d');
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <div className="pitch-3d" ref={wrap}>
      <Canvas
        dpr={[1, 1.5]}
        flat
        frameloop={loop}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        camera={{ position: [0, 124, 142], fov: 34, near: 1, far: 600 }}
        onCreated={({ camera, gl }) => {
          gl.setClearColor(0x000000, 0);
          camera.lookAt(0, 0, 16);
        }}
      >
        <Scene
          onKick={() => setKicked(true)}
          onGoal={() => {
            setGoals((count) => count + 1);
            setFlash(true);
            window.setTimeout(() => setFlash(false), 1300);
          }}
        />
      </Canvas>
      <p className={`pitch-3d-hint${kicked ? ' is-faded' : ''}`}>Click the pitch to kick the ball</p>
      {goals > 0 && <p className="pitch-3d-score">Goals {goals}</p>}
      {flash && <p className="pitch-3d-goal">GOAL!</p>}
    </div>
  );
}
