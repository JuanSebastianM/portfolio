import { useState } from 'react';

type Bit = { id: number; x: number; y: number; delay: number };

export default function CopyEmail({ email }: { email: string }) {
  const [bits, setBits] = useState<Bit[]>([]);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
    if (document.documentElement.dataset.motion === 'off') return;
    const next = Array.from({ length: 10 }, (_, index) => ({
      id: Date.now() + index,
      x: (Math.random() - 0.5) * 90,
      y: -20 - Math.random() * 48,
      delay: index * 18,
    }));
    setBits(next);
    window.setTimeout(() => setBits([]), 700);
  }

  return (
    <span className="copy-email">
      <a href={`mailto:${email}`}>{email}</a>
      <button type="button" className="icon-btn" onClick={() => void copy()} aria-label={`Copy ${email}`}>
        {copied ? 'Copied' : 'Copy'}
      </button>
      <span className="confetti" aria-hidden="true">
        {bits.map((bit) => (
          <i
            key={bit.id}
            style={{
              ['--dx' as string]: `${bit.x}px`,
              ['--dy' as string]: `${bit.y}px`,
              animationDelay: `${bit.delay}ms`,
            }}
          />
        ))}
      </span>
    </span>
  );
}
