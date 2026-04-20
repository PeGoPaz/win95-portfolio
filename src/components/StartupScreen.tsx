import { Frame } from "@react95/core";
import { useEffect, useRef, useState } from "react";
import { useRealisticProgress } from "../utils/useRealisticProgress";

interface StartupScreenProps {
  logoSrc: string;
  soundSrc: string;
  onComplete: () => void;
}

function StartupScreen({ logoSrc, soundSrc, onComplete }: StartupScreenProps) {
  const [audioDurationMs, setAudioDurationMs] = useState(3000);
  const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false);
  const [audioFinished, setAudioFinished] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Use the realistic progress hook
  const isEssentiallyComplete = minimumTimeElapsed && (audioFinished || !audioRef.current?.src) && appReady;
  const progress = useRealisticProgress(isEssentiallyComplete);

  useEffect(() => {
    const readyId = requestAnimationFrame(() => setAppReady(true));
    return () => cancelAnimationFrame(readyId);
  }, []);

  // Complete callback when progress reaches 100%
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(onComplete, 300);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  // Preload and play audio logic
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set a timeout as fallback for audio duration
    const timeoutId = setTimeout(() => {
      setAudioDurationMs(3000); // Default if metadata fails
    }, 2000);

    const handlePlay = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay restricted, don't block the UI
          setAudioFinished(true);
        });
      }
    };

    if (audio.readyState >= 2) {
      handlePlay();
    } else {
      audio.oncanplay = handlePlay;
    }

    // Also handle click to play as a last resort if blocked
    const handleClickToPlay = () => {
      if (audio.paused && !audioFinished) {
        handlePlay();
      }
      window.removeEventListener("click", handleClickToPlay);
    };
    window.addEventListener("click", handleClickToPlay);

    return () => {
      clearTimeout(timeoutId);
      audio.oncanplay = null;
      window.removeEventListener("click", handleClickToPlay);
    };
  }, [audioFinished]);

  useEffect(() => {
    setMinimumTimeElapsed(false);
    const timer = window.setTimeout(() => {
      setMinimumTimeElapsed(true);
    }, audioDurationMs);

    return () => window.clearTimeout(timer);
  }, [audioDurationMs]);

  const tilesCount = 24;
  const activeTiles = Math.round((progress / 100) * tilesCount);

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
      <div
        style={{
          width: "420px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          transform: "translateY(-12%)",
        }}
      >
        <img src={logoSrc} alt="logo" width={220} />
        <Frame variant="well" style={{ width: "100%", padding: "4px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${tilesCount}, 1fr)`,
              gap: "2px",
              height: "16px",
            }}
          >
            {Array.from({ length: tilesCount }, (_, index) => (
              <div
                key={index}
                style={{
                  background: index < activeTiles ? "#0000a8" : "#c0c0c0",
                  borderTop: "1px solid #d9d9d9",
                  borderLeft: "1px solid #d9d9d9",
                  borderRight: "1px solid #808080",
                  borderBottom: "1px solid #808080",
                }}
              />
            ))}
          </div>
        </Frame>
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
