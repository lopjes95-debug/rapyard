"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import * as Tone from "tone";
import {
  Play,
  Pause,
  Square,
  Volume2,
  VolumeX,
  RotateCcw,
  Download,
  ChevronDown,
  Music,
  Zap,
  Waves,
} from "lucide-react";

// Sound samples with different instruments
const INSTRUMENTS = {
  kick: { name: "Kick", color: "bg-[var(--color-accent-pink)]" },
  snare: { name: "Snare", color: "bg-[var(--color-accent-cyan)]" },
  hihat: { name: "Hi-Hat", color: "bg-[var(--color-accent-yellow)]" },
  openhat: { name: "Open Hat", color: "bg-[var(--color-accent-green)]" },
  clap: { name: "Clap", color: "bg-[var(--color-primary)]" },
  tom: { name: "Tom", color: "bg-purple-500" },
  rim: { name: "Rim", color: "bg-orange-400" },
  perc: { name: "Perc", color: "bg-teal-400" },
};

type InstrumentKey = keyof typeof INSTRUMENTS;

const STEPS = 16;
const DEFAULT_BPM = 90;

// Synth configurations for different drum sounds
const createSynths = () => ({
  kick: new Tone.MembraneSynth({
    pitchDecay: 0.05,
    octaves: 6,
    oscillator: { type: "sine" },
    envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 1.4 },
  }).toDestination(),
  snare: new Tone.NoiseSynth({
    noise: { type: "white" },
    envelope: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.2 },
  }).toDestination(),
  hihat: new Tone.MetalSynth({
    frequency: 200,
    envelope: { attack: 0.001, decay: 0.1, release: 0.01 },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5,
  }).toDestination(),
  openhat: new Tone.MetalSynth({
    frequency: 200,
    envelope: { attack: 0.001, decay: 0.3, release: 0.1 },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5,
  }).toDestination(),
  clap: new Tone.NoiseSynth({
    noise: { type: "pink" },
    envelope: { attack: 0.005, decay: 0.1, sustain: 0, release: 0.1 },
  }).toDestination(),
  tom: new Tone.MembraneSynth({
    pitchDecay: 0.08,
    octaves: 4,
    oscillator: { type: "sine" },
    envelope: { attack: 0.001, decay: 0.3, sustain: 0.01, release: 0.5 },
  }).toDestination(),
  rim: new Tone.MetalSynth({
    frequency: 800,
    envelope: { attack: 0.001, decay: 0.05, release: 0.01 },
    harmonicity: 3.1,
    modulationIndex: 16,
    resonance: 8000,
    octaves: 0.5,
  }).toDestination(),
  perc: new Tone.PluckSynth({
    attackNoise: 4,
    dampening: 4000,
    resonance: 0.9,
  }).toDestination(),
});

type GridState = Record<InstrumentKey, boolean[]>;

const createEmptyGrid = (): GridState => {
  const grid: Partial<GridState> = {};
  Object.keys(INSTRUMENTS).forEach((key) => {
    grid[key as InstrumentKey] = Array(STEPS).fill(false);
  });
  return grid as GridState;
};

// Preset patterns
const PRESETS = {
  empty: createEmptyGrid(),
  hiphop: {
    kick: [true, false, false, false, false, false, false, false, true, false, true, false, false, false, false, false],
    snare: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
    hihat: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
    openhat: [false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true],
    clap: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
    tom: Array(16).fill(false),
    rim: [false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false],
    perc: Array(16).fill(false),
  },
  trap: {
    kick: [true, false, false, false, false, false, true, false, false, false, true, false, false, false, false, false],
    snare: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
    hihat: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    openhat: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false],
    clap: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, true],
    tom: Array(16).fill(false),
    rim: [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],
    perc: [false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false],
  },
  boom: {
    kick: [true, false, false, false, false, false, false, false, true, false, false, false, false, false, true, false],
    snare: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
    hihat: [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],
    openhat: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true],
    clap: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
    tom: [false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false],
    rim: Array(16).fill(false),
    perc: [false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true],
  },
};

export default function BeatMaker() {
  const [grid, setGrid] = useState<GridState>(PRESETS.hiphop);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [bpm, setBpm] = useState(DEFAULT_BPM);
  const [volume, setVolume] = useState(-6);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState("hiphop");
  const [trackVolumes, setTrackVolumes] = useState<Record<InstrumentKey, number>>(
    Object.keys(INSTRUMENTS).reduce((acc, key) => ({ ...acc, [key]: 0 }), {} as Record<InstrumentKey, number>)
  );
  const [trackMutes, setTrackMutes] = useState<Record<InstrumentKey, boolean>>(
    Object.keys(INSTRUMENTS).reduce((acc, key) => ({ ...acc, [key]: false }), {} as Record<InstrumentKey, boolean>)
  );

  const synthsRef = useRef<ReturnType<typeof createSynths> | null>(null);
  const sequenceRef = useRef<Tone.Sequence | null>(null);
  const isInitializedRef = useRef(false);

  // Initialize Tone.js
  const initAudio = useCallback(async () => {
    if (isInitializedRef.current) return;
    
    await Tone.start();
    synthsRef.current = createSynths();
    isInitializedRef.current = true;
  }, []);

  // Update volume
  useEffect(() => {
    if (synthsRef.current) {
      const vol = isMuted ? -Infinity : volume;
      Object.values(synthsRef.current).forEach((synth) => {
        synth.volume.value = vol;
      });
    }
  }, [volume, isMuted]);

  // Update individual track volumes
  useEffect(() => {
    if (synthsRef.current) {
      Object.keys(trackVolumes).forEach((key) => {
        const instrument = key as InstrumentKey;
        const synth = synthsRef.current![instrument];
        const baseVol = isMuted ? -Infinity : volume;
        const trackVol = trackMutes[instrument] ? -Infinity : trackVolumes[instrument];
        synth.volume.value = baseVol + trackVol;
      });
    }
  }, [trackVolumes, trackMutes, volume, isMuted]);

  // Play a specific instrument
  const playSound = useCallback((instrument: InstrumentKey) => {
    if (!synthsRef.current) return;

    const synth = synthsRef.current[instrument];
    const now = Tone.now();

    switch (instrument) {
      case "kick":
        (synth as Tone.MembraneSynth).triggerAttackRelease("C1", "8n", now);
        break;
      case "snare":
      case "clap":
        (synth as Tone.NoiseSynth).triggerAttackRelease("8n", now);
        break;
      case "hihat":
      case "openhat":
      case "rim":
        (synth as Tone.MetalSynth).triggerAttackRelease("32n", now);
        break;
      case "tom":
        (synth as Tone.MembraneSynth).triggerAttackRelease("G1", "8n", now);
        break;
      case "perc":
        (synth as Tone.PluckSynth).triggerAttack("C4", now);
        break;
    }
  }, []);

  // Start/Stop sequence
  const togglePlay = useCallback(async () => {
    await initAudio();

    if (isPlaying) {
      Tone.Transport.stop();
      Tone.Transport.cancel();
      setCurrentStep(-1);
      setIsPlaying(false);
      return;
    }

    Tone.Transport.bpm.value = bpm;

    sequenceRef.current = new Tone.Sequence(
      (time, step) => {
        setCurrentStep(step);

        Object.keys(INSTRUMENTS).forEach((key) => {
          const instrument = key as InstrumentKey;
          if (grid[instrument][step] && !trackMutes[instrument]) {
            const synth = synthsRef.current![instrument];
            
            switch (instrument) {
              case "kick":
                (synth as Tone.MembraneSynth).triggerAttackRelease("C1", "8n", time);
                break;
              case "snare":
              case "clap":
                (synth as Tone.NoiseSynth).triggerAttackRelease("8n", time);
                break;
              case "hihat":
              case "openhat":
              case "rim":
                (synth as Tone.MetalSynth).triggerAttackRelease("32n", time);
                break;
              case "tom":
                (synth as Tone.MembraneSynth).triggerAttackRelease("G1", "8n", time);
                break;
              case "perc":
                (synth as Tone.PluckSynth).triggerAttack("C4", time);
                break;
            }
          }
        });
      },
      [...Array(STEPS).keys()],
      "16n"
    );

    sequenceRef.current.start(0);
    Tone.Transport.start();
    setIsPlaying(true);
  }, [initAudio, isPlaying, bpm, grid, trackMutes]);

  // Update BPM
  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  // Toggle grid cell
  const toggleCell = async (instrument: InstrumentKey, step: number) => {
    await initAudio();
    
    setGrid((prev) => {
      const newGrid = { ...prev };
      newGrid[instrument] = [...prev[instrument]];
      newGrid[instrument][step] = !newGrid[instrument][step];
      return newGrid;
    });

    // Play sound on toggle
    if (!grid[instrument][step]) {
      playSound(instrument);
    }
  };

  // Clear grid
  const clearGrid = () => {
    setGrid(createEmptyGrid());
    setSelectedPreset("empty");
  };

  // Load preset
  const loadPreset = (presetName: keyof typeof PRESETS) => {
    setGrid(PRESETS[presetName]);
    setSelectedPreset(presetName);
  };

  // Toggle track mute
  const toggleTrackMute = (instrument: InstrumentKey) => {
    setTrackMutes((prev) => ({
      ...prev,
      [instrument]: !prev[instrument],
    }));
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* Header */}
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">RapYard Studio</h1>
              <p className="text-xs text-[var(--color-muted)]">Beat Maker</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Preset Selector */}
            <div className="relative">
              <select
                value={selectedPreset}
                onChange={(e) => loadPreset(e.target.value as keyof typeof PRESETS)}
                className="appearance-none bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-lg px-4 py-2 pr-10 text-sm font-medium cursor-pointer hover:border-[var(--color-border-bright)] transition-colors"
              >
                <option value="empty">Empty</option>
                <option value="hiphop">Hip-Hop</option>
                <option value="trap">Trap</option>
                <option value="boom">Boom Bap</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)] pointer-events-none" />
            </div>

            {/* Clear Button */}
            <button
              onClick={clearGrid}
              className="p-2 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border)] hover:border-[var(--color-border-bright)] transition-colors"
              title="Clear All"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Transport Controls */}
        <div className="flex items-center justify-between mb-6 bg-[var(--color-surface)] rounded-2xl p-4 border border-[var(--color-border)]">
          <div className="flex items-center gap-4">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                isPlaying
                  ? "bg-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/30"
                  : "bg-[var(--color-surface-elevated)] hover:bg-[var(--color-surface-highlight)]"
              }`}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-1" />
              )}
            </button>

            {/* Stop */}
            <button
              onClick={() => {
                Tone.Transport.stop();
                Tone.Transport.cancel();
                setCurrentStep(-1);
                setIsPlaying(false);
              }}
              className="w-10 h-10 rounded-lg bg-[var(--color-surface-elevated)] hover:bg-[var(--color-surface-highlight)] flex items-center justify-center transition-colors"
            >
              <Square className="w-4 h-4 fill-current" />
            </button>

            {/* BPM Control */}
            <div className="flex items-center gap-3 ml-4 px-4 py-2 bg-[var(--color-surface-elevated)] rounded-xl">
              <Zap className="w-4 h-4 text-[var(--color-accent-yellow)]" />
              <span className="text-sm font-mono font-medium w-12">{bpm}</span>
              <input
                type="range"
                min={60}
                max={180}
                value={bpm}
                onChange={(e) => setBpm(Number(e.target.value))}
                className="w-24"
              />
              <span className="text-xs text-[var(--color-muted)]">BPM</span>
            </div>
          </div>

          {/* Master Volume */}
          <div className="flex items-center gap-3 px-4 py-2 bg-[var(--color-surface-elevated)] rounded-xl">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="hover:text-[var(--color-primary)] transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <input
              type="range"
              min={-30}
              max={0}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-24"
            />
            <span className="text-xs text-[var(--color-muted)] font-mono w-10">{volume}dB</span>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex mb-2 ml-40">
          {Array.from({ length: STEPS }, (_, i) => (
            <div
              key={i}
              className={`flex-1 text-center text-xs font-mono ${
                i % 4 === 0 ? "text-[var(--color-muted-foreground)]" : "text-[var(--color-muted)]"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Beat Grid */}
        <div className="bg-[var(--color-surface)] rounded-2xl p-4 border border-[var(--color-border)]">
          {Object.keys(INSTRUMENTS).map((key) => {
            const instrument = key as InstrumentKey;
            const { name, color } = INSTRUMENTS[instrument];

            return (
              <div key={instrument} className="flex items-center gap-2 mb-2 last:mb-0">
                {/* Instrument Label */}
                <div className="w-32 flex items-center gap-2">
                  <button
                    onClick={() => toggleTrackMute(instrument)}
                    className={`w-3 h-3 rounded-full ${color} ${
                      trackMutes[instrument] ? "opacity-30" : "opacity-100"
                    } transition-opacity`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      trackMutes[instrument] ? "text-[var(--color-muted)]" : ""
                    }`}
                  >
                    {name}
                  </span>
                </div>

                {/* Track Volume */}
                <div className="w-16">
                  <input
                    type="range"
                    min={-20}
                    max={6}
                    value={trackVolumes[instrument]}
                    onChange={(e) =>
                      setTrackVolumes((prev) => ({
                        ...prev,
                        [instrument]: Number(e.target.value),
                      }))
                    }
                    className="w-full h-1"
                  />
                </div>

                {/* Grid Steps */}
                <div className="flex-1 flex gap-1">
                  {grid[instrument].map((active, step) => (
                    <button
                      key={step}
                      onClick={() => toggleCell(instrument, step)}
                      className={`
                        flex-1 h-10 rounded-lg transition-all duration-75
                        ${step % 4 === 0 ? "ml-1" : ""}
                        ${
                          active
                            ? `${color} shadow-lg`
                            : "bg-[var(--color-surface-elevated)] hover:bg-[var(--color-surface-highlight)]"
                        }
                        ${
                          currentStep === step
                            ? "ring-2 ring-white/50 scale-105"
                            : ""
                        }
                        ${trackMutes[instrument] && active ? "opacity-40" : ""}
                      `}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Waveform Visualization */}
        <div className="mt-6 bg-[var(--color-surface)] rounded-2xl p-4 border border-[var(--color-border)]">
          <div className="flex items-center gap-2 mb-3">
            <Waves className="w-4 h-4 text-[var(--color-accent-cyan)]" />
            <span className="text-sm font-medium">Pattern</span>
            <span className="text-xs text-[var(--color-muted)] ml-auto">
              {STEPS} steps / {Math.round((STEPS / 4) * (60 / bpm) * 1000)}ms per bar
            </span>
          </div>
          
          <div className="h-16 bg-[var(--color-surface-elevated)] rounded-lg overflow-hidden flex items-end px-2">
            {Array.from({ length: STEPS }, (_, i) => {
              const activeCount = Object.keys(INSTRUMENTS).filter(
                (key) => grid[key as InstrumentKey][i]
              ).length;
              const height = activeCount > 0 ? 20 + activeCount * 10 : 4;
              
              return (
                <div
                  key={i}
                  className={`flex-1 mx-0.5 rounded-t transition-all duration-150 ${
                    currentStep === i
                      ? "bg-[var(--color-primary)]"
                      : activeCount > 0
                      ? "bg-[var(--color-accent-cyan)]"
                      : "bg-[var(--color-border-bright)]"
                  }`}
                  style={{ height: `${height}%` }}
                />
              );
            })}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 flex items-center justify-between text-xs text-[var(--color-muted)]">
          <p>Click cells to toggle. Click instrument dot to mute track.</p>
          <p>
            Pattern: {selectedPreset.charAt(0).toUpperCase() + selectedPreset.slice(1)} | {bpm} BPM | 4/4
          </p>
        </div>
      </main>
    </div>
  );
}
