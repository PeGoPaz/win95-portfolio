import { ProgressBar } from "@react95/core";
import { useEffect, useRef, useState } from "react";

interface StartupScreenProps {
  logoSrc: string;
  soundSrc: string;
  onComplete: () => void;
}

function StartupScreen({ logoSrc, soundSrc, onComplete }: StartupScreenProps) {
  const [progress, setProgress] = useState(0);
  const [audioDurationMs, setAudioDurationMs] = useState(3000);
  const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false);
  const [audioFinished, setAudioFinished] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const readyId = requestAnimationFrame(() => setAppReady(true));
    return () => cancelAnimationFrame(readyId);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playPromise = audio.play();
    if (!playPromise) return;

    playPromise.catch(() => {
      // Don't block startup forever when autoplay is restricted.
      setAudioFinished(true);
    });
  }, []);

  useEffect(() => {
    setMinimumTimeElapsed(false);
    const timer = window.setTimeout(() => {
      setMinimumTimeElapsed(true);
    }, audioDurationMs);

    return () => window.clearTimeout(timer);
  }, [audioDurationMs]);

  useEffect(() => {
    const done = minimumTimeElapsed && audioFinished && appReady;
    if (done) {
      setProgress(100);
      const timer = window.setTimeout(onComplete, 150);
      return () => window.clearTimeout(timer);
    }

    const interval = window.setInterval(() => {
      setProgress((previous) => {
        if (previous >= 94) return previous;
        const nextStep = 1 + Math.floor(Math.random() * 4);
        return Math.min(previous + nextStep, 94);
      });
    }, 120);

    return () => window.clearInterval(interval);
  }, [minimumTimeElapsed, audioFinished, appReady, onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div style={{ width: "420px", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
        <img src={logoSrc} alt="logo" width={220} />
        <ProgressBar percent={progress} width="100%" />
      </div>
      <audio
        ref={audioRef}
        src={soundSrc}
        preload="auto"
        onLoadedMetadata={(event) => {
          const nextDuration = event.currentTarget.duration;
          if (!Number.isFinite(nextDuration) || nextDuration <= 0) return;
          setAudioDurationMs(Math.ceil(nextDuration * 1000));
        }}
        onEnded={() => setAudioFinished(true)}
        onError={() => setAudioFinished(true)}
      />
    </div>
  );
}

export default StartupScreen;
