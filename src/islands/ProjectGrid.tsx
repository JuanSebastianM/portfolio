import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { useRef, type PointerEvent, type ReactNode } from 'react';

export type ProjectCardData = {
  slug: string;
  name: string;
  summary: string;
  role: string;
  language: string;
  links: { label: string; href: string }[];
  image?: string;
  imageAlt?: string;
  meta?: string;
};

function Tilt({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 18, mass: 0.4 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 18, mass: 0.4 });

  function onMove(event: PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    const px = (event.clientX - bounds.left) / bounds.width;
    const py = (event.clientY - bounds.top) / bounds.height;
    rotateY.set((px - 0.5) * 9);
    rotateX.set((0.5 - py) * 8);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div
      ref={ref}
      className="tilt-scene"
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <motion.div style={{ rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d', height: '100%' }}>
        {children}
      </motion.div>
    </div>
  );
}

export default function ProjectGrid({
  projects,
  className = 'project-grid',
}: {
  projects: ProjectCardData[];
  className?: string;
}) {
  return (
    <div className={className}>
      {projects.map((project) => (
        <Tilt key={project.slug}>
          <article className="card project-card">
            <div className={project.image ? 'shot' : 'shot shot-mark-only'}>
              {project.image ? (
                <img src={project.image} alt={project.imageAlt ?? ''} loading="lazy" />
              ) : (
                <span className="shot-mark" aria-hidden="true">
                  {project.name.slice(0, 1)}
                </span>
              )}
            </div>
            <div className="body">
              <div className="meta-row">
                <span className="chip">{project.role}</span>
                <span className="chip">{project.language}</span>
                {project.meta ? <span className="chip">{project.meta}</span> : null}
              </div>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <div className="link-row">
                {project.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </article>
        </Tilt>
      ))}
    </div>
  );
}
