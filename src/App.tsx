import { useEffect, useMemo, useRef, useState } from "react";
import { AGENTS, ClippyProvider } from "@react95/clippy";
import WindowBar from "./components/WindowBar";
import DesktopIcon from "./components/DesktopIcon";
import Contact from "./components/Contact";
import { Inetcpl1313, Joy102, Wordpad, Mail, MediaCd } from "@react95/icons";
import Resume from "./components/Resume";
import Game from "./components/Game";
import MusicPlayer from "./components/MusicPlayer";
import StartupScreen from "./components/StartupScreen";
import logoSrc from "./assets/images/logo.png";
import startupSoundSrc from "./assets/sounds/startup.mp3";
import clickSoundSrc from "./assets/sounds/mouse_click.mp3";
import type { DragOptions } from "@neodrag/react";

const MUSIC_PLAYER_WIDTH = 360;
const MUSIC_PLAYER_HEIGHT = 240;
const TASKBAR_HEIGHT = 42;
const MODAL_TOP_OFFSET = 50;
const SCREEN_MARGIN = 16;
const CLIPPY_CLEARANCE_BOTTOM = 120;

const getMusicPlayerDragOptions = (): Omit<DragOptions, "handle"> | undefined => {
  if (typeof window === "undefined") return undefined;

  const x = Math.max(SCREEN_MARGIN, window.innerWidth - MUSIC_PLAYER_WIDTH - SCREEN_MARGIN);
  const y = Math.max(
    0,
    window.innerHeight -
      TASKBAR_HEIGHT -
      CLIPPY_CLEARANCE_BOTTOM -
      MUSIC_PLAYER_HEIGHT -
      MODAL_TOP_OFFSET
  );

  return {
    defaultPosition: { x, y },
    bounds: "body",
  };
};

function App() {
  const [showDesktop, setShowDesktop] = useState(false);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const musicPlayerDragOptions = useMemo(
    () => (showDesktop ? getMusicPlayerDragOptions() : undefined),
    [showDesktop]
  );

  useEffect(() => {
    const clickAudio = new Audio(clickSoundSrc);
    clickAudio.volume = 0.08;
    clickAudio.preload = "auto";
    clickAudioRef.current = clickAudio;

    return () => {
      clickAudio.pause();
      clickAudioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const handleClick = () => {
      const clickAudio = clickAudioRef.current;
      if (!clickAudio) return;

      clickAudio.currentTime = 0;
      void clickAudio.play().catch(() => undefined);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        background: "#098684",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {!showDesktop && (
        <StartupScreen
          logoSrc={logoSrc}
          soundSrc={startupSoundSrc}
          onComplete={() => setShowDesktop(true)}
        />
      )}

      {showDesktop && (
        <>
          <img
            src={logoSrc}
            width={400}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-70%)",
              opacity: 0.1, // Subtle background logo
              pointerEvents: "none",
            }}
          />

          <ClippyProvider agentName={AGENTS.MERLIN}>
            <div 
              style={{ 
                padding: "20px", 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, 100px)", 
                gridTemplateRows: "repeat(auto-fill, 100px)",
                gap: "20px",
                height: "calc(100vh - 40px)",
              }}
            >
              <DesktopIcon icon={<Inetcpl1313 variant="32x32_4" />} name="Browser">
                <iframe width={800} height={500} src="https://wiby.org/" title="Wiby" style={{ border: "none" }} />
              </DesktopIcon>
              <DesktopIcon width={650} icon={<Wordpad variant="32x32_4" />} name="Resume">
                <Resume />
              </DesktopIcon>
              <DesktopIcon width={420} height={500} icon={<Joy102 variant="32x32_4" />} name="Game">
                <Game />
              </DesktopIcon>
              <DesktopIcon width={400} icon={<Mail variant="32x32_4" />} name="Contact">
                <Contact />
              </DesktopIcon>
              <DesktopIcon
                width={MUSIC_PLAYER_WIDTH}
                height={MUSIC_PLAYER_HEIGHT}
                dragOptions={musicPlayerDragOptions}
                icon={<MediaCd variant="32x32_4" />}
                name="Music Player"
              >
                <MusicPlayer />
              </DesktopIcon>
            </div>
            <WindowBar />
          </ClippyProvider>
        </>
      )}
    </div>
  );
}

export default App;
