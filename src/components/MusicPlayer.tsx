import { Button, Fieldset } from "@react95/core";
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
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const hasTracks = tracks.length > 0;
  const currentTrack = useMemo(() => tracks[currentTrackIndex], [currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasTracks) return;

    audio.currentTime = 0;
    setCurrentTime(0);
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
      return;
    }

    void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  };

  return (
    <div
      style={{
        position: "fixed",
        right: "12px",
        bottom: "48px",
        width: "320px",
        zIndex: 2000,
      }}
    >
      <Fieldset legend="Music Player">
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div title={currentTrack?.name ?? "No tracks"} style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {currentTrack?.name ?? "No tracks found"}
          </div>

          <input
            type="range"
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

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            <Button onClick={goToPreviousTrack} disabled={!hasTracks}>
              Prev
            </Button>
            <Button onClick={togglePlayPause} disabled={!hasTracks}>
              {isPlaying ? "Pause" : "Play"}
            </Button>
            <Button onClick={goToNextTrack} disabled={!hasTracks}>
              Next
            </Button>
            <Button onClick={() => setIsMuted((muted) => !muted)} disabled={!hasTracks}>
              {isMuted ? "Unmute" : "Mute"}
            </Button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "12px", minWidth: "48px" }}>Volume</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              disabled={!hasTracks}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </Fieldset>

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
