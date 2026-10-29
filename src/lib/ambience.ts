export type Ambience = {
  context: AudioContext;
  analyser: AnalyserNode;
  setLevel: (level: number) => void;
  stop: () => Promise<void>;
};

/** Filtered noise loop. Original synthesis, not a recording. */
export async function createAmbience(level: number): Promise<Ambience> {
  const context = new AudioContext();
  await context.resume();

  const seconds = 2;
  const buffer = context.createBuffer(1, Math.floor(context.sampleRate * seconds), context.sampleRate);
  const samples = buffer.getChannelData(0);
  for (let i = 0; i < samples.length; i += 1) {
    samples[i] = (Math.random() * 2 - 1) * 0.45;
  }

  const source = context.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const lowpass = context.createBiquadFilter();
  lowpass.type = 'lowpass';
  lowpass.frequency.value = 1400;
  lowpass.Q.value = 0.7;

  const gain = context.createGain();
  const safe = Math.max(0, level);
  const start = context.currentTime;
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(safe, start + 0.3);

  const analyser = context.createAnalyser();
  analyser.fftSize = 2048;

  source.connect(lowpass);
  lowpass.connect(gain);
  gain.connect(analyser);
  analyser.connect(context.destination);
  source.start();

  return {
    context,
    analyser,
    setLevel(next: number) {
      const time = context.currentTime;
      const value = Math.max(0, next);
      gain.gain.cancelScheduledValues(time);
      gain.gain.setValueAtTime(gain.gain.value, time);
      gain.gain.linearRampToValueAtTime(value, time + 0.12);
    },
    async stop() {
      const time = context.currentTime;
      gain.gain.cancelScheduledValues(time);
      gain.gain.setValueAtTime(gain.gain.value, time);
      gain.gain.linearRampToValueAtTime(0, time + 0.4);
      await new Promise((resolve) => setTimeout(resolve, 420));
      source.stop();
      await context.close();
    },
  };
}

export function ambienceLevel(volumePercent: number): number {
  return (Math.min(100, Math.max(0, volumePercent)) / 100) * 0.45;
}

export function measureRms(analyser: AnalyserNode): number {
  const data = new Float32Array(analyser.fftSize);
  analyser.getFloatTimeDomainData(data);
  let sum = 0;
  for (const sample of data) sum += sample * sample;
  return Math.sqrt(sum / data.length);
}
