import { useState } from 'react';

type Bit = { id: number; x: number; y: number; delay: number };

/**
 * The async Clipboard API only exists in secure contexts (HTTPS or localhost) and can be
 * refused by the browser. `npm run dev -- --host` on a LAN IP is plain HTTP, so fall back to
 * a hidden textarea and `execCommand('copy')`, which still works inside a click handler.
 */
async function writeClipboard(text: string) {
  if (window.isSecureContext && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to the legacy path.
    }
  }
  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  field.style.pointerEvents = 'none';
  document.body.append(field);
  field.select();
  field.setSelectionRange(0, text.length);
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  field.remove();
  return ok;
}

export default function CopyEmail({ email }: { email: string }) {
  const [bits, setBits] = useState<Bit[]>([]);
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  async function copy() {
    const ok = await writeClipboard(email);
    setStatus(ok ? 'copied' : 'failed');
    window.setTimeout(() => setStatus('idle'), ok ? 1600 : 4000);
    if (!ok) return;
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
      <button type="button" className="btn btn-primary" onClick={() => void copy()}>
        Copy email
      </button>
      <span className="copy-note" role="status">
        {status === 'copied' ? 'Email copied.' : null}
        {status === 'failed' ? 'Copy was blocked. Select the address to copy it.' : null}
      </span>
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
