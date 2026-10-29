import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import type { Group } from 'three';

function readColors() {
  const styles = getComputedStyle(document.documentElement);
  return {
    accent: styles.getPropertyValue('--ball').trim() || '#0e6b38',
    ring: styles.getPropertyValue('--ball-ring').trim() || '#08321a',
  };
}

function Kit({ accent, ring }: { accent: string; ring: string }) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.45;
  });

  return (
    <group ref={group} rotation={[0.5, 0.2, 0]}>
      <mesh>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshStandardMaterial color={accent} roughness={0.42} metalness={0.06} flatShading />
      </mesh>
      <mesh rotation={[Math.PI / 2.3, 0.15, 0.5]}>
        <torusGeometry args={[1.55, 0.018, 8, 48]} />
        <meshStandardMaterial color={ring} roughness={0.35} metalness={0.12} />
      </mesh>
    </group>
  );
}

export default function PitchBallCanvas() {
  const [colors, setColors] = useState({ accent: '#0e6b38', ring: '#08321a' });
  const [loop, setLoop] = useState<'always' | 'never'>('always');

  useEffect(() => {
    const apply = () => setColors(readColors());
    apply();
    const onTheme = () => apply();
    const onVis = () => setLoop(document.hidden ? 'never' : 'always');
    window.addEventListener('themechange', onTheme);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      window.removeEventListener('themechange', onTheme);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <Canvas
      dpr={[1, 1.25]}
      frameloop={loop}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      camera={{ position: [0, 0, 4.4], fov: 35 }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[2.4, 3.2, 4]} intensity={1.4} />
      <Kit accent={colors.accent} ring={colors.ring} />
    </Canvas>
  );
}
