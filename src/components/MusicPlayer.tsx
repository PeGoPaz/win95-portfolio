import { Button, Range, Frame } from "@react95/core";
import { useEffect, useMemo, useRef, useState } from "react";

interface Track {
  name: string;
  url: string;
}

const musicModules = import.meta.glob("../assets/music/*.mp3", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const tracks: Track[] = Object.entries(musicModules)
  .map(([path, url]) => {
    const fileName = path.split("/").pop() ?? "track.mp3";
    const name = decodeURIComponent(fileName).replace(/\.mp3$/i, "");
    return { name, url };
  })
  .sort((left, right) => left.name.localeCompare(right.name, undefined, { sensitivity: "base" }));

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
};

function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const hasTracks = tracks.length > 0;
  const currentTrack = useMemo(() => tracks[currentTrackIndex], [currentTrackIndex]);

  // Handle Volume and Mute
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  // Initial Autoplay Attempt
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasTracks) return;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
        })
        .catch(() => {
          setIsPlaying(false);
          setAutoplayBlocked(true);
        });
    }
  }, [hasTracks]);

  // Track Change Logic
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasTracks) return;

    if (isPlaying) {
      void audio.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrackIndex, hasTracks, isPlaying]);

  const goToNextTrack = () => {
    if (!hasTracks) return;
    setCurrentTrackIndex((index) => (index + 1) % tracks.length);
  };

  const goToPreviousTrack = () => {
    if (!hasTracks) return;
    setCurrentTrackIndex((index) => (index - 1 + tracks.length) % tracks.length);
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio || !hasTracks) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      void audio.play()
        .then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
        })
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <div style={{ padding: "4px", display: "flex", flexDirection: "column", gap: "12px" }}>
      {/* LCD-style display for track name */}
      <Frame
        variant="field"
        style={{
          padding: "6px",
          backgroundColor: "#000",
          color: "#0f0",
          fontFamily: "monospace",
          fontSize: "14px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {currentTrack?.name ?? "No tracks found"}
      </Frame>

      {/* Progress section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <Range
          min={0}
          max={duration || 0}
          value={currentTime}
          disabled={!hasTracks}
          onChange={(event) => {
            const audio = audioRef.current;
            if (!audio) return;
            const nextTime = Number(event.target.value);
            audio.currentTime = nextTime;
            setCurrentTime(nextTime);
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontFamily: "monospace" }}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Control buttons */}
      <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
        <Button onClick={goToPreviousTrack} disabled={!hasTracks} style={{ width: "60px" }}>
          Prev
        </Button>
        <Button onClick={togglePlayPause} disabled={!hasTracks} style={{ width: "80px" }}>
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button onClick={goToNextTrack} disabled={!hasTracks} style={{ width: "60px" }}>
          Next
        </Button>
      </div>

      {/* Volume control */}
      <Frame variant="inside" style={{ padding: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "11px", minWidth: "40px" }}>Vol</span>
        <Range
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
          disabled={!hasTracks}
          style={{ flex: 1 }}
        />
        <Button
          onClick={() => setIsMuted((muted) => !muted)}
          disabled={!hasTracks}
          style={{ width: "50px", fontSize: "11px", height: "24px" }}
        >
          {isMuted ? "Unmute" : "Mute"}
        </Button>
      </Frame>

      {autoplayBlocked && !isPlaying && (
        <div style={{ fontSize: "10px", color: "red", textAlign: "center" }}>
          Autoplay blocked. Click Play to start.
        </div>
      )}

      {hasTracks && currentTrack && (
        <audio
          ref={audioRef}
          src={currentTrack.url}
          preload="auto"
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          onEnded={goToNextTrack}
        />
      )}
    </div>
  );
}

export default MusicPlayer;
